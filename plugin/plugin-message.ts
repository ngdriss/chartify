import {globalFigma} from "./shared";

export type PluginMessage = {
    type: string;
    data: any;
}

export type CreateChartMessage = {
    type: 'create-chart';
    data: string
}

export type SelectedNodeMetaMessage = {
    type: 'selected-node-meta';
    data: {
        width: number;
        height: number;
    }
}

export class ActionHandlerFactory {
    static create(action: PluginMessage) {
        switch (action.type) {
            case 'create-chart':
                return new CreateChartAction(action)
            default:
                throw new Error('Unknown action type')
        }
    }
}

export interface ActionHandler {
    execute(): void
}

export class BaseAction {
    constructor(protected action: PluginMessage) {
    }
}

export class CreateChartAction extends BaseAction implements ActionHandler {
    execute() {
        this.createLineChart(this.action.data)
    }
    private createLineChart(input: any) {
        // Create a Figma node representing the SVG
        const svgNode = globalFigma.createNodeFromSvg(input);
        globalFigma.currentPage.appendChild(svgNode);
    }
}


