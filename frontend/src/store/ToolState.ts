import { makeAutoObservable } from "mobx";
import { Tool } from "../tools/Tool";

export class ToolState {
    tool: Tool | null = null
    
    constructor() {
        makeAutoObservable(this)
    }

    setTool(tool: Tool) {
        this.tool = tool
    }

    setColors(color: string) {
        this.tool?.setColor(color)
        this.tool?.setStroke(color)
    }

    setLineWidth(width: number) {
        this.tool?.setWidth(width)
    }
}

export default new ToolState()