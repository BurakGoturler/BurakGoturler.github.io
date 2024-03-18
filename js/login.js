// Kullanıcı giriş fonksiyonu
function loginUser() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Firebase Authentication API'sini kullanarak kullanıcı girişi yap
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Kullanıcı başarıyla giriş yaptığında yapılacak işlemler
            const user = userCredential.user;
            console.log("User logged in:", user);
            alert("Giriş başarılı!");
        })
        .catch((error) => {
            // Giriş işlemi başarısız olduğunda yapılacak işlemler
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("Login error:", errorMessage);
            alert("Giriş başarısız: " + errorMessage);
        });
}