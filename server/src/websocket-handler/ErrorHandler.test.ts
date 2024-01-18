import { ErrorHandler } from './ErrorHandler';
import { UserManager } from '../user/UserManager';
import { expect, jest, test } from '@jest/globals';
import type ws from 'ws';

describe('ErrorHandler', () => {
    let mockedWs: jest.MockedObject<ws>;
    let userManager: UserManager;
    let closeHandler: ErrorHandler;

    beforeEach(() => {
        userManager = new UserManager();
        closeHandler = new ErrorHandler(userManager);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('handleClose should delete user', () => {
        // Arrange
        userManager.addUser(mockedWs, 'testUser');

        // Act
        closeHandler.handleError(mockedWs, new Error('error'));

        // Assert
        expect(userManager.getUser(mockedWs)).toBeUndefined();
    });
});