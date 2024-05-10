import {ChangeDetectionStrategy, Component, inject, OnInit, Type, ViewChild, ViewContainerRef} from '@angular/core';
import {AppStateService} from "../app-state.service";
import {LineChartForm} from "../chart-config-forms/line-chart-form/line-chart-form";
import {AreaChartForm} from "../chart-config-forms/area-chart-form/area-chart-form";
import {BarChartForm} from "../chart-config-forms/bar-chart-form/bar-chart-form";
import {PieChartForm} from "../chart-config-forms/pie-chart-form/pie-chart-form";
import {DonutChartForm} from "../chart-config-forms/donut-chart-form/donut-chart-form";
import {FormBuilder, FormsModule} from "@angular/forms";
import {NgForOf, TitleCasePipe} from "@angular/common";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {BaseChartForm} from "../chart-config-forms/base-chart-form";
import {ChartService} from "../../chart/chart.service";
import {distinctUntilChanged, mergeMap, startWith} from "rxjs/operators";

@Component({
    selector: 'kj-body',
    standalone: true,
    providers: [FormBuilder],
    template: `
        <mat-form-field>
            <mat-label>Chart Type</mat-label>
            <select matNativeControl (change)="onChartTypeChange($event)">
                <option *ngFor="let chartType of chartTypes" [value]="chartType">{{chartType | titlecase}}</option>
            </select>
        </mat-form-field>
        <ng-container #vcr></ng-container>
    `,
    styleUrls: ['./body.scss'],
    imports: [
        TitleCasePipe,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        FormsModule,
        NgForOf
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Body implements OnInit {
    chartTypes = ['line', 'area', 'bar', 'pie', 'donut'];
    appStateService = inject(AppStateService);
    chartService = inject(ChartService);
    registry: Map<string, Type<BaseChartForm>>;

    @ViewChild('vcr', {read: ViewContainerRef, static: true}) container: ViewContainerRef;

    constructor() {
        this.registry = new Map([
            ['line', LineChartForm],
            ['area', AreaChartForm],
            ['bar', BarChartForm],
            ['pie', PieChartForm],
            ['donut', DonutChartForm]
        ]);
    }

    ngOnInit() {
        let initialized = false,
            oldValue = null;
        this.appStateService.selectedChartType$
            .pipe(
                distinctUntilChanged(),
                mergeMap((chartType) => {
                    initialized = false;
                    this.container.clear();
                    const ref = this.container?.createComponent(this.registry.get(chartType)!)
                    ref.changeDetectorRef.markForCheck();
                    oldValue = ref.instance.initialFormData;
                    return ref.instance.fg.valueChanges
                        .pipe(startWith(ref.instance.initialFormData))
                })
            )
            .subscribe((newValue) => {
                console.log('value', oldValue, newValue)
                this.appStateService.updateChartConfig(newValue)
                const shouldUpdate = this.shouldUpdate(oldValue, newValue)
                this.chartService.previewChart(this.appStateService.getCurrentChartConfig(), this.appStateService.selectedChartType, initialized ? shouldUpdate : false)
                initialized = true
                oldValue = newValue
            })
    }

    onChartTypeChange(event: any) {
        this.appStateService.updateSelectedChartType(event.target.value);
    }

    private shouldUpdate(oldValue: any, newValue: any) {
        return ['lines', 'points', 'distribution', 'entries'].some(key => oldValue[key] !== newValue[key])
    }
}
