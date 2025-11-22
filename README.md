# ✈️ FlightFlex – Simple Flight Booking Demo (Firebase + HTML/JS)

FlightFlex is a lightweight demo project that allows users to submit basic flight booking information and store it in Firebase Firestore.  
This project is built using HTML, CSS, JavaScript, and Firebase Web SDK v10.

---

## 🚀 Features

- Firebase Firestore database integration  
- Stores booking details (name, email, from, to, timestamp)  
- Simple, responsive booking UI  
- Firestore rules configured for temporary development access  
- Easy to deploy on GitHub Pages or any static hosting service

---

## 📂 Project Structure

/project-folder
│── index.html
│── script.js
│── style.css
│── README.md

yaml
Copy code

---

## 🔥 Firebase Setup Instructions

### 1. Create Firebase Project  
Go to the Firebase Console → Add new project → Enable Firestore.

### 2. Add Firebase to Web App  
Copy the Firebase config and paste it into `script.js`:

```js
const firebaseConfig = {
  apiKey: "xxxxxxxxxxxx",
  authDomain: "xxxx.firebaseapp.com",
  projectId: "xxxx",
  storageBucket: "xxxx.appspot.com",
  messagingSenderId: "xxxx",
  appId: "xxxx",
  measurementId: "xxxx"
};
🛠️ Firestore Security Rules (Development Use Only)
js
Copy code
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.time < timestamp.date(2025, 12, 31);
    }
  }
}
📑 JavaScript Code (script.js)
js
Copy code
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = { /* your config */ };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.getElementById("bookingForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;

  try {
    await addDoc(collection(db, "bookings"), {
      name,
      email,
      from,
      to,
      timestamp: new Date()
    });

    alert("✔ Booking Saved Successfully!");
  } catch (error) {
    console.error("ERROR:", error);
    alert("❌ Error saving booking!");
  }
});
🎨 UI Form Example (index.html)
html
Copy code
<form id="bookingForm">
  <input id="name" type="text" placeholder="Your Name" required />
  <input id="email" type="email" placeholder="Email" required />
  <input id="from" type="text" placeholder="From" required />
  <input id="to" type="text" placeholder="To" required />
  <button type="submit">Book Now</button>
</form>
📦 How to Run
Open the project folder

Run index.html directly in browser

Fill the form → Submit

Check Firestore → You will see the booking saved under bookings collection

🚧 Known Limitations
This is only booking data submission, not real flight search

No ticket availability API or payment integration

Needs backend/API for live flight data (Amadeus, Skyscanner, Cleartrip)

🎯 Future Improvements
User Authentication

Admin dashboard

Flight search API

Seat selection

Payment integration

