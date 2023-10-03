<script lang="ts">
  import dayjs, { type Dayjs } from 'dayjs';

  const year = dayjs().year();
  const month = dayjs().month();
  const firstDayOfMonth = dayjs(new Date(year, month, 1));
  const firstDayOfMonthIsSunday = firstDayOfMonth.day() === 0;
  const daysInMonth = dayjs().daysInMonth();
  const weekCount = daysInMonth === 28 && firstDayOfMonthIsSunday ? 4 : 5;

  // offset from start of month to previous sunday
  const calendarStartDate = firstDayOfMonth.subtract(firstDayOfMonth.day(), 'day');

  const daysMatrix: Dayjs[][] = [];
  let dayCounter = 0;
  for (let week = 0; week < weekCount; week += 1) {
    daysMatrix[week] = new Array(7);
    for (let day = 0; day < 7; day += 1) {
      daysMatrix[week][day] = dayjs(calendarStartDate.add(dayCounter, 'day'));
      dayCounter += 1;
    }
  }

  const daysOfTheWeek = ['Sun', 'Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat'];
</script>

<div class="flex h-full w-full">
  <div class="h-full left-sidebar">left sidebar</div>
  <div class="w-full h-full flex flex-col">
    {#each daysMatrix as week, weekIndex}
      <div class="flex flex-row flex-initial h-full">
        {#each week as day, dayIndex}
          <div class="border flex min-width flex-col flex-grow basis-0 items-center">
            {#if weekIndex === 0}
              <div>
                {daysOfTheWeek[dayIndex]}
              </div>
            {/if}
            <div>
              {day.date()}
            </div>
          </div>
        {/each}
      </div>
    {/each}
  </div>
  <div class="h-full right-sidebar">right sidebar</div>
</div>

<style>
  .border {
    border: 0.1px solid black;
  }

  .left-sidebar {
    min-width: 18rem;
    max-width: 23rem;
  }

  .right-sidebar {
    width: 4rem;
  }

  .min-width {
    min-width: 37px;
  }
</style>
