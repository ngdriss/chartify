import {ActionHandlerFactory} from "./plugin-message";
import {DIMENSIONS} from "./shared";

figma.showUI(__html__, {themeColors: true, width: DIMENSIONS.width, height: DIMENSIONS.height});
figma.ui.onmessage = (action) => {
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

/*
async function checkAndRunPaidFeatureCode() {
    figma.payments.setPaymentStatusInDevelopment({type: "UNPAID"})
    if (figma.payments.status.type === "UNPAID") {
        await figma.payments.initiateCheckoutAsync({
            interstitial: "PAID_FEATURE"
        })
        if (figma.payments.status.type === "UNPAID") {
            figma.notify("Please upgrade to use this feature.")
            return
        }
    } else {
        figma.notify("Already paid. Running feature code.")
    }

    // DO STUFF
}

checkAndRunPaidFeatureCode()
 */
