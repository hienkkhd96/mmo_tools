import {golikeApi} from '../api/golike';
import {Platform} from './platform.abstract';
import {CHANEL_TYPE} from './type';

export class Golike extends Platform {
  constructor(token: string) {
    super(token);
  }
  getMe() {
    const res = golikeApi.getProfile(this.token);
    return res;
  }
  getSubAccounts(chanel: CHANEL_TYPE) {}
}
