import {Config} from "../../models/config";
import {LineChartGenerator} from "./line-chart.generator";
import {BaseChartGenerator} from "./base-chart.generator";
import {AreaChartGenerator} from "./area-chart.generator";
import {BarChartGenerator} from "./bar-chart.generator";
import {DonutChartGenerator} from "./donut-chart.generator";
import {PieChartGenerator} from "./pie-chart.generator";


export type ChartGeneratorConfig = {
    config: Config
    meta: {
        colors: string[]
    }
    isPreview?: boolean
}

export class ChartGeneratorFactory {
    static create(type: string, chartGeneratorConfig: ChartGeneratorConfig): BaseChartGenerator {
        switch (type) {
            case 'line':
                return new LineChartGenerator(chartGeneratorConfig);
            case 'area':
                return new AreaChartGenerator(chartGeneratorConfig);
            case 'bar':
                return new BarChartGenerator(chartGeneratorConfig);
            case 'pie':
                return new PieChartGenerator(chartGeneratorConfig);
            case 'donut':
                return new DonutChartGenerator(chartGeneratorConfig);
            default:
                throw new Error('Unknown chart type');
        }
    }
}
