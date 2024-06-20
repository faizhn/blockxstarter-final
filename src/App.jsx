import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './views/Home'
import Project from './views/Project'
import { isWallectConnected } from './services/blockchain'
import { ToastContainer } from 'react-toastify'
import Homepage from './views/Homepage'

const App = () => {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const loadData = async () => {
    await isWallectConnected();
    console.log('Blockchain dimuat');
    setLoaded(true);
  };
  loadData();
}, []);

  return (
    <div className="min-h-screen relative">
      {loaded ? (
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='projects' element={<Home />} />
          <Route path='/projects/:id' element={<Project />} />
        </Routes>
      ) : null}

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  )
}

export default App
