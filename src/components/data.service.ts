import {inject, Injectable} from "@angular/core";
import {DataGeneratorFactory} from "../chart/data-generator";
import { Config } from "src/models/config";
import {CurrentFigmaNodeService} from "./current-figma-node.service";

@Injectable({
    providedIn: 'root'
})
export class DataService {
    currentFigmaNodeService = inject(CurrentFigmaNodeService)
    cache = {}
    getData(config: Config['chartConfig'], ignoreCache?: boolean) {
        const key = DataGeneratorFactory.getType(config.type)
        const pointGenerator = DataGeneratorFactory.create(config.type)
        if (ignoreCache || !this.cache[key]) {
            return this.cache[key] = pointGenerator.generate(config, this.currentFigmaNodeService.dimensions)
        }
        return this.cache[key]
    }
}
