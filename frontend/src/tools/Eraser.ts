import { Message } from "../pages/Paint/model/types";
import { Tool } from "./Tool";

export class Eraser extends Tool {
    pressed: boolean = false
    constructor(canvas: HTMLCanvasElement, socket: WebSocket) {
        super(canvas, socket)
        this.listen()
    }
    listen() {
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        window.onmouseup = this.mouseUpHandler.bind(this)
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
    }
    mouseUpHandler() {
        this.pressed = false
        const ms: Message = {
            figure: {
                type: 'finish'
            },
            method: 'draw',
        }
        this.socket?.send(JSON.stringify(ms))
    }
    mouseDownHandler(e: MouseEvent) {
        this.pressed = true
        this.ctx?.beginPath()
        this.ctx?.moveTo(e.pageX - this.canvas.offsetLeft, e.pageY - this.canvas.offsetTop)
    }
    mouseMoveHandler(e: MouseEvent) {
        if (this.pressed) {
            const ms: Message = {
                figure: {
                    type: 'eraser',
                    x: e.pageX - this.canvas.offsetLeft,
                    y: e.pageY - this.canvas.offsetTop
                },
                method: 'draw',
                lineWidth: this.ctx?.lineWidth
            }
            this.socket?.send(JSON.stringify(ms))
        }
    }
    static draw(ctx: CanvasRenderingContext2D, x: number, y: number) {
        ctx.save()
        if (ctx) {
            ctx.globalCompositeOperation = 'destination-out';
        }
        ctx.lineTo(x, y)
        ctx.stroke()
        ctx.restore()
    }
}