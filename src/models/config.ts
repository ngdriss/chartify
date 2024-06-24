import {ChartTypes} from "./chart-types";
import {Points} from "./data";

export type Config = {
    id?: string;
    chartConfig?: ChartTypes
    display?: {
        axis?: {
            color?: string
            fontSize: number
            fontWeight: number
        }
        legends?: {
            color?: string
            fontSize: number
            fontWeight: number
        }
    }
    dimensions?: {
        width?: number
        height?: number
    }
    data?: Points[]
}
