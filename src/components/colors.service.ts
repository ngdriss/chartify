import {inject, Injectable, signal} from "@angular/core";
import * as d3 from "d3";
import {FigmaService} from "./figma.service";

@Injectable({
    providedIn: 'root'
})
export class ColorsService {
    figmaService = inject(FigmaService)
    // @ts-ignore
    colors = signal<string[]>(d3.schemeCategory10)

    constructor() {
        this.figmaService.onAction('load-colors', (action) => {
            console.log(action)
            if (action.colors)
            this.colors.set(action.colors)
        })
        this.figmaService.sendAction({type: 'load-colors'})
    }

    addColor(color: string) {
        const colors = [...this.colors(), color]
        this.figmaService.sendAction({type: 'set-colors', colors});
        this.colors.set(colors);
    }
    resetColors() {
        const colors = [...d3.schemeCategory10]
        this.figmaService.sendAction({type: 'set-colors', colors});
        this.colors.set(colors);
    }

    removeColor(color: string) {
        const colors = this.colors().filter(clr => clr !== color)
        this.figmaService.sendAction({type: 'set-colors', colors});
        this.colors.set(colors);
    }

}
