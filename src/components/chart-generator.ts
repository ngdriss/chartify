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
    generate(input: any): string {
        const width = input.width
        const height = input.height
        const data = input.data as any[][];
        const svg = d3.create('svg')
            .attr('width', width)
            .attr('height', height);

        const x = d3.scaleLinear()
            .domain([0, d3.max(data[0], d => d.x)])
            .range([0, width]);

        const y = d3.scaleLinear()
            .domain([0, d3.max(data.flat(), d => d.y)])
            .range([height, 0]);

        const line = d3.line<{x: number, y: number}>()
            .x(d => x(d.x))
            .y(d => y(d.y));

        let i = 0;
        data.forEach(lineData => {
            svg.append('path')
                .datum(lineData)
                .attr('fill', 'none')
                .attr('stroke', d3.schemeCategory10[i++ % 10])
                .attr('stroke-width', 1)
                .attr('d', line);
        });

        return svg.node()?.outerHTML || '';
    }
}

class BarChartGenerator implements ChartGenerator {
    generate(data: any) {
        return 'bar-chart-svg';
    }
}
