firebase.auth().onAuthStateChanged((user) => {
    // console.log(user.uid)

    if(user) {
        
        // GET HTML ELEMENTS
    document.getElementById("studentloginbtn").onclick = () => {

        let studentName = document.getElementById("studentName").value;
        let studentsCode = document.getElementById("studentscode").value;
        let admissionNum = document.getElementById("admissionnum").value;
        let parentsPhone = document.getElementById("parentsphone").value;
        let dorm = document.getElementById("dorm").value;
        let stream = document.getElementById("stream").value;
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;


        // CREATE A NEW USER
        firebase.auth().createUserWithEmailAndPassword(email,password).then((userCredential) => {

            let user = userCredential.user

            alert("user created")
                   // CREATE A STUDENTS COLECTION
       let studentDocId = firebase.firestore().collection("students").doc();
       studentDocId.set({
           studentName:studentName,
           nemisCode:studentsCode,
           admissionNum:admissionNum,
           parentsPhone:parentsPhone,
           dorm:dorm,
           stream:stream,
           studentDocId:studentDocId.id,
           studentId:user.uid
       }).then(() => {
           alert("student added")

        //    SET A NEW USER
        firebase.firestore().collection("users").doc(user.uid).set({
            parentsId:user.uid,
            parentEmail:email,
            name:studentName,
            userType: "student",
        }).then(() => {
            alert("new user added")
        }).catch((error) => {
            console.log(error)
        })


       }).then(() => {
           window.location.href = "/admin/admin.html"
       }).catch((error) => {
           alert(error.message)
       })

        }).catch((error) => {
            alert(error.message)
        })
    
    }

    }
    else {
        window.location.href = "login.html"
    }
})