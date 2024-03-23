import { RouteProps } from "react-router";
import Home from "../../../pages/Home";
import Paint from "../../../pages/Paint";

export const routes: RouteProps[] = [
    {
        element: <Home />,
        path: '/'
    },
    {
        element: <Paint />,
        path: '/paint'
    }
]