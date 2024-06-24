import {LineChartConfig} from "../../models/chart-types";
import {BaseChartGenerator} from "./base-chart.generator";
import * as d3 from "d3";

export class LineChartGenerator<T extends LineChartConfig = LineChartConfig> extends BaseChartGenerator<T> {
    generate() {
        const curved = this.chartConfig.curve === "curved";
        const {displayPoints, dashed, showAxis, showLegend} = this.chartConfig;

        const {root, node, width, height, fullHeight, fullWidth} = this.createSvg();

        const x = d3.scaleLinear()
            .domain([0, d3.max(this.data[0], d => d.x)])
            .range([0, width]);

        const y = d3.scaleLinear()
            .domain([0, d3.max(this.data.flat(), d => d.y)])
            .range([height, 0]);

        const line = d3.line<{ x: number, y: number }>()
            .x(d => x(d.x))
            .y(d => y(d.y))
            .curve(curved ? d3.curveCatmullRom : d3.curveLinear);


        node.selectAll("path")
            .data(this.data)
            .enter()
            .append("path")
            .attr('id', (_: any, i: number) =>`Line ${i + 1}`)
            .attr('fill', 'none')
            .attr('stroke', (_: any, i: number) => this.getColor(i))
            .attr('stroke-width', 1.2)
            .style("stroke-dasharray", dashed ? ("3, 3") : null)
            .attr('d', line);

        if (displayPoints) {
            this.data.forEach((points, i) => {
                this.displayPoints(node, i, points, (d: any) => x(d.x), (d: any) => y(d.y))
            })
        }

        if (showAxis) {
            this.createAxis(node, x, y, height)
        }

        if (showLegend) {
            this.showLegend(node, width)
        }

        return {root, node, data: this.data, height, width, fullHeight, fullWidth}
    }
}
