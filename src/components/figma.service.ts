import {Injectable} from '@angular/core';
import {PluginMessage} from "../../plugin/plugin-message";
import {Subject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class FigmaService {
    eventBus: Record<string, Subject<any>> = {}

    sendAction(action: PluginMessage) {
        if (!this.eventBus[action.type]) {
            this.eventBus[action.type] = new Subject<boolean>()
        }
        parent.postMessage({pluginMessage: action}, '*');
    }

    onAction(actionType: string, callback: (action: PluginMessage) => void) {
        if (!this.eventBus[actionType]) {
            this.eventBus[actionType] = new Subject<boolean>()
        }
        window.addEventListener('message', (event) => {
            const pluginMessage = (event.data as any)?.pluginMessage;
            if (pluginMessage?.type === actionType) {
                callback(pluginMessage);
                this.eventBus[actionType].next(true)
                this.eventBus[actionType].complete()
                this.eventBus[actionType] = undefined;
            }
        });
        return this.eventBus[actionType]
    }
}
