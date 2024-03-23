import { makeAutoObservable } from "mobx";

export class NotificationState {
    notifications: {index: number, value: string}[] = []
    
    constructor() {
        makeAutoObservable(this)
    }

    add(str: string) {
        let index
        if (this.notifications.length > 0) {
            index = this.notifications[this.notifications.length - 1].index + 1
        } else {
            index = 0
        }
    this.notifications.push({
        value: str,
        index
    })   
    }

    remove(ind: number) {
        this.notifications.splice(this.notifications.findIndex(elem => elem.index === ind), 1)
    }
    
}

export default new NotificationState()