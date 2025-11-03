document.addEventListener("DOMContentLoaded", () => {
  // Dropdown menu
  const dropdown = document.querySelector(".dropdown");
  const button = dropdown.querySelector(".dropbtn");

  button.addEventListener("click", () => {
    dropdown.classList.toggle("show");
  });

  window.addEventListener("click", (e) => {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove("show");
    }
  });

  // Calendar
  const calendarMonthEl = document.getElementById("calendar-month");
  const monthYearEl = document.getElementById("month-year");
  const prevMonthBtn = document.getElementById("prev-month");
  const nextMonthBtn = document.getElementById("next-month");

  let currentDate = new Date();
  let selectedDayCell = null; // <-- define outside the loop

  function createCalendar(date) {
    const year = date.getFullYear();
    const month = date.getMonth();

    calendarMonthEl.innerHTML = "";

    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // Month header in Portuguese
    const monthsPT = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];
    monthYearEl.textContent = `${monthsPT[month]} ${year}`;

    // Add day headers
    daysOfWeek.forEach((day) => {
      const header = document.createElement("div");
      header.className = "header";
      header.textContent = day;
      calendarMonthEl.appendChild(header);
    });

    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    // Fill empty cells
    for (let i = 0; i < firstDay; i++) {
      const emptyCell = document.createElement("div");
      calendarMonthEl.appendChild(emptyCell);
    }

    // Fill days
    for (let day = 1; day <= lastDate; day++) {
      const dayCell = document.createElement("div");
      dayCell.className = "day";
      dayCell.textContent = day;

      dayCell.addEventListener("click", () => {
        // If clicked again, un-highlight
        if (selectedDayCell === dayCell) {
          dayCell.style.backgroundColor = "";
          dayCell.style.color = "";
          selectedDayCell = null;
          return;
        }

        // Clear previously selected day
        if (selectedDayCell) {
          selectedDayCell.style.backgroundColor = "";
          selectedDayCell.style.color = "";
        }

        // Highlight clicked day
        dayCell.style.backgroundColor = "#3D3F97";
        dayCell.style.color = "white";
        dayCell.style.borderRadius = "20px"

        // Save as selected
        selectedDayCell = dayCell;
      });

      calendarMonthEl.appendChild(dayCell);
    }
  }

  // Navigation buttons
  prevMonthBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    selectedDayCell = null; // clear selection when changing month
    createCalendar(currentDate);
  });

  nextMonthBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    selectedDayCell = null; // clear selection when changing month
    createCalendar(currentDate);
  });

  // Initialize calendar
  createCalendar(currentDate);
});
