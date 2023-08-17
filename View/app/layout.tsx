import './globals.css'
import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import { Providers } from "@/redux/provider";
import { useRouter } from 'next/navigation';

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
  // const router = useRouter()
  let checkAuth ="true";
  return (
    <html lang="en">
      <body className=" bg-[url('/neon-background2.jpeg')] bg-cover bg-center bg-no-repeat flex justify-center ">
        {checkAuth === "true" ? <Navbar /> : "" }
        <Providers>
          {children}
        </Providers>
        {/* <Footer /> */}
      </body>
    </html>
  )
}


