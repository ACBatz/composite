import { ILoadShear } from 'app/shared/model/load-shear.model';
import { ILoadDirection } from 'app/shared/model/load-direction.model';
import { ICalculation } from 'app/shared/model/calculation.model';

export interface ILoad {
  id?: number;
  name?: string;
  isTensileOrCompressive?: boolean;
  isShear?: boolean;
  loadShear?: ILoadShear;
  loadDirection?: ILoadDirection;
  calculations?: ICalculation[];
}

export class Load implements ILoad {
  constructor(
    public id?: number,
    public name?: string,
    public isTensileOrCompressive?: boolean,
    public isShear?: boolean,
    public loadShear?: ILoadShear,
    public loadDirection?: ILoadDirection,
    public calculations?: ICalculation[]
  ) {
    this.isTensileOrCompressive = this.isTensileOrCompressive || false;
    this.isShear = this.isShear || false;
  }
}
