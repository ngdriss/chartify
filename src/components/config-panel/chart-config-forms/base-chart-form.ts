import {Directive, inject} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ConfigService} from "../../config.service";
import {getTypeMetadata} from "../../../models/type-attributes";
import {DataService} from "../../data.service";
import {debounceTime} from "rxjs/operators";

@Directive()
export abstract class BaseChartForm {
    configService = inject(ConfigService);
    dataService = inject(DataService);
    fb = inject(FormBuilder);
    fg: FormGroup;

    protected constructor(type: any) {
        const config = this.configService.config();
        const attributes = getTypeMetadata(type)
        const controls: any = {}

        Object
            .keys(attributes)
            .forEach((key) => controls[key] = this.fb.nonNullable.control(config.chartConfig[key]))

        this.fg = this.fb.group(controls)

        this.fg
            .valueChanges
            .pipe(
                debounceTime(300)
            )
            .subscribe((chartConfig) => {
                const newConfig = this.configService.updateConfig('chartConfig', chartConfig)
                this.configService.updateConfig('data', this.dataService.getData(newConfig.chartConfig, false, true))
            })
    }
}
