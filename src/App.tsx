import './App.css'
import { ModeToggle } from './pages/theme/mode-toggle'

function App() {
  return (
    <>
      <div className='flex justify-between'>
        <h1 className='text-3xl font-bold bg-red-700'>VitaLink</h1>
        <ModeToggle />
      </div>
    </>
  )
}

export default App
