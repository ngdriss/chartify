import {inject, Injectable} from "@angular/core";
import {FigmaService} from "./figma.service";
import {SelectedNodeMetaMessage} from "../../plugin/plugin-message";
import {CurrentNode} from "../../plugin/code";

@Injectable({
    providedIn: 'root'
})
export class CurrentFigmaNodeService {
    figmaService = inject(FigmaService);
    private _currentNode?: CurrentNode;
    get currentNode(): CurrentNode {
        if (!this._currentNode) return ({
            width: 600,
            height: 600,
            id: null
        });
        return this._currentNode;
    }

    constructor() {
        this.figmaService.onAction('selected-node-meta', (action) => {
            this._currentNode = (action as SelectedNodeMetaMessage);
        });
    }
}
