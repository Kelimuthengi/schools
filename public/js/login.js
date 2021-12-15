// GETTING HTML ELEMENTS

document.getElementById("loginbtn").onclick = () => {

    // GETTING HTML ELEMENTS

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    firebase.auth().signInWithEmailAndPassword(email,password).then((userCredential) => {
        let user = userCredential.user;

        console.log(user.uid)
            
        alert("done")
        // CHECK THE USERTYPE
        firebase.firestore().collection("users").doc(user.uid)
        .get().then((doc) => {
          
            if(doc.exists) {
                let userType = doc.data().userType;

                if(userType == "admin") {
                    window.location.href = "/admin/admin.html"
                }
                else {
                    
                }
            }

            else {
                alert("No such doc")
            }
        });


    }).catch((error) => {
        alert(error.message)
    })

}






