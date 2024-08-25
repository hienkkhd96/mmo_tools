import {AxiosResponse} from 'axios';

export abstract class Platform {
  public readonly token: string;
  constructor(token: string) {
    this.token = token;
  }
  abstract getMe(): Promise<AxiosResponse<any>>;
}
