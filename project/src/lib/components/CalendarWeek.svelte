<script lang="ts">
    import { onMount } from "svelte";

    export let currentDate: Date = new Date();

    const startHour = 8;
    const endHour = 23;
    const hour_height_px = 40;
    const header_height_px = 80;

    const hours = Array.from(
        { length: endHour - startHour },
        (_, i) => i + startHour
    );

    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    let now = new Date();
    let topPositionPx = 0;
    let isVisible = false;
    let formattedTime = "";

    function isSameDate(d1: Date, d2: Date): boolean {
        return (
            d1.getDate() === d2.getDate() &&
            d1.getMonth() === d2.getMonth() &&
            d1.getFullYear() === d2.getFullYear()
        );
    }

    function updateTimePosition() {
        now = new Date();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();

        const startOfViewWeek = getStartOfWeek(currentDate);
        const endOfViewWeek = new Date(startOfViewWeek);
        endOfViewWeek.setDate(endOfViewWeek.getDate() + 6);

        const todayZero = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate()
        );
        const startZero = new Date(
            startOfViewWeek.getFullYear(),
            startOfViewWeek.getMonth(),
            startOfViewWeek.getDate()
        );
        const endZero = new Date(
            endOfViewWeek.getFullYear(),
            endOfViewWeek.getMonth(),
            endOfViewWeek.getDate()
        );

        const isCurrentWeek = todayZero >= startZero && todayZero <= endZero;

        const isWorkingHours =
            currentHour >= startHour && currentHour < endHour;

        isVisible = isCurrentWeek && isWorkingHours;

        if (isVisible) {
            const hoursPassed = currentHour - startHour + currentMinute / 60;
            topPositionPx = header_height_px + hoursPassed * hour_height_px;
            formattedTime = `${now.getHours()}h${now.getMinutes().toString().padStart(2, "0")}`;
        }
    }

    onMount(() => {
        updateTimePosition();
        const interval = setInterval(updateTimePosition, 500);
        return () => clearInterval(interval);
    });

    $: startOfWeek = getStartOfWeek(currentDate);

    $: weekDays = Array.from({ length: 7 }, (_, i) => {
        const d = new Date(startOfWeek);
        d.setDate(startOfWeek.getDate() + i);
        return {
            date: d,
            dayName: daysOfWeek[d.getDay()],
            dayNumber: d.getDate(),
            isToday: isSameDate(d, new Date()),
            isSelected: isSameDate(d, currentDate),
        };
    });

    function getStartOfWeek(date: Date): Date {
        const d = new Date(date);
        const day = d.getDay();
        const diff = d.getDate() - day;
        return new Date(d.setDate(diff));
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
        {#if isVisible}
            <div class="current-time-line" style="top: {topPositionPx}px;">
                <span class="time-label-text">
                    Horário Atual: {formattedTime}
                </span>
            </div>
        {/if}
        {#each weekDays as day}
            <div class="day-column">
                <div class="day-header">
                    <span class="day-name">{day.dayName}</span>
                    <div
                        class="day-number"
                        class:today={day.isToday}
                        class:selected={day.isSelected}
                    >
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
        position: relative;
        display: flex;
        flex: 1;
    }

    .current-time-line {
        position: absolute;
        left: 0;
        right: 0;
        z-index: 10;
        border-top: 2px solid #3b82f6;
        pointer-events: none;
        transition: top 0.5s ease-in-out;
    }

    .time-label-text {
        position: absolute;
        top: -20px;
        left: 0;
        background-color: transparent;
        color: #3b82f6;
        font-size: 0.75rem;
        font-weight: bold;
        padding-left: 4px;
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
        padding: 0;
        box-sizing: border-box;
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
        cursor: pointer;
        transition: all 0.2s;
    }

    .day-number.today {
        border: 2px solid #3d3f97;
        font-weight: bold;
        color: #3d3f97;
    }

    .day-number.selected {
        background-color: #3d3f97;
        color: white;
        border: none;
    }

    .day-number:hover {
        background-color: #f0f0f0;
    }
    .day-number.selected:hover {
        background-color: #2c2e7a;
    }
    /* Hour Slots */
    .hour-slot {
        height: 40px;
        border-bottom: 1px solid #f5f5f5;
        position: relative;
        box-sizing: border-box;
    }

    .hour-slot:hover {
        background-color: #fafafa;
    }
</style>
