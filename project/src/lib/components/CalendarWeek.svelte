<script lang="ts">
    // 1. Add lang="ts" to the script tag

    // 2. Type the exported prop
    export let currentDate: Date = new Date();

    const startHour = 6;
    const endHour = 23;
    const hours = Array.from(
        { length: endHour - startHour },
        (_, i) => i + startHour
    );

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
            isToday: isSameDay(d, new Date()),
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
        return (
            d1.getDate() === d2.getDate() &&
            d1.getMonth() === d2.getMonth() &&
            d1.getFullYear() === d2.getFullYear()
        );
    }
</script>

<div class="week-view">
    <div class="time-column">
        <div class="time-header-spacer"></div>
        {#each hours as hour}
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
                        <div class="hour-slot"></div>
                    {/each}
                </div>
            </div>
        {/each}
    </div>
</div>

<style>
    /* ------------
   Calendar (Week View)
   ------------ */

    .event-block {
        position: absolute;
        height: 100%;
        background-color: #9293d3;
        color: white;
        border-radius: 25px;
        text-align: center;
        font-size: 1.2em;
        overflow: hidden;
    }

    .week-view {
        display: flex;
        width: 100%;
        height: 100%;
        overflow-y: auto;
        border: none;
        background: white;
        box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
        padding: 12px;
        border-radius: 20px;
        color: #4a5660;
    }

    /* --- Time Column --- */
    .time-column {
        display: flex;
        flex-direction: column;
        width: 60px;
        flex-shrink: 0;
        border-right: 1px solid #eee;
    }

    .time-header-spacer {
        height: 80px;
        border-bottom: 1px solid #eee;
    }

    .time-label {
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.8rem;
        color: #888;
    }

    /* --- Days Grid --- */
    .days-grid {
        display: flex;
        flex: 1;
    }

    .day-column {
        flex: 1;
        display: flex;
        flex-direction: column;
        border-right: none;
        min-width: 0;
    }

    .day-column:last-child {
        border-right: none;
    }

    /* Day Header */
    .day-header {
        height: 80px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid #eee;
        padding: 10px 0;
    }

    .day-name {
        font-weight: bold;
        color: #555;
        margin-bottom: 5px;
    }

    .day-number {
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        font-size: 0.9rem;
    }

    .day-number.today {
        background-color: #3d3f97;
        color: white;
    }

    /* Hour Slots */
    .hour-slot {
        height: 40px;
        border-bottom: 1px solid #f5f5f5;
        position: relative;
    }

    .hour-slot:hover {
        background-color: #fafafa;
    }
</style>
