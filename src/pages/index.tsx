import { Canvas } from '@/components/canvas'
import { Chat } from '@/components/chat'

export default function Home() {
  return (
    <>
      <div className='bg-slate-400 h-screen w-screen'>
        <div className='flex h-full p-4 gap-4'>
          <div className='flex-1 rounded bg-slate-100 shadow p-4'>
            <Canvas></Canvas>
          </div>
          <div className='flex-none w-80 rounded bg-slate-100 shadow'>
            <Chat></Chat>
          </div>
        </div>
      </div>
    </>
  )
}
