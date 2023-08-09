
export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        <div className="bg-[url('/background3.jpg')] bg-no-repeat  h-screen w-full ">
          {children}
        </div>
    )
  }
  
  