import {globalFigma} from "./shared";

export type PluginMessage<Input extends any = any> = { type: string; } & Input;

export type CreateChartMessage =  PluginMessage<{
    type: 'create-chart';
    svg: string
    nodeId: string
}>

export type SelectedNodeMetaMessage =  PluginMessage<{
    type: 'selected-node-meta';
    width: number;
    height: number;
    id: string;
}>

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
    constructor(protected action: PluginMessage) {}
}

export class CreateChartAction extends BaseAction implements ActionHandler {
    execute() {
        this.createLineChart(this.action)
    }
    private createLineChart(input: CreateChartMessage) {
        // Create a Figma node representing the SVG
        const svgNode = globalFigma.createNodeFromSvg(input.svg);

        globalFigma.getNodeByIdAsync(input.nodeId)

            .then((currentNode?: SceneNode) => {
                if (!currentNode) {
                    return;
                }
                if (currentNode.parent) {
                    currentNode.parent.appendChild(svgNode);
                    currentNode.remove();
                    globalFigma.currentPage.selection = [svgNode];
                }
                else {
                    globalFigma.currentPage.appendChild(svgNode);
                }
            })
    }
}


