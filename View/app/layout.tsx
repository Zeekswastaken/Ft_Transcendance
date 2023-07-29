import './globals.css'
import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'



export const metadata: Metadata = {
  title: 'transcendence',
  description: 'PingPong web game',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let checkAuth ="true";
  return (
    <html lang="en">
      <body className=" bg-[url('/30.png')] bg-cover bg-center bg-no-repeat flex justify-center ">
        {checkAuth === "true" ? <Navbar /> : "" }
        {children}
        {/* <Footer /> */}
      </body>
    </html>
  )
}


