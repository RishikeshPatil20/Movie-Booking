//Create you project here from scratch
const moviesList = [
  { movieName: "Flash", price: 7 },
  { movieName: "Spiderman", price: 5 },
  { movieName: "Batman", price: 4 },
];
let currentMovieIndex = 0;
const selectElement = document.querySelector("#selectMovie");
const movieElement = document.querySelector("#movieName");
const moviePriceElement = document.querySelector("#moviePrice");
const totalPriceElement = document.getElementById("totalPrice");
const numberOfSeatElement = document.getElementById("numberOfSeat");
const selectedSeatsHolderElement = document.getElementById("selectedSeatsHolder");
const seatElement = document.querySelectorAll("#seatCont .seat");
const continueButtonElement = document.getElementById("proceedBtn");
const cancelButtonElement = document.getElementById("cancelBtn");
const dateElement = document.querySelector(".date");

//set deafult movie info
// updateMovieInfo(moviesList[currentMovieIndex]);
function updateMovieInfo(movie) {
  movieElement.textContent = movie.movieName;
  moviePriceElement.textContent = `$ ${movie.price}`;
}

// Use moviesList array for displaing the Name in the dropdown menu
moviesList.forEach((movie, index) => {
  const option = document.createElement("option");
  option.value = index;
  option.textContent = `${movie.movieName} $${movie.price}`;
  selectElement.appendChild(option);
});

function handleChange(event) {
  currentMovieIndex = parseInt(event.target.value);
  updateMovieInfo(moviesList[currentMovieIndex]);
}
selectElement.addEventListener("change", handleChange);

// when we click on the seats then it should get selected
seatElement.forEach((element) => {
  element.addEventListener("click", () => {
    // No occupied elements are selected
    if (!element.classList.contains("occupied")) {
      element.classList.toggle("selected");
      const selectedSeats = document.querySelectorAll(
        ".seatCont .seat.selected"
      );
      const numberOfSeats = selectedSeats.length;
      updateTotalPrice(numberOfSeats);
      updateNumberOfSeats(numberOfSeats);
      updateSeatHolders(selectedSeats, numberOfSeats);
    }
  });
});

// updates the total price
function updateTotalPrice(numberOfSeats) {
  let currentMovieprice = moviesList[currentMovieIndex].price;
  let totalPrice = numberOfSeats * currentMovieprice;
  totalPriceElement.textContent = `$ ${totalPrice}`;
}

// updates the number of seats
function updateNumberOfSeats(numberOfSeats) {
  numberOfSeatElement.textContent = `${numberOfSeats}`;
}

// updates the seat position with seat numbers
function updateSeatHolders(selectedSeats, numberOfSeats) {
  if (numberOfSeats > 0) {
    selectedSeatsHolderElement.innerHTML = "";
    updateSeatPosition(selectedSeats);
  } else {
    selectedSeatsHolderElement.innerHTML = `<span class="noSelected">No Seat Selected</span>`;
  }
}

function updateSeatPosition(selectedSeats) {
  selectedSeats.forEach((seat) => {
    let seatIndex = [...seatElement].indexOf(seat);
    const seatNumber = seatIndex + 1;
    const spanElement = document.createElement("span");
    spanElement.classList.add("selectedSeat");
    spanElement.textContent = `${seatNumber}`;
    selectedSeatsHolderElement.appendChild(spanElement);
  });
}

// click the continue Button when the seats are selected
continueButtonElement.addEventListener("click", () => {
  const selectedSeats = document.querySelectorAll(".seatCont .seat.selected");
  const numberOfSeats = selectedSeats.length;
  if (numberOfSeats > 0) {
    alert("Yayy! Your Seats have been booked");
    //set the seats to occupied ones
    selectedSeats.forEach((seat) => {
      seat.classList.replace("selected", "occupied");
    });
    setDefaultValues();
  } else {
    alert("Oops no seat Selected");
  }
});
// Set Default Values
function setDefaultValues() {
  totalPriceElement.textContent = `$ 0`;
  numberOfSeatElement.textContent = `0`;
  selectedSeatsHolderElement.innerHTML = `<span class="noSelected">No Seat Selected</span>`;
}
// Cancel Button
cancelButtonElement.addEventListener("click", () => {
  const selectedSeats = document.querySelectorAll(".seatCont .seat.selected");
  const numberOfSeats = selectedSeats.length;
  if (numberOfSeats > 0) {
    // remove the selected seats
    selectedSeats.forEach((seat) => {
      seat.classList.remove("selected");
    });
    setDefaultValues();
  } else {
    alert("Oops no seat Selected");
  }
});

function getDate(date) {
  const year = date.getFullYear();
  const monthName = date.toLocaleString("default", { month: "long" });
  const day = date.getDate().toString().padStart(2, "0");
  return `${day} ${monthName},${year}`;
}

(function init() {
  let todaysDate = new Date();
  let dateValue = getDate(todaysDate);
  dateElement.textContent = `${dateValue}`;
  updateMovieInfo(moviesList[currentMovieIndex]);
})();
