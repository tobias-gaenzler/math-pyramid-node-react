import { UserManager } from '../user/UserManager';
import ws from 'ws';


export class ErrorHandler {
    private userManager: UserManager;
    constructor(userManager: UserManager) {
        this.userManager = userManager;
    }

    handleError(ws: ws, error: Error): void {
        const user = this.userManager.getUser(ws);
        console.error(`Deleting user ${user?.toString()} on error ${error}`);
        this.userManager.deleteUser(ws);
    }
}