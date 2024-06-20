import { useEffect } from 'react'
import AddButton from '../components/AddButton'
import CreateProject from '../components/CreateProject'
import Hero from '../components/Hero'
import Projects from '../components/Projects'
import { loadProjects } from '../services/blockchain'
import { useGlobalState } from '../store'
import Header from '../components/Header'

const Home = () => {
  const [projects] = useGlobalState('projects')

  useEffect(() => {
    const loadData = async () => {
    await loadProjects()
  };
  loadData();
}, []);

  return (
    <>
      <Header />
      <Hero />
      <Projects projects={projects} />
      <CreateProject />
      <AddButton />
    </>
  )
}

export default Home
