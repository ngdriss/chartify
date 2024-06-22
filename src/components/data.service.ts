import {inject, Injectable} from "@angular/core";
import {DataGeneratorFactory} from "../chart/data-generator";
import { Config } from "src/models/config";
import {CurrentFigmaNodeService} from "./current-figma-node.service";
import {isNil} from "lodash";

@Injectable({
    providedIn: 'root'
})
export class DataService {
    currentFigmaNodeService = inject(CurrentFigmaNodeService)
    cache = {}
    lastConfig: Config['chartConfig']
    getData(config: Config['chartConfig'], purge?: boolean, compareWithLast?: boolean) {
        const key = DataGeneratorFactory.getType(config.type)
        const pointGenerator = DataGeneratorFactory.create(config.type)
        if (purge || !this.cache[key] || (compareWithLast && this.shouldUpdate(config))) {
            this.lastConfig = config;
            return this.cache[key] = pointGenerator.generate(config, this.currentFigmaNodeService.dimensions)
        }
        this.lastConfig = config;
        return this.cache[key]
    }
    private shouldUpdate(newValue: any) {
        return isNil(this.lastConfig) || ['lines', 'points', 'distribution', 'entries', 'rangeX', 'rangeY'].some(key => this.lastConfig[key] !== newValue[key])
    }
}
