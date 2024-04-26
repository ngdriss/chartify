import {ActionHandlerFactory, PluginMessage} from "./plugin-message";

figma.showUI(__html__, { themeColors: true, width: 600, height: 600 });
figma.ui.onmessage = (action: PluginMessage) => {
    const actionHandler = ActionHandlerFactory.create(action);
    actionHandler.execute();
};

if (figma.currentPage.selection.length > 0) {
    const node = figma.currentPage.selection[0];
    figma.ui.postMessage({type: 'selected-node-meta', data: {width: node.width, height: node.height}});
}

figma.on('selectionchange', () => {
    if (figma.currentPage.selection.length > 0) {
        const node = figma.currentPage.selection[0];
        figma.ui.postMessage({type: 'selected-node-meta', data: {width: node.width, height: node.height}});
    }
})
