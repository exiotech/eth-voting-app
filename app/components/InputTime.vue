<template>
  <div>
    <div class="row">
      <div class="_5k_5">
        <select
          id="nominationPeriodStartYearsSelect"
          class="custom-select  mr-sm-2"
          @change="onChangeYearsMonth($event)"
        >
          <option selected>{{ new Date().getFullYear() }}</option>
          <option
            v-for="year in years"
            :key="year"
          >
            {{ year }}
          </option>
        </select>
        <p class="text-center">years</p>
      </div>
      <div class="_5k_5">
        <select
          id="inlineFormCustomSelect"
          class="custom-select mr-sm-2"
          @change="onChangeMonthsDay($event)"
        >
          <option selected>{{ monthsShort[new Date().getMonth()] }}</option>
          <option
            v-for="month in monthsShort"
            :key="month"
          >
            {{ month }}
          </option>
        </select>
        <p class="text-center">months</p>
      </div>
      <div class="_5k_5">
        <div class="dates">
          <select
            id="inlineFormCustomSelect"
            class="custom-select mr-sm-2"
            @change="onChangeDays($event)"
          >
            <option selected>{{ new Date().getDate() }}</option>
            <option
              v-for="day in daysInMonth"
              :key="day"
            >
              {{ day }}
            </option>
          </select>
          <p class="text-center">days</p>
        </div>
      </div>
      <div class="_5k_5">
        <select
          id="inlineFormCustomSelect"
          class="custom-select mr-sm-2"
          @change="onChangeHours($event)"
        >
          <option selected>{{ hour }}</option>
          <option
            v-for="hour in hours"
            :key="hour"
          >
            {{ hour }}
          </option>
        </select>
        <p class="text-center">hours</p>
      </div>
      <div class="_5k_5">
        <select
          id="inlineFormCustomSelect"
          class="custom-select mr-sm-2"
          @change="onChangeMinutes($event)"
        >
          <option selected>{{ minute }}</option>
          <option
            v-for="minute in minutes"
            :key="minute"
          >
            {{ minute }}
          </option>
        </select>
        <p class="text-center">minutes</p>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import moment from 'moment';

  export default {
    data(){
      return {
        dateContext: moment(),
        keyYear: "",
        keyMonth: "",
      }
    },
    computed: {
      ...mapGetters({
        years: 'election/years',
        hours: 'election/hours',
        minutes: 'election/minutes',
      }),
      monthsShort: function () {
        return this.dateContext.localeData('es').monthsShort();
      },
      daysInMonth: function () {
        this.dateContext.set({'year': this.keyYear, 'month': this.dateContext.localeData('es').monthsShort().indexOf(this.keyMonth)});
        return this.dateContext.daysInMonth();
      },
      hour: function(){
        if(new Date().getHours() < 10)
         return "0" + new Date().getHours();
        return new Date().getHours();
      },
      minute: function(){
        if(new Date().getMinutes() < 10)
         return "0" + new Date().getMinutes();
        return new Date().getMinutes();
      },

    },
    methods: {
      onChangeYearsMonth: function (event) {
        this.keyYear = event.target.value;
        this.$emit('clickedYear', this.keyYear);
      },
      onChangeMonthsDay: function (event) {
         this.keyMonth = event.target.value
         this.$emit('clickedMonth', this.keyMonth);
      },
      onChangeDays: function (event) {
        this.$emit('clickedDay', event.target.value);
      },
      onChangeHours: function (event) {
        this.$emit('clickedHour', event.target.value);
      },
      onChangeMinutes: function (event) {
        this.$emit('clickedMinute', event.target.value);
      },
    }
  }
</script>
