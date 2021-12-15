firebase.auth().onAuthStateChanged((user) => {

    if(user) {

        // PULL ALL STAFF FROM THE DATABASE

        firebase.firestore().collection("staff").get().then((querySnapshot) => {
            let content = '';
            querySnapshot.forEach((doc) => {

                let staffCount = querySnapshot.size;
                // alert(staffCount)
                // document.getElementById("staffcount").innerHTML = staffCount

                let name = doc.data().staffName;
                let staffNum = doc.data().staffPhone;
                let fieldofService = doc.data().staffFieldOfService;
                let phoneNum = doc.data().staffPhone;


            content +=   `<tr>` 
            content +=   `<td>${name}</td>` 
            content +=   `<td>${staffNum}</td>` 
            content +=   `<td>${fieldofService}</td>` 
            content +=   `<td>${phoneNum}</td>` 
            content +=   `<td>Delete</td>` 
            content +=   ` </tr>`
            
            });

            $("#stafftabledata").append(content);
        });
    }

    else {
        window.location.href = "/admin/login.html"
    }
})