import { Link, LinkProps, RouteProps } from "react-router-dom";
import NavbarPaint from "../ui/NavbarPaint";

export const navButtons: LinkProps[] = [
  {
    children: "Paint",
    to: "/paint",
  },
];

export const routes: RouteProps[] = [
  {
    element: (
      <>
        {navButtons.map((elem, index) => (
          <button key={index}>
            <Link {...elem}>{elem.children}</Link>
          </button>
        ))}
      </>
    ),
    path: "/",
  },
  {
    element: <NavbarPaint />,
    path: "/paint",
  },
];
