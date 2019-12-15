import { IProperty } from 'app/shared/model/property.model';
import { IComposite } from 'app/shared/model/composite.model';

export interface ILimit {
  id?: number;
  maximum?: boolean;
  value?: number;
  property?: IProperty;
  composites?: IComposite[];
}

export class Limit implements ILimit {
  constructor(
    public id?: number,
    public maximum?: boolean,
    public value?: number,
    public property?: IProperty,
    public composites?: IComposite[]
  ) {
    this.maximum = this.maximum || false;
  }
}
