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
<<<<<<< HEAD
  let checkAuth ="f";
=======
  // const router = useRouter()
  let checkAuth ="true";
>>>>>>> fb7da711b484e74446c6154c227f4452a1a97219
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


