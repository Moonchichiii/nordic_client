import { ReactNode } from 'react'
import Footer from '@components/Footer'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="site-container bg-slate-900 min-h-screen">
      {children}
      <Footer />
    </div>
  )
}

export default Layout