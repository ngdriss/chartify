import {computed, effect, inject, Injectable, signal} from "@angular/core";
import * as d3 from "d3";
import {StorageService} from "./storage.service";
import {FigmaService} from "./figma.service";

@Injectable({
    providedIn: 'root'
})
export class ColorsService {
    storageService = inject(StorageService)
    figmaService = inject(FigmaService)
    // @ts-ignore
    _colors = signal<string[]>(d3.schemeCategory10)
    _palettes = signal<any[]>([])

    get colors() {
        return this._colors.asReadonly()
    }

    get palettes() {
        return this._palettes.asReadonly()
    }

    palettesMap = computed(() => {
        const palettes = this._palettes()
        const map = new Map()
        palettes.forEach((curr) => {
            map.set(curr.id, curr.value)
        })
        return map
    })

    constructor() {
        this.storageService.get('colors', 'load-colors', (action) => this._colors.set(action.payload || d3.schemeCategory10))
        this.figmaService.onAction('palettes', (action) => this._palettes.set(action.palettes || []))

        effect(() => {
            console.log(this.palettesMap())
        })
    }

    addColor(color: string) {
        const colors = [...this._colors(), color]
        this.storageService.set('colors', colors);
        this._colors.set(colors);
    }

    resetColors() {
        const colors = [...d3.schemeCategory10]
        this.storageService.set('colors', colors);
        this._colors.set(colors);
    }

    removeColor(color: string) {
        const colors = this._colors().filter(clr => clr !== color)
        this.storageService.set('colors', colors);
        this._colors.set(colors);
    }

    updateColor(color: string, newColor: string) {
        const index = this._colors().findIndex(clr => clr === color)
        if (index >= 0) {
            const colors = this._colors().splice(index, 1, newColor)
            this.storageService.set('colors', colors);
            this._colors.set(colors);
        }
    }

}
