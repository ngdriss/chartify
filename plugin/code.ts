import {ActionHandlerFactory} from "./plugin-message";
import {DIMENSIONS} from "./shared";
import {keys} from "lodash";

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
    const node = figma.currentPage.selection[0];
    figma.ui.postMessage({type: 'selected-node-meta', width: node?.width, height: node?.height, id: node?.id});
}

sendSelectedNode();

figma.on('selectionchange', () => {
    sendSelectedNode();
})

type Token = {
    id: string
    name: string
    type: 'LOCAL' | 'VARIABLE'
    value?: any
    meta?: any
}

const tokens: Token[] = []
Promise.all([
    figma.variables.getLocalVariablesAsync("COLOR"),
    figma.getLocalPaintStylesAsync()
]).then(([variables, localPaints]) => {
    localPaintsToTokens(variables)
    styleToToken(localPaints)
    figma.ui.postMessage({type: 'palettes', palettes: tokens})
})

function localPaintsToTokens(variables: any) {
    const getFirstKeyValue = (obj: any) => {
        const key = keys(obj)[0]
        if (key) return obj[key]
    }
    variables.forEach((variable: Variable) => {
        tokens.push({
            id: variable.id,
            name: variable.name,
            type: "VARIABLE",
            value: rgbToHex(getFirstKeyValue(variable.valuesByMode))
        })
    })
}

function styleToToken(styles: any[]) {
    styles.forEach((current: any) => {
        const paints = current.paints.filter(
            ({visible, type}) => visible && type === "SOLID"
        );
        if (paints.length === 1) {
            const {
                blendMode,
                color: {r, g, b},
                opacity
            } = paints[0];
            const hex = rgbToHex({r, g, b});
            if (blendMode === "NORMAL") {
                const uniqueId = [hex, opacity].join("-");
                tokens.push({
                    id: current.id,
                    name: current.name,
                    type: 'LOCAL',
                    value: hex,
                    meta: {
                        opacity
                    }
                })
            } else {
                // do something different i guess
            }
        }
    })
}

function rgbToHex(rgb: any) {
    if (!rgb) return null
    const {r, g, b} = rgb;
    const toHex = (value) => {
        const hex = Math.round(value * 255).toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    };

    const hex = [toHex(r), toHex(g), toHex(b)].join("");
    return `#${hex}`;
}
