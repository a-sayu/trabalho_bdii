<script lang="ts">
    import { onMount } from "svelte";
    // 1. Explicitly type the prop
    export let onSelect: ((date: string) => void) | undefined = undefined;

    export let currentDate: Date = new Date();

    // 2. Define the type as a number or today
    let selectedDay: number | null = currentDate.getDate();

    const today = new Date();

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
        currentDate = new Date(year, month, day);
        const formattedDate = currentDate.toISOString().split("T")[0];
        onSelect?.(formattedDate);
    }

    function prevMonth() {
        currentDate = new Date(year, month - 1, 1);
    }
    function nextMonth() {
        currentDate = new Date(year, month + 1, 1);
    }

    function isToday(day: number) {
        return (
            day == today.getDate() &&
            month == today.getMonth() &&
            year == today.getFullYear()
        );
    }
    
    onMount(() => {
        if (selectedDay !== null) {
            selectDay(selectedDay);
        }
    });
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
                class:today={isToday(day)}
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

<style>
    /* ------------
   Calendar (Month)
   ------------ */
    .calendar {
        box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
        padding: 12px;
        border-radius: 20px;
        color: #4a5660;
        height: auto;
        display: flex;
        flex-direction: column;
        width: 100%;
        padding-bottom: 20px;
    }

    .calendar-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }

    .calendar-header button {
        border: none;
        background-color: transparent;
        color: #ccc;
    }

    .calendar-header button:hover {
        color: #aaa;
    }

    #calendar-month {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 5px;
        width: 100%;
    }

    .day {
        border: none;
        padding: 10px;
        text-align: center;
        cursor: pointer;
        background: none;
    }

    .day:hover {
        background-color: #ccc;
        cursor: pointer;
        border-radius: 20px;
    }

    .header {
        color: #ccc;
    }
</style>
