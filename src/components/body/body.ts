import {ChangeDetectionStrategy, Component, effect, inject, Type, ViewChild, ViewContainerRef} from '@angular/core';
import {AppStateService} from "../app-state.service";
import {toSignal} from "@angular/core/rxjs-interop";
import {LineChartForm} from "../chart-config-forms/line-chart-form/line-chart-form";
import {AreaChartForm} from "../chart-config-forms/area-chart-form/area-chart-form";
import {BarChartForm} from "../chart-config-forms/bar-chart-form/bar-chart-form";
import {PieChartForm} from "../chart-config-forms/pie-chart-form/pie-chart-form";
import {DonutChartForm} from "../chart-config-forms/donut-chart-form/donut-chart-form";
import {FormBuilder, FormsModule} from "@angular/forms";
import {NgForOf, TitleCasePipe} from "@angular/common";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";

@Component({
    selector: 'kj-body',
    standalone: true,
    providers: [FormBuilder],
    template: `
        <ng-container #vcr></ng-container>
        <mat-form-field>
            <mat-label>Chart Type</mat-label>
            <mat-select (selectionChange)="onChartTypeChange($event.value)">
                <mat-option *ngFor="let chartType of chartTypes" [value]="chartType">{{chartType | titlecase}}</mat-option>
            </mat-select>
        </mat-form-field>
    `,
    styleUrls: ['./body.scss'],
    imports: [
        TitleCasePipe,
        MatFormFieldModule,
        MatSelectModule,
        FormsModule,
        NgForOf
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Body {
    chartTypes = ['line', 'area', 'bar', 'pie', 'donut'];
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
            this.container.clear();
            const selectedChartType = this.selectedChartType();
            const ref = this.container?.createComponent(this.registry.get(selectedChartType)!)
            ref.changeDetectorRef.markForCheck();
        })
    }

    onChartTypeChange(chartType: any) {
        this.appStateService.updateState({selectedChartType: chartType})
    }
}
