import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {TuiDataListWrapperModule, TuiSelectModule} from "@taiga-ui/kit";
import {FormsModule} from "@angular/forms";
import {TuiButtonModule, TuiTextfieldControllerModule} from "@taiga-ui/core";
import {PresetService} from "./preset.service";
import {PolymorpheusModule} from "@tinkoff/ng-polymorpheus";

@Component({
    selector: 'kj-preset',
    standalone: true,
    imports: [
        TuiSelectModule,
        TuiDataListWrapperModule,
        TuiTextfieldControllerModule,
        FormsModule,
        PolymorpheusModule,
        TuiButtonModule
    ],
    providers: [
        PresetService
    ],
    template: `
        <div class="flex gap-2">
            <tui-select
                    class="flex-auto"
                    tuiTextfieldSize="m"
                    [ngModel]="selectedPreset()"
                    (ngModelChange)="onSelectPreset($event)"
                    [tuiTextfieldLabelOutside]="true"
                    [valueContent]="presetTemplate"
            >
                Preset
                <tui-data-list-wrapper
                        *tuiDataList
                        [itemContent]="presetTemplate"
                        emptyContent="No Preset Found"
                        [items]="presets()"
                ></tui-data-list-wrapper>
            </tui-select>
            <ng-template #presetTemplate let-preset>
                {{preset.label}}
            </ng-template>
            <button tuiIconButton size="m" appearance="secondary" icon="tuiIconSave"></button>
        </div>
    `,
    styleUrl: './preset.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Preset {
    presetService = inject(PresetService)

    get presets() {
        return this.presetService.presets
    }

    get selectedPreset() {
        return this.presetService.selectedPreset
    }

    onSelectPreset(preset: any) {
        this.presetService.updateSelectedPreset(preset.id)
    }
}
