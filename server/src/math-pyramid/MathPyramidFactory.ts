import { MathPyramidSolver } from './MathPyramidSolver';

export interface MathPyramidModelData {
    size: number
    solutionValues: number[]
    startValues: Array<number | null>
}
export interface MathPyramidRequestData {
    size: string
    maxValue: string
}

export class MathPyramidFactory {
    getNewGameData(data: MathPyramidRequestData): MathPyramidModelData {
        const size: number = parseInt(data.size);
        const maxValue: number = parseInt(data.maxValue);
        const solutionValues: number[] = this.createRandomSolution(size, maxValue);
        const startValues: number[] = this.getUniquelySolvableRandomStartValues(solutionValues);

        console.log(`Start values: ${JSON.stringify(startValues)}`);
        console.log(`Solution values: ${JSON.stringify(solutionValues)}`);
        return {
            size: size,
            startValues: startValues,
            solutionValues: solutionValues,
        };
    }

    private createRandomSolution(size: number, maxValue: number): number[] {
        const maxValueInLowestRow: number = Math.max(2, Math.floor(maxValue / Math.pow(2, size - 1)));
        // start values in bottom row of pyramid
        const randomSolution: number[] = new Array(size)
            .fill(0)
            .map(() => Math.floor(Math.random() * (maxValueInLowestRow - 1) + 1));

        return new MathPyramidSolver().solveBottomUp(size, randomSolution);
    }

    private getUniquelySolvableRandomStartValues(solutionValues: number[]): number[] {
        const size: number = this.getSizeFromNumberOfBlocks(solutionValues.length);
        let startValues: Map<number, number> = this.getRandomStartValues(solutionValues);
        let tries: number = 1;
        const maxIterations: number = 250;
        const solver: MathPyramidSolver = new MathPyramidSolver();
        while (!solver.isSolvable(startValues, size) && tries <= maxIterations) {
            startValues = this.getRandomStartValues(solutionValues);
            tries++;
        }
        if (tries >= maxIterations) {
            throw new Error(`Could not find a uniquely solvable solution in ${maxIterations} iterations.`);
        }
        console.log(`Needed ${tries} iterations to find suitable start values.`);
        const startValuesAsArray: number[] = new Array(solutionValues.length).fill(null);
        startValues.forEach((value: number, key: number) => {
            startValuesAsArray[key] = value;
        });
        return startValuesAsArray;
    }

    private getRandomStartValues(solutionValues: number[]): Map<number, number> {
        const size: number = this.getSizeFromNumberOfBlocks(solutionValues.length);
        const numberOfBlocks: number = this.getNumberOfBlocks(size);
        const randomStartValues: Map<number, number> = new Map<number, number>();
        const randomIndices: number[] = this.getRandomIndices(numberOfBlocks, size);
        randomIndices.forEach((randomIndex: number) => {
            randomStartValues.set(randomIndex, solutionValues[randomIndex]);
        });
        return randomStartValues;
    }

    private getRandomIndices(maxValue: number, numberOfIndices: number): number[] {
        const givenList: number[] = Array.from({ length: maxValue }, (_, i) => i);
        givenList.sort(() => Math.random() - 0.5);
        return givenList.slice(0, numberOfIndices);
    }

    private getNumberOfBlocks(size: number): number {
        return (size * size + size) / 2;
    }

    private getSizeFromNumberOfBlocks(numberOfBlocks: number): number {
        return (Math.sqrt(1 + 8 * numberOfBlocks) - 1) / 2;
    }
}