import {inject, Injectable} from '@angular/core';
import {FigmaService} from "../components/figma.service";
import {PointGeneratorFactory} from "./data-generator";
import {ChartGeneratorFactory} from "./chart-generator";
import {CurrentFigmaNodeService} from "../components/current-figma-node.service";
import {CreateChartMessage} from "../../plugin/plugin-message";

@Injectable({
    providedIn: 'root'
})
export class ChartService {
    figmaService = inject(FigmaService);
    currentFigmaNodeService = inject(CurrentFigmaNodeService);
    createChart(options: any, type: string) {
        console.log('Creating chart', options, type);
        const pointGenerator = PointGeneratorFactory.create(type);
        const chartGenerator = ChartGeneratorFactory.create(type);
        const data = pointGenerator.generate(options, this.currentFigmaNodeService.currentNode);
        const input = {
            data,
            width: this.currentFigmaNodeService.currentNode?.width,
            height: this.currentFigmaNodeService.currentNode?.height,
            options
        }
        console.log('Input', input);
        const {svg} = chartGenerator.generate(input);
        const action: CreateChartMessage = {
            type: 'create-chart',
            svg: svg.node().outerHTML,
            nodeId: this.currentFigmaNodeService.currentNode?.id
        }
        this.figmaService.sendAction(action)
    }

    previewChart(options: any, type: string) {
        const pointGenerator = PointGeneratorFactory.create(type);
        const chartGenerator = ChartGeneratorFactory.create(type);
        const data = pointGenerator.generate(options, this.currentFigmaNodeService.currentNode);
        const input = {
            data,
            width: 500,
            height: 350,
            options,
            isPreview: true
        }
        console.log('Input', input);
        chartGenerator.generate(input);
    }
}
