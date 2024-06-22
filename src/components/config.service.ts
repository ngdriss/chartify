import {Injectable, signal} from "@angular/core";
import { Config } from "../models/config";
import {set} from "lodash";

@Injectable({
    providedIn: 'root'
})
export class ConfigService {
    private _config = signal<Config>(null)

    get config() {
        return this._config.asReadonly()
    }
    setConfig(config: Config) {
        this._config.set(config)
    }

    updateConfig(path: string, value: any) {
        const newConfig = set(this._config() || {}, path, value)
        this._config.set({...newConfig})
        return this._config()
    }

}
