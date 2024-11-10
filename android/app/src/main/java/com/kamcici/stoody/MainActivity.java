package com.kamcici.stoody;
import android.os.Bundle;
import com.google.firebase.FirebaseApp;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
@Override
    public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    FirebaseApp.initializeApp(this);
}
}


