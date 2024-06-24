import {DonutChartConfig} from "../../models/chart-types";
import {BaseChartGenerator, MARGIN} from "./base-chart.generator";
import * as d3 from "d3";
import {isNil} from "lodash";

export class DonutChartGenerator<T extends DonutChartConfig = DonutChartConfig> extends BaseChartGenerator<T> {
    generate() {
        const {showLegend, cornerRadius, padAngle: userPadAngle, innerRadius: userInnerRadius} = this.chartConfig
        const data = this.data[0].map((p) => p.x);
        const padAngle = (userPadAngle || 0) / 100;
        const {root, node, width, height, fullHeight, fullWidth} = this.createSvg()
        const radius = Math.min(width, height) / 2;
        const innerRadius = isNil(userInnerRadius) ? radius * 0.5 : userInnerRadius;

        const g = node.append("g")
            .attr("transform", "translate(" + (-MARGIN.left + fullWidth / 2) + "," + (-MARGIN.left/2 + fullHeight / 2) + ")");

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

        if (this.showPatterns) {
            this.applyPatterns(node)
            g.selectAll("path-pattern")
                .data(arcs)
                .enter()
                .append("path")
                .attr("d", arc)
                .attr("id", (d: any, i: number) => `Arc ${i + 1}`)
                .attr("fill", (_: any, i: number) => this.getPattern(i));
        }

        if (showLegend) {
            this.showLegend(node, width)
        }

        return {root, node, data: this.data, height, width, fullHeight, fullWidth}
    }
}
