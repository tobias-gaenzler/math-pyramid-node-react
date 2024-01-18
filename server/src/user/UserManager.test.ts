import { UserManager } from './UserManager';
import ws from 'ws';

describe('UserManager', () => {
    let userManager: UserManager;
    let mockWs: ws;

    beforeEach(() => {
        userManager = new UserManager();
        mockWs = {} as ws; // Create a mock WebSocket object for testing
    });

    test('getUser should return correct user data', () => {
        const id = '1';
        userManager.addUser(mockWs, id);

        const result = userManager.getUser(mockWs);

        expect(result?.id).toBe(id);
    });

    test('getUser should return undefined if user does not exist', () => {
        const result = userManager.getUser(mockWs);

        expect(result).toBeUndefined();
    });

    test('addUser should add a new user', () => {
        userManager.addUser(mockWs, '1');

        const user = userManager.getUser(mockWs);

        expect(user?.id).toBe('1');
    });

    test('setUserName should update the user name', () => {
        const id = '1';
        userManager.addUser(mockWs, id);

        userManager.setUserName(mockWs, 'Jane Doe');

        expect(userManager.getUser(mockWs)?.name).toBe('Jane Doe');
    });

    test('setUserName should throw an error if user does not exist', () => {
        expect(() => {
            userManager.setUserName(mockWs, 'John Doe');
        }).toThrow('Can not find user John Doe');
    });

    test('deleteUser should remove the user from the map', () => {
        userManager.addUser(mockWs, '1');

        userManager.deleteUser(mockWs);

        const user = userManager.getUser(mockWs);
        expect(user).toBeUndefined();
    });
});
