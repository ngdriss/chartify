import {inject, Injectable} from '@angular/core';
import {FigmaService} from "./figma.service";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private figmaService = inject(FigmaService)

  get(key: string, targetKey: string, handler: (action: any) => void) {
    let loaded$ = new Subject<boolean>();
    this.figmaService.onAction(targetKey, (args) => {
      handler(args)
      loaded$.next(true)
      loaded$.complete();
    })
    this.figmaService.sendAction(({type: 'storage', operation: 'get', key, targetKey}))
    return loaded$
  }
  set(key: string, payload: any) {
    this.figmaService.sendAction(({type: 'storage', operation: 'set', key, payload}))
  }
  delete(key: string) {
    this.figmaService.sendAction(({type: 'storage', operation: 'delete', key}))
  }
}
