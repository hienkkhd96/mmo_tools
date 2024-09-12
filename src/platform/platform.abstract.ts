import {AxiosResponse} from 'axios';
import {CHANNEL_TYPE} from './type';

export abstract class Platform {
  public readonly token: string;
  constructor(token: string) {
    this.token = token;
  }
  abstract getMe(): Promise<AxiosResponse<any>>;
  abstract getSubAccounts(channel: CHANNEL_TYPE): Promise<AxiosResponse<any>>;
}
