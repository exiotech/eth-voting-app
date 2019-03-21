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
          @change="onChangeMonthsDay($event)"
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
            @change="onChangeDays($event)"
          >
            <option selected>day</option>
            <option
              v-for="day in daysInMonth"
              :key="day"
            >
              {{ day }}
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
      onChangeMonthsDay: function (event) {
         this.keyMonth = event.target.value
         this.$emit('clickedMonth', this.keyMonth);
      },
      onChangeDays: function (event) {
        this.$emit('clickedDay', event.target.value);
      },
      onChangeDate: function (event) {
        this.$emit(
          'clickedDate',
          event.target.value.substr(0,2),
          this.keyMinute = event.target.value.substr(3,2),
          this.keySecond = event.target.value.substr(6,4)
        );
      },
    }
  }
</script>
