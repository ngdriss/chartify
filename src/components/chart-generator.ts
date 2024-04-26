import * as d3 from "d3";

class ChartGeneratorFactory {
    static create(type: string) {
    switch (type) {
      case 'line':
        return new LineChartGenerator();
      case 'bar':
        return new BarChartGenerator();
      default:
        throw new Error('Unknown chart type');
    }
  }
}

export { ChartGeneratorFactory };

interface ChartGenerator {
    generate(data: any): any;
}

class LineChartGenerator implements ChartGenerator {
    generate(input: any) {
        const width = input.width
        const height = input.height
        const data = input.data as any[][];
        const svg = d3.create('svg')
            .attr('width', width)
            .attr('height', height);

        const margin = { top: 20, right: 30, bottom: 30, left: 40 };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        const x = d3.scaleLinear()
            .domain([0, d3.max(data[0], d => d.x)])
            .range([margin.left, innerWidth]);

        const y = d3.scaleLinear()
            .domain([0, d3.max(data.flat(), d => d.y)])
            .range([innerHeight, margin.top]);

        const line = d3.line<{x: number, y: number}>()
            .x(d => x(d.x))
            .y(d => y(d.y));

        data.forEach(lineData => {
            svg.append('path')
                .datum(lineData)
                .attr('fill', 'none')
                .attr('stroke', 'steelblue')
                .attr('stroke-width', 2)
                .attr('d', line);
        });

        return svg.node()?.outerHTML
    }
}

class BarChartGenerator implements ChartGenerator {
    generate(data: any) {
        console.log('Generating bar chart with data:', data);
        return 'bar-chart-svg';
    }
}
