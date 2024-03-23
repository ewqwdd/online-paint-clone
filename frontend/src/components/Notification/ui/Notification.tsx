import { useEffect } from "react"
import NotificationState from "../../../store/NotificationState"

interface NotificationProps {
    index: number
    content: string
}

export default function Notification({content, index}: NotificationProps) {
    useEffect(() => {
        const timeout = setTimeout(() => {
            NotificationState.remove(index)
        }, 1500)

        return () => {
            clearTimeout(timeout)
        }
    }, [index])
  return (
    <div>{content}</div>
  )
}
