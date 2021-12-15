document.getElementById("resetbutton").onclick = () => {

    let searchInput = document.getElementById("resetpassword").value;
    firebase.auth().sendPasswordResetEmail(searchInput).then(() => {
        alert("A password reset link has been sent to your account")
    })
}