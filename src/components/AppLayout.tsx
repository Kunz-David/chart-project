import React from 'react'

interface ComponentProps {
  children?: React.ReactNode;
}

interface AppLayoutProps {
  children: React.ReactNode;
  Header?: React.ComponentType<ComponentProps>;
  Footer?: React.ComponentType<ComponentProps>;
}

function DefaultHeader() {
  return (
    <header className="bg-malibu-400 text-gray-800 p-4 shadow-lg">
      <h1 className="text-lg sm:text-2xl font-semibold sm:ml-16 sm:mt-4 sm:mb-2">Progress Checker</h1>
    </header>
  )
}

function DefaultFooter() {
  return (
    <footer className="flex flex-col items-center justify-center bg-gray-800 text-white pb-1 pt-2">
      <div className="flex flex-col items-center mb-1 text-sm">
        <img className="h-6" src='/vite.svg' alt="Logo" />
        <div>© {new Date().getFullYear()}, David Kunz</div>
      </div>
      <div className="text-xs text-center italic text-gray-500">This website was built as a test project for an interview.</div>
    </footer>
  )
}

export function AppLayout({ children, Header = DefaultHeader, Footer = DefaultFooter }: AppLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-[url('/public/beams.jpg')]">{children}</main>
      <Footer />
    </div>
  )
}
