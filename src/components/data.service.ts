import { Injectable } from '@angular/core';
import {CoordinateGeneratorInput} from "../chart/data-generator";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  data!: CoordinateGeneratorInput
}
