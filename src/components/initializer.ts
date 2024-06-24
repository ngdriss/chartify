import {forkJoin, Observable} from "rxjs";
import {ColorsService} from "./colors.service";
import {APP_INITIALIZER} from "@angular/core";
import {CurrentFigmaNodeService} from "./current-figma-node.service";
import {ConfigInitializer} from "./config.initializer";
import {finalize} from "rxjs/operators";
import {LoadingService} from "./loading.service";

export interface Initializer {
    start(): Observable<any>
}

function appInitializer(loadingService: LoadingService, colorsService: ColorsService, currentFigmaNodeService: CurrentFigmaNodeService, configInitializer: ConfigInitializer) {
    return () => forkJoin([
        colorsService.start(),
        currentFigmaNodeService.start(),
        configInitializer.start()
    ]).pipe(
        finalize(() => loadingService.done())
    )
}

export function provideInitializers() {
    return ({
        provide: APP_INITIALIZER,
        useFactory: appInitializer,
        deps: [LoadingService, ColorsService, CurrentFigmaNodeService, ConfigInitializer],
        multi: true
    })
}
