import Undo from "../../../../../assets/undo.svg?react";
import Save from "../../../../../assets/save.svg?react";
import styles from "./Navbar.module.scss";
import { observer } from "mobx-react-lite";
import { ChangeEvent, useCallback, useEffect } from "react";
import ToolState from "../../../../../store/ToolState";
import CanvasState from "../../../../../store/CanvasState";
import { Square } from "../../../../../tools/Square";
import { Message } from "../../../../../pages/Paint/model/types";
import BrushBtn from "./BrushBtn";
import EraserBtn from "./EraserBtn";
import { Ellipse } from "../../../../../tools/Ellipse";

const NavbarPaint = observer(function () {

  const colorChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      ToolState.setColors?.(e.target.value);
    },
    []
  );

  const setSquare = useCallback(() => {
    CanvasState.socket && ToolState.setTool(new Square(CanvasState.canvas, CanvasState.socket));
  }, []);

  const setEllipse = useCallback(() => {
    CanvasState.socket && ToolState.setTool(new Ellipse(CanvasState.canvas, CanvasState.socket));
  }, []);

  const undo = useCallback(() => {
    const ms: Message = {
      figure: {
        type: "undo",
      },
      method: "draw",
    };
    CanvasState.socket?.send(JSON.stringify(ms));
  }, []);

  const redo = useCallback(() => {
    const ms: Message = {
      figure: {
        type: "redo",
      },
      method: "draw",
    };
    CanvasState.socket?.send(JSON.stringify(ms));
  }, []);
  
  const save = useCallback(() => {
      const link = document.createElement('a');
      link.download = 'canvas.png';
      link.href = CanvasState.canvas.toDataURL()
      link.click();
  }, [])

  useEffect(() => {
    const keydown = (e: KeyboardEvent) => {
      if (e.key === 'z' && e.ctrlKey) {
        undo()
      } else if (e.key === 'Z' && e.shiftKey) {
        redo()
      }
    }
    window.addEventListener('keydown', keydown)
    return () => {
      window.removeEventListener('keydown', keydown)
    }
  }, [undo, redo])

  return (
    <>
      <BrushBtn />
      <input type="color" className={styles.color} onChange={colorChange} />
      <EraserBtn />

      <button className={styles.button} onClick={setSquare}>
        <div className={styles.square} />
      </button>
      <button className={styles.button} onClick={setEllipse}>
        <div className={styles.circle} />
      </button>
      <button
        className={styles.button}
        onClick={undo}
        style={{
          marginLeft: "auto",
        }}
      >
        <Undo />
      </button>
      <button className={styles.button} onClick={redo}>
        <Undo
          style={{
            transform: "scaleX(-1)",
          }}
        />
      </button>
      <button className={styles.button} onClick={save}>
        <Save />
      </button>
    </>
  );
})

export default NavbarPaint;
