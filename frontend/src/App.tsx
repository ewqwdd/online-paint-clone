import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Navbar from "./components/Navbar/ui/Navbar";
import { routes } from "./components/Router/config/config";
import NotificationsList from "./components/Notification/ui/NotificationsList";

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        {routes.map((elem, index) => <Route key={index} {...elem}/>)}
      </Routes>
      <NotificationsList />
    </>
  );
}

export default App;
