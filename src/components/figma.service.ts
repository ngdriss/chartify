import { Injectable } from '@angular/core';
import {PluginMessage} from "../../plugin/plugin-message";

@Injectable({
  providedIn: 'root'
})
export class FigmaService {

  sendAction(action: PluginMessage) {
    parent.postMessage({ pluginMessage: action }, '*');
  }

  onAction(actionType: string, callback: (action: PluginMessage) => void) {
    window.addEventListener('message', (event) => {
      const pluginMessage = (event.data as any)?.pluginMessage;
      if (pluginMessage?.type === actionType) {
        callback(pluginMessage);
      }
    });
  }
}
