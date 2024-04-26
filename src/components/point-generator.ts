import {randomUniform} from "d3-random";

export type Point = { x: number, y: number };
export type Points = Point[];
export type Lines = Points[];

export interface PointGenerator<Input> {
    type: string;
    generate(input: Input): any;
}

export type LinearPointGeneratorInput = {
    points: number,
    lines: number,
    rangeX: number,
    rangeY: number,
    distribution: 'random' | 'trend-up' | 'trend-down'
};
export class LinearPointGenerator implements PointGenerator<LinearPointGeneratorInput> {
    type = 'linear';
    generate(input: LinearPointGeneratorInput): Lines {
        const randomY = randomUniform(input.rangeY);

        const data: Lines = [];
        const numPoints = input.points;
        const step = numPoints * 5;
        const numLines = input.lines;
        for (let i = 0; i < numLines; i++) {
            data.push([]);
            let xNumbers = Array.from({ length: numPoints }, (_, i) => i * step);
            let prevY = 0;
            for (let j = 0; j < numPoints; j++) {
                let newY = 0;
                if (input.distribution === 'random') {
                    newY = Math.round(randomY());
                }
                if (input.distribution === 'trend-up') {
                    newY = Math.round(prevY + randomY());
                }
                if (input.distribution === 'trend-down') {
                    newY = Math.round(prevY - randomY());
                }
                data[i].push({x: xNumbers[j], y: newY});
                prevY = newY;
            }
        }
        return data;
    }
}

export class PointGeneratorFactory {
    static create(type: string): PointGenerator<any> {
        switch (type) {
            case 'linear':
                return new LinearPointGenerator();
            default:
                throw new Error('Unknown point generator type')
        }
    }
}
