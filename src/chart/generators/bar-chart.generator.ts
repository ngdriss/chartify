import {BarChartConfig} from "../../models/chart-types";
import * as d3 from "d3";
import {BaseChartGenerator} from "./base-chart.generator";

export class BarChartGenerator extends BaseChartGenerator<BarChartConfig> {
    generate() {
        const {direction} = this.chartConfig
        if (direction === 'vertical') {
            return this.vertical()
        }
        return this.horizontal()
    }

    vertical() {
        const  {barWidth, showAxis, showLegend} = this.chartConfig
        const data = this.data[0].map((p) => p.x);
        const {root, node, height, width, fullWidth, fullHeight} = this.createSvg()

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

        if (this.showPatterns) {
            this.applyPatterns(node)
            // Create bars
            node.selectAll("rect-pattern")
                .data(data)
                .enter()
                .append("rect")
                .attr("id", (_: any, i: string) => `Bar ${i + 1}`)
                .attr("x", (_: any, i: string) => x(i))
                .attr("y", (d: any) => y(d))
                .attr("width", barWidth || x.bandwidth())
                .attr("height", (d: any) => height - y(d))
                .attr("fill", (_: any, i: number) => this.getPattern(i));
        }

        if (showAxis) {
            this.createAxis(node, x, y, height)
        }

        if (showLegend) {
            this.showLegend(node, width)
        }

        return {root, node, data, height, width, fullHeight, fullWidth}
    }

    horizontal() {
        const  {barWidth, showAxis, showLegend} = this.chartConfig
        const data = this.data[0].map((p) => p.x);
        const {root, node, height, width, fullWidth, fullHeight} = this.createSvg()

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

        if (this.showPatterns) {
            this.applyPatterns(node)
            // Create bars
            node.selectAll("rect-pattern")
                .data(data)
                .enter()
                .append("rect")
                .attr("id", (_: any, i: string) => `Bar ${i + 1}`)
                .attr("x", 0)
                .attr("y", (_: any, i: string) => y(i))
                .attr("width", (d: any) => width - x(d))
                .attr("height", barWidth || y.bandwidth())
                .attr("fill", (_: any, i: number) => this.getPattern(i));
        }

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

        if (showLegend) {
            this.showLegend(node, width)
        }
        return {root, node, data: this.data, height, width, fullHeight, fullWidth}
    }
}
