import { useCallback, useEffect, useRef, useState } from "react";
import Canvas from "../../../components/Canvas/Canvas";
import { Circle } from "../../../components/Canvas/model/Circle";
import { classnames } from "../../../lib/utils/classnames";
import styles from "./Home.module.scss";

interface Dimmension {
  height: number
  width: number
}


const createCircles = (num: number, side?: boolean) => {
  const circles = []
  for (let i = 0; i<num; ++i) {
    circles.push(new Circle("#646cff", window.innerWidth, window.innerHeight, Math.random() * 0.01, side))
  }
  return circles
}

export default function Home() {
  const [circles, setCircles] = useState<Circle[]>(createCircles(15));
  const [circlesBlurred, setCirclesBlurred] = useState<Circle[]>(createCircles(18));

  const sectionRef = useRef<HTMLDivElement>(null)
  const [dimmensions, setDimmensions] = useState<Dimmension>({
    width: sectionRef.current?.offsetWidth || window.innerWidth,
    height: sectionRef.current?.offsetHeight || window.innerHeight,
  })
  useEffect(() => {
    const onResize = () => {
      setCircles(createCircles(15));
      setCirclesBlurred(createCircles(18));
      setDimmensions({
        width: sectionRef.current?.offsetWidth || window.innerWidth,
        height: sectionRef.current?.offsetHeight || window.innerHeight,
      })
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const draw = useCallback( (circles: Circle[]) => 
    (ctx: CanvasRenderingContext2D) => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      circles.forEach((elem) => elem.draw(ctx));
    },
    []
  );

  return (
    <section className={styles.homeSection} ref={sectionRef}>
      <Canvas draw={draw(circles)} className={styles.canvas} {...dimmensions}/>
      <Canvas draw={draw(circlesBlurred)} className={styles.canvasBlurred} {...dimmensions}/>
      <h1 className={classnames(styles.heading, {}, ["kanit-bold"])}>Paint Online</h1>
      <a href="paint">
        <button>
          Paint Now!
        </button>
      </a>
    </section>
  );
}
