firebase.auth().onAuthStateChanged((user) => {
    
    console.log(user.uid)

    if(user ) {

        

        // LISTEN TO CHNAGES IN FIREBASE AND UPDATE AUTOMATICALY

        let teacherRef = firebase.firestore().collection("teachers");
        teacherRef.onSnapshot((querySnapshot) => {

            $("#teachertable").html('');
            
            pullData();

        })

        // PULL ALL TEACHERS FROM THE DATABASE

        function pullData() {
            
        firebase.firestore().collection("teachers").get().then((querySnapshot) => {
            let content = '';

            querySnapshot.forEach((doc) => {

            //     let teachersCount = querySnapshot.size
            // document.getElementById("teacherscount").innerHTML = teachersCount

                let name = doc.data().name;
                let phone = doc.data().phone;
                let staffNum = doc.data().staffNum;
                let subjectTaught = doc.data().subjectTaught;
                // let 

              content += `<tr>`  
              content += `<td>${name}</td>`  
              content += `<td>${phone}</td>`  
              content += `<td>${staffNum}</td>`  
              content += ` <td>${subjectTaught}</td>` 
              content += `<td>Edit</td>`  
              content += ` </tr>` 


            });

            $("#teachertable").append(content);
     
        });

        // QUERYING FROM THE DATABASE

        document.getElementById("searchteacherbtn").onclick = () => {

            document.getElementById("teachertableholder").style.display = "none"
            document.getElementById("searchteachertableholder").style.display = "flex"
            document.getElementById("searchteachertableholder").style.flexDirection = "column"
          let searchInput =  document.getElementById("teachersearchvalue").value;

         
            firebase.firestore().collection("teachers")
            .where("name","==",searchInput)
            // .where("phone","==".searchInput)
            // .where("subjectTaught","==", searchInput)
            .get().then((querySnapshot) => {
                let content = '';
                querySnapshot.forEach((doc) => {

                    
                    let name = doc.data().name;
                    let phone = doc.data().phone;
                    let staffNum = doc.data().staffNum;
                    let subjectTaught = doc.data().subjectTaught;

                    alert(name)

                    content += `<tr>`  
                    content += `<td>${name}</td>`  
                    content += `<td>${phone}</td>`  
                    content += `<td>${staffNum}</td>`  
                    content += ` <td>${subjectTaught}</td>` 
                    content += `<td>Edit</td>`  
                    content += ` </tr>` 


                });

                $("#searchteachertable").append(content);

                if(searchInput == "") {
                    document.getElementById("teachertableholder").style.display = "block"
                }
            });
        }
        
       
}

    }
    else {
        window.location.href = "/admin/login.html"
    }
})