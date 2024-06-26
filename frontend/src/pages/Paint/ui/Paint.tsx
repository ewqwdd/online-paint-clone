import { useCallback, useEffect, useRef } from "react";
import styles from "./Paint.module.scss";
import { observer } from "mobx-react-lite";
import CanvasState from "../../../store/CanvasState";
import ToolState from "../../../store/ToolState";
import { Brush } from "../../../tools/Brush";
import Modal from "react-modal";
import { Message } from "../model/types";
import NotificationState from "../../../store/NotificationState";
import axios from "axios";
import { useThrothling } from "../../../lib/utils/hooks/useThrothling";
import { drawHandler } from "../model/drawHandlers";

const Paint = observer(function () {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const postImage = useThrothling(() => {
    axios.post(import.meta.env.VITE_REST + 'image', {
      img: canvasRef.current?.toDataURL()
    })
  }, 2000)

  const addUndoList = useCallback(() => {
    if (!CanvasState.canvas) return
    CanvasState.undoPush(CanvasState.canvas.toDataURL());
  }, []);

  const redoClear = useCallback(() => {
    CanvasState.redoClear();
  }, []);

  const submit = useCallback(() => {
    const val = inputRef.current?.value.toString();
    if (Number(val?.length) > 4) {
      CanvasState.setUsername(val!);
      inputRef.current!.value = ''
    } else {
      alert("Username has to be at least 5 characters long");
    }
  }, []);

  useEffect(() => {
    CanvasState.setCanvas(canvasRef.current!);
    CanvasState.setSize(wrapperRef.current!.offsetWidth * 0.95, wrapperRef.current!.offsetHeight * 0.95);
    axios.get<string>(import.meta.env.VITE_REST + "image").then((val) => {
      if (!CanvasState.canvas) return
      const img = new Image();
      img.src = val.data;
      CanvasState.canvas.getContext('2d')?.drawImage(img, 0, 0, CanvasState.canvas.width, CanvasState.canvas.height);
    });
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        submit()
        window.removeEventListener('keydown', handler)
      }
    }
    window.addEventListener('keydown', handler)

    return () => {
      window.removeEventListener('keydown', handler)
    }
  }, [submit])

  useEffect(() => {
    if (!CanvasState.canvas) return
    if (CanvasState.username) {
      const socket = new WebSocket(import.meta.env.VITE_API);
      const ms: Message = {
        method: "connection",
        username: CanvasState.username,
      };
      socket.onopen = () => {
        socket.send(JSON.stringify(ms));
        CanvasState.setSocket(socket);
      };
      socket.onmessage = (e) => {
        const parsed = JSON.parse(e.data);
        if (parsed.type === "connection") {
          parsed.username && NotificationState.add(`${parsed.username} has just connected!`);
        } else {
          const ctx = canvasRef.current?.getContext('2d')
          ctx && drawHandler(parsed, ctx, addUndoList, redoClear);
        }
        postImage()
      };
      ToolState.setTool(new Brush(CanvasState.canvas, socket));
    }
  }, [CanvasState.username]);

  

  return (
    <>
      <Modal
        isOpen={!CanvasState.username || !CanvasState.socket}
        className={styles.modal}
        style={{
          overlay: {
            background: "rgba(0, 0, 0, 0.4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        }}
      >
        <h2>Enter Your Username:</h2>
        <input placeholder="Username" ref={inputRef} />
        <button onClick={submit}>Join!</button>
      </Modal>
      <div ref={wrapperRef} className={styles.canvasWrapper}>
        <canvas ref={canvasRef}></canvas>
      </div>
    </>
  );
});

export default Paint;
