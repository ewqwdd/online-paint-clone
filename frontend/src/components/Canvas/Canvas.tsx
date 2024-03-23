import { HTMLAttributes, useEffect, useRef } from "react"

interface CanvasProps extends HTMLAttributes<HTMLCanvasElement> {
    draw?: (ctx: CanvasRenderingContext2D, index: number) => void
}

export default function Canvas({draw, ...props}: CanvasProps) {
  
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const ctx = canvasRef.current?.getContext('2d')
        let frameCount = 0
        let animationFrame: number

        const render = () => {
            frameCount++
            if (!ctx) return
            draw?.(ctx, frameCount)
            animationFrame = window.requestAnimationFrame(render)
        }
        render()
        return () => {
            window.cancelAnimationFrame(animationFrame)
          }
    }, [draw])

    return (
    <canvas ref={canvasRef} {...props}></canvas>
  )
}
