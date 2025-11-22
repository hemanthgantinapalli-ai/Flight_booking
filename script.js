// ------------------------------
// FIREBASE INITIALIZATION
// ------------------------------
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCBtZEpS_PSTWuPt701m5j67sdTRbRoPhs",
    authDomain: "flightflex-92bc2.firebaseapp.com",
    projectId: "flightflex-92bc2",
    storageBucket: "flightflex-92bc2.appspot.com",
    messagingSenderId: "274820145406",
    appId: "1:274820145406:web:051ac35ccf76ddac7c05af",
    measurementId: "G-Y7K1GB3D95"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ------------------------------
// STATIC FLIGHT DATA
// ------------------------------
const flights = [
    { number: "FF101", origin: "NYC", destination: "LON", price: 550 },
    { number: "FF202", origin: "NYC", destination: "PAR", price: 480 },
    { number: "FF303", origin: "LON", destination: "NYC", price: 560 },
    { number: "FF404", origin: "LON", destination: "DXB", price: 620 },
    { number: "FF505", origin: "PAR", destination: "NYC", price: 500 },
    { number: "FF606", origin: "DXB", destination: "LON", price: 630 }
];

// DOM elements
const searchForm = document.getElementById("searchForm");
const resultsMessage = document.getElementById("resultsMessage");
const flightResults = document.getElementById("flightResults");
const bookingSection = document.querySelector(".booking-section");
const selectedFlightDetails = document.getElementById("selectedFlightDetails");
const bookingForm = document.getElementById("bookingForm");
const bookingFlightNumber = document.getElementById("bookingFlightNumber");
const totalPriceDisplay = document.getElementById("totalPriceDisplay");
const bookingMessage = document.getElementById("bookingMessage");


// ------------------------------
// SEARCH FLIGHTS
// ------------------------------
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const origin = document.getElementById("origin").value.trim().toUpperCase();
    const destination = document.getElementById("destination").value.trim().toUpperCase();

    const results = flights.filter(
        (f) => f.origin === origin && f.destination === destination
    );

    flightResults.innerHTML = "";

    if (results.length === 0) {
        resultsMessage.textContent = "❌ No flights found!";
        return;
    }

    resultsMessage.textContent = "✔ Flights found! Select a flight.";

    results.forEach((flight) => {
        const div = document.createElement("div");
        div.classList.add("flight-card");
        div.innerHTML = `
            <h4>Flight ${flight.number}</h4>
            <p>${flight.origin} → ${flight.destination}</p>
            <p>Price: $${flight.price}</p>
            <button class="btn-primary" onclick="selectFlight('${flight.number}', ${flight.price})">Book Now</button>
        `;
        flightResults.appendChild(div);
    });
});

// ------------------------------
// SELECT FLIGHT
// ------------------------------
window.selectFlight = function (flightNumber, price) {
    bookingSection.classList.remove("hidden");

    selectedFlightDetails.textContent = `#${flightNumber}`;
    bookingFlightNumber.value = flightNumber;

    bookingForm.dataset.price = price;
    updateTotalPrice();
};


// ------------------------------
// PRICE CALCULATION
// ------------------------------
document.getElementById("pSeats").addEventListener("input", updateTotalPrice);

function updateTotalPrice() {
    const seats = parseInt(document.getElementById("pSeats").value) || 1;
    const pricePerSeat = parseFloat(bookingForm.dataset.price || 0);
    const total = seats * pricePerSeat;

    totalPriceDisplay.textContent = `$${total.toFixed(2)}`;
}


// ------------------------------
// SAVE BOOKING → FIRESTORE
// ------------------------------
bookingForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("pName").value;
    const email = document.getElementById("pEmail").value;
    const seats = parseInt(document.getElementById("pSeats").value);
    const flightNumber = bookingFlightNumber.value;
    const total = seats * parseFloat(bookingForm.dataset.price);

    try {
        await addDoc(collection(db, "bookings"), {
            name,
            email,
            seats,
            flightNumber,
            totalPrice: total,
            timestamp: new Date()
        });

        bookingMessage.textContent = "✔ Booking Saved Successfully!";
        bookingMessage.style.color = "green";
    } catch (error) {
        console.error("ERROR:", error);
        bookingMessage.textContent = "❌ Error saving booking!";
        bookingMessage.style.color = "red";
    }
});
