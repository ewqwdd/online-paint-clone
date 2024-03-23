import { Message } from "../pages/Paint/model/types";
import { Tool } from "./Tool";

export class Square extends Tool {
  startX?: number;
  startY?: number;
  endX?: number;
  endY?: number;
  saved?: HTMLImageElement;

  constructor(canvas: HTMLCanvasElement, socket: WebSocket) {
    super(canvas, socket);
    this.listen();
  }
  listen() {
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    window.onmouseup = this.mouseUpHandler.bind(this);
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
  }
  mouseUpHandler() {
    if (this.startX && this.startY && this.endX && this.endY) {
      const ms: Message = {
        method: "draw",
        figure: {
          endX: this.endX,
          startX: this.startX,
          endY: this.endY,
          startY: this.startY,
          type: "rect",
        },
        color: this.ctx?.fillStyle.toString()
      };
      this.socket?.send(JSON.stringify(ms));
      this.endX = undefined;
      this.startX = undefined;
      this.endY = undefined;
      this.startY = undefined;
    }
  }
  mouseDownHandler(e: MouseEvent) {
    const saved = this.canvas.toDataURL();
    this.saved = new Image();
    this.saved.src = saved;
    this.startX = e.pageX - this.canvas.offsetLeft;
    this.startY = e.pageY - this.canvas.offsetTop;
  }
  mouseMoveHandler(e: MouseEvent) {
    if (this.startX && this.startY) {
      this.clear(0, 0, this.canvas.width, this.canvas.height);
      this.saved && this.ctx?.drawImage(this.saved, 0, 0, this.canvas.width, this.canvas.height);
      this.endX = e.pageX - this.canvas.offsetLeft;
      this.endY = e.pageY - this.canvas.offsetTop;
      Square.draw(this.ctx!, this.startX, this.startY, this.endX, this.endY);
    }
  }
  static draw(ctx: CanvasRenderingContext2D, x: number, y: number, endX: number, endY: number) {
    ctx?.fillRect(Math.min(x, endX), Math.min(y, endY), Math.abs(x - endX), Math.abs(y - endY));
  }
  clear(x: number, y: number, endX?: number, endY?: number) {
    if (!endX || !endY) return;
    this.ctx?.clearRect(Math.min(x, endX), Math.min(y, endY), Math.abs(x - endX), Math.abs(y - endY));
  }
}
