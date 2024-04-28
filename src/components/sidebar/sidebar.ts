import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatTooltip} from "@angular/material/tooltip";
import {NgFor} from "@angular/common";
import {AppStateService} from '../app-state.service';

@Component({
    selector: 'kj-sidebar',
    standalone: true,
    imports: [
        MatButtonModule, MatIconModule, MatTooltip, NgFor
    ],
    template: `
        <ng-container *ngFor="let item of items">
            <button mat-icon-button (click)="selectChart(item.type)">
                <mat-icon [fontIcon]="item.icon"></mat-icon>
            </button>
        </ng-container>
    `,
    styleUrl: './sidebar.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Sidebar {
    appStateService = inject(AppStateService);
    items = [
        {icon: 'show_chart', label: 'Line chart', type: 'line'},
        {icon: 'area_chart', label: 'Area chart', type: 'area'},
        {icon: 'equalizer', label: 'Bar chart', type: 'bar'},
        {icon: 'pie_chart', label: 'Pie chart', type: 'pie'},
        {icon: 'donut_large', label: 'Donut chart', type: 'donut'},
    ]

    selectChart(selectedChartType: string) {
        this.appStateService.updateState({selectedChartType})
    }
}
