import {PieChartConfig} from "../../models/chart-types";
import {DonutChartGenerator} from "./donut-chart.generator";

// @ts-ignore
export class PieChartGenerator extends DonutChartGenerator<PieChartConfig> {
    generate() {
        return super.generate()
    }
}
