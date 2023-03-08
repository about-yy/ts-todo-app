<template>
    <div class="calendar-container">
        <span class="calendar-title">{{title}}</span>
        <div class="calendar-header align-center">
            <v-icon class="mdi mdi-arrow-left-bold"></v-icon>
            <span class="month">{{new Date().getMonth()+1}}月</span>
            <v-icon class="mdi mdi-arrow-right-bold"></v-icon>
        </div>
        <div class="weeks align-center">
            <p class="week" v-for="week in weeks" :key="week">{{week}}</p>
        </div>
        <div class="dates align-center">
            <div class="date-row" v-for="dateList in arraySplit(dates, 7)" :key="dateList[0].getDate()">
                <span class="date" :class="{disable: date.getMonth() !== new Date().getMonth()}" v-for="date in dateList" :key="date.getDate()">
                    {{ date.getDate() }}
                </span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue'

export default defineComponent({
    props: {
        title: String
    },
    setup() {
        const arraySplit = <T = object>(array: T[], n: number): T[][] =>
             array.reduce((acc: T[][], c, i: number) => (i % n ? acc : [...acc, ...[array.slice(i, i + n)]]), []);

        const dateFactory = (year: number, month: number): Array<Date> =>{
            if(year<1910 || year>2200){
                return [];
            }
            if(month < 1 || month > 12){
                return [];
            }
            console.log(year, month)
            const result = [];
            const monthStartDate = new Date(year, month, 1);
            const monthLastDate = new Date(year,month+1, 0) 
            const startDate = new Date(monthStartDate.setDate(monthStartDate.getDate()-monthStartDate.getDay()));
            console.log(startDate)
            const endDate = new Date(monthLastDate.setDate(monthLastDate.getDate()+ (6-monthLastDate.getDay())));
            console.log(endDate)
            for (let date = startDate; date <= endDate; date.setDate(date.getDate()+1)) {
                result.push(new Date(date));
            }
            return result;
        }

        const weeks=["日","月","火","水","木","金","土"];
        const dates: Ref<Array<Date>> = ref(dateFactory(new Date().getFullYear(), new Date().getMonth()));

        return {
            weeks,
            dates,
            arraySplit
        }
    },
})
</script>
<style lang="scss" scoped>
.calendar-container {
    width: 100%;
    height: 100%;
    border: 1px solid black;
    border-radius: 6px;
    padding: 8px 20px;
}
.calendar-container .align-center {
    text-align: center;
}
.weeks { 
    display: flex;
    justify-content: space-evenly;
    padding-bottom: 0.2em;
    margin-bottom: 0.3em;
}
.weeks .week {
    width: 2em;
}
.calendar-container .calendar-header {
    display: flex;
    justify-content: space-between;
}
.calendar-container .month{
    font: bold;
    font-size: 1.5em;    
}

.dates {
    display: flex;
    flex-direction: column;
}
.date-row {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    width: 100%;
}
.dates .date {
    margin: 2px;
    width: 2em;
    text-align: center;
    justify-content: center;
    
}
.disable {
    opacity: 0.3;
}

</style>