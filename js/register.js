// Kullanıcı kayıt fonksiyonu
function registerUser() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Firebase Authentication API'sini kullanarak kullanıcı kaydı yap
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Kullanıcı başarıyla kaydedildiğinde yapılacak işlemler
            const user = userCredential.user;
            console.log("User registered:", user);
            alert("Kayıt başarılı!");
        })
        .catch((error) => {
            // Kayıt işlemi başarısız olduğunda yapılacak işlemler
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("Registration error:", errorMessage);
            alert("Kayıt başarısız: " + errorMessage);
        });
}