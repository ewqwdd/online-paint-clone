export interface Connection {
  username: string;
  method: "connection";
}

export interface Draw {
  method: "draw";
  figure: Figure;
  color?: string
  lineWidth?: number
}

interface Brush {
  type: "brush";
  x: number;
  y: number;
}
interface Eraser {
  type: "eraser";
  x: number;
  y: number;
}
interface Finish {
  type: "finish";
}
interface Rect {
  type: "rect";
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

interface Ellipse {
  type: "ellipse";
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

interface Undo {
  type: "undo";  
}

interface Redo {
  type: "redo";  
}

type Figure = Brush | Finish | Rect | Undo | Ellipse | Redo | Eraser;

export type Message = Connection | Draw;
