import { ICalculation } from 'app/shared/model/calculation.model';

export interface IVerb {
  id?: number;
  name?: string;
  calculation?: ICalculation;
}

export class Verb implements IVerb {
  constructor(public id?: number, public name?: string, public calculation?: ICalculation) {}
}
