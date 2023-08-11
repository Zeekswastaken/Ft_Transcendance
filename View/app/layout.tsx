import './globals.css'
import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import { Providers } from "@/redux/provider";

// interface avatar{setAvatar: string;}

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
      <body className=" bg-[url('/30.png')] bg-cover h-screen bg-center bg-no-repeat flex justify-center ">
        {checkAuth === "true" ? <Navbar /> : "" }
        <Providers>
          {children}
        </Providers>
        {/* <Footer /> */}
      </body>
    </html>
  )
}


