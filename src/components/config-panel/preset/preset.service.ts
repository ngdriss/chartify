import {inject, Injectable, signal} from "@angular/core";
import {StorageService} from "../../storage.service";
import {get} from "lodash";
import {Preset} from "../../../models/preset";
import {ConfigService} from "../../config.service";

@Injectable()
export class PresetService {
    private storageService = inject(StorageService)
    private configService = inject(ConfigService)
    private _presets = signal<Preset[]>([])
    private _selectedPreset = signal<string>(null)

    constructor() {
        this.loadPresets()
    }

    get presets() {
        return this._presets.asReadonly();
    }

    get selectedPreset() {
        return this._selectedPreset.asReadonly();
    }

    loadPresets() {
        this.storageService.get('presets', 'load-presets', (action) => this._presets.set(action.payload || []))
        this.storageService.get('selectedPreset', 'load-selected-preset', (action) => this._selectedPreset.set(action.payload))
    }

    addPreset(preset: Preset) {
        const data = [preset, ...this._presets()]
        this.storageService.set('presets', data)
        this._presets.set(data)
    }

    deletePreset(id: string) {
        const data = this._presets().filter(item => item.id !== id)
        this.storageService.set('presets', data);
        this._presets.set(data);
        const selectedPresetExists = data.some((item) => item.id == this._selectedPreset())
        if (!selectedPresetExists) {
            this._selectedPreset.set(get(data, [0, 'id']))
        }
    }

    updateSelectedPreset(id: string) {
        this.storageService.set('selectedPreset', id)
        this._selectedPreset.set(id)
        const selectedPreset = this._presets().find(preset => preset.id === id);
        this.configService.setConfig(selectedPreset.config)
    }
}
