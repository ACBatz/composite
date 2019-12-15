import { ILimit } from 'app/shared/model/limit.model';
import { IWeightingFactor } from 'app/shared/model/weighting-factor.model';
import { IMiscellaneousConstraint } from 'app/shared/model/miscellaneous-constraint.model';

export interface IProperty {
  id?: number;
  name?: string;
  limit?: ILimit;
  weightingFactors?: IWeightingFactor[];
  miscellaneousConstraints?: IMiscellaneousConstraint[];
}

export class Property implements IProperty {
  constructor(
    public id?: number,
    public name?: string,
    public limit?: ILimit,
    public weightingFactors?: IWeightingFactor[],
    public miscellaneousConstraints?: IMiscellaneousConstraint[]
  ) {}
}
