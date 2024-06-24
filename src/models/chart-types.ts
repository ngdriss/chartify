import {Meta} from "./type-attributes"

export type ChartDataDistribution = 'random' | 'trend-up' | 'trend-down'
export type ChartCurveType = 'simple' | 'curved'
export type ChartDirection = 'vertical' | 'horizontal'
export type ChartPattern = 'stripes' | 'dots' | 'lines'

export class LineChartConfig {
    static default: LineChartConfig = {
        type: "line",
        lines: 3,
        points: 5,
        distribution: "random",
        curve: "curved",
        displayPoints: false,
        dashed: false,
        showAxis: true,
        showLegend: true,
        rangeX: 100,
        rangeY: 100
    }
    @Meta type: 'line'
    @Meta lines: number
    @Meta points: number
    @Meta distribution: ChartDataDistribution
    @Meta curve: ChartCurveType
    @Meta displayPoints: boolean
    @Meta dashed: boolean
    @Meta showAxis?: boolean
    @Meta showLegend?: boolean
    @Meta rangeX?: number
    @Meta rangeY?: number
}

export class AreaChartConfig {
    static default: AreaChartConfig = {
        type: "area",
        lines: 3,
        points: 5,
        distribution: "random",
        curve: "curved",
        displayPoints: false,
        dashed: false,
        showAxis: true,
        showLegend: true,
        stacked: true,
        rangeX: 100,
        rangeY: 100
    }
    @Meta type: 'area'
    @Meta lines: number
    @Meta points: number
    @Meta distribution: ChartDataDistribution
    @Meta curve: ChartCurveType
    @Meta displayPoints: boolean
    @Meta dashed: boolean
    @Meta showAxis?: boolean
    @Meta showLegend?: boolean
    @Meta rangeX?: number
    @Meta rangeY?: number
    @Meta stacked?: boolean
    @Meta patterns?: ChartPattern[]
}

export class BarChartConfig {
    static default: BarChartConfig = {
        type: "bar",
        entries: 5,
        maxValue: 100,
        barWidth: 10,
        direction: "vertical",
        showAxis: true,
        showLegend: true
    }
    @Meta type: 'bar'
    @Meta entries: number
    @Meta maxValue: number
    @Meta barWidth: number
    @Meta direction: ChartDirection
    @Meta showAxis: boolean
    @Meta showLegend?: boolean
    @Meta patterns?: ChartPattern[]
}

export class DonutChartConfig {
    static default: DonutChartConfig = {
        type: "donut",
        entries: 5,
        padAngle: 0,
        innerRadius: 75,
        cornerRadius: 0,
        showLegend: true,
    }
    @Meta type: 'donut'
    @Meta entries: number
    @Meta innerRadius: number
    @Meta padAngle: number
    @Meta cornerRadius: number
    @Meta showLegend?: boolean
    @Meta patterns?: ChartPattern[]
}

export class PieChartConfig {
    static default: PieChartConfig = {
        type: 'pie',
        entries: 5,
        cornerRadius: 0,
        showLegend: true,
    }
    @Meta type: 'pie'
    @Meta entries: number
    @Meta cornerRadius: number
    @Meta showLegend?: boolean
    @Meta patterns?: ChartPattern[]
}

export type ChartTypes = LineChartConfig | AreaChartConfig | BarChartConfig | DonutChartConfig | PieChartConfig

export function getDefaultConfig(type: ChartTypes['type']) {
    switch (type) {
        case "line":
            return LineChartConfig.default;
        case "area":
            return AreaChartConfig.default;
        case "bar":
            return BarChartConfig.default;
        case "donut":
            return DonutChartConfig.default;
        case "pie":
            return PieChartConfig.default;
        default:
            throw new Error("type not found")
    }
}

