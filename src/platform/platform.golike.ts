import {golikeApi} from '../api/golike';
import {Platform} from './platform.abstract';
import {CHANNEL_TYPE} from './type';

export class Golike extends Platform {
  constructor(token: string) {
    super(token);
  }
  getMe() {
    const res = golikeApi.getProfile(this.token);
    return res;
  }
  getSubAccounts(channel: CHANNEL_TYPE) {
    return golikeApi.getSubAccounts({token: this.token, channel});
  }
}
