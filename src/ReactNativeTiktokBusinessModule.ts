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
  /**
   * Identifies the user with the given external ID, external username, phone number, and email.
   */
  identify(
    externalID: string,
    externalUserName?: string,
    phoneNumber?: string,
    email?: string
  ): void;
  logout(): void;
  /**
   * Returns whether the SDK is in debug mode.
   */
  isDebugMode(): boolean;
  /**
   * Track an event with the given name, ID, and data.
   */
  trackEvent(
    eventName: string,
    eventId?: string,
    eventData?: TiktokEventData[]
  ): void;
  /**
   * Displays a dialog to the user to request tracking authorization.
   * Does nothing and returns null on Android.
   */
  requestTrackingAuthorization(): Promise<TikTokTrackingAuthorizationStatus | null>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ReactNativeTiktokBusinessModule>(
  "ReactNativeTiktokBusiness"
);
