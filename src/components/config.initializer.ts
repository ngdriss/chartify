import {inject, Injectable} from "@angular/core";
import { Config } from "../models/config";
import {Initializer} from "./initializer";
import {Observable, Subject} from "rxjs";
import {getDefaultConfig} from "../models/chart-types";
import {ConfigService} from "./config.service";
import {DataService} from "./data.service";

@Injectable({
    providedIn: 'root'
})
export class ConfigInitializer implements Initializer {
    private configService = inject(ConfigService)
    private dataService = inject(DataService)

    start(): Observable<any> {
        const loading$ = new Subject()
        const chartConfig = getDefaultConfig("line");
        const config: Config = {
            chartConfig,
            display: {
                legends: {
                    color: "rgb(27, 31, 59)",
                    fontWeight: 400,
                    fontSize: 14
                },
                axis: {
                    color: "#0043FF",
                    fontWeight: 400,
                    fontSize: 10
                }
            },
            dimensions:  {
              height: 600,
              width: 600
            },
            data: this.dataService.getData(chartConfig)
        }
        this.configService.setConfig(config)
        loading$.next()
        loading$.complete()
        return loading$
    }

}
