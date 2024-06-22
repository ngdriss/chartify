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
            case 'storage':
                return new StorageAction(action)
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

class CreateChartAction extends BaseAction implements ActionHandler {
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

class StorageAction extends BaseAction implements ActionHandler {
    execute() {
        const {operation, key, targetKey, payload} = this.action;

        switch (operation) {
            case 'get':
                this.get(key, targetKey)
                return;
            case 'set':
                this.set(key, payload)
                return;
            case 'delete':
                this.delete(key)
                return;
        }
    }

    private get(key: any, targetKey: any) {
        figma.clientStorage.getAsync(key)
            .then((payload) => figma.ui.postMessage({type: targetKey, payload}))
    }

    private set(key: any, payload: any) {
        figma.clientStorage.setAsync(key, payload).then()
    }
    private delete(key: any) {
        figma.clientStorage.deleteAsync(key).then()
    }
}

