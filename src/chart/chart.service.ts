import {inject, Injectable} from '@angular/core';
import {FigmaService} from "../components/figma.service";
import {ChartGeneratorConfig, ChartGeneratorFactory} from "./generators/chart-generator";
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
        const {root} = this.previewChart(config)
        const action: CreateChartMessage = {
            type: 'create-chart',
            svg: root.node().outerHTML,
            nodeId: this.currentFigmaNodeService?.id
        }
        this.figmaService.sendAction(action)
    }

    previewChart(config: Config) {
        const type = config?.chartConfig?.type
        const chartGeneratorConfig: ChartGeneratorConfig = {
            config,
            meta: {
                colors: this.colorsService.colors()
            },
            isPreview: true
        }
        const chartGenerator = ChartGeneratorFactory.create(type, chartGeneratorConfig);
        return chartGenerator.generate();
    }
}
