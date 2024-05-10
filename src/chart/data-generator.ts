import {CurrentNode} from "../../plugin/code";
import * as d3 from 'd3';

export type Point = { x: number, y: number, chartX?: number, chartY?: number };
export type Points = Point[];

export interface DataGenerator<Input, Data> {
    type: string;

    generate(input: Input, currentNode: CurrentNode): Data;
}

export type CoordinateGeneratorInput = {
    points: number,
    lines: number,
    rangeX: number,
    rangeY: number,
    distribution: 'random' | 'trend-up' | 'trend-down'
};

export class CoordinateGenerator implements DataGenerator<CoordinateGeneratorInput, Points[]> {
    type = 'coordinate';

    generate(input: CoordinateGeneratorInput, currentNode: CurrentNode) {
        // Create scales for the x-axis and y-axis
        const xScale = d3.scaleLinear()
            .domain([0, input?.rangeX || 100])  // Input domain
            .range([0, currentNode.width]); // Output range

        const yScale = d3.scaleLinear()
            .domain([0, input?.rangeY || 100])  // Input domain
            .range([currentNode.height, 0]); // Output range (reversed for SVG)

        // Generate trend down data points
        const distribution = input.distribution;
        let data: Points[] = [];

        for (let i = 0; i < input.lines; i++) {
            const randomData = () => d3
                .range(input.points)
                .map((i) => ({
                    x: i * input.rangeX / input.points,  // Distribute x uniformly
                    y: Math.random() * input.rangeY // Trend down y
                }));

            const trendUpData = () => d3
                .range(input.points)
                .map((_, i) => ({
                    x: i * input.rangeX / input.points,  // Distribute x uniformly
                    y: Math.random() * input.rangeY // Random y
                }))
                .sort((a, b) => a.x - b.x) // Sort by x values
                .map((d, i, arr) => ({x: d.x, y: i == 0 ? 0 : d.y + i * input.rangeY / arr.length}))

            const trendDownData = () => d3
                .range(input.points)
                .map((_, i) => ({
                    x: i * input.rangeX / input.points,  // Distribute x uniformly
                    y: Math.random() * input.rangeY // Random y
                }))
                .sort((a, b) => b.x - a.x) // Sort by x values
                .map((d, i, arr) => ({x: d.x, y: i == 0 ? 0 : d.y + i * input.rangeY / arr.length}))

            let points: Points = [];
            if (distribution === 'random') {
                points = randomData();
            }
            if (distribution === 'trend-up') {
                points = trendUpData();
            }
            if (distribution === 'trend-down') {
                points = trendDownData();
            }
            points.forEach(d => {
                d.chartX = xScale(d.x);
                d.chartY = yScale(d.y);
            });
            data.push(points)
        }
        return data;
    }
}


export type SimpleGeneratorInput = {
    entries: number
    maxValue: number
}

export class SimpleGenerator implements DataGenerator<SimpleGeneratorInput, number[]> {
    type = 'simple';

    generate(input: SimpleGeneratorInput, currentNode: CurrentNode): number[] {
        let data: number[] = [];

        for (let i = 0; i < input.entries; i++) {
            data.push(Math.random() * (input.maxValue || 100))
        }
        return data;
    }
}

export class DataGeneratorFactory {
    static create(type: string): DataGenerator<any, any> {
        switch (type) {
            case 'line':
            case 'area':
                return new CoordinateGenerator();
            case 'bar':
            case 'pie':
            case 'donut':
                return new SimpleGenerator();
            default:
                throw new Error('Unknown point generator type')
        }
    }

    static getType(type: string) {
        switch (type) {
            case 'line':
            case 'area':
                return 'coordinate';
            case 'bar':
            case 'pie':
            case 'donut':
                return 'simple';
            default:
                throw new Error('Unknown point generator type')
        }
    }
}
