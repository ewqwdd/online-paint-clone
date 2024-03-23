import { Route, Routes } from "react-router-dom";
import { routes } from "../config";
import styles from "./Navbar.module.scss";

export default function Navbar() {
  
  return (
    <nav className={styles.nav}>
      <Routes>
        {routes.map((elem, index) => <Route key={index} {...elem} />)}
      </Routes>
    </nav>
  );
}
