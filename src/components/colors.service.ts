import {inject, Injectable, signal} from "@angular/core";
import * as d3 from "d3";
import {FigmaService} from "./figma.service";

@Injectable()
export class ColorsService {
    figmaService = inject(FigmaService)
    initialColors = signal<string[]>([])

    constructor() {
        this.figmaService.onAction('LOAD_COLORS', (action) => {
            this.initialColors = action.colors || d3.schemeCategory10
        })
        this.figmaService.sendAction({type: 'LOAD_COLORS'})
    }

    addColor(color: string) {
        const colors = [...this.initialColors(), color]
        this.figmaService.sendAction({type: 'SET_COLORS', colors});
        this.initialColors.set(colors);
    }

    removeColor(color: string) {
        const colors = this.initialColors().filter(clr => clr !== color)
        this.figmaService.sendAction({type: 'SET_COLORS', colors});
        this.initialColors.set(colors);
    }

}
