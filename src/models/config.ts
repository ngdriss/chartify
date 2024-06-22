import {ChartTypes} from "./chart-types";
import {Points} from "./data";

export type Config = {
    id?: string;
    chartConfig?: ChartTypes
    data?: Points[]
}
