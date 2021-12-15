firebase.auth().onAuthStateChanged((user) => {

    if(user) {

        document.getElementById("addSubject").onclick = () => {

            // GET HTML ELEMENTS
            let subjectName = document.getElementById("subjectName").value;
            let subjectDesc = document.getElementById("subjectDesc").value;
            let subjectDuration = document.getElementById("subjectDuration").value;
            let timeStamp = firebase.firestore.Timestamp.fromDate(new Date);

            // SENDING DATA TO FIREBASE
           let subjectId =  firebase.firestore().collection("subjects").doc();
            subjectId.set({
                subjectName:subjectName,
                subjectDesc:subjectDesc,
                subjectDuration:subjectDuration,
                timeStamp:timeStamp,
                subjectDocId:subjectId.id
            }).then(() => {
                alert("subject added");

                window.location.href = "/admin/admin.html"
            }).catch((error) => {
                alert(error);
            })

        }

    }

    else {
        window.location.href = "/admin/login.html"
    }
})