import * as d3 from "d3";
import * as color from "color";

const MARGIN = {top: 25, left: 25};

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

abstract class BaseChartGenerator implements ChartGenerator {
    abstract generate(input: any): any;

    createSvg(input: any) {
        const fullWidth = input.width;
        const width = input.width - MARGIN.left * 2;
        const fullHeight = input.height;
        const height = input.height - MARGIN.top * 2;
        const isPreview = input.isPreview;
        let svg: any;
        if (isPreview) {
            d3.select('#preview').selectAll('*').remove();
            svg = d3.select('#preview')
                .append('svg')
        } else {
            svg = d3.create('svg')
        }
        svg
            .attr('width', fullWidth)
            .attr('height', fullHeight)

        if (!input.ignoreTranslate) {
            const g = svg
                .append("g")
                .attr("transform", "translate(" + (MARGIN.left) + "," + (MARGIN.top) + ")")
            svg = g;
        }
        return {svg, width, height}
    }

    generatePath(svg: any, x: any, y: any, translateX: number) {
        svg.append("g")
            .attr("class", "x-axis")
            .attr("transform", "translate(0," + translateX + ")")
            .call(d3.axisBottom(x));

        svg.append("g")
            .attr("class", "y-axis")
            .call(d3.axisLeft(y));
    }
}

class LineChartGenerator extends BaseChartGenerator implements ChartGenerator {
    generate(input: any): any {
        const data = input.data as any[][];
        const curved = input.options.curve === "curved";
        const {displayPoints, dashed, showAxis} = input.options;
        const {svg, width, height} = this.createSvg(input);

        const x = d3.scaleLinear()
            .domain([0, d3.max(data[0], d => d.x)])
            .range([0, width]);

        const y = d3.scaleLinear()
            .domain([0, d3.max(data.flat(), d => d.y)])
            .range([height, 0]);

        const line = d3.line<{ x: number, y: number }>()
            .x(d => x(d.x))
            .y(d => y(d.y))
            .curve(curved ? d3.curveCatmullRom : d3.curveLinear);

        data.forEach((lineData: any, i) => {
            svg.append('path')
                .datum(lineData)
                .attr('fill', 'none')
                .attr('stroke', d3.schemeCategory10[i % 10])
                .attr('stroke-width', 1.2)
                .style("stroke-dasharray", dashed ? ("3, 3") : null)
                .attr('d', line);

            if (displayPoints) {
                svg.selectAll(`circle-${i}`)
                    .data(lineData)
                    .enter().append("circle")
                    .attr("cx", (d: any) => x(d.x))
                    .attr("cy", (d: any) => y(d.y))
                    .attr("r", 3) // Adjust point radius as needed
                    .attr("fill", d3.schemeCategory10[i % 10]);
            }
        });

        if (showAxis) {
            this.generatePath(svg, x, y, height)
        }

        return {svg, data, height, width}
    }
}

class AreaChartGenerator extends LineChartGenerator {
    generate(input: any): any {
        const data = input.data as any[][];
        const curved = input.options.curve === "curved";
        const {svg, data: gData, width, height} = super.generate(input);

        const x = d3.scaleLinear()
            .domain([0, d3.max(data[0], d => d.x)])
            .range([0, width]);

        const y = d3.scaleLinear()
            .domain([0, d3.max(data.flat(), d => d.y)])
            .range([height, 0]);

        const area: any = d3.area<{ x: number, y: number }>()
            .x(d => x(d.x))
            .y0(height) // Bottom edge of the area (base)
            .y1(d => y(d.y))
            .curve(curved ? d3.curveCatmullRom : d3.curveLinear); // Top edge of the area (actual data)

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

class BarChartGenerator extends BaseChartGenerator implements ChartGenerator {
    generate(input: any) {
        const direction = input.options?.direction || 'vertical'
        if (direction === 'vertical') {
            return this.vertical(input)
        }
        return this.horizontal(input)
    }

    vertical(input: any) {
        const data = input.data as number[];
        const barWidth = input.options?.barWidth;
        const showAxis = input.options?.showAxis;

        const {svg, height, width} = this.createSvg(input)

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

        if (showAxis) {
            this.generatePath(svg, x, y, height)
        }

        return {svg, data}
    }

    horizontal(input: any) {
        const data = input.data as number[];
        const barWidth = input.options?.barWidth;
        const showAxis = input.options?.showAxis;

        const {svg, width, height} = this.createSvg(input)

        const y = d3.scaleBand()
            // @ts-ignore
            .domain(d3.range(data.length))
            .range([0, height])
            .paddingInner(0.05);

        const x = d3.scaleLinear()
            .domain([0, d3.max(data)])
            .range([0, width]);

        // Create bars
        svg.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", 0)
            // @ts-ignore
            .attr("y", (d, i) => y(i))
            .attr("width", d => width - x(d))
            .attr("height", barWidth || y.bandwidth())
            .attr("fill", (d, i) => d3.schemeCategory10[i % 10]);

        if (showAxis) {
            svg.append("g")
                .attr("class", "y-axis")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x));

            svg.append("g")
                .attr("class", "x-axis")
                .call(d3.axisLeft(y));
        }
        return {svg, data}
    }
}

class PieChartGenerator extends BaseChartGenerator implements ChartGenerator {
    generate(input: any) {
        const data = input.data as number[];
        const cornerRadius = input.options?.cornerRadius || 0;
        const padAngle = 0;
        input.ignoreTranslate = true;
        const {svg, height, width} = this.createSvg(input)
        const radius = Math.min(width, height) / 2;
        const g = svg
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        const pie = d3.pie()
            .padAngle(padAngle);
        const arc: any = d3.arc()
            .innerRadius(0)
            .cornerRadius(cornerRadius)
            .outerRadius(radius);

        const arcs = pie(data);

        g.selectAll("path")
            .data(arcs)
            .enter()
            .append("path")
            .attr("d", arc)
            .attr("fill", (d, i) => d3.schemeCategory10[i % 10])

        return {svg, data}
    }
}

class DonutChartGenerator extends BaseChartGenerator implements ChartGenerator {
    generate(input: any) {
        const data = input.data as number[];
        const cornerRadius = input.options?.cornerRadius;
        const padAngle = input.options?.padAngle / 100;
        input.ignoreTranslate = true;
        const {svg, width, height} = this.createSvg(input)
        const radius = Math.min(width, height) / 2;
        const innerRadius = input.options?.innerRadius || radius * 0.5;
        const g = svg.append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        const pie = d3.pie()
            .padAngle(padAngle);
        const arc: any = d3.arc()
            .innerRadius(innerRadius)
            .cornerRadius(cornerRadius)
            .outerRadius(radius);

        const arcs = pie(data);

        g.selectAll("path")
            .data(arcs)
            .enter()
            .append("path")
            .attr("d", arc)
            .attr("fill", (d, i) => d3.schemeCategory10[i % 10])

        return {svg, data}
    }
}
