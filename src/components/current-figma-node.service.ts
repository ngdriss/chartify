import {inject, Injectable} from "@angular/core";
import {FigmaService} from "./figma.service";
import {SelectedNodeMetaMessage} from "../../plugin/plugin-message";

@Injectable({
    providedIn: 'root'
})
export class CurrentFigmaNodeService {
    figmaService = inject(FigmaService);
    private _currentNode?: { width: number; height: number, id: string };
    get currentNode() {
        if (!this._currentNode) throw new Error('No current node');
        return this._currentNode;
    }

    constructor() {
        this.figmaService.onAction('selected-node-meta', (action) => {
            this._currentNode = (action as SelectedNodeMetaMessage);
        });
    }
}
