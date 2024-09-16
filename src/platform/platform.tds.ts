import {tdsubApi} from '../api/tdsub';
import {Platform} from './platform.abstract';
import {CHANNEL_TYPE} from './type';

export class TDSPlatform extends Platform {
  constructor(token: string) {
    super(token);
  }
  getMe() {
    const res = tdsubApi.getProfile(this.token);
    return res;
  }
  getSubAccounts(channel: CHANNEL_TYPE) {
    return tdsubApi.getSubAccounts(this.token, channel);
  }
  getFieldsOptions() {
    return {
      username: 'user',
    };
  }
}
