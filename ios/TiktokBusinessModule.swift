import ExpoModulesCore
import TikTokBusinessSDK

struct TiktokEventData: Record {
  @Field
  var key: String

  @Field
  var value: String
}

public class TiktokBusinessModule: Module {
  public func definition() -> ModuleDefinition {
    Name("ReactNativeTiktokBusiness")

    Function("identify") { (externalID: String, externalUserName: String?, phoneNumber: String?, email: String?) in
      TikTokBusiness.identify(withExternalID: externalID, externalUserName: externalUserName, phoneNumber: phoneNumber, email: email)
    }

    Function("logout") {
      TikTokBusiness.logout()
    }

    Function("isDebugMode") {
      return TikTokBusiness.isDebugMode()
    }

    Function("trackEvent") { (eventName: String, eventId: String?, eventData: [TiktokEventData]?) in
      let customEvent = TikTokBaseEvent(eventName: eventName, eventId: eventId)

      if let data = eventData {
        for item in data {
          if item.key == "price" || item.key == "value", let numericValue = Double(item.value) {
            customEvent.addProperty(withKey: item.key, value: numericValue)
          } else if item.key == "quantity", let intValue = Int(item.value) {
            customEvent.addProperty(withKey: item.key, value: intValue)
          } else {
            customEvent.addProperty(withKey: item.key, value: item.value)
          }
        }
      }

      TikTokBusiness.trackTTEvent(customEvent)
    }

    Function("flush") {
      TikTokBusiness.explicitlyFlush()
    }

    AsyncFunction("requestTrackingAuthorization") { (promise: Promise) in
        TikTokBusiness.requestTrackingAuthorization(completionHandler: { (status) in
            promise.resolve(status)
        })
    }
  }
}

public class TiktokBusinessAppDelegateSubscriber: ExpoAppDelegateSubscriber {
    public func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil) -> Bool {

        print("[TiktokBusiness] Initializing TikTokBusiness")
        let ttConfig = getTikTokConfig()
        let config = TikTokConfig.init(appId: ttConfig.appId, tiktokAppId: ttConfig.tiktokAppId)

        #if DEBUG
        config?.enableDebugMode()
        config?.setLogLevel(TikTokLogLevelVerbose)
        #endif

        if (ttConfig.disableTrackingDialog) {
          if (ttConfig.debug) {
            print("[TiktokBusiness] Disabling app tracking dialog")
          }
            config?.disableAppTrackingDialog()
        }

        if (ttConfig.disablePaymentTracking) {
          if (ttConfig.debug) {
            print("[TiktokBusiness] Disabling payment tracking")
          }
            config?.disablePaymentTracking()
        }

            TikTokBusiness.initializeSdk(config) { success, error in
            if (!success) { // initialization failed
              if (ttConfig.debug) {
                  print(error!.localizedDescription)
              }
            } else { // initialization successful
                if (ttConfig.debug) {
                    print("[TiktokBusiness] TikTokBusiness initialized")
                }
            }
        }

        return true
      }

    private func getTikTokConfig() -> (appId: String, tiktokAppId: String, disableTrackingDialog: Bool, debug: Bool, disablePaymentTracking: Bool) {
      guard let infoPlist = Bundle.main.infoDictionary,
            let appId = infoPlist["TikTokBusinessAppId"] as? String,
            let tiktokAppId = infoPlist["TikTokBusinessTiktokAppId"] as? String else {
        return ("", "", false, false, false)
      }
      
      let disableTrackingDialog = infoPlist["TikTokBusinessDisableAppTrackingDialog"] as? Bool ?? false
      let debug = infoPlist["TikTokBusinessDebug"] as? Bool ?? false
      let disablePaymentTracking = infoPlist["TikTokBusinessDisablePaymentTracking"] as? Bool ?? false
      return (appId, tiktokAppId, disableTrackingDialog, debug, disablePaymentTracking)
    }
}
