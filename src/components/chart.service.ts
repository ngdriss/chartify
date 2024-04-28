import {inject, Injectable} from '@angular/core';
import {DataService} from "./data.service";
import {FigmaService} from "./figma.service";
import {PointGeneratorFactory} from "./point-generator";
import {ChartGeneratorFactory} from "./chart-generator";
import {CurrentFigmaNodeService} from "./current-figma-node.service";
import { CreateChartMessage} from "../../plugin/plugin-message";

@Injectable({
    providedIn: 'root'
})
export class ChartService {
    dataService = inject(DataService);
    figmaService = inject(FigmaService);
    currentFigmaNodeService = inject(CurrentFigmaNodeService);

    createChart() {
        const pointGenerator = PointGeneratorFactory.create('linear');
        const chartGenerator = ChartGeneratorFactory.create('line');
        const data = pointGenerator.generate(this.dataService.data);
        const input = {
            data,
            width: this.currentFigmaNodeService.currentNode?.width,
            height: this.currentFigmaNodeService.currentNode?.height
        }
        const svg = chartGenerator.generate(input);
        const action : CreateChartMessage = {type: 'create-chart', svg, nodeId: this.currentFigmaNodeService.currentNode?.id}
        this.figmaService.sendAction(action)
    }
}
