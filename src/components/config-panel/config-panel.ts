import {
    ChangeDetectionStrategy,
    Component,
    Inject,
    inject,
    OnInit,
    Type,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import {AppStateService} from "../app-state.service";
import {LineChartForm} from "../chart-config-forms/line-chart-form/line-chart-form";
import {AreaChartForm} from "../chart-config-forms/area-chart-form/area-chart-form";
import {BarChartForm} from "../chart-config-forms/bar-chart-form/bar-chart-form";
import {PieChartForm} from "../chart-config-forms/pie-chart-form/pie-chart-form";
import {DonutChartForm} from "../chart-config-forms/donut-chart-form/donut-chart-form";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgForOf, TitleCasePipe} from "@angular/common";
import {BaseChartForm} from "../chart-config-forms/base-chart-form";
import {ChartService} from "../../chart/chart.service";
import {distinctUntilChanged, mergeMap, startWith} from "rxjs/operators";
import {TuiAccordionModule, TuiDataListWrapperModule, TuiSelectModule} from "@taiga-ui/kit";
import {TuiGroupModule, TuiSvgService, TuiTextfieldControllerModule} from "@taiga-ui/core";
import {tuiIconChevronDown} from "@taiga-ui/icons";
import {CurrentFigmaNodeService} from "../current-figma-node.service";
import {Preset} from "./preset/preset";
import {UserChartConfig} from "../../chart/chart-generator";
import {TuiInputColorModule} from "@tinkoff/tui-editor";

@Component({
    selector: 'kj-config-panel',
    standalone: true,
    providers: [FormBuilder],
    template: `
        <kj-preset class="px-2"/>
        <div class="px-2">
            <tui-select tuiTextfieldSize="m" [ngModel]="chartType" (ngModelChange)="onChartTypeChange($event)">
                Chart Type
                <input
                        placeholder="Choose your chart"
                        tuiTextfield
                />
                <tui-data-list-wrapper
                        *tuiDataList
                        [items]="chartTypes"
                ></tui-data-list-wrapper>
            </tui-select>
        </div>
        <tui-accordion
                [rounded]="false"
                [formGroup]="userChartConfigForm"
        >
            <tui-accordion-item
                    borders="top-bottom"
                    size="s"
                    formGroupName="display"
            >
                Display
                <ng-template tuiAccordionItemContent>
                    <h3>Labels</h3>
                    <div tuiGroup>
                        <tui-input-color>
                            Background color
                        </tui-input-color>
                    </div>
                </ng-template>
            </tui-accordion-item>
        </tui-accordion>
        <ng-container #vcr></ng-container>
    `,
    styleUrls: ['./config-panel.scss'],
    imports: [
        TitleCasePipe,
        FormsModule,
        NgForOf,
        TuiSelectModule,
        TuiDataListWrapperModule,
        TuiTextfieldControllerModule,
        Preset,
        TuiAccordionModule,
        ReactiveFormsModule,
        TuiGroupModule,
        TuiInputColorModule
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfigPanel implements OnInit {
    chartTypes = ['line', 'area', 'bar', 'pie', 'donut'];
    chartType = 'line'
    appStateService = inject(AppStateService);
    chartService = inject(ChartService);
    formBuilder = inject(FormBuilder);
    registry: Map<string, Type<BaseChartForm>>;
    userChartConfigForm = this.formBuilder.group({
        display: this.formBuilder.group({
            label: this.formBuilder.group({
                color: this.formBuilder.control(['']),
                fontFamily: this.formBuilder.control(['']),
                fontSize: this.formBuilder.control(['']),
            }),
            showGrid: this.formBuilder.control([false]),
            backgroundColor: this.formBuilder.control(['transparent']),
        })
    })

    @ViewChild('vcr', {read: ViewContainerRef, static: true}) container: ViewContainerRef;

    constructor(@Inject(TuiSvgService) tuiSvgService: TuiSvgService) {
        this.registry = new Map([
            ['line', LineChartForm],
            ['area', AreaChartForm],
            ['bar', BarChartForm],
            ['pie', PieChartForm],
            ['donut', DonutChartForm]
        ]);
        tuiSvgService.define({tuiIconChevronDown: tuiIconChevronDown});
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
                this.appStateService.updateChartConfig(newValue)
                const shouldUpdate = this.shouldUpdate(oldValue, newValue)
                this.chartService.previewChart(this.appStateService.getCurrentChartConfig(), this.appStateService.selectedChartType, initialized ? shouldUpdate : false)
                initialized = true
                oldValue = newValue
            })
    }

    onChartTypeChange(event: any) {
        this.appStateService.updateSelectedChartType(event);
    }

    private shouldUpdate(oldValue: any, newValue: any) {
        return ['lines', 'points', 'distribution', 'entries', 'rangeX', 'rangeY'].some(key => oldValue[key] !== newValue[key])
    }
}
