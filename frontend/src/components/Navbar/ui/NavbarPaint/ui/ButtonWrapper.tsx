import { ReactNode, useCallback, useEffect, useState } from "react";
import styles from "./Navbar.module.scss";
import { observer } from "mobx-react-lite";
import { useDebounce } from "../../../../../lib/utils/hooks/useDebounce";
import { classnames } from "../../../../../lib/utils/classnames";

interface ButtonWrapperProps {
    Icon: ReactNode
    onClick: () => void
    children: ReactNode
}

const ButtonWrapper = observer(function ({Icon, onClick, children}: ButtonWrapperProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [isClosing, setIsClosing] = useState<boolean>(false);
  const [fn, timer] = useDebounce(() => {
    setIsClosing(true)
  }, 600);

  useEffect(() => {
    const tm = setTimeout(() => {
        if (!isClosing) return
        setOpen(false)
    }, 300)
    return () => {
        clearTimeout(tm)
    }
  }, [isClosing])

  const mouseEnter = useCallback(() => {
    if(timer.current) {
        clearTimeout(timer.current)
    }
    setIsClosing(false)
    setOpen(true)
  }, [timer])

  return (
    <div className={styles.btn_wrapper} onMouseLeave={fn} onMouseEnter={mouseEnter}>
      <button className={styles.button} onClick={onClick}>
        {Icon}
      </button>
      {open ? <div className={classnames(styles.extraoptions, {[styles.closing]: isClosing})}>
       {children}
      </div> : null}
    </div>
  );
});

export default ButtonWrapper;
