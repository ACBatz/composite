import { IProperty } from 'app/shared/model/property.model';
import { IComposite } from 'app/shared/model/composite.model';
import { IUnitOfMeasure } from 'app/shared/model/unit-of-measure.model';

export interface ILimit {
  id?: number;
  maximum?: boolean;
  value?: number;
  property?: IProperty;
  composites?: IComposite[];
  unitOfMeasures?: IUnitOfMeasure[];
}

export class Limit implements ILimit {
  constructor(
    public id?: number,
    public maximum?: boolean,
    public value?: number,
    public property?: IProperty,
    public composites?: IComposite[],
    public unitOfMeasures?: IUnitOfMeasure[]
  ) {
    this.maximum = this.maximum || false;
  }
}
