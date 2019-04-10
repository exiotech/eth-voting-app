<template>
  <div>
    <div class="text-right">
      <button
        type="button"
        class="btn btn-link"
        @click="linkName">goToVoting</button>
    </div>
    <div class="jumbotron jumbotron-fluid shadow-sm bg-light rounded">
      <h3 class="text-center">Nomination Period</h3>
      <div class="form-group row justify-content-center">
        <p class="time-text mr-sm-3">Start time:</p>
        <no-ssr>
          <InputTime
            @clickedYear="handleClickInParentYearNomPeriodStart"
            @clickedMonth="handleClickInParentMonthNomPeriodStart"
            @clickedDay="handleClickInParentDayNomPeriodStart"
            @clickedHour="handleClickInParentHourNomPeriodStart"
            @clickedMinute="handleClickInParentMinuteNomPeriodStart"
          />
        </no-ssr>
      </div>
      <div class="form-group row justify-content-center">
        <p class="time-text mr-sm-3">End time:</p>
        <no-ssr>
          <InputTime
            @clickedYear="handleClickInParentYearNomPeriodEnd"
            @clickedMonth="handleClickInParentMonthNomPeriodEnd"
            @clickedDay="handleClickInParentDayNomPeriodEnd"
            @clickedHour="handleClickInParentHourNomPeriodEnd"
            @clickedMinute="handleClickInParentMinuteNomPeriodEnd"
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
    <div class="jumbotron jumbotron-fluid shadow-lg bg-light rounded">
      <h3 class="text-center">Voting Period</h3>
      <div class="form-group row justify-content-center">
        <p class="time-text mr-sm-3">Start time:</p>
        <no-ssr>
          <InputTime
            @clickedYear="handleClickInParentYearVotPeriodStart"
            @clickedMonth="handleClickInParentMonthVotPeriodStart"
            @clickedDay="handleClickInParentDayVotPeriodStart"
            @clickedHour="handleClickInParentHourVotPeriodStart"
            @clickedMinute="handleClickInParentMinuteVotPeriodStart"
          />
        </no-ssr>
      </div>
      <div class="form-group row justify-content-center">
        <p class="time-text mr-sm-3">End time:</p>
        <no-ssr>
          <InputTime
            @clickedYear="handleClickInParentYearVotPeriodEnd"
            @clickedMonth="handleClickInParentMonthVotPeriodEnd"
            @clickedDay="handleClickInParentDayVotPeriodEnd"
            @clickedHour="handleClickInParentHourVotPeriodEnd"
            @clickedMinute="handleClickInParentMinuteVotPeriodEnd"
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
    <div class="jumbotron jumbotron-fluid shadow-lg bg-light rounded">
      <div class="text-center col-md-12">
        <input
          v-model="giveRightAddress"
          type="text"
          placeholder="address"
          @change="onChangeGiveRight($event)"
        >
        <button class="btn btn-success btn-clock">GiveRight</button>
      </div>
      <div class="text-right">
        <b-button
          v-b-modal.modalPrevent
          v-if="timeAddCandidate"
          variant="primary"
          class="btn btn-success btn-clock"
        >Add Candidate</b-button>
        <b-modal
          id="modalPrevent"
          ref="modal"
          hide-footer
          title="Submit your candidate name and kargaxos"
        >
          <form @submit.prevent="handleSubmit">
            <b-form-input
              v-model="candidateName"
              class="mx-auto"
              type="text"
              placeholder="candidate name"
            />
            <b-form-input
              v-model="kargaxos"
              class="mx-auto"
              type="text"
              placeholder="kargaxos"
            />
          </form>
          <b-button
            class="mt-4 form-control"
            variant="secondary"
            @click="handleCancel"
          >Cancel</b-button>
          <b-button
            class="mt-4"
            variant="outline-primar"
            @click="handleOk"
          >OK</b-button>
        </b-modal>
      </div>
    </div>

    <div class="text-center">
      <p v-if="nominationSubmit">Status: Dont Nomination Period</p>
      <p v-else-if="timerStartNominationPeriod">Status: Start Nomination Period {{ timerNominationPeriod }}</p>
      <p v-else-if="timerNominationPeriod">Status: Nomination Period {{ timerNominationPeriod }}</p>
      <p v-else-if="votingSubmit">Status: Dont Voting Period </p>
      <p v-else-if="timerStartVotingPeriod">Status: Start Voting Period {{ timerVotingPeriod }}</p>
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
      keyYearNomStart: new Date().getFullYear(),
      keyYearNomEnd: new Date().getFullYear(),
      keyYearVotStart: new Date().getFullYear(),
      keyYearVotEnd: new Date().getFullYear(),
      keyMonthNomStart: moment().format('MMM'),
      keyMonthNomEnd: moment().format('MMM'),
      keyMonthVotStart: moment().format('MMM'),
      keyMonthVotEnd: moment().format('MMM'),
      keyDayNomStart: new Date().getDate(),
      keyDayNomEnd: new Date().getDate(),
      keyDayVotStart: new Date().getDate(),
      keyDayVotEnd: new Date().getDate(),
      keyHourNomStart: new Date().getHours(),
      keyHourNomEnd: new Date().getHours(),
      keyHourVotStart: new Date().getHours(),
      keyHourVotEnd: new Date().getHours(),
      keyMinuteNomStart: new Date().getMinutes(),
      keyMinuteNomEnd: new Date().getMinutes(),
      keyMinuteVotStart: new Date().getMinutes(),
      keyMinuteVotEnd: new Date().getMinutes(),
      timerNomPeriod: "00:00:00:00",
      timerVotPeriod: "00:00:00:00",
      candidateName: "",
      kargaxos: "",
      giveRightAddress: "",
      nominationSubmit: true,
      votingSubmit: true,
      timerStartNominationPeriod: false,
      timerStartVotingPeriod: false,
      closeButtonNomPeriod: true,
      closeButtonVotPeriod: true,
      timeAddCandidate: false,
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
    nominationDate: function(){
      let start = new Date(
        this.keyYearNomStart,
        moment().month(this.keyMonthNomStart).format("M") - 1,
        this.keyDayNomStart,
        this.keyHourNomStart,
        this.keyMinuteNomStart,
        0
      );
      let end = new Date(
        this.keyYearNomEnd,
        moment().month(this.keyMonthNomEnd).format("M") - 1,
        this.keyDayNomEnd,
        this.keyHourNomEnd,
        this.keyMinuteNomEnd,
        0
      );
      let realTime = Math.floor(new Date().getTime()/1000.0);
      if(this.timestamp(end) - this.timestamp(start) > 0 && this.timestamp(start) - realTime > 0){
        this.buttonNomination();
        return { start: this.timestamp(start), end: this.timestamp(end) };
      }
      else
        return false;
    },
    votingDate: function(){
      let start = new Date(
        this.keyYearVotStart,
        moment().month(this.keyMonthVotStart).format("M") - 1,
        this.keyDayVotStart,
        this.keyHourVotStart,
        this.keyMinuteVotStart,
        0
      );
      let end = new Date(
        this.keyYearVotEnd,
        moment().month(this.keyMonthVotEnd).format("M") - 1,
        this.keyDayVotEnd,
        this.keyHourVotEnd,
        this.keyMinuteVotEnd,
        0
      );
      let realTime = Math.floor(new Date().getTime()/1000.0);
      if(this.timestamp(end) - this.timestamp(start) > 0 && this.timestamp(start) - realTime > 0){
        this.buttonVoting();
        return { start: this.timestamp(start), end: this.timestamp(end) };
      }
      else
        return false;
    },
  },
  mounted () {
    this.nominationPeriodTime();
    this.votingPeriodTime();
    this.nominationDate;
    this.votingDate;
  },
  methods: {
    ...mapActions({
      setNumPeriod: 'election/setNumPeriod',
      setVotPeriod: 'election/setVotPeriod',
      setGiveRightToVote: 'election/setGiveRightToVote',
      addCandidateName: 'election/addCandidateName',
    }),
    buttonNomination: function(){
      this.closeButtonNomPeriod = false;
    },
    buttonVoting: function(){
      this.closeButtonVotPeriod = false;
    },
    onChangeGiveRight: function(event){
      this.setGiveRightToVote(event.target.value);
      this.giveRightAddress = "";
    },
    handleClickInParentYearNomPeriodStart: function(year) {
      this.keyYearNomStart = year;
      this.nominationDate;
    },
    handleClickInParentYearNomPeriodEnd: function(year) {
      this.keyYearNomEnd = year;
      this.nominationDate;
    },
    handleClickInParentYearVotPeriodStart: function(year) {
      this.keyYearVotStart = year;
      this.votingDate;
    },
    handleClickInParentYearVotPeriodEnd: function(year) {
      this.keyYearVotEnd = year;
      this.votingDate;
    },
    handleClickInParentMonthNomPeriodStart: function(month) {
      this.keyMonthNomStart = month;
      this.nominationDate;
    },
    handleClickInParentMonthNomPeriodEnd: function(month) {
      this.keyMonthNomEnd = month;
      this.nominationDate;
    },
    handleClickInParentMonthVotPeriodStart: function(month) {
      this.keyMonthVotStart = month;
      this.votingDate;
    },
    handleClickInParentMonthVotPeriodEnd: function(month) {
      this.keyMonthVotEnd = month;
      this.votingDate;
    },
    handleClickInParentDayNomPeriodStart: function(day) {
      this.keyDayNomStart = day;
      this.nominationDate;
    },
    handleClickInParentDayNomPeriodEnd: function(day) {
      this.keyDayNomEnd = day;
      this.nominationDate;
    },
    handleClickInParentDayVotPeriodStart: function(day) {
      this.keyDayVotStart = day;
      this.votingDate;
    },
    handleClickInParentDayVotPeriodEnd: function(day) {
      this.keyDayVotEnd = day;
      this.votingDate;
    },
    handleClickInParentHourNomPeriodStart: function(hour) {
      this.keyHourNomStart = hour;
      this.nominationDate;
    },
    handleClickInParentHourNomPeriodEnd: function(hour) {
      this.keyHourNomEnd = hour;
      this.nominationDate;
    },
    handleClickInParentHourVotPeriodStart: function(hour) {
      this.keyHourVotStart = hour;
      this.votingDate;
    },
    handleClickInParentHourVotPeriodEnd: function(hour) {
      this.keyHourVotEnd = hour;
      this.votingDate;
    },
    handleClickInParentMinuteNomPeriodStart: function(minute) {
      this.keyMinuteNomStart = minute;
      this.nominationDate;
    },
    handleClickInParentMinuteNomPeriodEnd: function(minute) {
      this.keyMinuteNomEnd = minute;
      this.nominationDate;
    },
    handleClickInParentMinuteVotPeriodStart: function(minute) {
      this.keyMinuteVotStart = minute;
      this.votingDate;
    },
    handleClickInParentMinuteVotPeriodEnd: function(minute) {
      this.keyMinuteVotEnd = minute;
      this.votingDate;
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
      let paramsID = Number(this.$router.history.current.params.id);
      this.setNumPeriod({'id': paramsID, 'start': this.nominationDate.start, 'end': this.nominationDate.end});

      this.closeButtonNomPeriod = true;
      let realTime = Math.floor(new Date().getTime()/1000.0);
      let rangeTimeStartNomination = this.nominationDate.start - realTime;
      let rangeTimeNomination = this.nominationDate.end - this.nominationDate.start;
      this.timerNomination(rangeTimeStartNomination, rangeTimeNomination)
    },
    nominationPeriodTime(){
      let timeStartNomination = null;
      let timeNomination = null;
      let paramsID = this.$router.history.current.params.id;
      let tmp = this;
      Object.keys(window.localStorage).forEach(function(value){
        if(paramsID == JSON.parse(window.localStorage.getItem(value)).id){
          timeStartNomination = JSON.parse(window.localStorage.getItem(value)).nomStart;
          timeNomination = JSON.parse(window.localStorage.getItem(value)).nomEnd;
          if(timeNomination - timeStartNomination > 0)
            tmp.nominationSubmit = false;
          return;
        }
      })

      let realTime = Math.floor(new Date().getTime()/1000.0);
      let rangeTimeStartNomination = timeStartNomination - realTime;
      let rangeTimeNomination = null;
      if(rangeTimeStartNomination < 0)
        rangeTimeNomination = timeNomination - realTime;
      else{
        rangeTimeNomination = timeNomination - timeStartNomination;
      }

      if( rangeTimeStartNomination > 0 || rangeTimeNomination > 0){
        this.timerNomination(rangeTimeStartNomination, rangeTimeNomination)
      }
    },
    timerNomination(rangeTimeStartNomination, rangeTimeNomination){
      let endTimer = setInterval(() => {
        if(rangeTimeStartNomination <= 0){
          this.timeAddCandidate = true;
          this.timerStartNominationPeriod = false;
          this.timerNomPeriod = this.convertTime(rangeTimeNomination);
          if (rangeTimeNomination <= 0) {
            this.timeAddCandidate = false;
            clearInterval(endTimer);
          }
          rangeTimeNomination -= 1;
        }
        else {
          this.nominationSubmit = false;
          this.timerStartNominationPeriod = true;
          this.timerNomPeriod = this.convertTime(rangeTimeStartNomination);
          rangeTimeStartNomination -= 1;
        }
      }, 1000)
    },
    runTimerVotPeriod() {
      let paramsID = Number(this.$router.history.current.params.id);
      this.setVotPeriod({'id': paramsID, 'start': this.votingDate.start, 'end': this.votingDate.end});
      this.closeButtonVotPeriod = true;

      let realTime = Math.floor(new Date().getTime()/1000.0);
      let rangeTimeStartVoting = this.votingDate.start - realTime;
      let rangeTimeVoting = this.votingDate.end - this.votingDate.start;
      this.timerVoting(rangeTimeStartVoting, rangeTimeVoting);
    },
    votingPeriodTime(){
      let timeStartVoting = null;
      let timeVoting = null;
      let paramsID = this.$router.history.current.params.id;
      let tmp = this;
      Object.keys(window.localStorage).forEach(function(value){
        if(paramsID == JSON.parse(window.localStorage.getItem(value)).id){
          timeStartVoting = JSON.parse(window.localStorage.getItem(value)).votStart;
          timeVoting = JSON.parse(window.localStorage.getItem(value)).votEnd;
          if(timeVoting - timeStartVoting > 0)
            tmp.votingSubmit = false;
          return;
        }
      })

      let realTime = Math.floor(new Date().getTime()/1000.0);
      let rangeTimeStartVoting = timeStartVoting - realTime;
      let rangeTimeVoting = null;
      if(rangeTimeStartVoting < 0)
        rangeTimeVoting = timeVoting - realTime;
      else
        rangeTimeVoting = timeVoting - timeStartVoting;

      if( rangeTimeStartVoting > 0 || rangeTimeVoting > 0){
        this.timerVoting(rangeTimeStartVoting, rangeTimeVoting)
      }
    },
    timerVoting(rangeTimeStartVoting, rangeTimeVoting){
      let endTimer = setInterval(() => {

        if(rangeTimeStartVoting <= 0){
          this.timerStartVotingPeriod = false;
          this.timerVotPeriod = this.convertTime(rangeTimeVoting);
          if (rangeTimeVoting <= 0) {
            clearInterval(endTimer);
          }
          rangeTimeVoting -= 1;
        }
        else {
          this.votingSubmit = false;
          this.timerStartVotingPeriod = true;
          this.timerVotPeriod = this.convertTime(rangeTimeStartVoting);
          rangeTimeStartVoting -= 1;
        }
      }, 1000)
    },
    linkName(){
      Object.keys(window.localStorage).forEach(function(value){
        let data = JSON.parse(window.localStorage.getItem(value));
        if(data.id == window.$nuxt.$root.$store.$router.history.current.params.id)
          window.$nuxt.$root.$store.$router.push(`/Elections/voting/`+ data.name);
      })
    },
    handleOk(evt) {
      evt.preventDefault();
      if (!this.candidateName && !this.kargaxos) {
        alert('Please enter your name and kargaxos');
      } else {
        this.handleSubmit();
      }
    },
    handleSubmit() {
      this.addCandidateName(this.candidateName).then(()=>{
        this.candidateName = "";
        this.kargaxos = "";
      })
      this.$refs.modal.hide();
    },
    handleCancel(){
        this.$refs.modal.hide();
    },
  }
}
</script>
