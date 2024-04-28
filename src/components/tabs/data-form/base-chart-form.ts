import {Directive, inject} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {startWith} from "rxjs/operators";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {AppStateService} from "../../app-state.service";

@Directive()
export class BaseChartForm {
    appStateService = inject(AppStateService);
    fb = inject(FormBuilder);
    fg: FormGroup

    init() {
        this.fg.valueChanges
            .pipe(
                startWith(this.fg.value),
                takeUntilDestroyed()
            )
            .subscribe((value) => {
                this.appStateService.updateState({chartConfig: value})
            })
    }
}
