import {ActionHandlerFactory, PluginMessage} from "./plugin-message";

figma.showUI(__html__, { themeColors: true, width: 600, height: 600 });
figma.ui.onmessage = (action: PluginMessage) => {
    const actionHandler = ActionHandlerFactory.create(action);
    actionHandler.execute();
};

export type CurrentNode = {
    width: number;
    height: number;
    id: string;
}

function sendSelectedNode() {
    if (figma.currentPage.selection.length > 0) {
        const node = figma.currentPage.selection[0];
        figma.ui.postMessage({type: 'selected-node-meta', width: node.width, height: node.height, id: node.id});
    }
}
sendSelectedNode();

figma.on('selectionchange', () => {
    sendSelectedNode();
})
