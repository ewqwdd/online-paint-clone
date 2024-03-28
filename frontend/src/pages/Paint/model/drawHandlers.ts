import CanvasState from "../../../store/CanvasState";
import { Brush } from "../../../tools/Brush";
import { Ellipse } from "../../../tools/Ellipse";
import { Eraser } from "../../../tools/Eraser";
import { Square } from "../../../tools/Square";
import { Draw } from "./types";

export const drawHandler = (msg: Draw, ctx: CanvasRenderingContext2D, addUndoList: () => void, redoClear: () => void) => {
    const figure = msg.figure;
    if (!ctx) return;
    switch (figure.type) {
      case "brush":
        ctx.save();
        if (msg.color) {
          ctx.strokeStyle = msg.color;
        }
        if (msg.lineWidth) {
          ctx.lineWidth = msg.lineWidth;
        }
        Brush.draw(ctx, figure.x, figure.y);
        ctx.restore();
        break;
      case "eraser":
          ctx.save();
          if (msg.lineWidth) {
            ctx.lineWidth = msg.lineWidth;
          }
          Eraser.draw(ctx, figure.x, figure.y);
          ctx.restore();
          break;
      case "finish":
        ctx.beginPath();
        addUndoList();
        redoClear();
        break;
      case "rect":
        ctx.save();
        if (msg.color) {
          ctx.fillStyle = msg.color;
        }
        Square.draw(ctx, figure.startX, figure.startY, figure.endX, figure.endY);
        ctx.restore();
        addUndoList();
        redoClear();
        break;
      case "ellipse":
        ctx.save();
        if (msg.color) {
          ctx.fillStyle = msg.color;
        }
        Ellipse.draw(ctx, figure.startX, figure.startY, figure.endX, figure.endY);
        ctx.restore();
        addUndoList();
        redoClear();
        break;
      case "undo":
        CanvasState.undo();
        break;
      case "redo":
        CanvasState.redo();
        break;
    }
  };