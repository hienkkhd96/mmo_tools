import {Platform} from './platform.abstract';
import {Golike} from './platform.golike';
import {TDSPlatform} from './platform.tds';
import {PLATFORM_TYPE} from './type';

export class PlatformFactory {
  static createPlatform(token: string, platform: PLATFORM_TYPE): Platform {
    switch (platform) {
      case PLATFORM_TYPE.GOLIKE:
        return new Golike(token);
      case PLATFORM_TYPE.TDS:
        return new TDSPlatform(token);
      default:
        throw new Error('Invalid platform');
    }
  }
}
