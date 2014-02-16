adb shell am broadcast -a com.amazon.webview.app.CLEAR_CACHE

http://stackoverflow.com/a/13994622/1156119
Protected onCreate?
abstract


public class ClearCacheReceiver extends BroadcastReceiver {
    private static final String TAG = "AmazonWebViewApp::ClearCacheReceiver";

    @Override
    public void onReceive(Context context, Intent intent) {
        ActivityTrackingApplication app = (ActivityTrackingApplication)context.getApplicationContext();
        Activity currentActivity = app.getCurrentActivity();
        if (currentActivity instanceof MainActivity) {
            ((MainActivity)currentActivity).getActiveWebView().clearCache(true);
            Log.w(TAG, "Cache cleared");
        } else {
            Log.w(TAG, "Cache could not be cleared, MainActivity is not the current activity");
        }
    }
}


        <receiver android:name=".ClearCacheReceiver">
            <intent-filter>
                <action android:name="com.amazon.webview.app.CLEAR_CACHE" />
            </intent-filter>
        </receiver>
