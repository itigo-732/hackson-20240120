package com.timer

import android.content.Intent
import android.provider.AlarmClock
import android.util.Log
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import java.text.DateFormat
import java.text.SimpleDateFormat
import java.util.*


// シンプルなアラーム設定モジュール
// 今は時間分しか設定できない
class AlarmTestModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return "AlarmManager"
    }

    @ReactMethod
    fun createAlarm(isoDate: String, name: String) {
        try {
            val tz = TimeZone.getTimeZone("UTC")
            val df1: DateFormat = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
            df1.timeZone = tz;
            val date: Date = df1.parse(isoDate)

            val i = Intent(AlarmClock.ACTION_SET_ALARM)
            i.putExtra(AlarmClock.EXTRA_SKIP_UI, true)
            i.putExtra(AlarmClock.EXTRA_MESSAGE, name)
            i.putExtra(AlarmClock.EXTRA_HOUR, date.hours)
            i.putExtra(AlarmClock.EXTRA_MINUTES, date.minutes)

            currentActivity?.startActivity(i)
        } catch (e: Exception) {
            e.printStackTrace()
            Log.e("[AlarmManager]", "Error creating reminder")
            return
        }

        Log.i("[AlarmManager]", "Reminder created")
    }
}