firebase.auth().onAuthStateChanged((user) => {
    if(user) {

    document.getElementById("addstaffbtn").onclick = () => {

        // GET HTML ELEMENTS

        let staffname = document.getElementById("staffname").value;
        let staffDesc = document.getElementById("staffDesc").value;
        let staffPhone = document.getElementById("staffPhone").value;
        let staffcode = document.getElementById("staffcode").value;
        let staffFieldOfService = document.getElementById("staffFieldOfService").value;
        let staffemail = document.getElementById("staffemail").value;
        let staffpassword = document.getElementById("staffpassword").value;
        let timeStamp = firebase.firestore.Timestamp.fromDate(new Date());

        // UPLOADING FILE

        let staffRootRef = firebase.storage().ref();

        let pic =  document.getElementById("staffImg").files[0];

        let uploadFile = staffRootRef.child("staffimages/").child(pic.name).put(pic);

        document.getElementById("filename").innerHTML = pic.name;

        uploadFile.on('state_changed', (snapshot) => {

            let progress = Math.floor((snapshot.bytesTransferred/ snapshot.totalBytes))*100

            document.getElementById("progressbar").innerHTML = "Uploading..." + progress + "%"

            if("uploading..." + progress + "%" == "uploading..." + "100%") {
                document.getElementById("progressbar").style.display = "none"
            }
        }, (error) => {
            console.log(error);
        }, () => {

            uploadFile.snapshot.ref.getDownloadURL().then((downloadURL) => {

                // alert(downloadURL);

                // SIGN UP A NEW STAFF

                firebase.auth().createUserWithEmailAndPassword(staffemail, staffpassword)
                .then((userCredential) => {
                    let user = userCredential.user;

                    alert("sign up successfull");

                    // ADD USER TO USERS COLLECTION

                    firebase.firestore().collection("users").doc(user.uid).set({
                        
                        name:staffname,
                        email:staffemail,
                        userType: "staff",
                        timeStamp:timeStamp,
                    }).then(() => {
                        alert("user created")

                        // CREATE A STAFF COLLECTION

                      let staffId =   firebase.firestore().collection("staff").doc();
                      staffId.set({
                          staffName:staffname,
                          staffemail:staffemail,
                          staffcode:staffcode,
                          staffDesc:staffDesc,
                          staffPhone:staffPhone,
                          staffFieldOfService:staffFieldOfService,
                          userId:user.uid,
                          staffDocId:staffId.id,
                          timeStamp:timeStamp,
                          downloadURL:downloadURL
                      }).then(() => {
                          alert("staff added")
                      }).then(() => {
                        window.location.href = "/admin/admin.html"
                      })
                      .catch((error) => {
                          alert(error.message)
                      })
                    }).catch((error) => {
                        alert(error.message)
                    })
                }).catch((error) => {
                    alert(error.message)
                })
            })
        } )

    }


    }


    else {

    }
})