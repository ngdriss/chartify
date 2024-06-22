import {Directive, inject} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ConfigService} from "../config.service";
import {getTypeMetadata} from "../../models/type-attributes";

@Directive()
export abstract class BaseChartForm {
    configService = inject(ConfigService);
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
            .subscribe((values) => this.configService.setConfig({
                ...config,
                chartConfig: {
                    type: config.chartConfig.type,
                    ...values
                }
            }))
    }

}
