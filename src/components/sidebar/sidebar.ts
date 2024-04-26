import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatTooltip} from "@angular/material/tooltip";
import {NgFor} from "@angular/common";

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
    items = [
        {icon: 'show_chart', label: 'Show chart', type: 'line'},
        {icon: 'equalizer', label: 'Bar chart', type: 'bar'},
        {icon: 'pie_chart', label: 'Pie chart', type: 'pie'},
        {icon: 'donut_large', label: 'Donut chart', type: 'donut'},
    ]

    selectChart(_: string) {

    }
}
