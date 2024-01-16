import { User } from './User';
import ws from 'ws';


export class UserManager {
    private socketToUsers: Map<ws, User>;
    constructor() {
        this.socketToUsers = new Map<ws, User>();
    }
    getUser(ws: ws): User | undefined {
        return this.socketToUsers.get(ws);
    }
    addUser(ws: ws, id: string): void {
        this.socketToUsers.set(ws, new User(id, ''));
    }
    setUserName(ws: ws, userName: string) {
        const user = this.getUser(ws);
        if (user) {
            user.name = userName;
        } else {
            throw new Error(`Can not find user ${userName}, client: ${JSON.stringify(ws)}`);
        }
    }
    deleteUser(ws: ws) {
        this.socketToUsers.delete(ws);
    }
}