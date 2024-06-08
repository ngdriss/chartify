/// <reference path="../node_modules/@figma/plugin-typings/index.d.ts" />
export const globalFigma = figma;

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
            case 'load-colors':
                return new LoadColorAction(action)
            case 'set-colors':
                return new SetColorAction(action)
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
                if (!currentNode || !currentNode.parent) {
                    globalFigma.currentPage.appendChild(svgNode);
                    return;
                }
                const {x, y} = currentNode;
                svgNode.x = x;
                svgNode.y = y;
                currentNode.parent.appendChild(svgNode);
                currentNode.remove();
                globalFigma.currentPage.selection = [svgNode];
            })
    }
}

export class LoadColorAction extends BaseAction implements ActionHandler {
    execute() {
        figma.clientStorage.getAsync('colors')
            .then((colors) => figma.ui.postMessage({type: 'load-colors', colors}))
    }
}

class SetColorAction extends BaseAction implements ActionHandler {
    async execute() {
        await figma.clientStorage.setAsync('colors', this.action.colors)
    }

}

