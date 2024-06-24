import {ChartTypes} from "../../models/chart-types";
import {upperFirst} from "lodash";
import {ChartGeneratorConfig} from "./chart-generator";
import * as d3 from "d3";
export const MARGIN = {top: 50, left: 50};

export abstract class BaseChartGenerator<T extends ChartTypes = ChartTypes> {

    constructor(
        public chartGeneratorConfig: ChartGeneratorConfig
    ) {}

    abstract generate(): {
        root:  d3.Selection<SVGSVGElement, any, any, any>,
        node: d3.Selection<any, any, any, any>,
        data: any[],
        width: number,
        height: number,
        fullHeight: number,
        fullWidth: number
    };

    get data() {
        return this.chartGeneratorConfig?.config?.data
    }

    get chartConfig() {
        return this.chartGeneratorConfig?.config?.chartConfig as T
    }
    get display() {
        return this.chartGeneratorConfig?.config?.display
    }
    get dimensions() {
        return this.chartGeneratorConfig?.config?.dimensions
    }

    get meta() {
        return this.chartGeneratorConfig?.meta
    }

    get isPreview() {
        return this.chartGeneratorConfig?.isPreview
    }

    getColor(i: number) {
        const colors = this.meta?.colors || [];
        return colors[i % colors.length]
    }

    displayPoints(root: any, i: any, data: any, x: any, y: any) {
        root.selectAll(`.circle-${i}`)
            .data(data)
            .enter()
            .append("circle")
            .attr('id', (_: any, i: number) => `Dot ${i + 1}`)
            .attr("cx", (d: any) => {
                return x(d);
            })
            .attr("cy", (d: any) => {
                return y(d)
            })
            .attr("r", 3) // Adjust point radius as needed
            .attr("fill", (_: any, i: number) => this.getColor(i));
    }

    createSvg() {
        const type = this.chartConfig.type;
        const fullWidth = this.dimensions.width;
        const width = this.dimensions.width - MARGIN.left * 2;
        const fullHeight = this.dimensions.height;
        const height = this.dimensions.height - MARGIN.top * 2;
        const isPreview = this.isPreview;
        let root: d3.Selection<SVGSVGElement, any, any, any>,
            node: any;
        if (isPreview) {
            d3.select('#preview').selectAll('*').remove();
            root = d3.select('#preview')
                .append('svg')
        } else {
            root = d3.create('svg')
        }

        node = root
            .attr('id', `${upperFirst(type)} Chart`)
            .attr('width', fullWidth)
            .attr('height', fullHeight)
            .append("g")
            .attr('id', "container")
            .attr("transform", "translate(" + (MARGIN.left) + "," + (MARGIN.top) + ")")

        return {root, node, width, height, fullHeight, fullWidth}
    }

    createAxis(svg: any, x: any, y: any, translateX: number) {
        const color = this.display?.axis?.color
        const fontSize = this.display?.axis?.fontSize
        const fontWeight = this.display?.axis?.fontWeight

        svg.append("g")
            .attr('id', 'X Axis')
            .attr("transform", "translate(0," + translateX + ")")
            .attr("color", color)
            .style("font-size", fontSize)
            .style("font-weight", fontWeight)
            .call(d3.axisBottom(x));

        svg.append("g")
            .attr('id', 'Y Axis')
            .attr("color", color)
            .style("font-size", fontSize)
            .style("font-weight", fontWeight)
            .call(d3.axisLeft(y));
    }

    showLegend( node: any, width: number) {
        const data = this.data.length == 1 ? this.data[0] : this.data
        const patterns = this.getPatterns()
        const color = this.display?.legends?.color
        const fontSize = this.display?.legends?.fontSize
        const fontWeight = this.display?.legends?.fontWeight
        // Adding legend
        const legend = node
            .append("g")
            .attr("id", "Legends")
            .attr("transform", "translate(0,0)")
            .selectAll("legend")
            .data(data.map((_: any, i: any) => `Serie ${i}`))
            .enter()
            .append("g")
            .attr("transform", "translate(0,0)");

        legend.append("rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", 18)
            .attr("height", 18)
            .style("fill", (d: any, i: number) => this.getColor(i));

        if (patterns) {
            legend.append("rect")
                .attr("x", 0)
                .attr("y", 0)
                .attr("width", 18)
                .attr("height", 18)
                .style("fill", (d: any, i: number) => this.getPattern(i));
        }

        legend.append("text")
            .attr("x", 24)
            .attr("y", 9)
            .attr("dy", ".35em")
            .style("text-anchor", "start")
            .attr("fill", color)
            .style("font-size", fontSize)
            .style("font-weight", fontWeight)
            .text(d => d);

        // Calculate the width of the legend
        const legendWidth = legend.nodes().reduce((acc: any, node: { getBBox: () => any; }, i: number) => {
            const bbox = node.getBBox();
            acc.width = acc.width + bbox.width + 20
            acc.widths[i] = i == 0 ? 0 : acc.widths[i - 1] + bbox.width + 20;
            return acc; // 10 is the spacing between legends
        }, {width: 0, widths: {}});

        // Center the legend
        const legendStartX = (width - legendWidth.width) / 2;
        legend.attr("transform", (d: any, i: number) => `translate(${legendStartX + legendWidth.widths[i]}, -30)`);
    }

    applyPatterns(node: d3.Selection<any, any, any, any>) {
        // Define patterns
        const defs = node.append("defs");
        const patterns = this.getPatterns()

        if (patterns.includes("stripes")) {
            defs.append("pattern")
                .attr("id", "pattern-stripes")
                .attr("width", 4)
                .attr("height", 4)
                .attr("patternUnits", "userSpaceOnUse")
                .append("path")
                .attr("d", "M 0 0 L 4 4 M 4 0 L 0 4")
                .attr("stroke", "#000")
                .attr("stroke-width", 1);
        }

        if (patterns.includes("dots"))
            defs.append("pattern")
                .attr("id", "pattern-dots")
                .attr("width", 6)
                .attr("height", 6)
                .attr("patternUnits", "userSpaceOnUse")
                .append("circle")
                .attr("cx", 3)
                .attr("cy", 3)
                .attr("r", 1)
                .attr("fill", "#000");

        if (patterns.includes("lines"))
            defs.append("pattern")
                .attr("id", "pattern-lines")
                .attr("width", 8)
                .attr("height", 8)
                .attr("patternUnits", "userSpaceOnUse")
                .append("path")
                .attr("d", "M 0 8 L 8 0")
                .attr("stroke", "#000")
                .attr("stroke-width", 1);
    }

    getPatterns() {
        return "patterns" in this.chartConfig ? this.chartConfig.patterns : undefined
    }

    get showPatterns() {
        return !!this.getPatterns()
    }

    getPattern(i: number) {
        const patterns = this.getPatterns()
        const pattern = patterns[i % patterns.length]
        return `url(#pattern-${pattern})`
    }
}
