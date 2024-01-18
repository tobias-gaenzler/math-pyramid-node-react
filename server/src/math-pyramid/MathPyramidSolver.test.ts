import { MathPyramidSolver } from './MathPyramidSolver';

describe('MathPyramidSolver', () => {
    let solver: MathPyramidSolver = new MathPyramidSolver();

    test('isSolvable should return true for solvable pyramid', () => {
        // Arrange
        const startValues = new Map<number, number>();
        startValues.set(0, 1);
        startValues.set(1, 2);
        startValues.set(2, 3);
        // Act
        const result = solver.isSolvable(startValues, 3);
        // Assert
        expect(result).toBeTruthy();
    });

    test('isSolvable should return false for not uniquely solvable pyramid', () => {
        // Arrange
        const startValues = new Map<number, number>();
        startValues.set(0, 1);
        startValues.set(2, 3);
        startValues.set(5, 8);
        // Act
        const result = solver.isSolvable(startValues, 3);
        // Assert
        expect(result).toBeFalsy();
    });

    test('solveBottomUp should return solution', () => {
        // Arrange
        const bottomValues: number[] = [1, 2, 3];
        const solution: number[] = [1, 2, 3, 3, 5, 8];
        // Act
        const result = solver.solveBottomUp(3, bottomValues);
        // Assert
        expect(result).toEqual(solution);
    });
});
