<template>
  <div>
    <div class="text-right">
      <nuxt-link to="/voting">link to voting</nuxt-link>
    </div>
    <div class="jumbotron jumbotron-fluid">
      <h3 class="text-center">Nomination Period</h3>
      <div class="form-group row justify-content-center">
        <p>Start time:</p>
        <div class="_5k_5">
          <select
            id="nominationPeriodStartYearsSelect"
            class="custom-select  mr-sm-2"
            @change="onChangeYearsMonthNomStart($event)"
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
            @change="onChangeMonthDayNomStart($event)"
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
              @change="onChangeDayNomStart($event)"
            >
              <option selected>day</option>
              <option
                v-for="date in daysInMonthNomStart"
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
          @change="onChangeDateNominationPeriodStart($event)"
        >
      </div>
      <div class="form-group row justify-content-center">
        <p>End time:</p>
        <div class="_5k_5">
          <select
            id="nominationPeriodEndYearsSelect"
            class="custom-select mr-sm-2"
            @change="onChangeYearsMonthNomEnd($event)"
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
            @change="onChangeMonthDayNomEnd($event)"
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
              @change="onChangeDayNomEnd($event)"
            >
              <option selected>day</option>
              <option
                v-for="date in daysInMonthNomEnd"
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
          @change="onChangeDateNominationPeriodEnd($event)"
        >
      </div>
      <div class="text-center">
        <button
          :disabled="nominationSubmit"
          class="btn btn-success"
          type="submit"
          @click="runTimerNomenationPeriod">Submit</button>
      </div>
    </div>
    <div class="jumbotron jumbotron-fluid">
      <h3 class="text-center">Voting Period</h3>
      <div class="form-group row justify-content-center">
        <p>Start time:</p>
        <div class="_5k_5">
          <select
            id="1"
            class="custom-select mr-sm-2"
            @change="onChangeYearsMonthVotingStart($event)"
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
            id="1"
            class="custom-select mr-sm-2"
            @change="onChangeMonthDayVotingStart($event)"
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
              id="1"
              class="custom-select mr-sm-2"
              @change="onChangeDayVotingStart($event)"
            >
              <option selected>day</option>
              <option
                v-for="date in daysInMonthVotingStart"
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
          required
          class="form-control"
          placeholder="HH:mm:ss"
          maxlength="8"
          @change="onChangeDateVotingPeriodStart($event)"
        >
      </div>
      <div class="form-group row justify-content-center">
        <p>End time:</p>
        <div class="_5k_5">
          <select
            id="2"
            class="custom-select mr-sm-2"
            @change="onChangeYearsMonthVotingEnd($event)"
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
            id="2"
            class="custom-select mr-sm-2"
            @change="onChangeMonthDayVotingEnd($event)"
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
              id="2"
              class="custom-select mr-sm-2"
              @change="onChangeDayVotingEnd($event)"
            >
              <option selected>day</option>
              <option
                v-for="date in daysInMonthVotingEnd"
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
          required
          class="form-control"
          placeholder="HH:mm:ss"
          @change="onChangeDateVotingPeriodEnd($event)"
        >
      </div>
      <div class="text-center">
        <button
          :disabled="votingSubmit"
          class="btn btn-success btn-clock"
          type="submit"
          @click="runTimerVotPeriod"
        >Submit</button>
      </div>
    </div>
    <div class="jumbotron jumbotron-fluid">
      <div class="text-center col-md-12">
        <input
          type="text"
          placeholder="address">
        <button>GiveRight</button>
      </div>
    </div>
    <div class="text-center">
      <p v-if="!nominationSubmit">Status: dont nomination period</p>
      <p v-else-if="stopNomPeriod">Status: {{ timerNominationPeriod }}</p>
      <p v-else-if="!votingSubmit">Status: dont voting period </p>
      <p v-else-if="stopVotPeriod">Status: {{ timerVotingPeriod }}</p>
      <p v-else>Status: end time</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import moment from 'moment';
import momentRange from 'moment-precise-range-plugin'

export default {
  data(){
    return {
      dateContext: moment(),
      timerNomPeriod: moment(),
      timerVotPeriod: moment(),
      keyYearNomStart: "",
      keyYearNomEnd: "",
      keyYearVotStart: "",
      keyYearVotEnd: "",
      keyMonthNomStart: "",
      keyMonthNomEnd: "",
      keyMonthVotStart: "",
      keyMonthVotEnd: "",
      keyDayNomStart: "",
      keyDayNomEnd: "",
      keyDayVotStart: "",
      keyDayVotEnd: "",
      keyHourNomStart: "",
      keyHourNomEnd: "",
      keyHourVotStart: "",
      keyHourVotEnd: "",
      keyMinuteNomStart: "",
      keyMinuteNomEnd: "",
      keyMinuteVotStart: "",
      keyMinuteVotEnd: "",
      keySecondNomStart: "",
      keySecondNomEnd: "",
      keySecondVotStart: "",
      keySecondVotEnd: "",
      nominationSubmit: false,
      votingSubmit: false,
      stopNomPeriod: true,
      stopVotPeriod: true,
    }
  },
  computed: {
    ...mapGetters({
      years: 'election/years',
    }),
    monthsShort: function () {
      return this.dateContext.localeData('es').monthsShort();
    },
    daysInMonthNomStart: function () {
      this.dateContext.set({'year': this.keyYearNomStart, 'month': this.dateContext.localeData('es').monthsShort().indexOf(this.keyMonthNomStart)});
      return this.dateContext.daysInMonth();
    },
    daysInMonthNomEnd: function () {
      this.dateContext.set({'year': this.keyYearNomEnd, 'month': this.dateContext.localeData('es').monthsShort().indexOf(this.keyMonthNomEnd)});
      return this.dateContext.daysInMonth();
    },
    daysInMonthVotingStart: function () {
      this.dateContext.set({'year': this.keyYearVotStart, 'month': this.dateContext.localeData('es').monthsShort().indexOf(this.keyMonthVotStart)});
      return this.dateContext.daysInMonth();
    },
    daysInMonthVotingEnd: function () {
      this.dateContext.set({'year': this.keyYearVotEnd, 'month': this.dateContext.localeData('es').monthsShort().indexOf(this.keyMonthVotEnd)});
      return this.dateContext.daysInMonth();
    },
    timerNominationPeriod: function(){
      if(this.timerNomPeriod.get('year') > 0){
        return this.timerNomPeriod.format('YY:MM:DD');
      }
      else if (this.timerNomPeriod.get('year') >= 0 && this.timerNomPeriod.get('month') >= 0 && this.timerNomPeriod.get('date') != 1)
        return this.timerNomPeriod.format('MM:DD:HH');
      else if( (this.timerNomPeriod.get('year') >= 0  && (this.timerNomPeriod.format('DD:HH:mm')[0] != 0 || this.timerNomPeriod.format('DD:HH:mm')[1] != 1))
              || this.timerNomPeriod.get('month') == 11)
        return this.timerNomPeriod.format('DD:HH:mm');
      else if(this.timerNomPeriod.get('hours')!=0 || this.timerNomPeriod.get('minutes') != 0 || this.timerNomPeriod.get('seconds') !=0)
        return this.timerNomPeriod.format('HH:mm:ss');
      else {
            return "00:00:00";
        }
    },
    timerVotingPeriod: function(){
      if(this.timerVotPeriod.get('year') > 0){
        return this.timerVotPeriod.format('YY:MM:DD');
      }
      else if (this.timerVotPeriod.get('year') >= 0 && this.timerVotPeriod.get('month') >= 0 && this.timerVotPeriod.get('date') != 1)
        return this.timerVotPeriod.format('MM:DD:HH');
      else if( (this.timerVotPeriod.get('year') >= 0  && (this.timerVotPeriod.format('DD:HH:mm')[0] != 0 || this.timerVotPeriod.format('DD:HH:mm')[1] != 1))
              || this.timerVotPeriod.get('month') == 11 )
        return this.timerVotPeriod.format('DD:HH:mm');
      else if(this.timerVotPeriod.get('hours') != 0 || this.timerVotPeriod.get('minutes') != 0 || this.timerVotPeriod.get('seconds') != 0){
        return this.timerVotPeriod.format('HH:mm:ss');
      }
      else
        return "00:00:00";
    },
  },
  methods: {
    onChangeYearsMonthNomStart: function (event) {
      this.keyYearNomStart = event.target.value;
    },
    onChangeYearsMonthNomEnd: function (event) {
      this.keyYearNomEnd = event.target.value;
    },
    onChangeYearsMonthVotingStart: function (event) {
      this.keyYearVotStart = event.target.value;
    },
    onChangeYearsMonthVotingEnd: function (event) {
      this.keyYearVotEnd = event.target.value;
    },

    onChangeMonthDayNomStart: function (event) {
       this.keyMonthNomStart = event.target.value
    },
    onChangeMonthDayNomEnd: function (event) {
       this.keyMonthNomEnd = event.target.value
    },
    onChangeMonthDayVotingStart: function (event) {
       this.keyMonthVotStart = event.target.value
    },
    onChangeMonthDayVotingEnd: function (event) {
       this.keyMonthVotEnd = event.target.value
    },

    onChangeDayNomStart: function (event) {
      this.keyDayNomStart = event.target.value;
    },
    onChangeDayNomEnd: function (event) {
      this.keyDayNomEnd = event.target.value;
    },
    onChangeDayVotingStart: function (event) {
      this.keyDayVotStart = event.target.value;
    },
    onChangeDayVotingEnd: function (event) {
      this.keyDayVotEnd = event.target.value;
    },

    onChangeDateNominationPeriodStart: function (event) {
      this.keyHourNomStart = event.target.value[0] + event.target.value[1];
      this.keyMinuteNomStart = event.target.value[3] + event.target.value[4];
      this.keySecondNomStart = event.target.value[6] + event.target.value[7];
    },
    onChangeDateNominationPeriodEnd: function (event) {
      this.keyHourNomEnd = event.target.value[0] + event.target.value[1];
      this.keyMinuteNomEnd = event.target.value[3] + event.target.value[4];
      this.keySecondNomEnd = event.target.value[6] + event.target.value[7];
    },
    onChangeDateVotingPeriodStart: function (event) {
      this.keyHourVotStart = event.target.value[0] + event.target.value[1];
      this.keyMinuteVotStart = event.target.value[3] + event.target.value[4];
      this.keySecondVotStart = event.target.value[6] + event.target.value[7];
    },
    onChangeDateVotingPeriodEnd: function (event) {
      this.keyHourVotEnd = event.target.value[0] + event.target.value[1];
      this.keyMinuteVotEnd = event.target.value[3] + event.target.value[4];
      this.keySecondVotEnd = event.target.value[6] + event.target.value[7];
    },

    runTimerNomenationPeriod() {
      var a = moment(this.timerNomPeriod).set({'year': this.keyYearNomStart, 'month': this.keyMonthNomStart,'date': this.keyDayNomStart, 'hour': this.keyHourNomStart, 'minute': this.keyMinuteNomStart, 'second': this.keySecondNomStart});
      var b = moment(this.timerNomPeriod).set({'year': this.keyYearNomEnd, 'month': this.keyMonthNomEnd,'date': this.keyDayNomEnd, 'hour': this.keyHourNomEnd, 'minute': this.keyMinuteNomEnd, 'second': this.keySecondNomEnd});
      let rangeTimeNomPer = moment.preciseDiff(a, b, true);
      console.log(rangeTimeNomPer);
      if(rangeTimeNomPer.months != 0)
        this.timerNomPeriod = moment(this.timerNomPeriod).set({'year': rangeTimeNomPer.years, 'month': rangeTimeNomPer.months - 1,'date': rangeTimeNomPer.days, 'hour': rangeTimeNomPer.hours, 'minute': rangeTimeNomPer.minutes, 'second': rangeTimeNomPer.seconds});
      else if(rangeTimeNomPer.years > 0){
        this.timerNomPeriod = moment(this.timerNomPeriod).set({'year': rangeTimeNomPer.years - 1, 'month': 11,'date': rangeTimeNomPer.days, 'hour': rangeTimeNomPer.hours, 'minute': rangeTimeNomPer.minutes, 'second': rangeTimeNomPer.seconds});
        }
      else {
        this.timerNomPeriod = moment(this.timerNomPeriod).set({'year': -1, 'month': - 1,'date': rangeTimeNomPer.days, 'hour': rangeTimeNomPer.hours, 'minute': rangeTimeNomPer.minutes, 'second': rangeTimeNomPer.seconds});
      }

      var refresh = setInterval(() => {
        console.log(this.timerNomPeriod);
        if(
            this.timerNomPeriod.get('years') < -1 &&  this.timerNomPeriod.get('hours') == 0 &&
            this.timerNomPeriod.get('minutes') == 0 && this.timerNomPeriod.get('seconds') == 0
          ){
              this.stopNomPeriod = false;
              clearInterval(refresh);
        }

          this.timerNomPeriod = moment(this.timerNomPeriod.subtract(1, 'seconds'))
      }, 1000);

      if(rangeTimeNomPer.years || rangeTimeNomPer.months || rangeTimeNomPer.days ||
         rangeTimeNomPer.hours ||  rangeTimeNomPer.minutes || rangeTimeNomPer.seconds)
        this.nominationSubmit = true;
    },


    runTimerVotPeriod() {
      var a = moment(this.timerVotPeriod).set({'year': this.keyYearVotStart, 'month': this.keyMonthVotStart,'date': this.keyDayVotStart, 'hour': this.keyHourVotStart, 'minute': this.keyMinuteVotStart, 'second': this.keySecondVotStart});
      var b = moment(this.timerVotPeriod).set({'year': this.keyYearVotEnd, 'month': this.keyMonthVotEnd,'date': this.keyDayVotEnd, 'hour': this.keyHourVotEnd, 'minute': this.keyMinuteVotEnd, 'second': this.keySecondVotEnd});
      let rangeTimeVotPer = moment.preciseDiff(a, b, true);
      if(rangeTimeVotPer.months != 0)
        this.timerVotPeriod = moment(this.timerVotPeriod).set({'year': rangeTimeVotPer.years, 'month': rangeTimeVotPer.months - 1,'date': rangeTimeVotPer.days, 'hour': rangeTimeVotPer.hours, 'minute': rangeTimeVotPer.minutes, 'second': rangeTimeVotPer.seconds});
      else if(rangeTimeVotPer.years > 0){
        this.timerVotPeriod = moment(this.timerVotPeriod).set({'year': rangeTimeVotPer.years - 1, 'month': 11,'date': rangeTimeVotPer.days, 'hour': rangeTimeVotPer.hours, 'minute': rangeTimeVotPer.minutes, 'second': rangeTimeVotPer.seconds});
        }
      else {
        this.timerVotPeriod = moment(this.timerVotPeriod).set({'year': -1, 'month': - 1,'date': rangeTimeVotPer.days, 'hour': rangeTimeVotPer.hours, 'minute': rangeTimeVotPer.minutes, 'second': rangeTimeVotPer.seconds});
      }
      var stopInterval = setInterval(() => {
        console.log(this.timerVotPeriod);
        if(
            this.timerVotPeriod.get('years') < -1 && this.timerVotPeriod.get('hours') == 0 &&
            this.timerVotPeriod.get('minutes') == 0 && this.timerVotPeriod.get('seconds') == 0
          ){
              this.stopVotPeriod = false;
              clearInterval(stopInterval);
           }
        this.timerVotPeriod = moment(this.timerVotPeriod.subtract(1, 'seconds'))
      }, 1000);

      if(rangeTimeVotPer.years || rangeTimeVotPer.months || rangeTimeVotPer.days ||
         rangeTimeVotPer.hours ||  rangeTimeVotPer.minutes || rangeTimeVotPer.seconds)
         this.votingSubmit = true;
    },
  }
}
</script>
