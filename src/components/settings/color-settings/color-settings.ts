import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {ColorsService} from "../../colors.service";
import {TuiTagModule} from "@taiga-ui/kit";
import {NgForOf} from "@angular/common";
import {TuiHostedDropdownModule, TuiButtonModule as ButtonModule} from "@taiga-ui/core";
import {
    TuiChipModule,
    TuiHeaderModule,
    TuiTitleModule,
    TuiButtonModule,
    TuiButtonCloseModule
} from "@taiga-ui/experimental";
import {TuiColorSelectorModule, TuiInputColorModule} from "@tinkoff/tui-editor";
import {TuiActiveZoneModule} from "@taiga-ui/cdk";
import * as Color from 'color';

@Component({
    selector: 'kj-color-settings',
    standalone: true,
    imports: [
        TuiTagModule,
        NgForOf,
        TuiHeaderModule,
        TuiTitleModule,
        TuiInputColorModule,
        TuiHostedDropdownModule,
        TuiColorSelectorModule,
        TuiActiveZoneModule,
        TuiButtonModule,
        TuiChipModule,
        TuiButtonCloseModule,
        ButtonModule
    ],
    template: `
        <div tuiHeader="s">
            <h5 tuiTitle>
                Colors
            </h5>
            <div tuiAccessories>
                <tui-hosted-dropdown
                        [content]="addPicker"
                        [tuiDropdownMaxHeight]="999"
                        (openChange)="!$event && onAdd(currentColor)"
                >
                    <button
                            tuiIconButton
                            size="s"
                            icon="tuiIconPlus"
                    ></button>
                    <ng-template
                            #addPicker
                            let-activeZone
                    >
                        <tui-color-selector
                                [tuiActiveZoneParent]="activeZone"
                                [(color)]="currentColor"
                        ></tui-color-selector>
                    </ng-template>
                </tui-hosted-dropdown>
                <!--<button
                    tuiIconButton
                    size="s"
                    icon="tuiIconRotateCcw"
                    (click)="onReset()"
                >
                </button>
                -->
            </div>
        </div>
        <div class="flex items-center gap-2 flex-wrap p-2">
            <tui-hosted-dropdown
                    *ngFor="let color of colorService.colors()"
                    [content]="picker"
                    [tuiDropdownMaxHeight]="999"
                    (openChange)="!$event && updateColor(color, currentColor)"
            >
                <button
                        tuiChip
                        size="xs"
                        [style.background-color]="color"
                        (click)="currentColor = color"
                >
                    {{color}}
                    <button
                            tuiIconButton
                            appearance="icon"
                            type="button"
                            size="xs"
                            icon="tuiIconClose"
                            (click.stop)="onRemove(color)"
                    ></button>
                </button>
                <ng-template
                        #picker
                        let-activeZone
                >
                    <tui-color-selector
                            [tuiActiveZoneParent]="activeZone"
                            [(color)]="currentColor"
                            [colors]="colorService.palettesMap()"
                    ></tui-color-selector>
                </ng-template>
            </tui-hosted-dropdown>
        </div>
    `,
    styleUrl: './color-settings.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColorSettings {
    colorService = inject(ColorsService)
    currentColor: string = '#EF1233'

    onRemove(color: string) {
        this.colorService.removeColor(color)
    }
    onAdd(color: string) {
        this.currentColor = '#EF1233';
        this.colorService.addColor(new Color(color).hex())
    }
    onReset() {
        this.colorService.resetColors()
    }
    updateColor(color: string, currentColor: string) {
        this.currentColor = '#EF1233';
        if (color === currentColor) return;
        this.colorService.updateColor(color, currentColor)
    }
}
