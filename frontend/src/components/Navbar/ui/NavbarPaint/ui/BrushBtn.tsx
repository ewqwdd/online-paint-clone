import { ChangeEvent, useCallback, useState } from "react";
import ToolState from "../../../../../store/ToolState";
import { observer } from "mobx-react-lite";
import BrushSvg from "../../../../../assets/brush.svg?react";
import CanvasState from "../../../../../store/CanvasState";
import { Brush } from "../../../../../tools/Brush";
import ButtonWrapper from "./ButtonWrapper";

const BrushBtn = observer(function () {
  const [range, setRange] = useState<number>(1);

  const lineWidthChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    ToolState.setLineWidth?.(Number(e.target.value));
    setRange(Number(e.target.value));
  }, []);

  const setBrush = useCallback(() => {
    CanvasState.socket &&
      CanvasState.canvas &&
      ToolState.setTool(new Brush(CanvasState.canvas, CanvasState.socket));
  }, []);

  return (
    <ButtonWrapper Icon={<BrushSvg />} onClick={setBrush}>
      <span>{range}</span>
      <input type="range" value={range} max={100} min={1} onChange={lineWidthChange} />
    </ButtonWrapper>
  );
});

export default BrushBtn;
