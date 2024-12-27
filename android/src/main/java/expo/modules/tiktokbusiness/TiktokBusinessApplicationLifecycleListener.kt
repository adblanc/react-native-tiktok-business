package expo.modules.tiktokbusiness

import android.app.Application
import expo.modules.core.interfaces.ApplicationLifecycleListener
import com.tiktok.TikTokBusinessSdk;
import android.content.pm.PackageManager

class TiktokBusinessApplicationLifecycleListener : ApplicationLifecycleListener {

	override fun onCreate(application: Application) {
	  val appId = getAppId(application)
	  val ttAppId = getTikTokAppId(application)
	  val isDebug = isDebugMode(application)
      
	  val ttConfig = TikTokBusinessSdk.TTConfig(application.applicationContext)
	    .setAppId(appId) 
	    .setTTAppId(ttAppId)

	if (isDebug) {
	  ttConfig.openDebugMode()
	  ttConfig.setLogLevel(TikTokBusinessSdk.LogLevel.DEBUG)
	}
      
	  TikTokBusinessSdk.initializeSdk(ttConfig, object : TikTokBusinessSdk.TTInitCallback {
	    override fun success() {
		if (isDebug) {
		  println("TikTokBusinessSdk initialized")
		}
	    }
	    
	    override fun fail(code: Int, msg: String) {
	      if (isDebug) {
		println("TikTokBusinessSdk initialization failed")
	      }
	    }
	  })
	  TikTokBusinessSdk.startTrack()
	}
      
	private fun getAppId(application: Application): String? {
	  val applicationInfo = application.packageManager.getApplicationInfo(
	    application.packageName, 
	    PackageManager.GET_META_DATA
	  )
	  return applicationInfo?.metaData?.getString("TikTokBusinessAppId")
	}
      
	private fun getTikTokAppId(application: Application): String? {
	  val applicationInfo = application.packageManager.getApplicationInfo(
	    application.packageName, 
	    PackageManager.GET_META_DATA
	  )
	  return applicationInfo?.metaData?.getString("TikTokBusinessTiktokAppId")
	}

	private fun isDebugMode(application: Application): Boolean {
	  val applicationInfo = application.packageManager.getApplicationInfo(
	    application.packageName, 
	    PackageManager.GET_META_DATA
	  )
	  return applicationInfo?.metaData?.getBoolean("TikTokBusinessDebug") ?: false
	}
      }
