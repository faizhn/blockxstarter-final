import Identicons from 'react-identicons';
import { FaEthereum, FaExclamationCircle } from 'react-icons/fa';
import {
  daysRemaining,
  setGlobalState,
  truncate,
  useGlobalState,
} from '../store';
import { payoutProject, addComment } from '../services/blockchain';
import { useState } from 'react';

const ProjectDetails = ({ project }) => {
  const [connectedAccount] = useGlobalState('connectedAccount');
  const [newComment, setNewComment] = useState('');
  const expired = new Date().getTime() > Number(project?.expiresAt + '000');

  const handleAddComment = async () => {
    if (newComment.trim() === '') {
      alert('Komentar tidak boleh kosong');
      return;
    }
    
    await addComment(project.id, newComment);
    setNewComment('');
    setGlobalState('project', { ...project }); // Refresh project to get new comments
  };

  return (
    <div className="pt-16 mb-5 px-6 flex justify-center bg-gray-100">
      <div className="w-full max-w-screen-xl bg-white shadow-lg rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <img
              src={project?.imageURL}
              alt={project?.title}
              className="rounded-xl w-full mb-4 object-contain"
              style={{ maxHeight: '400px' }}
            />

            <div className="flex flex-col mt-4">
              <h5 className="text-gray-900 text-3xl font-semibold mb-2">
                {project?.title}
              </h5>
              <small className={`text-gray-500 ${expired ? 'text-red-500' : ''}`}>
                {expired
                  ? 'Berakhir'
                  : daysRemaining(project.expiresAt) + ' tersisa'}
              </small>
            </div>

            <div className="flex justify-between items-center w-full mt-2">
              <div className="flex items-center space-x-2">
                <Identicons
                  className="rounded-full shadow-md"
                  string={project?.owner}
                  size={30}
                />
                {project?.owner ? (
                  <small className="text-gray-700 font-medium">
                    {truncate(project?.owner)}
                  </small>
                ) : null}
                <small className="text-gray-500 font-bold">
                  {project?.backers} Dukungan
                </small>
              </div>

              <div className="font-bold text-sm">
                {expired ? (
                  <small className="text-red-500">Berakhir</small>
                ) : project?.status === 0 ? (
                  <small className="text-blue-500">Terbuka</small>
                ) : project?.status === 1 ? (
                  <small className="text-green-500">Diterima</small>
                ) : project?.status === 2 ? (
                  <small className="text-orange-500">Dikembalikan</small>
                ) : project?.status === 3 ? (
                  <small className="text-gray-600">Dihapus</small>
                ) : (
                  <small className="text-purple-500">Dibayar</small>
                )}
              </div>
            </div>

            <p className="text-base text-gray-700 font-light mt-4">{project?.description}</p>

            <div className="w-full overflow-hidden bg-gray-300 rounded-full mt-4">
              <div
                className="bg-green-600 text-xs font-medium text-green-100 text-center p-0.5 leading-none rounded-full"
                style={{
                  width: `${(project?.raised / project?.cost) * 100}%`,
                }}
              ></div>
            </div>

            <div className="flex justify-between items-center font-bold mt-2">
              <small>{project?.raised} ETH Terkumpul</small>
              <small className="flex items-center">
                <FaEthereum />
                <span className="ml-1">{project?.cost} ETH</span>
              </small>
            </div>

            <div className="flex flex-col sm:flex-row justify-start items-center space-x-2 mt-4">
              {expired ? (
                <button
                  type="button"
                  className="inline-block px-6 py-2.5 bg-gray-400 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md cursor-not-allowed"
                >
                  Project Ditutup
                </button>
              ) : (
                <>
                  {connectedAccount !== project?.owner && project?.status === 0 && (
                    <button
                      type="button"
                      className="inline-block px-6 py-2.5 bg-green-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-green-700"
                      onClick={() => setGlobalState('backModal', 'scale-100')}
                    >
                      Dukung Project
                    </button>
                  )}

                  {connectedAccount === project?.owner && project?.status !== 3 && (
                    <>
                      {project?.status === 1 ? (
                        <button
                          type="button"
                          className="inline-block px-6 py-2.5 bg-orange-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-orange-700"
                          onClick={() => payoutProject(project?.id)}
                        >
                          Cairkan Dana
                        </button>
                      ) : project?.status !== 4 ? (
                        <>
                          <button
                            type="button"
                          className="inline-block px-6 py-2.5 bg-gray-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-gray-700"
                            onClick={() => setGlobalState('updateModal', 'scale-100')}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-red-700"
                            onClick={() => setGlobalState('deleteModal', 'scale-100')}
                          >
                            Hapus
                          </button>
                        </>
                      ) : (
                        <button
                          type="button"
                          className="inline-block px-6 py-2.5 bg-gray-400 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md cursor-not-allowed"
                        >
                          Project Ditutup
                        </button>
                      )}
                    </>
                  )}
                </>
              )}
            </div>

            <div className="mt-4">
              <small className="text-gray-500 font-semibold uppercase tracking-wide">
                Kategori: 
                <span className="ml-1 text-gray-900 font-bold">{project?.category}</span>
              </small>
            </div>
          </div>

          {/* Comments Section */}
          <div className="md:col-span-1 mt-6 md:mt-0">
            <h3 className="text-lg font-semibold mb-4">Dukungan Komentar</h3>
            <div className="space-y-4 h-96 overflow-y-auto">
              {project?.status !== 3 && project?.status !== 4 && (
                project?.comments?.length > 0 ? (
                  project?.comments.map((comment, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <Identicons
                        className="rounded-full shadow-md"
                        string={comment.commenter}
                        size={30}
                      />
                      <div className="flex-1">
                        <div className={`p-4 rounded-lg ${comment.commenter === project.owner ? 'bg-blue-100' : 'bg-gray-100'}`}>
                          <div className="flex justify-between items-center">
                            <h4 className="text-sm font-semibold">
                              {truncate(comment.commenter, 4, 4, 11)}
                              {comment.commenter === project.owner && (
                                <span className="ml-2 text-xs text-blue-600 font-bold">(Pemilik)</span>
                              )}
                            </h4>
                            <small className="text-gray-500">{new Date(comment.timestamp).toLocaleString()}</small>
                          </div>
                          <p className="text-gray-700 mt-2">{comment.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-500">Belum ada komentar untuk project ini.</p>
                  </div>
                )
              )}
              {(project?.status === 3 || project?.status === 4) && (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500">Komentar tidak tersedia karena project telah {project?.status === 3 ? 'dihapus' : 'dibayar'}.</p>
                </div>
              )}
            </div>
            <div className="mt-6">
              {(project?.status !== 3 && project?.status !== 4 && connectedAccount && !expired) && (
                <>
                  <textarea
                    className="w-full p-4 bg-gray-100 rounded-lg"
                    rows="4"
                    placeholder="Tambahkan komentar"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                  <div className="flex items-center mt-2">
                    <button
                      className="px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700"
                      onClick={handleAddComment}
                    >
                      Tambah Komentar
                    </button>
                    <FaExclamationCircle className="ml-2 text-grey-500 cursor-pointer" title="Hanya pengguna yang telah mendukung project ini yang dapat menambahkan komentar" />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
