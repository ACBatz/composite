import { IProperty } from 'app/shared/model/property.model';
import { ICalculation } from 'app/shared/model/calculation.model';

export interface IMiscellaneousConstraint {
  id?: number;
  name?: string;
  maximize?: boolean;
  minimize?: boolean;
  properties?: IProperty[];
  calculations?: ICalculation[];
}

export class MiscellaneousConstraint implements IMiscellaneousConstraint {
  constructor(
    public id?: number,
    public name?: string,
    public maximize?: boolean,
    public minimize?: boolean,
    public properties?: IProperty[],
    public calculations?: ICalculation[]
  ) {
    this.maximize = this.maximize || false;
    this.minimize = this.minimize || false;
  }
}
