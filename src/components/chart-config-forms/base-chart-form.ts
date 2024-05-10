import {Directive, inject} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AppStateService} from "../app-state.service";

@Directive()
export abstract class BaseChartForm {
    appStateService = inject(AppStateService);
    fb = inject(FormBuilder);
    fg: FormGroup

    init() {

    }

    get initialFormData() {
        return this.appStateService.geChartConfig(this.appStateService.selectedChartType) || this.defaultFormData
    }

    abstract get defaultFormData(): any;
}
