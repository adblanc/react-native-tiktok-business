import { NativeModule, requireNativeModule } from "expo";

export enum TikTokTrackingAuthorizationStatus {
  NotDetermined = 0,
  Restricted = 1,
  Denied = 2,
  Authorized = 3,
}

interface TiktokEventData {
  key: string;
  value: string | number;
}

declare class ReactNativeTiktokBusinessModule extends NativeModule<{}> {
  identify(
    externalID: string,
    externalUserName?: string,
    phoneNumber?: string,
    email?: string
  ): void;
  logout(): void;
  isDebugMode(): boolean;
  trackEvent(
    eventName: string,
    eventId?: string,
    eventData?: TiktokEventData[]
  ): void;
  requestTrackingAuthorization(): Promise<TikTokTrackingAuthorizationStatus>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ReactNativeTiktokBusinessModule>(
  "ReactNativeTiktokBusiness"
);
