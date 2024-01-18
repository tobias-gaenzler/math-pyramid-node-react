import { MathPyramidFactory, MathPyramidModelData, MathPyramidRequestData } from './MathPyramidFactory';

describe('MathPyramidFactory', () => {
    let mathPyramidFactory: MathPyramidFactory;

    beforeEach(() => {
        mathPyramidFactory = new MathPyramidFactory();
    });

    describe('getNewGameData', () => {
        it('returns a valid MathPyramidModelData object', () => {
            // Arrange
            const requestData: MathPyramidRequestData = {
                size: '3',
                maxValue: '100',
            };
            // Act
            const gameData: MathPyramidModelData = mathPyramidFactory.getNewGameData(requestData);

            // Assert
            expect(gameData.size).toBe(3);
            const solutionValues = gameData.solutionValues;
            const startValues = gameData.startValues;
            expect(solutionValues.length).toBe(startValues.length);
            gameData.startValues.forEach((value, index) => {
                if (value !== null) {
                    expect(solutionValues[index]).toBe(value);
                }
            });
            solutionValues.forEach(value => expect(value).toBeLessThan(101));
            expect(solutionValues[0] + solutionValues[1]).toBe(solutionValues[3]);
            expect(solutionValues[1] + solutionValues[2]).toBe(solutionValues[4]);
            expect(solutionValues[3] + solutionValues[4]).toBe(solutionValues[5]);
        });
    });
});
