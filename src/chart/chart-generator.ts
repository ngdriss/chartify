import * as d3 from "d3";
import * as color from "color";
import {isNil, upperFirst} from "lodash";

const MARGIN = {top: 25, left: 25};

export type UserChartConfig = {
    display: {
        label?: {
            color: string
            fontSize: string
            fontFamily: string
        }
        backgroundColor?: string
        showGrid?: boolean
    }
    dimensions: {
        width: number
        height: number
    }
}

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
    input: any
    abstract generate(input: any): any;

    getColor(i: number) {
        const colors = this.input.config?.colors || [];
        return colors[i % colors.length]
    }

    createSvg(input: any) {
        const type = input.type;
        const fullWidth = input.width;
        const width = input.width - MARGIN.left * 2;
        const fullHeight = input.height;
        const height = input.height - MARGIN.top * 2;
        const isPreview = input.isPreview;
        let root: any,
            node: any;
        if (isPreview) {
            d3.select('#preview').selectAll('*').remove();
            root = d3.select('#preview')
                .append('svg')
        } else {
            root = d3.create('svg')
        }
        node = root;
        root
            .attr('id', `${upperFirst(type)} Chart`)
            .attr('width', fullWidth)
            .attr('height', fullHeight)

        if (!input.ignoreTranslate) {
            node = root
                .append("g")
                .attr('id', "container")
                .attr("transform", "translate(" + (MARGIN.left) + "," + (MARGIN.top) + ")")
        }
        return {root, node, width, height, fullHeight, fullWidth}
    }

    createAxis(svg: any, x: any, y: any, translateX: number) {
        svg.append("g")
            .attr('id', 'X Axis')
            .attr("class", "x-axis")
            .attr("transform", "translate(0," + translateX + ")")
            .call(d3.axisBottom(x));

        svg.append("g")
            .attr('id', 'Y Axis')
            .attr("class", "y-axis")
            .call(d3.axisLeft(y));
    }
}

class LineChartGenerator extends BaseChartGenerator implements ChartGenerator {
    generate(input: any): any {
        const data = input.data as any[][];
        const curved = input.options.curve === "curved";
        const {displayPoints, dashed, showAxis} = input.options;

        const {root, node, width, height} = this.createSvg(input);

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
            node.append('path')
                .datum(lineData)
                .attr('id', `Line ${i + 1}`)
                .attr('fill', 'none')
                .attr('stroke', this.getColor(i))
                .attr('stroke-width', 1.2)
                .style("stroke-dasharray", dashed ? ("3, 3") : null)
                .attr('d', line);

            if (displayPoints) {
                node.selectAll(`circle-${i}`)
                    .data(lineData)
                    .enter().append("circle")
                    .attr('id', `Dot ${i + 1}`)
                    .attr("cx", (d: any) => x(d.x))
                    .attr("cy", (d: any) => y(d.y))
                    .attr("r", 3) // Adjust point radius as needed
                    .attr("fill", this.getColor(i));
            }
        });

        if (showAxis) {
            this.createAxis(node, x, y, height)
        }

        return {svg: root, root, node, data, height, width}
    }
}

class AreaChartGenerator extends LineChartGenerator {
    generate(input: any): any {
        const data = input.data as any[][];
        const curved = input.options.curve === "curved";
        const {root, node, data: gData, width, height} = super.generate(input);

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

        gData.forEach((lineData: any, i: number) => {
            node.append("path")
                .datum(lineData)
                .attr("class", "area")
                .attr("fill", color(this.getColor(i)).fade(0.3).hexa())
                .attr("id", () => `Area ${i + 1}`)
                .attr("d", area);
        });
        return {svg: root, node, data: gData};
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
        const {root, node, height, width} = this.createSvg(input)

        const x = d3.scaleBand()
            // @ts-ignore
            .domain(d3.range(data.length))
            .range([0, width])
            .paddingInner(0.05);

        const y = d3.scaleLinear()
            .domain([0, d3.max(data)])
            .range([height, 0]);

        // Create bars
        node.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("id", (_: any, i: string) => `Bar ${i + 1}`)
            .attr("x", (_: any, i: string) => x(i))
            .attr("y", (d: any) => y(d))
            .attr("width", barWidth || x.bandwidth())
            .attr("height", (d: any) => height - y(d))
            .attr("fill", (_: any, i: number) => this.getColor(i));

        if (showAxis) {
            this.createAxis(node, x, y, height)
        }

        return {svg: root, data}
    }
    horizontal(input: any) {
        const data = input.data as number[];
        const barWidth = input.options?.barWidth;
        const showAxis = input.options?.showAxis;
        const {root, node, width, height} = this.createSvg(input)

        const y = d3.scaleBand()
            // @ts-ignore
            .domain(d3.range(data.length))
            .range([0, height])
            .paddingInner(0.05);

        const x = d3.scaleLinear()
            .domain([0, d3.max(data)])
            .range([0, width]);

        // Create bars
        node.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("id", (_: any, i: string) => `Bar ${i + 1}`)
            .attr("x", 0)
            .attr("y", (_: any, i: string) => y(i))
            .attr("width", (d: any) => width - x(d))
            .attr("height", barWidth || y.bandwidth())
            .attr("fill", (d: any, i: number) => this.getColor(i));

        if (showAxis) {
            node.append("g")
                .attr('id', 'Y Axis')
                .attr("class", "y-axis")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x));

            node.append("g")
                .attr('id', 'X Axis')
                .attr("class", "x-axis")
                .call(d3.axisLeft(y));
        }
        return {svg: root, data}
    }
}

class DonutChartGenerator extends BaseChartGenerator implements ChartGenerator {
    generate(input: any) {
        const data = input.data as number[];
        const cornerRadius = input.options?.cornerRadius;
        const padAngle = input.options?.padAngle / 100;
        input.ignoreTranslate = true;
        const {root, node, width, height, fullHeight, fullWidth} = this.createSvg(input)
        const radius = Math.min(width, height) / 2;
        const innerRadius = isNil(input.options?.innerRadius) ? radius * 0.5 : input.options?.innerRadius;
        const g = node.append("g")
            .attr("transform", "translate(" + fullWidth / 2 + "," + fullHeight / 2 + ")");

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
            .attr("id", (d: any, i: number) => `Arc ${i + 1}`)
            .attr("fill", (d: any, i: number) => this.getColor(i))

        return {svg: root, data}
    }
}

class PieChartGenerator extends DonutChartGenerator implements ChartGenerator {
    generate(input: any) {
        input.options.innerRadius = 0;
        input.options.padAngle = 0;
        return super.generate(input)
    }
}
