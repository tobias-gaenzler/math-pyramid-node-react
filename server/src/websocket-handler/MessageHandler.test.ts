import { UserManager } from '../user/UserManager';
import type ws from 'ws';
import { MessageHandler } from './MessageHandler';
import expressWs = require('express-ws')
import express from 'express';

// TODO: refactor test to mock user manager and web socket server. Add test for start message.

describe('MessageHandler', () => {

    let wsMock: jest.MockedObject<ws>;
    let userManager: UserManager;
    let messageHandler: MessageHandler;

    beforeEach(() => {
        userManager = new UserManager();
        userManager.addUser(wsMock, '1');
        messageHandler = new MessageHandler(userManager, expressWs(express()));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('handleMessage should set username on action username', () => {
        // Arrange
        const setUserNameSpy = jest.spyOn(userManager, 'setUserName');
        const rawMessage = { data: JSON.stringify({ action: 'username', sender: 'John' }), type: 'type', target: wsMock };

        // Act
        messageHandler.handleMessage(wsMock, rawMessage);

        // Assert
        expect(setUserNameSpy).toHaveBeenCalledWith(wsMock, 'John');
    });

    test('handleMessage should throw error for unknown action', () => {
        // Arrange
        const rawMessage = { data: JSON.stringify({ action: 'unknown', sender: 'John' }), type: 'type', target: wsMock };

        // Act & Assert
        expect(() => messageHandler.handleMessage(wsMock, rawMessage)).toThrow('Received unknown event: unknown');
    });
});
