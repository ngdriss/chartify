import {inject, Injectable} from '@angular/core';
import {FigmaService} from "../components/figma.service";
import {DataGeneratorFactory} from "./data-generator";
import {ChartGeneratorFactory} from "./chart-generator";
import {CurrentFigmaNodeService} from "../components/current-figma-node.service";
import {CreateChartMessage} from "../../plugin/plugin-message";
import {ColorsService} from "../components/colors.service";

@Injectable({
    providedIn: 'root'
})
export class ChartService {
    figmaService = inject(FigmaService);
    currentFigmaNodeService = inject(CurrentFigmaNodeService);
    colorsService = inject(ColorsService);
    cachedData: any = {};

    createChart(options: any, type: string, force?: boolean) {
        const chartGenerator = ChartGeneratorFactory.create(type);
        const data = this.getData(options, type, force);
        const input = {
            data,
            type,
            width: this.currentFigmaNodeService?.width,
            height: this.currentFigmaNodeService?.height,
            options,
            config: {
                colors: this.colorsService.colors()
            }
        }
        chartGenerator.input = input;
        const {svg} = chartGenerator.generate(input);
        const action: CreateChartMessage = {
            type: 'create-chart',
            svg: svg.node().outerHTML,
            nodeId: this.currentFigmaNodeService?.id
        }
        this.figmaService.sendAction(action)
    }

    private getData(options: any, type: string, force?: boolean) {
        const pointGenerator = DataGeneratorFactory.create(type);
        const key = type;
        if (this.cachedData[key] && !force) {
            return this.cachedData[key];
        }
        this.cachedData[key] = pointGenerator.generate(options, this.currentFigmaNodeService.dimensions);
        return this.cachedData[key];
    }

    previewChart(options: any, type: string, force?: boolean) {
        const chartGenerator = ChartGeneratorFactory.create(type);
        const data = this.getData(options, type, force);
        const input = {
            data,
            type,
            width: this.currentFigmaNodeService?.width,
            height: this.currentFigmaNodeService?.height,
            options,
            isPreview: true,
            config: {
                colors: this.colorsService.colors()
            }
        }
        chartGenerator.input = input;
        chartGenerator.generate(input);
    }
}
