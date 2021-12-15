document.getElementById("sign-in-button").onclick = () => {

    firebase.auth().languageCode = 'en';
// To apply the default browser preference instead of explicitly setting it.
// firebase.auth().useDeviceLanguage();

    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
    'size': 'invisible',
    'callback': (response) => {
      // reCAPTCHA solved, allow signInWithPhoneNumber.
    }
  });

  recaptchaVerifier.render().then((widgetId) => {
    window.recaptchaWidgetId = widgetId;
  });


// SIGN IN WITH PHONE NUM
let num = document.getElementById("phoneNum").value;
firebase.auth().signInWithPhoneNumber(num, recaptchaVerifier )
.then((confirmationResult) => {
    window.confirmationResult = confirmationResult
    alert("code sent")

    document.getElementById("Code").style.display = "block";
    document.getElementById("verify").style.display = "block"
    document.getElementById("sign-in-button").style.display = "none";
    document.getElementById("phoneNum").style.display = "none";

}).catch((error) => {
    alert("Kuna Error Bwana")
    console.log(error.message)
})
}


// verify text

document.getElementById("verify").onclick = () => {

}



  