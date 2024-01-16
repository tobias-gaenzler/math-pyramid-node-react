import { UserManager } from '../user/UserManager';
import ws from 'ws';

export class CloseHandler {
    private userManager: UserManager;

    constructor(userManager: UserManager) {
        this.userManager = userManager;
    }

    handleClose(webSocket: ws, exitCode: number): void {
        const user = this.userManager.getUser(webSocket);
        console.log(`User ${user?.toString()} is leaving the game with code: ${exitCode}`);
        this.userManager.deleteUser(webSocket);
    }
}
