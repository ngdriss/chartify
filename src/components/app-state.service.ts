import {Injectable} from "@angular/core";
import { get } from "lodash";
import {BehaviorSubject} from "rxjs";
import {map} from "rxjs/operators";

export interface AppState {
    selectedChartType?: string;
    chartConfig: any;
}

@Injectable({
    providedIn: 'root'
})
export class AppStateService {
    state: AppState = {
        selectedChartType: 'line',
        chartConfig: null
    };
    _state$ = new BehaviorSubject<AppState>(this.state);

    get state$() {
        return this._state$.asObservable();
    }

    updateState(partialState: any) {
        this.state = {...this.state, ...partialState};
        this._state$.next(this.state);
    }

    select$(path: string) {
        return this.state$.pipe(
            map(state => get(state, path))
        )
    }
}
