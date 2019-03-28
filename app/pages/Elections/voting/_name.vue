<template>
  <div>
    <div class="row justify-content-end text-center">
      <div>
        <b-button
          v-b-modal.modalPrevent
          v-if="timeAddCandidate"
          variant="primary"
          class="pull-right"
        >Add Candidate</b-button>
        <b-modal
          id="modalPrevent"
          ref="modal"
          hide-footer
          title="Submit your candidate name and kargaxos"
          @shown="clearName"
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
      <div class="col-12">
        <h2 class="text-center">voting</h2>
      </div>
      <div>
        <p v-if="startTimeAddCandidate">Start time add candidate: {{ timerCandidate }}</p>
        <p v-else-if="timeAddCandidate">add candidate time: {{ timerCandidate }}</p>
        <p v-else-if="timeAddCandidateEnd">End Add Candidate Period</p>
        <p v-else-if="startVotingTime">Start time voting: {{ timerVoting }}</p>
        <p v-else-if="votingTime">Voting time: {{ timerVoting }}</p>
        <p v-else> End Voting</p>
      </div>
    </div>
    <section class="container">
      <table
        v-if="winnerOpen"
        class="table table-hover"
      >
        <thead>
          <tr>
            <th>#</th>
            <th>Candidate name</th>
            <th>Kargaxos</th>
          </tr>
        </thead>
        <tbody >
          <tr
            v-for="candidate in candidates"
            :key="candidate.id">
            <td>{{ candidate.id }}</td>
            <td>{{ candidate.name }}</td>
            <td>{{ candidate.kargaxos }}</td>
          </tr>
        </tbody>
      </table>
      <div
        v-else
        class="text-center">
        <p>Winner Candidate</p>
        <p>{{ winner }}</p>
      </div>
      <form
        v-show="isVotingOpen"
        class="form-group"
        @submit.prevent="submit">
        <div
          v-if="votingTime"
          v-show="isVotingOpen"
          class="row">
          <div class="col-6">
            <select
              v-model="selectedCandidateId"
              :disabled="isLoading"
              class="candidate_select select">
              <option
                v-for="candidate in candidates"
                :value="candidate.id"
                :key="candidate.id">
                {{ candidate.name }}
              </option>
            </select>
          </div>
          <div class="col-6">
            <button
              :disabled="!selectedCandidateId || isLoading"
              type="submit"
              class="btn btn-dark px-4">
              Vote
            </button>
          </div>
        </div>
      </form>
    </section>
    <p class="text-center mt-5">Your account: {{ coinbase }} </p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data () {
    return {
      selectedCandidateId: 0,
      timerCandidate: "",
      timerVoting: "",
      candidateName: "",
      kargaxos: "",
      isLoading: false,
      startTimeAddCandidate: false,
      timeAddCandidate: false,
      timeAddCandidateEnd: false,
      startVotingTime: false,
      votingTime: false,
    };
  },
  computed: {
    ...mapGetters({
      candidates: 'voting/candidates',
      isVotingOpen: 'voting/isOpen',
      coinbase: 'web3/coinbase',
      winner: 'winnerName/winnerCandidate',
      winnerOpen: 'winnerName/winnerOpen',
    }),
  },
  mounted () {
    this.addCandidate();
    this.addCandidateTimer();
    this.votingTimer();
    this.winnerName();
  },
  methods: {
    ...mapActions({
      addCandidate: 'voting/addCandidate',
      addCandidateName: 'voting/addCandidateName',
      vote: 'voting/vote',
      winnerName: 'winnerName/winnerName'
    }),
    clearName(){
      this.candidateName = "";
      this.kargaxos = "";
    },
    submit(){
      this.isLoading = true;
      this.vote(this.selectedCandidateId);
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
    pad2: function (number) {
      return (number < 10 ? '0' : '') + number;
    },
    convertTime: function (rangeTime){
      let seconds = parseInt(rangeTime, 10);
      let days = Math.floor(seconds / (3600*24));
      seconds -= days*3600*24;
      let hrs = Math.floor(seconds / 3600);
      seconds -= hrs*3600;
      let mnts = Math.floor(seconds / 60);
      seconds -= mnts*60;
      return this.pad2(days) + ':' + this.pad2(hrs) + ':' + this.pad2(mnts) + ':' + this.pad2(seconds);
    },
    addCandidateTimer(){
      let timeStartAddcandidate = null;
      let timeAddCandidate = null;
      let paramsName = this.$router.history.current.params.name;
      Object.keys(window.localStorage).forEach(function(value){
        if(paramsName == JSON.parse(window.localStorage.getItem(value)).name){
          timeStartAddcandidate = JSON.parse(window.localStorage.getItem(value)).nomStart;
          timeAddCandidate = JSON.parse(window.localStorage.getItem(value)).nomEnd;
          return;
        }
      })
      let realTime = Math.floor(new Date().getTime()/1000.0);
      let rangeTimeStartAddCandidate = timeStartAddcandidate - realTime;
      let rangeTimeAddCandidate = null;
      if(rangeTimeStartAddCandidate < 0)
        rangeTimeAddCandidate = timeAddCandidate - realTime;
      else
        rangeTimeAddCandidate = timeAddCandidate - timeStartAddcandidate;

      if(rangeTimeStartAddCandidate > 0  || rangeTimeAddCandidate > 0){
        let endTimer = setInterval(() => {
          if(rangeTimeStartAddCandidate <= 0){
            this.startTimeAddCandidate = false;
            this.timeAddCandidate = true;
            this.timerCandidate = this.convertTime(rangeTimeAddCandidate)
            if (rangeTimeAddCandidate <= 0) {
              this.timeAddCandidate = false;
              this.timeAddCandidateEnd = true;
              clearInterval(endTimer);
            }
            rangeTimeAddCandidate -= 1;
          }
          else {
            this.startTimeAddCandidate = true;
            this.timerCandidate = this.convertTime(rangeTimeStartAddCandidate);
            rangeTimeStartAddCandidate -= 1;
          }
        }, 1000)
      }
    },
    votingTimer(){
      let timeStartVoting = null;
      let timeVoting = null;
      let paramsName = this.$router.history.current.params.name;
      Object.keys(window.localStorage).forEach(function(value){
        if(paramsName == JSON.parse(window.localStorage.getItem(value)).name){
          timeStartVoting = JSON.parse(window.localStorage.getItem(value)).votStart;
          timeVoting = JSON.parse(window.localStorage.getItem(value)).votEnd;
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
        let endTimer = setInterval(() => {
          if(rangeTimeStartVoting <= 0){
            this.startVotingTime = false;
            this.votingTime = true;
            this.timerVoting = this.convertTime(rangeTimeVoting);
            if (rangeTimeVoting <= 0) {
              this.winnerName();
              this.votingTime = false;
              clearInterval(endTimer);
            }
            rangeTimeVoting -= 1;
          }
          else {
            this.timeAddCandidateEnd = false;
            this.startVotingTime = true;
            this.timerVoting = this.convertTime(rangeTimeStartVoting);
            rangeTimeStartVoting -= 1;
          }
        }, 1000)
      }
    },
  }
}

</script>
