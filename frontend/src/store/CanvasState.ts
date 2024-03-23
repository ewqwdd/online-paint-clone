import { makeAutoObservable } from "mobx";

export class CanvasState {
    canvas: HTMLCanvasElement
    undoList: string[] = []
    redoList: string[] = []
    username?: string
    socket?: WebSocket

    constructor() {
        makeAutoObservable(this)
    }

    setCanvas(canvas: HTMLCanvasElement) {
        this.canvas = canvas
    }

    setSocket(socket: WebSocket) {
        this.socket = socket
    }
    
    setSize(width: number, height: number) {
        if (this.canvas) {
            this.canvas.width = width
            this.canvas.height = height
        }
    }

    setUsername(username: string) {
        this.username = username
    }

    undoPush(s: string) {
        this.undoList.push(s)
    }

    redoPush(s: string) {
        this.redoList.push(s)
    }

    redoClear() {
        this.redoList = []
    }

    undo() {
        const ctx = this.canvas.getContext('2d')
        const prev = this.undoList.pop()!

        if (prev) {
            this.redoList.push(prev)
        }
        if (this.undoList.length > 0) {
            const dataUrl = this.undoList[this.undoList.length - 1]
            const image = new Image()
            image.src = dataUrl
            image.onload = () => {
                ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height)
                ctx?.drawImage(image, 0, 0, this.canvas.width, this.canvas.height)
            }
        } else {
            ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height)
        }
    }

    redo() {
        const ctx = this.canvas.getContext('2d')
        if (this.redoList.length > 0) {
            const prev = this.redoList.pop()!
            this.undoList.push(prev)
            const image = new Image()
            image.src = prev
            image.onload = () => {
                ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height)
                ctx?.drawImage(image, 0, 0, this.canvas.width, this.canvas.height)
            }
        }
    }
}

export default new CanvasState()