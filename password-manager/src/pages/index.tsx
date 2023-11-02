import Image from 'next/image'
import { Inter } from 'next/font/google'
import C_Main from '@/components/home/main'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`bg-gradient-to-br from-blue-800 to-blue-400 ${inter.className}`}
    >
      <C_Main/>
      
    </main>
  )
}
