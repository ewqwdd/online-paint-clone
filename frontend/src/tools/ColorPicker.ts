import { Tool } from "./Tool";

export class ColorPicker extends Tool {
    constructor(canvas: HTMLCanvasElement, socket: WebSocket) {
        super(canvas, socket)
    }
    pickColor(color: string) {
        if (this.ctx) {
            this.ctx.fillStyle = color
        }
    }
}