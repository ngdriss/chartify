import {inject, Injectable} from "@angular/core";
import {FigmaService} from "./figma.service";
import {SelectedNodeMetaMessage} from "../../plugin/plugin-message";

@Injectable({
    providedIn: 'root'
})
export class CurrentFigmaNodeService {
    figmaService = inject(FigmaService);
    currentNode?: { width: number; height: number };

    constructor() {
        this.figmaService.onAction('selected-node-meta', (action) => {
            this.currentNode = (action as SelectedNodeMetaMessage).data;
        });
    }
}
