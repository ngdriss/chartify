import {
    ChangeDetectionStrategy,
    Component, effect,
    Inject,
    inject, Injector,
    signal,
    Type, viewChild,
    ViewContainerRef
} from '@angular/core';
import {ConfigService} from "../config.service";
import {LineChartForm} from "../chart-config-forms/line-chart-form/line-chart-form";
import {AreaChartForm} from "../chart-config-forms/area-chart-form/area-chart-form";
import {BarChartForm} from "../chart-config-forms/bar-chart-form/bar-chart-form";
import {PieChartForm} from "../chart-config-forms/pie-chart-form/pie-chart-form";
import {DonutChartForm} from "../chart-config-forms/donut-chart-form/donut-chart-form";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgForOf, TitleCasePipe} from "@angular/common";
import {BaseChartForm} from "../chart-config-forms/base-chart-form";
import {TuiAccordionModule, TuiDataListWrapperModule, TuiSelectModule} from "@taiga-ui/kit";
import {TuiGroupModule, TuiSvgService, TuiTextfieldControllerModule} from "@taiga-ui/core";
import {tuiIconChevronDown} from "@taiga-ui/icons";
import {Preset} from "./preset/preset";
import {TuiInputColorModule} from "@tinkoff/tui-editor";
import {getDefaultConfig} from "../../models/chart-types";
import {DataService} from "../data.service";

@Component({
    selector: 'kj-config-panel',
    standalone: true,
    providers: [FormBuilder],
    template: `
        <kj-preset class="px-2"/>
        <div class="px-2">
            <tui-select tuiTextfieldSize="m" [ngModel]="chartType()" (ngModelChange)="onChartTypeChange($event)">
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
        >
            <tui-accordion-item
                    borders="top-bottom"
                    size="s"
            >
                Display
                <ng-template tuiAccordionItemContent>
                    <tui-input-color tuiTextfieldSize="m">
                        Labels color
                    </tui-input-color>
                </ng-template>
            </tui-accordion-item>
            <tui-accordion-item
                    borders="top-bottom"
                    size="s"
                    [disabled]="!chartType()"
                    (openChange)="whenOpenChange($event)"
            >
                Config
                <ng-template tuiAccordionItemContent>
                    <ng-container #vcr></ng-container>
                </ng-template>
            </tui-accordion-item>
        </tui-accordion>
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
export class ConfigPanel {
    chartTypes = ['line', 'area', 'bar', 'pie', 'donut'];
    chartType = signal<string>(null)
    configService = inject(ConfigService);
    dataService = inject(DataService);
    registry: Map<string, Type<BaseChartForm>>

    container = viewChild('vcr', {read: ViewContainerRef})
    isConfigOpen = signal<boolean>(false)
    constructor(@Inject(TuiSvgService) tuiSvgService: TuiSvgService) {
        this.registry = new Map([
            ['line', LineChartForm],
            ['area', AreaChartForm],
            ['bar', BarChartForm],
            ['pie', PieChartForm],
            ['donut', DonutChartForm]
        ]);
        tuiSvgService.define({tuiIconChevronDown: tuiIconChevronDown});
        effect(() => {
            const chartConfig = this.configService.config()?.chartConfig
            this.chartType.set(chartConfig?.type)
        }, {allowSignalWrites: true})

        effect(() => {
            const chartType = this.chartType();
            const isConfigOpen = this.isConfigOpen();
            const container = this.container();
            if (!isConfigOpen || !chartType) {
                container?.clear();
                return;
            }
            const instanceType = this.registry.get(chartType);
            if (!instanceType) {
                console.warn(`chart instance type not found`)
                return;
            }
            if (container) {
                container.clear();
                const ref = container.createComponent(instanceType)
                ref.changeDetectorRef.markForCheck();
            }
        })
    }

    onChartTypeChange(type: any) {
        const defaultConfig = getDefaultConfig(type)
        this.configService.updateConfig('chartConfig', defaultConfig);
        this.configService.updateConfig('data', this.dataService.getData(defaultConfig));
    }

    whenOpenChange(isOpen: boolean) {
        this.isConfigOpen.set(isOpen)
    }
}
