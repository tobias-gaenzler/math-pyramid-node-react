import { ErrorHandler } from './ErrorHandler';
import { UserManager } from '../user/UserManager';
import { expect, jest, test } from '@jest/globals';
import type ws from 'ws';

jest.mock('ws');
let mockedWs: jest.MockedObject<ws>;

describe('ErrorHandler', () => {
    let userManager: UserManager;
    let closeHandler: ErrorHandler;

    beforeEach(() => {
        userManager = new UserManager();
        closeHandler = new ErrorHandler(userManager);
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