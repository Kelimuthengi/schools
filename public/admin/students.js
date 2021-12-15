firebase.auth().onAuthStateChanged((user) => {
    

    console.log(user.uid)
    if(user) {

        // CHECK FOR CHANGES IN THE DATABASE
        let studentRef = firebase.firestore().collection("students");
        studentRef.onSnapshot((querySnapshot) => {

            $("#studentsbody").html('');

            pullData()
        });

        // PULL ALL STUDENTS FROM THE FIREBASE;

        function pullData() {
            firebase.firestore().collection("students").get().then((querySnapshot) => {
                
                // let count =  document.getElementById("studentcount").value;
                // alert(count)
                //  let studentsCount = querySnapshot.size;


                //   count += studentsCount

                let content = '';
                querySnapshot.forEach((doc) => {
                

                   
                   

                    let studentName = doc.data().studentName;
                    let admissionNum = doc.data().admissionNum;
                    let dorm = doc.data().dorm;
                    let stream = doc.data().stream;
    
                   content += `<tr>` 
                   content += `<td>${studentName}</td>` 
                   content += `<td>${admissionNum}</td>` 
                   content += `<td>${dorm}</td>` 
                   content += `<td>${stream}</td>` 
                   content += `<td>View more</td>` 
                   content += ` </tr>`
                
                });
    
                $("#studentsbody").append(content);
            });
        }


    }

    else {
        window.location.href = "/admin/login.html"
    }
})