import { IProperty } from 'app/shared/model/property.model';
import { ICalculation } from 'app/shared/model/calculation.model';

export interface IWeightingFactor {
  id?: number;
  value?: number;
  properties?: IProperty[];
  calculations?: ICalculation[];
}

export class WeightingFactor implements IWeightingFactor {
  constructor(public id?: number, public value?: number, public properties?: IProperty[], public calculations?: ICalculation[]) {}
}
