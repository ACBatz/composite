import { IProperty } from 'app/shared/model/property.model';

export interface IUnitOfMeasure {
  id?: number;
  name?: string;
  properties?: IProperty[];
}

export class UnitOfMeasure implements IUnitOfMeasure {
  constructor(public id?: number, public name?: string, public properties?: IProperty[]) {}
}
