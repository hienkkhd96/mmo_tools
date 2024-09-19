import { ttCheoApi } from '../api/ttcheo';
import { Platform } from './platform.abstract';
import { CHANNEL_TYPE } from './type';

export class TTCPlatform extends Platform {
    constructor(token: string) {
        super(token);
    }
    getMe() {
        return ttCheoApi.getProfile(this.token);
    }
    getSubAccounts(channel: CHANNEL_TYPE) {
        return;
    }
    getFieldsOptions() {
        return {
            username: 'user',
        };
    }
}
