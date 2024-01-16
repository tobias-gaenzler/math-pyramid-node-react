import { User } from './User';

describe('User', () => {
    let user: User;

    beforeEach(() => {
        user = new User('123', 'John Doe');
    });

    it('should return the name if it is not null or empty', () => {
        expect(user.name).toBe('John Doe');
    });

    it('should return the id if the name is null or empty', () => {
        user.name = '';
        expect(user.name).toBe('123');
    });

    it('should set the name correctly', () => {
        user.name = 'Jane Smith';
        expect(user.name).toBe('Jane Smith');
    });

    it('should return the string representation of the user', () => {
        expect(user.toString()).toBe('Name: John Doe, ID: 123');
    });
});
