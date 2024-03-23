import { ChangeEvent, useCallback, useState } from "react";
import ToolState from "../../../../../store/ToolState";
import { observer } from "mobx-react-lite";
import EraserSvg from "../../../../../assets/eraser.svg?react";
import CanvasState from "../../../../../store/CanvasState";
import ButtonWrapper from "./ButtonWrapper";
import { Eraser } from "../../../../../tools/Eraser";

const EraserBtn = observer(function () {
  const [range, setRange] = useState<number>(1);

  const lineWidthChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    ToolState.setLineWidth?.(Number(e.target.value));
    setRange(Number(e.target.value));
  }, []);


  const setEraser = useCallback(() => {
    CanvasState.socket && ToolState.setTool(new Eraser(CanvasState.canvas, CanvasState.socket));
  }, []);


  return (
    <ButtonWrapper Icon={<EraserSvg />} onClick={setEraser}>
        <span>{range}</span>
        <input type="range" value={range} max={100} min={1} onChange={lineWidthChange} />
    </ButtonWrapper>
  );
});

export default EraserBtn;
