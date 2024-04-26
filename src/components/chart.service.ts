import {inject, Injectable} from '@angular/core';
import {DataService} from "./data.service";
import {FigmaService} from "./figma.service";
import {PointGeneratorFactory} from "./point-generator";
import {ChartGeneratorFactory} from "./chart-generator";
import {CurrentFigmaNodeService} from "./current-figma-node.service";

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
        console.log('Creating chart with data:', this.dataService.data)
        const data = pointGenerator.generate(this.dataService.data);
        const input = {
            data,
            width: this.currentFigmaNodeService.currentNode?.width,
            height: this.currentFigmaNodeService.currentNode?.height
        }
        console.log('Data:', input)
        const svg = chartGenerator.generate(input);
        console.log('SVG:', svg)
        this.figmaService.sendAction({type: 'create-chart', data: svg})
    }
}
