import React, {useEffect, useRef, useState} from "react"

interface Dimensions {
  width: number;
  height: number;
}

interface ResponsiveWrapperProps {
  children: (dimensions: Dimensions) => React.ReactNode;
}

export function ResponsiveWrapper({ children }: ResponsiveWrapperProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [dimensions, setDimensions] = useState<Dimensions>({ width: 0, height: 0 })

  useEffect(() => {
    const observeTarget = ref.current

    if (observeTarget) {
      const resizeObserver = new ResizeObserver(entries => {
        entries.forEach(entry => {
          setDimensions({
            width: entry.contentRect.width,
            height: entry.contentRect.height,
          })
        })
      })

      resizeObserver.observe(observeTarget)

      return () => {
        if (observeTarget) {
          resizeObserver.unobserve(observeTarget)
        }
      }
    }
  }, [])

  return (
    <div ref={ref} className="w-full h-full relative">
      {children(dimensions)}
    </div>
  )
}