import { Injectable } from '@angular/core';
import {LinearPointGeneratorInput} from "./point-generator";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  data!: LinearPointGeneratorInput
}
