const firebaseConfig = {
    apiKey: "AIzaSyBI8PHuDypc22E3-zpMNBPCo3QS0Yb3Cxw",
    authDomain: "schoolmanagement-50167.firebaseapp.com",
    projectId: "schoolmanagement-50167",
    storageBucket: "schoolmanagement-50167.appspot.com",
    messagingSenderId: "720263742478",
    appId: "1:720263742478:web:a95e117aa281e53e8e685f",
    measurementId: "${config.measurementId}"
  };

// INITIALIZE APP
firebase.initializeApp(firebaseConfig);
firebase.analytics()


// ENABLE DATA ACCESS WHEN OFFLINE;

firebase.firestore().enablePersistence()
.catch((err) => {
  
  if(err.code == 'failed-precondition') {
    
  } else if(err.code == 'unimplemented') {
    
  }
})