// prototype for fluid resizable font size
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import ResizeObserver from 'resize-observer-polyfill'

export const FluidFontSize = ({ base = 16, children, className }) => {
  const [fontSize, setFontSize] = useState(base)

  const mountedRef = useRef(true)
  useEffect(() => () => (mountedRef.current = false), [])

  const nodeRef = useRef(null)
  useLayoutEffect(() => {
    const node = nodeRef.current
    const observer = new ResizeObserver(entries => {
      entries.forEach(entry => {
        if (mountedRef.current && entry.target === node) {
          const ratio = entry.contentRect.width / 320
          setFontSize(Math.floor(ratio * base))
        }
      })
    })

    observer.observe(node)
    return () => observer.unobserve(node)
  }, [base])

  return (
    <div ref={nodeRef} className={className} style={{ fontSize }}>
      {children}
    </div>
  )
}

export default FluidFontSize
