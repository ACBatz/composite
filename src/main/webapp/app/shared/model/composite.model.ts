import { ILimit } from 'app/shared/model/limit.model';
import { ICalculationResult } from 'app/shared/model/calculation-result.model';

export interface IComposite {
  id?: number;
  name?: string;
  limits?: ILimit[];
  result?: ICalculationResult;
}

export class Composite implements IComposite {
  constructor(public id?: number, public name?: string, public limits?: ILimit[], public result?: ICalculationResult) {}
}
