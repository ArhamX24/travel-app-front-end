import { Outlet } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'

function App() {

  return (
    <div className='bg-slate-100 h-full font-poppins text-black'>
    <Navbar/>
    <Outlet></Outlet>
    </div>
  )
}

export default App
