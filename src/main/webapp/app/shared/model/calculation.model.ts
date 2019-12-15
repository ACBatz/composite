import { IEnvironmentalEffect } from 'app/shared/model/environmental-effect.model';
import { IMiscellaneousConstraint } from 'app/shared/model/miscellaneous-constraint.model';
import { ILoad } from 'app/shared/model/load.model';
import { IWeightingFactor } from 'app/shared/model/weighting-factor.model';
import { INoun } from 'app/shared/model/noun.model';
import { IVerb } from 'app/shared/model/verb.model';
import { ICalculationResult } from 'app/shared/model/calculation-result.model';

export interface ICalculation {
  id?: number;
  name?: string;
  description?: string;
  environmentalEffects?: IEnvironmentalEffect[];
  miscConstraints?: IMiscellaneousConstraint[];
  loads?: ILoad[];
  weightingFactors?: IWeightingFactor[];
  noun?: INoun;
  verb?: IVerb;
  results?: ICalculationResult[];
}

export class Calculation implements ICalculation {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public environmentalEffects?: IEnvironmentalEffect[],
    public miscConstraints?: IMiscellaneousConstraint[],
    public loads?: ILoad[],
    public weightingFactors?: IWeightingFactor[],
    public noun?: INoun,
    public verb?: IVerb,
    public results?: ICalculationResult[]
  ) {}
}
