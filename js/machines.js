
// Örnek olarak, kullanıcıların rezervasyonlarını bir dizi olarak tanımlayalım
const reservations = [
    { machine: "machine1", time: "10:00", user: "Ahmet" },
    { machine: "machine2", time: "12:00", user: "Mehmet" },
    // Burada daha fazla rezervasyon ekleyebilirsiniz
];

// Her bir rezervasyon için makineye göre pozisyon hesaplayarak çamaşır makinesi şeklinde göstermek için bir işlev
function showReservations() {
    const machineDiv = document.getElementById("washingMachine");

    // Rezervasyonları temizleyelim
    machineDiv.innerHTML = "";

    // Her rezervasyon için çamaşır makinesi içinde bir div oluşturalım
    reservations.forEach(reservation => {
        const machineElement = document.createElement("div");
        machineElement.classList.add("reservation");
        machineElement.innerText = `${reservation.user} - ${reservation.time}`;
        
        // Pozisyonu hesaplayalım ve ayarlayalım
        const machine = document.getElementById(reservation.machine);
        const machineRect = machine.getBoundingClientRect();
        machineElement.style.left = (machineRect.left + 10) + "px";
        machineElement.style.top = (machineRect.top + 10) + "px";

        // Oluşturduğumuz div'i çamaşır makinesinin içine ekleyelim
        machineDiv.appendChild(machineElement);
    });
}

// Sayfa yüklendiğinde rezervasyonları gösterelim
window.onload = showReservations;

// Sayfa yüklendiğinde ve makine seçildiğinde çağrılacak işlevleri tanımlayalım:
window.onload = function() {
    updateMachineStatus(); // Sayfa yüklendiğinde güncelleme yap
    document.getElementById('machineSelect').addEventListener('change', updateMachineStatus); // Makine seçildiğinde güncelleme yap
    createTimeOptions(); // Saat seçeneklerini oluştur
}

// Saat seçeneklerini oluşturmak için bir işlev
function createTimeOptions() {
    const timeSelect = document.getElementById('timeSelect');

    // Her saat için bir seçenek oluştur
    for (let i = 0; i < 24; i++) {
        const option = document.createElement('option');
        option.text = i.toString().padStart(2, '0') + ":00"; // Saati iki haneli olarak ayarla (örn. "08:00")
        timeSelect.add(option);
    }
}

// Makine seçimi değiştiğinde saatleri güncelle
document.getElementById('machineSelect').addEventListener('change', updateTimes);

// Saatleri güncelleme işlevi
function updateTimes() {
    const selectedMachine = document.getElementById('machineSelect').value;
    const timeSelect = document.getElementById('timeSelect');
    timeSelect.innerHTML = ''; // Önceki seçenekleri temizle

    // Makineye göre saat aralıklarını güncelle
    // Örneğin, farklı makinelerin farklı saat aralıkları olabilir.
    // Burada seçilen makinaya göre saat aralıklarını ekleyin.
    // Aşağıda sadece bir örnek gösterilmektedir:
    switch (selectedMachine) {
        case 'machine1':
            for (let i = 8; i <= 20; i++) {
                const option = document.createElement('option');
                option.text = i.toString() + ":00";
                timeSelect.add(option);
            }
            break;
        case 'machine2':
            // Makine 2 için saat aralıklarını ekleyin
            break;
        case 'machine3':
            // Makine 3 için saat aralıklarını ekleyin
            break;
        default:
            // Varsayılan olarak tüm saat aralıklarını ekleyin veya bir hata mesajı gösterin
            break;
    }
}

// Firebase yapılandırma bilgilerini buraya ekleyin
const firebaseConfig = {
    apiKey: "AIzaSyAtb7-3OYXlr_RNdcKF3EUZlFH9yekwkuo",
    authDomain: "makinee-9a42d.firebaseapp.com",
    databaseURL: "https://makinee-9a42d-default-rtdb.firebaseio.com",
    projectId: "makinee-9a42d",
    storageBucket: "makinee-9a42d.appspot.com",
    messagingSenderId: "959353723807",
    appId: "1:959353723807:web:29d8fd2bb4e142a09efbaa"
};

// Firestore veritabanı referansını alın
const db = firebase.firestore();

const app = initializeApp(firebaseConfig);

// Bu kısım, kayıt ve giriş yapmış kullanıcıları kontrol eder ve gerekirse işlem yapar.
window.onload = function() {
   const userInfo = JSON.parse(sessionStorage.getItem("user-info"));
   const userCreds = JSON.parse(sessionStorage.getItem("user-creds"));

   if (userInfo && userCreds) {
       // Kullanıcı giriş yapmış, bu yüzden kullanıcıyı karşıladığınız bir mesaj veya başka bir işlem yapabilirsiniz.
       console.log("Hoş geldiniz, " + userInfo.firstname + " " + userInfo.lastname);

       // Burada, kullanıcının seçebileceği saat aralıklarını dinamik olarak oluşturabilirsiniz.
       const timeSelect = document.getElementById('timeSelect');

       // Örnek olarak, 8:00 - 20:00 arasındaki saat aralıklarını ekleyelim:
       for (let i = 8; i <= 20; i++) {
           const option = document.createElement('option');
           option.text = i.toString() + ":00";
           timeSelect.add(option);
       }
   } else {
       // Kullanıcı giriş yapmamış, bu yüzden yönlendirebilir veya giriş yapmaları için bir mesaj gösterebilirsiniz.
       console.log("Giriş yapmadınız.");
       // Örneğin, giriş sayfasına yönlendirme yapabiliriz:
       // window.location.href = 'login.html';
   }
}

// Rezervasyon yapmak için bir işlev
function reserve() {
   // Kullanıcı bilgilerini al
   const userInfo = JSON.parse(sessionStorage.getItem("user-info"));

   // Kullanıcı girişi yapılmış mı kontrol et
   if (userInfo) {
       // Makine ve saat seçimlerini al
       const selectedMachine = document.getElementById('machineSelect').value;
       const selectedTime = document.getElementById('timeSelect').value;

       // Rezervasyon bilgilerini Firestore'a kaydet
       db.collection("reservations").add({
           userId: userInfo.userId,
           machine: selectedMachine,
           time: selectedTime,
           timestamp: firebase.firestore.FieldValue.serverTimestamp()
       })
       .then(function(docRef) {
           console.log("Rezervasyon başarıyla kaydedildi: ", docRef.id);
           alert("Rezervasyon başarıyla yapıldı!");
       })
       .catch(function(error) {
           console.error("Rezervasyon kaydedilirken hata oluştu: ", error);
           alert("Rezervasyon yaparken bir hata oluştu!");
       });
   } else {
       alert("Lütfen önce giriş yapın!");
   }
}