## Getting build android version

**androidManifest.xml**
```
<?xml version="1.0" encoding="utf-8" ?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android" package="com.mobile.herplan">
    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/AppTheme">
        <activity
            android:configChanges="orientation|keyboardHidden|keyboard|screenSize|locale|smallestScreenSize|screenLayout|uiMode"
            android:name="com.mobile.herplan.MainActivity"
            android:label="@string/title_activity_main"
            android:theme="@style/AppTheme.NoActionBarLaunch"
            android:launchMode="singleTask"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
                <category android:name="android.intent.category.BROWSABLE" />
                <data android:scheme="@string/custom_url_scheme" />
            </intent-filter>
        </activity>

        <provider
            android:name="androidx.core.content.FileProvider"
            android:authorities="${applicationId}.fileprovider"
            android:exported="false"
            android:grantUriPermissions="true">
            <meta-data android:name="android.support.FILE_PROVIDER_PATHS" android:resource="@xml/file_paths" />
        </provider>
        <meta-data android:name="com.facebook.sdk.ApplicationId" android:value="@string/facebook_app_id"/>
        <meta-data android:name="com.facebook.sdk.ClientToken" android:value="@string/facebook_client_token"/>
        <meta-data android:name="com.google.android.geo.API_KEY" android:value="AIzaSyCp8eOtMtU9XXGh66C5RWQ6ttCJU3rj39Q"/>
    </application>

    <!-- Permissions -->

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    <uses-feature android:name="android.hardware.location.gps" />
</manifest>
```

**MainActivity.java**
```
package com.mobile.herplan;

import android.os.Bundle;

import com.getcapacitor.BridgeActivity;
import com.codetrixstudio.capacitor.GoogleAuth.GoogleAuth;
import com.getcapacitor.community.facebooklogin.FacebookLogin;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        registerPlugin(FacebookLogin.class);
        registerPlugin(GoogleAuth.class);
    }
}
```
**strings.xml**
```
<?xml version='1.0' encoding='utf-8'?>
<resources>
    <string name="app_name">HerPlan</string>
    <string name="title_activity_main">HerPlan</string>
    <string name="package_name">com.mobile.herplan</string>
    <string name="custom_url_scheme">com.mobile.herplan</string>
    <string name="facebook_app_id">4907189219356872</string>
    <string name="facebook_client_token">58aa28a3c26c5daaf91562544bc405d9</string>
    <string name="google_api_key">AIzaSyCp8eOtMtU9XXGh66C5RWQ6ttCJU3rj39Q</string>
</resources>
```
**google-services.json**
this file should be placed in android/app folder

**keystore.properties**
- create keystore.properties file in android root folder, and write the below.
storePassword=password
keyPassword=password
keyAlias=key0
storeFile=./../../release-keystore

**release-keystore**
it should be placed on project root folder

**android/app/build.gradle**
...
apply plugin: 'com.android.application'

def keystorePropertiesFile = rootProject.file("keystore.properties")
def keystoreProperties = new Properties()
keystoreProperties.load(new FileInputStream(keystorePropertiesFile))

android {
    compileSdkVersion rootProject.ext.compileSdkVersion
    defaultConfig {
        applicationId "com.mobile.herplan"
        minSdkVersion rootProject.ext.minSdkVersion
        targetSdkVersion rootProject.ext.targetSdkVersion
        versionCode 1
        versionName "1.0"
        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
        aaptOptions {
             // Files and dirs to omit from the packaged assets dir, modified to accommodate modern web apps.
             // Default: https://android.googlesource.com/platform/frameworks/base/+/282e181b58cf72b6ca770dc7ca5f91f135444502/tools/aapt/AaptAssets.cpp#61
            ignoreAssetsPattern '!.svn:!.git:!.ds_store:!*.scc:.*:!CVS:!thumbs.db:!picasa.ini:!*~'
        }
    }

    signinConfigs {
        release {
            keyAlias keystoreProperties['keyAlias']
            keyPassword keystoreProperties['keyPassword']
            storeFile file(keystoreProperties['storeFile'])
            storePassword keystoreProperties['storePassword']
        }
    }

    buildTypes {
        release {
            signinConfigs signinConfigs.release
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}
...