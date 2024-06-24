import {ChangeDetectionStrategy, Component, computed, inject} from '@angular/core';
import {TuiInputColorModule} from "@tinkoff/tui-editor";
import {TuiTextfieldControllerModule} from "@taiga-ui/core";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {ConfigService} from "../../config.service";
import {TuiDataListWrapperModule, TuiInputNumberModule, TuiSelectModule} from "@taiga-ui/kit";
import {debounceTime} from "rxjs/operators";
import {NgIf} from "@angular/common";

@Component({
    selector: 'kj-display-config-form',
    standalone: true,
    imports: [
        TuiInputColorModule,
        TuiTextfieldControllerModule,
        ReactiveFormsModule,
        TuiInputNumberModule,
        TuiSelectModule,
        TuiDataListWrapperModule,
        NgIf
    ],
    template: `
        <ng-container [formGroup]="fg">
            <span>Legend</span>
            <div class="flex flex-col gap-2" formGroupName="legends">
                <tui-input-color formControlName="color" tuiTextfieldSize="m">
                    Color
                </tui-input-color>
                <tui-input-number
                        tuiTextfieldSize="m"
                        formControlName="fontSize"
                        tuiTextfieldPostfix="px"
                >
                    Font size
                </tui-input-number>
                <tui-select
                        tuiTextfieldSize="m"
                        formControlName="fontWeight"
                        [valueContent]="fontWeightValueContent"
                >
                    Font weight
                    <tui-data-list-wrapper
                            *tuiDataList
                            [itemContent]="fontWeightContent"
                            [items]="fontWeights"
                    ></tui-data-list-wrapper>
                    <ng-template #fontWeightValueContent let-item>
                        <span>{{item}} - {{fontWeightsMap[item]}}</span>
                    </ng-template>
                    <ng-template #fontWeightContent let-item>
                        <span [style.font-weight]="item">{{item}} - {{fontWeightsMap[item]}}</span>
                    </ng-template>
                </tui-select>
            </div>
            <ng-container *ngIf="supportsAxis()">
                <span>Axis</span>
                <div class="flex flex-col gap-2" formGroupName="axis">
                    <tui-input-color formControlName="color" tuiTextfieldSize="m">
                        Color
                    </tui-input-color>
                    <tui-input-number
                            tuiTextfieldSize="m"
                            formControlName="fontSize"
                            tuiTextfieldPostfix="px"
                    >
                        Font size
                    </tui-input-number>
                    <tui-select
                            tuiTextfieldSize="m"
                            formControlName="fontWeight"
                            [valueContent]="fontWeightValueContent"
                    >
                        Font weight
                        <tui-data-list-wrapper
                                *tuiDataList
                                [itemContent]="fontWeightContent"
                                [items]="fontWeights"
                        ></tui-data-list-wrapper>
                        <ng-template #fontWeightValueContent let-item>
                            <span>{{item}} - {{fontWeightsMap[item]}}</span>
                        </ng-template>
                        <ng-template #fontWeightContent let-item>
                            <span [style.font-weight]="item">{{item}} - {{fontWeightsMap[item]}}</span>
                        </ng-template>
                    </tui-select>
                </div>
            </ng-container>
        </ng-container>
    `,
    styleUrl: './display-config-form.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DisplayConfigForm {
    private configService = inject(ConfigService);
    private fb = inject(FormBuilder);
    fg: FormGroup;
    fontWeightsObjs = [
        {label: 'Thin', value: 100},
        {label: 'Extra Light', value: 200},
        {label: 'Light', value: 300},
        {label: 'Normal', value: 400},
        {label: 'Medium', value: 500},
        {label: 'Semi Bold', value: 600},
        {label: 'Bold', value: 700},
        {label: 'Extra Bold', value: 800},
        {label: 'Black', value: 900}
    ];
    fontWeights = this.fontWeightsObjs.map((e) => e.value)
    fontWeightsMap = this.fontWeightsObjs.reduce((acc, curr) => (acc[curr.value] = curr.label) && acc, {})
    supportsAxis = computed(() => {
        return ['line', 'area', 'bar'].some((t) => t === this.configService.config().chartConfig.type)
    })

    constructor() {
        const config = this.configService.config();

        this.fg = this.fb.group({
            legends: this.fb.group({
                color: this.fb.nonNullable.control(config?.display?.legends?.color),
                fontSize: this.fb.nonNullable.control(config?.display?.legends?.fontSize),
                fontWeight: this.fb.nonNullable.control(config?.display?.legends?.fontWeight),
            }),
            axis: this.fb.group({
                color: this.fb.nonNullable.control(config?.display?.axis?.color),
                fontSize: this.fb.nonNullable.control(config?.display?.axis?.fontSize),
                fontWeight: this.fb.nonNullable.control(config?.display?.axis?.fontWeight),
            })
        })

        this.fg
            .valueChanges
            .pipe(
                debounceTime(300)
            )
            .subscribe((display) => {
                this.configService.updateConfig('display', display)
            })
    }
}
