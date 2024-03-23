import { createPortal } from "react-dom";
import styles from "./Notifications.module.scss";
import NotificationState from "../../../store/NotificationState";
import { observer } from "mobx-react-lite";
import Notification from "./Notification";

const NotificationsList = observer(function () {
  return createPortal(
    <div className={styles.notificationsList}>
      {NotificationState.notifications.map(({index, value}) => {
        return (
        <Notification content={value} key={index} index={Number(index)} />
      )})}
    </div>,
    document.getElementById("root")!
  );
});

export default NotificationsList;
