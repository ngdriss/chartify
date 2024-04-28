import {
    ChangeDetectionStrategy,
    Component,
    effect,
    inject,
    Type, ViewChild,
    ViewContainerRef
} from '@angular/core';
import {AppStateService} from 'src/components/app-state.service';
import {toSignal} from "@angular/core/rxjs-interop";
import {LineChartForm} from "./line-chart-form/line-chart-form";
import {AreaChartForm} from "./area-chart-form/area-chart-form";
import {BarChartForm} from "./bar-chart-form/bar-chart-form";
import {PieChartForm} from "./pie-chart-form/pie-chart-form";
import {DonutChartForm} from "./donut-chart-form/donut-chart-form";
import {FormBuilder} from "@angular/forms";
import {TitleCasePipe} from "@angular/common";

@Component({
    selector: 'kj-data-form',
    standalone: true,
    providers: [FormBuilder],
    template: `
        <h4>{{selectedChartType() | titlecase}} chart</h4>
        <ng-container #vcr></ng-container>
    `,
    styleUrl: './data-form.scss',
    imports: [
        TitleCasePipe
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataForm {
    appStateService = inject(AppStateService);
    selectedChartType = toSignal(this.appStateService.select$('selectedChartType'));
    registry: Map<string, Type<any>>;

    @ViewChild('vcr', {read: ViewContainerRef, static: true}) container: ViewContainerRef;

    constructor() {
        this.registry = new Map([
            ['line', LineChartForm],
            ['area', AreaChartForm],
            ['bar', BarChartForm],
            ['pie', PieChartForm],
            ['donut', DonutChartForm]
        ]);

        effect(() => {
            const selectedChartType = this.selectedChartType();
            this.container.clear();
            const ref = this.container?.createComponent(this.registry.get(selectedChartType)!)
            ref.changeDetectorRef.markForCheck();
        })
    }
}
