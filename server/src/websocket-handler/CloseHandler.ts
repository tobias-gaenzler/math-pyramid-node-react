import { UserManager } from "../user/UserManager"
import ws from "ws"


export class CloseHandler {
    private userManager: UserManager
    constructor(userManager: UserManager) {
        this.userManager = userManager
    }


    handleClose(ws: ws, code: number): void {
        console.log(`User ${this.userManager.getUser(ws)?.toString()} is leaving the game with code: ${code}`)
        this.userManager.deleteUser(ws)
    }
}