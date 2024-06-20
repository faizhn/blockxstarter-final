import React, { useState, useEffect, useRef } from 'react'
import { FaTimes } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { updateProject } from '../services/blockchain'
import { useGlobalState, setGlobalState } from '../store'
import crowd from '../assets/crowd.png'

const UpdateProject = ({ project }) => {
  const [updateModal] = useGlobalState('updateModal')
  const [title, setTitle] = useState(project?.title)
  const [description, setDescription] = useState(project?.description)
  const [date, setDate] = useState(project?.date)
  const [imageURL, setImageURL] = useState(project?.imageURL)
  const [category] = useState(project?.category)
  const modalRef = useRef(null)

  const toTimestamp = (dateStr) => {
    const dateObj = Date.parse(dateStr)
    return dateObj / 1000
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title || !description || !date || !imageURL || !category) return

    const params = {
      id: project?.id,
      title,
      description,
      expiresAt: toTimestamp(date),
      imageURL,
      category,
    }

    await updateProject(params)
    toast.success('Project telah berhasil diupdate.')
    onClose()
  }

  const onClose = () => {
    setGlobalState('updateModal', 'scale-0')
  }

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose()
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex
      items-center justify-center bg-black bg-opacity-50
      transform transition-transform duration-300 ${updateModal}`}
    >
      <div
        ref={modalRef}
        className="bg-white shadow-xl shadow-black
        rounded-xl w-11/12 md:w-2/5 p-8 transform transition-transform duration-500"
      >
        <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-700">Edit Project</h2>
            <button
              onClick={onClose}
              type="button"
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <FaTimes size={20} />
            </button>
          </div>

          <div className="flex justify-center items-center">
            <div className="rounded-xl overflow-hidden h-20 w-20">
              <img
                src={imageURL || crowd}
                alt="project title"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="relative">
            <input
              className="block w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:border-blue-500"
              type="text"
              name="title"
              placeholder="Judul"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              required
            />
          </div>

          <div className="relative">
            <input
              className="block w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:border-blue-500"
              type="date"
              name="date"
              placeholder="Expires"
              onChange={(e) => setDate(e.target.value)}
              value={date}
              required
            />
          </div>

          <div className="relative">
            <input
              className="block w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:border-blue-500"
              type="url"
              name="imageURL"
              placeholder="URL Gambar"
              onChange={(e) => setImageURL(e.target.value)}
              value={imageURL}
              required
            />
          </div>

          <div className="relative">
            <input
              className="block w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:border-blue-500"
              type="text"
              name="category"
              placeholder="Kategori"
              value={category}
              readOnly
            />
          </div>

          <div className="relative">
            <textarea
              className="block w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:border-blue-500"
              name="description"
              placeholder="Deskripsi"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full px-6 py-2.5 bg-blue-600
            text-white font-medium text-md leading-tight
            rounded-lg shadow-md hover:bg-blue-700 transition-colors"
          >
            Edit
          </button>
        </form>
      </div>
    </div>
  )
}

export default UpdateProject
