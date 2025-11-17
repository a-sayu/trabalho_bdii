<script lang="ts">
  // 1. Add lang="ts" to the script tag

  // 2. Type the exported prop
  export let currentDate: Date = new Date(); 

  const startHour = 6;
  const endHour = 23;
  const hours = Array.from({ length: endHour - startHour }, (_, i) => i + startHour);

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Reactive logic
  $: startOfWeek = getStartOfWeek(currentDate);
  
  // You can also type the shape of the objects inside the array
  $: weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + i);
    return {
      date: d,
      dayName: daysOfWeek[d.getDay()],
      dayNumber: d.getDate(),
      isToday: isSameDay(d, new Date())
    };
  });

  // 3. Type the function parameter and return type
  function getStartOfWeek(date: Date): Date {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day; 
    return new Date(d.setDate(diff));
  }

  // 4. Type the comparison parameters
  function isSameDay(d1: Date, d2: Date): boolean {
    return d1.getDate() === d2.getDate() &&
           d1.getMonth() === d2.getMonth() &&
           d1.getFullYear() === d2.getFullYear();
  }
</script>

<div class="week-view">
  <div class="time-column">
    <div class="time-header-spacer"></div> {#each hours as hour}
      <div class="time-label">{hour}:00</div>
    {/each}
  </div>

  <div class="days-grid">
    {#each weekDays as day}
      <div class="day-column">
        
        <div class="day-header">
          <span class="day-name">{day.dayName}</span>
          <div class="day-number" class:today={day.isToday}>
            {day.dayNumber}
          </div>
        </div>

        <div class="hours-container">
          {#each hours as hour}
            <div class="hour-slot">
              </div>
          {/each}
        </div>

      </div>
    {/each}
  </div>
</div>