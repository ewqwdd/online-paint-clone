export class Tool {
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D | null
    socket?: WebSocket
    
    constructor(canvas: HTMLCanvasElement, socket: WebSocket) {
        this.canvas = canvas
        this.socket = socket
        this.ctx = canvas.getContext('2d')
        this.clearEvents()
    }

    clearEvents() {
        this.canvas.onmousemove = null
        this.canvas.onmouseup = null
        this.canvas.onmousedown = null
    }
    
    setColor(color: string) {
        if(this.ctx){
            this.ctx.fillStyle = color
        }
    }
    setStroke(color: string) {
        if(this.ctx){
            this.ctx.strokeStyle = color
        }
    }
    setWidth(width: number) {
        if (this.ctx) {
            this.ctx.beginPath()
            this.ctx.lineWidth = width
        }
    }
}