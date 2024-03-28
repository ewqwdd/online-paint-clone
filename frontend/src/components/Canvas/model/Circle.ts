function random() {
    return Math.random() < 0.5
  }
  

export class Circle {
    x: number
    y: number
    w: number
    h: number
    color: string
    angle: number
    speed: number
    radius: number

    constructor(color: string, w: number, h: number, speed: number, side?: boolean) {
        if (side) {
            this.x = Math.random() * w * 0.35 + (random() ? w * 0.65 : 0)
        }
        else {
            this.x = Math.random() * w
        }
        this.w = w
        this.h = h
        this.y = Math.random() * h
        this.radius = h / 4
        this.color = color
        this.angle = Math.random() * 2 * Math.PI
        this.speed = speed
    }

    draw(ctx: CanvasRenderingContext2D) {
        this.speed+=0.45
        this.x+=this.speed * Math.sin(this.angle);
        this.y+=this.speed * Math.cos(this.angle);
        if ((this.x <= 0 || this.x >= this.w) || (this.y >= this.h || this.y <= 0)) {
            this.speed = 5
            this.angle += Math.PI

            if (this.x <= 0) {
                this.x = 1
            }
            else if (this.x >= this.w) {
                this.x = this.w - 1
            }
            if (this.y <= 0) {
                this.y = 1
            }
            else if (this.y >= this.h) {
                this.y = this.h - 1
            }
        }
        ctx.fillStyle = this.color
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
        ctx.fill()
    }
}