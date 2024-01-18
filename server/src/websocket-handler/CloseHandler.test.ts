import { CloseHandler } from './CloseHandler';
import { UserManager } from '../user/UserManager';
import { expect, jest, test } from '@jest/globals';
import type ws from 'ws';


describe('CloseHandler', () => {
    let mockedWs: jest.MockedObject<ws>;
    let userManager: UserManager;
    let closeHandler: CloseHandler;

    beforeEach(() => {
        userManager = new UserManager();
        closeHandler = new CloseHandler(userManager);
    });

    test('handleClose should delete user', () => {
        // Arrange
        userManager.addUser(mockedWs, 'testUser');

        // Act
        closeHandler.handleClose(mockedWs, 1000);

        // Assert
        expect(userManager.getUser(mockedWs)).toBeUndefined();
    });
});