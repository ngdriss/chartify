import {inject, Injectable} from '@angular/core';
import {FigmaService} from "./figma.service";

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private figmaService = inject(FigmaService)

  get(key: string, targetKey: string, handler: (action: any) => void) {
    this.figmaService.onAction(targetKey, handler)
    this.figmaService.sendAction(({type: 'storage', operation: 'get', key, targetKey}))
  }
  set(key: string, payload: any) {
    this.figmaService.sendAction(({type: 'storage', operation: 'set', key, payload}))
  }
  delete(key: string) {
    this.figmaService.sendAction(({type: 'storage', operation: 'delete', key}))
  }
}
