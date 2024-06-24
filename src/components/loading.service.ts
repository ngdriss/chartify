import {Injectable, signal} from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class LoadingService {
    #loading = signal(true)

    get loading() {
        return this.#loading.asReadonly()
    }

    done() {
        this.#loading.set(false)
    }
}
