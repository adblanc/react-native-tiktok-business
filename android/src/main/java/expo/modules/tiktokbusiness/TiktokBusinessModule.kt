package expo.modules.tiktokbusiness

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import com.tiktok.TikTokBusinessSdk;
import com.tiktok.appevents.base.TTBaseEvent


class TiktokBusinessModule : Module() {
  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
  override fun definition() = ModuleDefinition {
    // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
    // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
    // The module will be accessible from `requireNativeModule('ReactNativeTiktokBusiness')` in JavaScript.
    Name("ReactNativeTiktokBusiness")


    // TODO: Think about if it would be better as an AsyncFunction to prevent blocking the js thread https://docs.expo.dev/modules/module-api/#function
    Function("identify") { externalId: String, externalUsername: String?, phoneNumber: String?, email: String? ->
      return@Function TikTokBusinessSdk.identify(externalId, externalUsername, phoneNumber, email)
    }

    Function("isDebugMode") {
      return@Function TikTokBusinessSdk.isInSdkDebugMode()
    }

    Function("logout") {
      return@Function TikTokBusinessSdk.logout()
    }

    Function("trackEvent") { eventName: String, eventId: String?, eventData: List<Map<String, String>>? ->
        val customEvent =  TTBaseEvent.newBuilder(eventName, eventId)

        eventData?.forEach { item ->
            when (item["key"]) {
                "price", "value" -> {
                    item["value"]?.toDoubleOrNull()?.let { numericValue ->
                        customEvent.addProperty(item["key"], numericValue)
                    }
                }
                "quantity" -> {
                    item["value"]?.toIntOrNull()?.let { intValue ->
                        customEvent.addProperty(item["key"], intValue)
                    }
                }
                else -> {
                    item["value"]?.let { value ->
                        customEvent.addProperty(item["key"], value)
                    }
                }
            }
        }

        TikTokBusinessSdk.trackTTEvent(customEvent.build())
    }

  }
}
