<template>
  <div>
    <div class="form-group row justify-content-center">
      <div class="_5k_5">
        <select
          id="nominationPeriodStartYearsSelect"
          class="custom-select  mr-sm-2"
          @change="onChangeYearsMonth($event)"
        >
          <option selected>year</option>
          <option
            v-for="year in years"
            :key="year"
          >
            {{ year }}
          </option>
        </select>
      </div>
      <div class="_5k_5">
        <select
          id="inlineFormCustomSelect"
          class="custom-select mr-sm-2"
          @change="onChangeMonthDay($event)"
        >
          <option selected>month</option>
          <option
            v-for="month in monthsShort"
            :key="month"
          >
            {{ month }}
          </option>
        </select>
      </div>
      <div class="_5k_5">
        <div class="dates">
          <select
            id="inlineFormCustomSelect"
            class="custom-select mr-sm-2"
            @change="onChangeDay($event)"
          >
            <option selected>day</option>
            <option
              v-for="date in daysInMonth"
              :key="date"
            >
              {{ date }}
            </option>
          </select>
        </div>
      </div>
      <input
        type="text"
        pattern="(0[0-9]|1[0-9]|2[0-3])(:[0-5][0-9]){2}"
        class="form-control"
        required
        placeholder="HH:mm:ss"
        maxlength="8"
        @change="onChangeDate($event)"
      >
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import moment from 'moment';

  export default {
    data(){
      return {
        dateContext: moment(),
        keyYear: "",
        keyMonth: "",
        keyDay: "",
        keyHour: "",
        keyMinute: "",
        keySecond: "",
      }
    },
    computed: {
      ...mapGetters({
        years: 'election/years',
      }),
      monthsShort: function () {
        return this.dateContext.localeData('es').monthsShort();
      },
      daysInMonth: function () {
        this.dateContext.set({'year': this.keyYear, 'month': this.dateContext.localeData('es').monthsShort().indexOf(this.keyMonth)});
        return this.dateContext.daysInMonth();
      },
    },
    methods: {
      onChangeYearsMonth: function (event) {
        this.keyYear = event.target.value;
        this.$emit('clickedYear', this.keyYear);
      },
      onChangeMonthDay: function (event) {
         this.keyMonth = event.target.value
         this.$emit('clickedMonth', this.keyMonth);
      },
      onChangeDay: function (event) {
        this.keyDay = event.target.value;
        this.$emit('clickedDay', this.keyDay);
      },
      onChangeDate: function (event) {
        this.keyHour = event.target.value.substr(0,2);
        this.keyMinute = event.target.value.substr(3,2);
        this.keySecond = event.target.value.substr(6,4);
        this.$emit('clickedDate', this.keyHour, this.keyMinute, this.keySecond);
      },
    }
  }
</script>
