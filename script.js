document.addEventListener("DOMContentLoaded", () => {
  // Dropdown menu
  const dropdown = document.querySelector(".dropdown");
  const button = dropdown.querySelector(".dropbtn");

  button.addEventListener("click", (e) => {
    e.stopPropagation();
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

  const today = new Date();
  const todayDay = today.getDate();
  const todayMonth = today.getMonth();
  const todayYear = today.getFullYear();

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

      if (day === todayDay && month === todayMonth && year === todayYear) {
        selectedDayCell = dayCell; // now selected from the start
        dayCell.style.backgroundColor = "#3D3F97";
        dayCell.style.color = "white";
        dayCell.style.borderRadius = "20px";
      }

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
        dayCell.style.borderRadius = "20px";

        // Save as selected
        selectedDayCell = dayCell;
      });

      calendarMonthEl.appendChild(dayCell);
    }
  }

  function createWeek(date) {
    const calendarWeekContainer = document.getElementById("calendar-week-container");
    const hoursColumnEl = document.getElementById("hours-column");
    const weekContainerEl = document.getElementById("week-container");

    if (!calendarWeekContainer || !hoursColumnEl || !weekContainerEl) {
      console.error("Missing required HTML elements.");
      return;
    }

    // Hour range: change these if you want a different visible range
    const startHour = 7; // show from 07:00
    const endHour = 24; // up to 23:00 (end is exclusive)

    // Clear existing content
    hoursColumnEl.innerHTML = "";
    weekContainerEl.innerHTML = "";

    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const current = new Date(date);
    const firstDayOfWeek = new Date(current);
    firstDayOfWeek.setDate(current.getDate() - current.getDay());

    // Container layout
    calendarWeekContainer.style.display = "flex";
    calendarWeekContainer.style.alignItems = "flex-start";

    // HOURS COLUMN
    hoursColumnEl.style.display = "flex";
    hoursColumnEl.style.flexDirection = "column";
    hoursColumnEl.style.alignItems = "flex-end";
    hoursColumnEl.style.paddingRight = "8px";
    hoursColumnEl.style.borderRight = "1px solid #ddd";

    // Create hour labels from startHour to endHour-1
    for (let hour = startHour; hour < endHour; hour++) {
      const hourCell = document.createElement("div");
      hourCell.className = "hour-cell";
      hourCell.textContent = `${hour.toString().padStart(2, "0")}:00`;
      hourCell.style.height = "30px"; // keep consistent row height
      hourCell.style.fontSize = "12px";
      hourCell.style.color = "#555";
      hoursColumnEl.appendChild(hourCell);
    }

    // WEEK CONTAINER
    weekContainerEl.style.display = "flex";
    weekContainerEl.style.flex = "1";
    weekContainerEl.style.overflowX = "auto";

    for (let i = 0; i < 7; i++) {
      const dayDate = new Date(firstDayOfWeek);
      dayDate.setDate(firstDayOfWeek.getDate() + i);

      const dayWrapper = document.createElement("div");
      dayWrapper.className = "day-wrapper";
      dayWrapper.style.display = "flex";
      dayWrapper.style.flexDirection = "column";
      dayWrapper.style.alignItems = "center";
      dayWrapper.style.flex = "1";
      dayWrapper.style.borderLeft = "1px solid #ddd";

      const header = document.createElement("div");
      header.className = "week-header-cell";
      header.textContent = daysOfWeek[i];
      header.style.fontWeight = "bold";
      header.style.marginBottom = "5px";

      const dayCell = document.createElement("div");
      dayCell.className = "week-day-cell";
      dayCell.textContent = dayDate.getDate();

      // HOURS COLUMN
      hoursColumnEl.style.display = "flex";
      hoursColumnEl.style.flexDirection = "column";
      hoursColumnEl.style.alignItems = "flex-end";
      hoursColumnEl.style.paddingRight = "8px";
      hoursColumnEl.style.borderRight = "1px solid #ddd";

      // Add offset to start below the week header and day number
      const headerHeight = 20; // approximate height of header
      const dayCellHeight = 30; // height of day number circle
      const headerMargin = 5; // margin-bottom of header

      hoursColumnEl.style.paddingTop = `${
        headerHeight + dayCellHeight + headerMargin
      }px`;

      const today = new Date();
      if (
        dayDate.getDate() === today.getDate() &&
        dayDate.getMonth() === today.getMonth() &&
        dayDate.getFullYear() === today.getFullYear()
      ) {
        dayCell.style.backgroundColor = "#3D3F97";
        dayCell.style.color = "white";
        dayCell.style.borderRadius = "50%";
        dayCell.style.width = "30px";
        dayCell.style.height = "30px";
        dayCell.style.display = "flex";
        dayCell.style.alignItems = "center";
        dayCell.style.justifyContent = "center";
      }

      // Create the hourly grid under each day matching the hours column
      const hoursGrid = document.createElement("div");
      hoursGrid.style.display = "flex";
      hoursGrid.style.flexDirection = "column";
      hoursGrid.style.width = "100%";

      for (let h = startHour; h < endHour; h++) {
        const hourBlock = document.createElement("div");
        hourBlock.style.borderBottom = "1px solid #eee";
        hourBlock.style.height = "30px"; // same as hour label
        hoursGrid.appendChild(hourBlock);
      }
      
      dayWrapper.appendChild(header);
      dayWrapper.appendChild(dayCell);
      dayWrapper.appendChild(hoursGrid);
      weekContainerEl.appendChild(dayWrapper);
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
  createWeek(currentDate);
});
