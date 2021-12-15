firebase.auth().onAuthStateChanged((user) => {
    console.log(user.uid);

    if(user) {

        document.getElementById("addteacherbutton").onclick = () => {

            let teachername = document.getElementById("teachername").value;
            let teacherdesc = document.getElementById("techerdesc").value;
            let teacherphone = document.getElementById("teacherphone").value;
            let teachernum = document.getElementById("teachernum").value;
            let subjectteaching = document.getElementById("subjectteaching").value;
            let teacheremail = document.getElementById("teacheremail").value;
            let teacherpassword = document.getElementById("teacherpassword").value;
            let timeStamp = firebase.firestore.Timestamp.fromDate(new Date());

                    // upload a pic

        let storageRef = firebase.storage().ref();

        let pic = document.getElementById("teacherimage").files[0];

        let uploadFile = storageRef.child("teachersimages/").child(pic.name).put(pic);

        uploadFile.on('state_changed', (snapshot) => {

            let progress = Math.floor((snapshot.bytesTransferred/snapshot.totalBytes)) * 100

            document.getElementById("progresscount").innerHTML = "Uploading..." + progress + "%"

            if("Uploading..." + progress + "%" == "Uploading..." + "100%") {
                document.getElementById("progresscount").style.display = "none"
            }
        }, (error) => {
            console.log(error.message)
        }, () => {
            uploadFile.snapshot.ref.getDownloadURL().then((downloadURL) => {
                
                document.getElementById("teacherurl").src = downloadURL


                // CREATE A USER

                firebase.auth().createUserWithEmailAndPassword(teacheremail,teacherpassword).then((userCredential) =>{ 

                    let user = userCredential.user;

                    alert("user created")

                    // ADDING TEACHER TO USERS COLLECTION

                    firebase.firestore().collection("users").doc(user.uid).set({
                        name:teachername,
                        teacherEmail:teacheremail,
                        userType: "teacher",
                        userId: user.uid,

                    }).then(() => {
                        alert("teacher added");

                        // CREATE A TEACHERS COLLECTION

                        let teacherId = firebase.firestore().collection("teachers").doc();
                        teacherId.set({
                            name:teachername,
                            email:teacheremail,
                            teacherdesc:teacherdesc,
                            phone:teacherphone,
                            staffNum:teachernum,
                            subjectTaught:subjectteaching,
                            teacherId:teacherId.id,
                            downloadURL:downloadURL,
                            timeStamp:timeStamp
                        }).then(() => {
                            alert("teacher added to collection");

                            window.location.href = "/admin/admin.html"
                        }).catch((error) => {
                            console.log(error.message)
                        })
                    }).catch((error) => {
                        console.log(error)
                    })
                }).catch((error) => {
                    console.log(error)
                })
            })
        })
        }



    }

    else {

    }
})