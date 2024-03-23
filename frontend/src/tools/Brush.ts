import { Message } from "../pages/Paint/model/types";
import { Tool } from "./Tool";

export class Brush extends Tool {
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
    mouseDownHandler() {
        this.pressed = true
        this.ctx?.beginPath()
    }
    mouseMoveHandler(e: MouseEvent) {
        if (this.pressed) {
            const ms: Message = {
                figure: {
                    type: 'brush',
                    x: e.pageX - this.canvas.offsetLeft,
                    y: e.pageY - this.canvas.offsetTop
                },
                method: 'draw',
                color: String(this.ctx?.fillStyle),
                lineWidth: this.ctx?.lineWidth
            }
            this.socket?.send(JSON.stringify(ms))
        }
    }
    static draw(ctx: CanvasRenderingContext2D, x: number, y: number) {
        ctx?.lineTo(x, y)
        ctx?.stroke()
    }
}