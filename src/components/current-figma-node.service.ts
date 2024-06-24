import {inject, Injectable, signal} from "@angular/core";
import {FigmaService} from "./figma.service";
import {SelectedNodeMetaMessage} from "../../plugin/plugin-message";
import {CurrentNode} from "../../plugin/code";
import {Dimensions} from "../models/data";
import {Initializer} from "./initializer";

@Injectable({
    providedIn: 'root'
})
export class CurrentFigmaNodeService implements Initializer {
    private figmaService = inject(FigmaService);
    hasNode = signal(false)
    private _currentNode?: CurrentNode;

    get width(): number {
        return this._currentNode?.width || 600;
    }

    get height(): number {
        return this._currentNode?.height || 600;
    }

    get dimensions(): Dimensions {
        return ({width: this.width, height: this.height})
    }

    get id(): string {
        return this._currentNode?.id;
    }

    start() {
        return this.figmaService.onAction('selected-node-meta', (action) => {
            this._currentNode = (action as SelectedNodeMetaMessage);
            this.hasNode.set(!!this.id)
        })
    }
}
