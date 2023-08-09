
export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        <div className=" bg-[url('/neon-background2.jpeg')] bg-cover bg-center bg-no-repeat h-full w-full ">
          {children}
        </div>
    )
  }
  
  