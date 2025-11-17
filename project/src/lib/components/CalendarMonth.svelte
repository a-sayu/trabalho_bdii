<script lang="ts">
  // 1. Explicitly type the prop
  export let currentDate: Date = new Date();

  // 2. Define the type as a number OR null
  let selectedDay: number | null = null;

  // Nomes dos meses e dias
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
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Reatividade: recalcula sempre que currentDate mudar
  $: year = currentDate.getFullYear();
  $: month = currentDate.getMonth();
  $: monthName = monthsPT[month];

  // Lógica para preencher dias vazios e dias do mês
  $: firstDayIndex = new Date(year, month, 1).getDay();
  $: lastDate = new Date(year, month + 1, 0).getDate();

  // Cria arrays para o loop no HTML
  $: emptyDays = Array(firstDayIndex).fill(null);
  $: monthDays = Array.from({ length: lastDate }, (_, i) => i + 1);

  // 3. Explicitly type the parameter 'day' as a number
  function selectDay(day: number) {
    selectedDay = day;
  }

  function prevMonth() {
    currentDate = new Date(year, month - 1, 1);
  }
  function nextMonth() {
    currentDate = new Date(year, month + 1, 1);
  }
</script>

<div class="calendar">
  <div class="calendar-header">
    <button on:click={prevMonth}>Prev</button>
    <span>{monthName} {year}</span>
    <button on:click={nextMonth}>Next</button>
  </div>

  <div id="calendar-month">
    {#each daysOfWeek as day}
      <div class="header">{day}</div>
    {/each}

    {#each emptyDays as _}
      <div></div>
    {/each}

    {#each monthDays as day}
      <button
        type="button"
        class="day"
        class:selected={selectedDay === day}
        style:background-color={selectedDay === day ? "#3D3F97" : ""}
        style:color={selectedDay === day ? "white" : ""}
        style:border-radius={selectedDay === day ? "20px" : ""}
        on:click={() => selectDay(day)}
      >
        {day}
      </button>
    {/each}
  </div>
</div>
