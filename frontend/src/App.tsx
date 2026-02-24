import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Game } from './components/Game'
import { LandingPage } from './components/LandingPage'

function App() {

  return (
    <div className='h-screen bg-[#21242a]'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
