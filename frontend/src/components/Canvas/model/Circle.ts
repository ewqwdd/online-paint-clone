function random() {
    return Math.random() < 0.5
  }
  

export class Circle {
    x: number
    y: number
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
        this.y = Math.random() * h
        this.radius = h / 4
        this.color = color
        this.angle = Math.random() * 2 * Math.PI
        this.speed = speed
    }

    draw(ctx: CanvasRenderingContext2D) {
        this.angle += this.speed
        this.x+=this.speed * Math.sin(this.angle) * this.radius * 1.5;
        this.y+=this.speed * Math.cos(this.angle) * this.radius * 1.5;

        ctx.fillStyle = this.color
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
        ctx.fill()
    }
}