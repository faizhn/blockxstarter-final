import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BackProject from '../components/BackProject'
import DeleteProject from '../components/DeleteProject'
import ProjectBackers from '../components/ProjectBackers'
import ProjectDetails from '../components/ProjectDetails'
import UpdateProject from '../components/UpdateProject'
import { getBackers, loadProject } from '../services/blockchain'
import { useGlobalState } from '../store'
import Header from '../components/Header'

const Project = () => {
  const { id } = useParams()
  const [loaded, setLoaded] = useState(false)
  const [project] = useGlobalState('project')
  const [backers] = useGlobalState('backers')

  useEffect(() => {
    const loadData = async () => {
    await loadProject(id);
    await getBackers(id);
    setLoaded(true);
  };
  loadData();
}, []);
  return loaded ? (
    <>
      <Header />
      <ProjectDetails project={project} />
      <UpdateProject project={project} />
      <DeleteProject project={project} />
      <BackProject project={project} />
      <ProjectBackers backers={backers} />
    </>
  ) : null
}

export default Project
