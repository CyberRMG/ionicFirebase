import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideIonicAngular } from '@ionic/angular/standalone';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideFirebaseApp(() => initializeApp(
      {
        apiKey: "AIzaSyASb0HC_LTq-bJn1jA4lB55p1z3QhSs15I",
        authDomain: "app-ionic-a9b9e.firebaseapp.com",
        projectId: "app-ionic-a9b9e",
        storageBucket: "app-ionic-a9b9e.firebasestorage.app",
        messagingSenderId: "33719218517",
        appId: "1:33719218517:web:5f5d2b0b205e015acfbfdc"
      }
    )),
    provideFirestore(() => getFirestore()), 
    provideIonicAngular({})
  ]
};
