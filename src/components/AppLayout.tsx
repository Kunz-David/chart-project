import React from 'react'
import {IconReportAnalytics} from "@tabler/icons-react"
import {ErrorBoundary} from "react-error-boundary"
import {WindowErrorFallback} from "./WindowErrorFallback.tsx"

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
      <h1 className="text-lg sm:text-2xl font-semibold sm:ml-16 sm:mt-4 sm:mb-2">
        <IconReportAnalytics size={36} className="inline-block mr-2 pb-0.5"/> Progress Checker
      </h1>
    </header>
  )
}

function DefaultFooter() {
  return (
    <footer className="flex flex-col items-center justify-center bg-gray-800 text-white pb-1 pt-2">
      <div className="flex flex-col items-center mb-1 text-sm">
        <img className="h-6" src="/vite.svg" alt="Logo"/>
        <div>© {new Date().getFullYear()}, David Kunz</div>
      </div>
      <div className="text-xs text-center italic text-gray-500">This website was built as a test project for an
        interview.
      </div>
    </footer>
  )
}

export function AppLayout({children, Header = DefaultHeader, Footer = DefaultFooter}: AppLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen w-full min-w-fit">
      <Header/>
      <ErrorBoundary FallbackComponent={WindowErrorFallback}>
        <main className="flex-grow bg-[url('/beams.jpg')] bg-repeat h-full p-3 sm:p-5">
          {children}
        </main>
      </ErrorBoundary>
      <Footer/>
    </div>
  )
}
