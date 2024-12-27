package expo.modules.tiktokbusiness

import android.content.Context
import expo.modules.core.interfaces.ApplicationLifecycleListener
import expo.modules.core.interfaces.Package

class TiktokBusinessPackage : Package {
	override fun createApplicationLifecycleListeners(context: Context): List<ApplicationLifecycleListener> {
		return listOf(TiktokBusinessApplicationLifecycleListener())
	}
}
