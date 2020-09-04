package com.bootstrap;

import com.reactnativenavigation.NavigationActivity;

import android.graphics.drawable.Drawable;
import androidx.core.content.ContextCompat;
import android.widget.LinearLayout;

public class MainActivity extends NavigationActivity {
    @Override
    protected void addDefaultSplashLayout() {
        LinearLayout splash = new LinearLayout(this);
        Drawable splash_background = ContextCompat.getDrawable(getApplicationContext(), R.drawable.background_splash);
        splash.setBackground(splash_background);
        setContentView(splash);
    }
}
