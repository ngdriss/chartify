import * as d3 from "d3";
import * as color from "color";

class ChartGeneratorFactory {
    static create(type: string) {
        switch (type) {
            case 'line':
                return new LineChartGenerator();
            case 'area':
                return new AreaChartGenerator();
            case 'bar':
                return new BarChartGenerator();
            case 'pie':
                return new PieChartGenerator();
                case 'donut':
                return new DonutChartGenerator();
            default:
                throw new Error('Unknown chart type');
        }
    }
}

export {ChartGeneratorFactory};

interface ChartGenerator {
    generate(data: any): any;
}

class LineChartGenerator implements ChartGenerator {
    generate(input: any): any {
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

        const line = d3.line<{ x: number, y: number }>()
            .x(d => x(d.x))
            .y(d => y(d.y));

        let i = 0;
        data.forEach((lineData: any) => {
            svg.append('path')
                .datum(lineData)
                .attr('fill', 'none')
                .attr('stroke', d3.schemeCategory10[i++ % 10])
                .attr('stroke-width', 1.2)
                .attr('d', line);
        });

        return {svg, data}
    }
}

class AreaChartGenerator extends LineChartGenerator {
    generate(input: any): any {
        const width = input.width
        const height = input.height
        const data = input.data as any[][];
        const {svg, data: gData} = super.generate(input);

        const x = d3.scaleLinear()
            .domain([0, d3.max(data[0], d => d.x)])
            .range([0, width]);

        const y = d3.scaleLinear()
            .domain([0, d3.max(data.flat(), d => d.y)])
            .range([height, 0]);

        const area: any = d3.area<{ x: number, y: number }>()
            .x(d => x(d.x))
            .y0(height) // Bottom edge of the area (base)
            .y1(d => y(d.y)); // Top edge of the area (actual data)
        let i = 0;
        gData.forEach((lineData: any) => {
            svg.append("path")
                .datum(lineData)
                .attr("class", "area")
                .attr("fill", color(d3.schemeCategory10[i++ % 10]).fade(0.3).hexa())
                .attr("d", area);
        });
        return {svg, data: gData};
    }
}

class BarChartGenerator implements ChartGenerator {
    generate(input: any) {
        const width = input.width
        const height = input.height
        const data = input.data as number[];
        const barWidth = input.options?.barWidth;

        const svg = d3.create('svg')
            .attr('width', width)
            .attr('height', height);

        const x = d3.scaleBand()
            // @ts-ignore
            .domain(d3.range(data.length))
            .range([0, width])
            .paddingInner(0.05);

        const y = d3.scaleLinear()
            .domain([0, d3.max(data)])
            .range([height, 0]);

        // Create bars
        svg.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            // @ts-ignore
            .attr("x", (d, i) => x(i))
            .attr("y", d => y(d))
            .attr("width", barWidth || x.bandwidth())
            .attr("height", d => height - y(d))
            .attr("fill", (d, i) => d3.schemeCategory10[i % 10]);

        return {svg, data}
    }
}

class PieChartGenerator implements ChartGenerator {
    generate(input: any) {
        const width = input.width
        const height = input.height
        const data = input.data as number[];
        const radius = Math.min(width, height) / 2;
        const cornerRadius = input.options?.cornerRadius || 10;

        const svg = d3.create('svg')
            .attr('width', width)
            .attr('height', height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        const pie = d3.pie()
            .padAngle(0.01);
        const arc: any = d3.arc()
            .innerRadius(0)
            .cornerRadius(cornerRadius)
            .outerRadius(radius);

        const arcs = pie(data);

        svg.selectAll("path")
            .data(arcs)
            .enter()
            .append("path")
            .attr("d", arc)
            .attr("fill", (d, i) => d3.schemeCategory10[i % 10])

        return {svg, data}
    }
}

class DonutChartGenerator implements ChartGenerator {
    generate(input: any) {
        const width = input.width
        const height = input.height
        const data = input.data as number[];
        const radius = Math.min(width, height) / 2;
        const innerRadius = input.options?.innerRadius || radius * 0.5;
        const cornerRadius = input.options?.cornerRadius || 10;

        const svg = d3.create('svg')
            .attr('width', width)
            .attr('height', height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        const pie = d3.pie()
            .padAngle(0.01);
        const arc: any = d3.arc()
            .innerRadius(innerRadius)
            .cornerRadius(cornerRadius)
            .outerRadius(radius);

        const arcs = pie(data);

        svg.selectAll("path")
            .data(arcs)
            .enter()
            .append("path")
            .attr("d", arc)
            .attr("fill", (d, i) => d3.schemeCategory10[i % 10])

        return {svg, data}
    }
}
