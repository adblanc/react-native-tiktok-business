import {
  AndroidConfig,
  ConfigPlugin,
  withAndroidManifest,
  withInfoPlist,
} from "expo/config-plugins";
import { withAndroidProguardRules } from "./withAndroidProguardRules";

interface PluginConfigType {
  ios?: {
    appId: string;
    tiktokAppId: string;
    disableAppTrackingDialog?: boolean;
    disablePaymentTracking?: boolean;
  };
  android?: {
    appId: string;
    tiktokAppId: string;
    enableAutoIapTracking?: boolean;
  };
  debug?: boolean;
}

const withTiktokBusiness: ConfigPlugin<PluginConfigType> = (
  config,
  { ios, android, debug }
) => {
  if (ios) {
    config = withInfoPlist(config, (config) => {
      config.modResults["TikTokBusinessAppId"] = ios.appId;
      config.modResults["TikTokBusinessTiktokAppId"] = ios.tiktokAppId;
      config.modResults["TikTokBusinessDisableAppTrackingDialog"] =
        ios.disableAppTrackingDialog;
      config.modResults["TikTokBusinessDebug"] = debug;
      config.modResults["TikTokBusinessDisablePaymentTracking"] =
        ios.disablePaymentTracking;
      return config;
    });
  }

  if (android) {
    config = withAndroidManifest(config, (config) => {
      const mainApplication = AndroidConfig.Manifest.getMainApplicationOrThrow(
        config.modResults
      );

      AndroidConfig.Manifest.addMetaDataItemToMainApplication(
        mainApplication,
        "TikTokBusinessAppId",
        android.appId
      );
      AndroidConfig.Manifest.addMetaDataItemToMainApplication(
        mainApplication,
        "TikTokBusinessTiktokAppId",
        android.tiktokAppId
      );
      AndroidConfig.Manifest.addMetaDataItemToMainApplication(
        mainApplication,
        "TikTokBusinessEnableAutoIapTracking",
        android.enableAutoIapTracking ? "true" : "false"
      );
      AndroidConfig.Manifest.addMetaDataItemToMainApplication(
        mainApplication,
        "TikTokBusinessDebug",
        debug ? "true" : "false"
      );
      return config;
    });
  }

  config = withAndroidProguardRules(config);

  return config;
};

export default withTiktokBusiness;
