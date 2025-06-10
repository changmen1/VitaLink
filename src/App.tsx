import './App.css'
import { handleTest } from './hooks/msg'

function App() {
  return (
    <>
      <h1 className='text-3xl font-bold bg-red-700'>VitaLink</h1>
      <div className='text-blue-700'>哈哈哈哈</div>
      <button onClick={() => handleTest('红烧罗非鱼', '记得每早8点上班哦')}>消息通知</button>
    </>
  )
}

export default App
