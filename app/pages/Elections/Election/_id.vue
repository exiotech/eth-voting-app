<template>
  <div>
    <div class="jumbotron jumbotron-fluid">
      <h3 class="text-center">Nomination Period</h3>
      <div class="text-center">
        <p>Start time:</p>
        <no-ssr>
          <InputTime
            @clickedYear="handleClickInParentYearNomPeriodStart"
            @clickedMonth="handleClickInParentMonthNomPeriodStart"
            @clickedDay="handleClickInParentDayNomPeriodStart"
            @clickedDate="handleClickInParentDateNomPeriodStart"
          />
        </no-ssr>
      </div>
      <div class="text-center">
        <p>End time:</p>
        <no-ssr>
          <InputTime
            @clickedYear="handleClickInParentYearNomPeriodEnd"
            @clickedMonth="handleClickInParentMonthNomPeriodEnd"
            @clickedDay="handleClickInParentDayNomPeriodEnd"
            @clickedDate="handleClickInParentDateNomPeriodEnd"
          />
        </no-ssr>
      </div>
      <div class="text-center">
        <button
          :disabled="closeButtonNomPeriod"
          class="btn btn-success"
          type="submit"
          @click="runTimerNomenationPeriod">Submit</button>
      </div>
    </div>
    <div class="jumbotron jumbotron-fluid">
      <h3 class="text-center">Voting Period</h3>
      <div class="text-center">
        <p>Start time:</p>
        <no-ssr>
          <InputTime
            @clickedYear="handleClickInParentYearVotPeriodStart"
            @clickedMonth="handleClickInParentMonthVotPeriodStart"
            @clickedDay="handleClickInParentDayVotPeriodStart"
            @clickedDate="handleClickInParentDateVotPeriodStart"
          />
        </no-ssr>
      </div>
      <div class="text-center">
        <p>End time:</p>
        <no-ssr>
          <InputTime
            @clickedYear="handleClickInParentYearVotPeriodEnd"
            @clickedMonth="handleClickInParentMonthVotPeriodEnd"
            @clickedDay="handleClickInParentDayVotPeriodEnd"
            @clickedDate="handleClickInParentDateVotPeriodEnd"
          />
        </no-ssr>
      </div>
      <div class="text-center">
        <button
          :disabled="closeButtonVotPeriod"
          class="btn btn-success btn-clock"
          type="submit"
          @click="runTimerVotPeriod"
        >Submit</button>
      </div>
    </div>
    <div class="jumbotron jumbotron-fluid">
      <div class="text-center col-md-12">
        <input
          v-model="giveRightAddress"
          type="text"
          placeholder="address"
          @change="onChangeGiveRight($event)"
        >
        <button>GiveRight</button>
      </div>
    </div>
    <div class="text-center">
      <p v-if="!closeButtonNomPeriod">Status: Dont Nomination Period</p>
      <p v-else-if="!nominationSubmit">Status: Start Nomination Period {{ timerNominationPeriod }}</p>
      <p v-else-if="timerNominationPeriod">Status: Nomination Period {{ timerNominationPeriod }}</p>
      <p v-else-if="!closeButtonVotPeriod">Status: Dont Voting Period </p>
      <p v-else-if="!votingSubmit">Status: Start Voting Period {{ timerVotingPeriod }}</p>
      <p v-else-if="timerVotingPeriod">Status: Voting Period {{ timerVotingPeriod }}</p>
      <p v-else>Status: End Time</p>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import moment from 'moment';
import InputTime from '../../../components/InputTime.vue';

export default {
  components: {
    InputTime
  },
  data(){
    return {
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
      timerNomPeriod: "",
      timerVotPeriod: "",
      giveRightAddress: "",
      nominationSubmit: false,
      votingSubmit: false,
      closeButtonNomPeriod: false,
      closeButtonVotPeriod: false,
    }
  },
  computed: {
    timerNominationPeriod: function(){
      if(this.timerNomPeriod == "00:00:00:00")
        return false;
      return this.timerNomPeriod;
    },
    timerVotingPeriod: function(){
      if(this.timerVotPeriod == "00:00:00:00")
        return false;
      return this.timerVotPeriod;
    },
  },
  methods: {
    ...mapActions({
      setNumPeriod: 'election/setNumPeriod',
      setVotPeriod: 'election/setVotPeriod',
      setGiveRightToVote: 'election/setGiveRightToVote',
    }),
    onChangeGiveRight: function(event){
      this.setGiveRightToVote(event.target.value);
      this.giveRightAddress = "";
    },

    handleClickInParentYearNomPeriodStart: function(year) {
      this.keyYearNomStart = year;
    },
    handleClickInParentYearNomPeriodEnd: function(year) {
      this.keyYearNomEnd = year;
    },
    handleClickInParentYearVotPeriodStart: function(year) {
      this.keyYearVotStart = year;
    },
    handleClickInParentYearVotPeriodEnd: function(year) {
      this.keyYearVotEnd = year;
    },

    handleClickInParentMonthNomPeriodStart: function(month) {
      this.keyMonthNomStart = month;
    },
    handleClickInParentMonthNomPeriodEnd: function(month) {
      this.keyMonthNomEnd = month;
    },
    handleClickInParentMonthVotPeriodStart: function(month) {
      this.keyMonthVotStart = month;
    },
    handleClickInParentMonthVotPeriodEnd: function(month) {
      this.keyMonthVotEnd = month;
    },

    handleClickInParentDayNomPeriodStart: function(day) {
      this.keyDayNomStart = day;
    },
    handleClickInParentDayNomPeriodEnd: function(day) {
      this.keyDayNomEnd = day;
    },
    handleClickInParentDayVotPeriodStart: function(day) {
      this.keyDayVotStart = day;
    },
    handleClickInParentDayVotPeriodEnd: function(day) {
      this.keyDayVotEnd = day;
    },

    handleClickInParentDateNomPeriodStart: function(hour, minute, second) {
      this.keyHourNomStart = hour;
      this.keyMinuteNomStart = minute;
      this.keySecondNomStart = second;
    },
    handleClickInParentDateNomPeriodEnd: function(hour, minute, second) {
      this.keyHourNomEnd = hour;
      this.keyMinuteNomEnd = minute;
      this.keySecondNomEnd = second;
    },
    handleClickInParentDateVotPeriodStart: function(hour, minute, second) {
      this.keyHourVotStart = hour;
      this.keyMinuteVotStart = minute;
      this.keySecondVotStart = second;
    },
    handleClickInParentDateVotPeriodEnd: function(hour, minute, second) {
      this.keyHourVotEnd = hour;
      this.keyMinuteVotEnd = minute;
      this.keySecondVotEnd = second;
    },
    pad2: function (number) {
      return (number < 10 ? '0' : '') + number;
    },
    convertTime: function (rangeTime){
      let seconds = parseInt(rangeTime, 10);
      let days = Math.floor(seconds / (3600*24));
      seconds  -= days*3600*24;
      let hrs   = Math.floor(seconds / 3600);
      seconds  -= hrs*3600;
      let mnts = Math.floor(seconds / 60);
      seconds  -= mnts*60;
      return this.pad2(days) + ':' + this.pad2(hrs) + ':' + this.pad2(mnts) + ':' + this.pad2(seconds);
    },
    timestamp: function(time) {
      return Math.floor(new Date(time).getTime()/1000.0);
    },

    runTimerNomenationPeriod() {
      let start = new Date(
        this.keyYearNomStart,
        moment().month(this.keyMonthNomStart).format("M") - 1,
        this.keyDayNomStart,
        this.keyHourNomStart,
        this.keyMinuteNomStart,
        this.keySecondNomStart
      );
      let end = new Date(
        this.keyYearNomEnd,
        moment().month(this.keyMonthNomEnd).format("M") - 1,
        this.keyDayNomEnd,
        this.keyHourNomEnd,
        this.keyMinuteNomEnd,
        this.keySecondNomEnd
      );

      let tmp = this;
      let paramsID = Number(this.$router.history.current.params.id);
      Object.keys(window.localStorage).forEach(function(value){
        if(paramsID == JSON.parse(window.localStorage.getItem(value)).id){
          let data = JSON.parse(window.localStorage.getItem(value));
          data.time.nomStart = tmp.timestamp(start);
          data.time.nomEnd = tmp.timestamp(end);
          window.localStorage.setItem(paramsID, JSON.stringify (data));
          return;
        }
      })
      this.setNumPeriod(paramsID);

      let realTime = Math.floor(new Date().getTime()/1000.0);
      let rangeTimeNomPeriod = this.timestamp(start) - realTime;
      let rangeTime = this.timestamp(end) - this.timestamp(start);
      console.log(this.timestamp(start),this.timestamp(end), rangeTime);

      let endTimer = setInterval(() => {
        if(rangeTimeNomPeriod == 0){
          this.timerNomPeriod = this.convertTime(rangeTime);
          if (rangeTime == 0) {
            clearInterval(endTimer);
          }
          this.nominationSubmit = true;
          rangeTime -= 1;
        }
        else {
          this.closeButtonNomPeriod = true;
          this.timerNomPeriod = this.convertTime(rangeTimeNomPeriod);
          rangeTimeNomPeriod -= 1;
        }
      }, 1000);
    },

    runTimerVotPeriod() {
      let start = new Date(
        this.keyYearVotStart,
        moment().month(this.keyMonthVotStart).format("M") - 1,
        this.keyDayVotStart,
        this.keyHourVotStart,
        this.keyMinuteVotStart,
        this.keySecondVotStart
      );
      let end = new Date(
        this.keyYearVotEnd,
        moment().month(this.keyMonthVotEnd).format("M") - 1,
        this.keyDayVotEnd,
        this.keyHourVotEnd,
        this.keyMinuteVotEnd,
        this.keySecondVotEnd
      );

      let tmp = this;
      let paramsID = Number(this.$router.history.current.params.id);
      Object.keys(window.localStorage).forEach(function(value){
        if(paramsID == JSON.parse(window.localStorage.getItem(value)).id){
          let data = JSON.parse(window.localStorage.getItem(value));
          data.time.votStart = tmp.timestamp(start);
          data.time.votEnd = tmp.timestamp(end);
          window.localStorage.setItem(paramsID, JSON.stringify (data));
          return;
        }
      })
      this.setVotPeriod(paramsID);

      let realTime = Math.floor(new Date().getTime()/1000.0);
      let rangetimeVotPeriod = this.timestamp(start) - realTime;
      let rangeTime = this.timestamp(end) - this.timestamp(start);

      let endTimer = setInterval(() => {
        if(rangetimeVotPeriod == 0){
          this.timerVotPeriod = this.convertTime(rangeTime);
          if (rangeTime == 0) {
            clearInterval(endTimer);
          }
          this.votingSubmit = true;
          rangeTime -= 1;
        }
        else {
          this.closeButtonVotPeriod = true;
          this.timerVotPeriod = this.convertTime(rangetimeVotPeriod);
          rangetimeVotPeriod -= 1;
        }
      }, 1000);
    },
  }
}
</script>
