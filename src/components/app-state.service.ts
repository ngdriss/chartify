import {Injectable} from "@angular/core";
import {get} from "lodash";
import {BehaviorSubject} from "rxjs";

export interface AppState {
    [key: string]: any;
}

@Injectable({
    providedIn: 'root'
})
export class AppStateService {
    private _chartConfigs$: BehaviorSubject<any> = new BehaviorSubject({});
    get chartConfigs$() {
        return this._chartConfigs$.asObservable();
    }
    chartConfigs: any = {};

    selectedChartType?: string = 'line';
    private _selectedChartType$: BehaviorSubject<string> = new BehaviorSubject('line');
    get selectedChartType$() {
        return this._selectedChartType$.asObservable();
    }

    getCurrentChartConfig() {
        return this.chartConfigs[this.selectedChartType];
    }

    updateChartConfig(config: any) {
        this.chartConfigs[this.selectedChartType] = config;
        this._chartConfigs$.next(this.chartConfigs);
    }

    updateSelectedChartType(chartType: string) {
        this.selectedChartType = chartType;
        this._selectedChartType$.next(chartType);
    }

    geChartConfig(chartType: string) {
        return get(this.chartConfigs, chartType);
    }
}
