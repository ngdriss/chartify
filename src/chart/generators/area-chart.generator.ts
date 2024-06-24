import {AreaChartConfig} from "../../models/chart-types";
import * as d3 from "d3";
import color from "color";
import {LineChartGenerator} from "./line-chart.generator";

// @ts-ignore
export class AreaChartGenerator extends LineChartGenerator<AreaChartConfig> {
    generate() {
        const {stacked} = this.chartConfig
        if (stacked) {
            return this.stacked()
        }
        return this.default()
    }

    default() {
        const {showLegend, curve } = this.chartConfig
        const curved = curve === "curved";
        const {root, node, width, height, fullHeight, fullWidth} = super.generate();

        const x = d3.scaleLinear()
            .domain([0, d3.max(this.data[0], d => d.x)])
            .range([0, width]);

        const y = d3.scaleLinear()
            .domain([0, d3.max(this.data.flat(), d => d.y)])
            .range([height, 0]);

        const area: any = d3.area<{ x: number, y: number }>()
            .x(d => x(d.x))
            .y0(height) // Bottom edge of the area (base)
            .y1(d => y(d.y))
            .curve(curved ? d3.curveCatmullRom : d3.curveLinear); // Top edge of the area (actual data)

        node.selectAll(".area")
            .data(this.data)
            .enter()
            .append("path")
            .attr("d", area)
            .attr("id", (_: any, i: number) => `Area ${i}`)
            .style("fill", (_: any, i: number) => color(this.getColor(i)).fade(0.3).hexa());

        if (this.showPatterns) {
            this.applyPatterns(node)
            node.selectAll(".area-pattern")
                .data(this.data)
                .enter()
                .append("path")
                .attr("d", area)
                .attr("id", (_: any, i: number) => `Area-pattern ${i}`)
                .style("fill", (_: any, i: number) => this.getPattern(i));
        }

        if (showLegend) {
            this.showLegend(node, width)
        }
        return {root, node, data: this.data, height, width, fullHeight, fullWidth}
    }

    stacked() {
        const {curve, showAxis, showLegend, displayPoints} = this.chartConfig
        const curved = curve === "curved";
        const {root, node, width, height, fullHeight, fullWidth} = this.createSvg();

        // Convert the data to a format suitable for d3.stack
        const stackData = d3.range(this.data[0].length).map(i => {
            const point = {};
            this.data.forEach((d, j) => {
                point[`y${j}`] = d[i].y;
                point['x'] = d[i].x;
            });
            return point;
        });

        const keys = this.data.map((d, i) => `y${i}`);

        const x = d3.scaleLinear()
            // @ts-ignore
            .domain(d3.extent(stackData, d => d.x))
            .range([0, width]);

        const y = d3.scaleLinear()
            .domain([0, d3.max(stackData, d => {
                let sum = 0;
                keys.forEach(key => sum += d[key]);
                return sum;
            })])
            .range([height, 0]);

        const area = d3.area()
            // @ts-ignore
            .x(d => x(d.data.x))
            .y0(d => y(d[0]))
            .y1(d => y(d[1]))
            .curve(curved ? d3.curveCatmullRom : d3.curveLinear);

        const stack = d3.stack()
            .keys(keys);

        const series = stack(stackData);

        if (showAxis) {
            this.createAxis(node, x, y, height)
        }

        node.selectAll(".area-bg")
            .data(series)
            .enter()
            .append("path")
            .attr("class", "area")
            .attr("d", area)
            .attr("id", (_: any, i: number) => `Area ${i}`)
            .style("fill", (_: any, i: number) => this.getColor(i));

        if (this.showPatterns) {
            this.applyPatterns(node)
            node.selectAll(".area-pattern")
                .data(series)
                .enter()
                .append("path")
                .attr("d", area)
                .attr("id", (_: any, i: number) => `Area-pattern ${i}`)
                .style("fill", (d: any, i: number) => this.getPattern(i));
        }

        if (displayPoints) {
            series.forEach((serie, serieIndex) => {
                node.selectAll(`.circle-${serieIndex}`)
                    .data(serie)
                    .enter()
                    .append("circle")
                    .attr('id', (_: any, i: number) => `Dot ${i + 1}`)
                    .attr("cx", (d: any) => x(d.data.x))
                    .attr("cy", (d: any) => y(d[1]))
                    .attr("r", 3) // Adjust point radius as needed
                    .attr("fill", () => this.getColor(serieIndex));
            });
        }

        if (showLegend) {
            this.showLegend(node, width)
        }

        return {root, node, data: this.data, height, width, fullHeight, fullWidth}
    }
}
