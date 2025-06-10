import './App.css'
import { handleTest } from './hooks/msg'

function App() {
  return (
    <>
      <h1>VitaLink</h1>
      <button onClick={() => handleTest('红烧罗非鱼', '记得每早8点上班哦')}>消息通知</button>
    </>
  )
}

export default App
