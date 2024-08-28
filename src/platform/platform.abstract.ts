import {AxiosResponse} from 'axios';
import {CHANEL_TYPE} from './type';

export abstract class Platform {
  public readonly token: string;
  constructor(token: string) {
    this.token = token;
  }
  abstract getMe(): Promise<AxiosResponse<any>>;
  abstract getSubAccounts(chanel: CHANEL_TYPE): Promise<AxiosResponse<any>>;
}
