import {ChangeDetectionStrategy, Component, DestroyRef, HostListener, inject, input} from '@angular/core';
import {ControlContainer, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {TuiSliderModule} from "@taiga-ui/kit";
import {BehaviorSubject, of, timer} from 'rxjs';
import {distinctUntilChanged, map, switchMap} from "rxjs/operators";
import {ALWAYS_FALSE_HANDLER} from "@taiga-ui/cdk";
import {AsyncPipe} from "@angular/common";
import {TuiHintModule} from "@taiga-ui/core";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
    selector: 'kj-slider',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        TuiSliderModule,
        AsyncPipe,
        TuiHintModule
    ],
    template: `
        <ng-container [formGroup]="fg">
            <label>
                {{label()}}
                <label
                        tuiSliderThumbLabel
                        tuiHintAppearance="onDark"
                        tuiHintDirection="top"
                        [tuiHint]="hint"
                        [tuiHintManual]="!!(showHint$ | async)"
                >

                    <ng-template #hint>
                        {{ input.value }}
                    </ng-template>

                    <input
                            #input
                            size="m"
                            tuiSlider
                            type="range"
                            min="{{min()}}"
                            max="{{max()}}"
                            step="{{step()}}"
                            formControlName="{{name()}}"
                    />
                </label>
            </label>
        </ng-container>
    `,
    styleUrl: './slider.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Slider {
    controlContainer = inject(ControlContainer)
    destroyRef = inject(DestroyRef)
    readonly active$ = new BehaviorSubject(false);
    readonly showHint$ = this.active$.pipe(
        distinctUntilChanged(),
        switchMap(active =>
            active ? of(true) : timer(1000).pipe(map(ALWAYS_FALSE_HANDLER)),
        ),
        takeUntilDestroyed(this.destroyRef)
    );

    @HostListener('pointerdown', ['true'])
    @HostListener('document:pointerup', ['false'])
    onKeydown(show: boolean): void {
        this.active$.next(show);
    }

    get fg() {
        return this.controlContainer.control as FormGroup
    }

    label = input.required()
    min = input()
    max = input.required()
    step = input()
    name = input.required()
}
