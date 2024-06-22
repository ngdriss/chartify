import {inject, Injectable} from '@angular/core';
import {FigmaService} from "../components/figma.service";
import {DataGeneratorFactory} from "./data-generator";
import {ChartGeneratorFactory} from "./chart-generator";
import {CurrentFigmaNodeService} from "../components/current-figma-node.service";
import {CreateChartMessage} from "../../plugin/plugin-message";
import {ColorsService} from "../components/colors.service";
import { Config } from 'src/models/config';

@Injectable({
    providedIn: 'root'
})
export class ChartService {
    figmaService = inject(FigmaService);
    currentFigmaNodeService = inject(CurrentFigmaNodeService);
    colorsService = inject(ColorsService);

    createChart(config: Config) {
        const type = config?.chartConfig?.type
        const chartGenerator = ChartGeneratorFactory.create(type);
        const data = config.data;
        const input = {
            data,
            type,
            width: this.currentFigmaNodeService?.width,
            height: this.currentFigmaNodeService?.height,
            options: config.chartConfig,
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

    previewChart(config: Config) {
        const type = config?.chartConfig?.type
        const chartGenerator = ChartGeneratorFactory.create(type);
        const data = config.data;
        const input = {
            data,
            type,
            width: this.currentFigmaNodeService?.width,
            height: this.currentFigmaNodeService?.height,
            options: config.chartConfig,
            isPreview: true,
            config: {
                colors: this.colorsService.colors()
            }
        }
        chartGenerator.input = input;
        chartGenerator.generate(input);
    }
}
