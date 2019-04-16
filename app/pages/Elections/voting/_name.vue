<template>
  <div>
    <div class="shadow-lg bg-light rounded">
      <div class="justify-content-end text-center">
        <h2 class="title-voting text-center bg-success rounded">voting</h2>
        <div class="text-right col-12">
          <p v-if="dontVotingTime">Dont Voting Time</p>
          <p v-else-if="startVotingTime">Start time voting: {{ timerVoting }}</p>
          <p v-else-if="votingTime">Voting time: {{ timerVoting }}</p>
          <!-- <p v-else> End Voting</p> -->
        </div>
      </div>
      <section class="container">
        <table
          v-if="winnerOpen"
          class="table table-hover"
        >
          <thead class="title-table">
            <tr>
              <th>Id</th>
              <th>Candidate name</th>
              <th>Kargaxos</th>
            </tr>
          </thead>
          <tbody v-if="!loading">
            <tr
              v-for="candidate in candidates"
              :key="candidate.id">
              <td>{{ candidate.id }}</td>
              <td>{{ candidate.name }}</td>
              <td>{{ candidate.kargaxos }}</td>
            </tr>
          </tbody>
          <tbody v-else>
            <th/>
            <th class="loading text-center col-1">Loading...</th>
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
            <div class="row col-10 offset">
              <select
                v-model="selectedCandidateId"
                :disabled="isLoading"
                class="custom-select candidate_select select">
                <option
                  v-for="candidate in candidates"
                  :value="candidate.id"
                  :key="candidate.id">
                  {{ candidate.name }}
                </option>
              </select>
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
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data () {
    return {
      selectedCandidateId: 0,
      timerVoting: "",
      isLoading: false,
      startVotingTime: false,
      votingTime: false,
      dontVotingTime: true,
    };
  },
  computed: {
    ...mapGetters({
      candidates: 'voting/candidates',
      isVotingOpen: 'voting/isOpen',
      loading: 'voting/loading',
      coinbase: 'web3/coinbase',
      winner: 'winnerName/winnerCandidate',
      winnerOpen: 'winnerName/winnerOpen',
    }),
  },
  mounted () {
    this.addCandidate();
    this.votingTimer();
    this.winnerName();
    this.setLoading();
  },
  methods: {
    ...mapActions({
      addCandidate: 'voting/addCandidate',
      setLoading: 'voting/setLoading',
      vote: 'voting/vote',
      winnerName: 'winnerName/winnerName'
    }),
    submit(){
      this.isLoading = true;
      this.vote(this.selectedCandidateId);
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
    votingTimer(){
      let timeStartVoting = null;
      let timeVoting = null;
      let paramsName = this.$router.history.current.params.name;
      let tmp = this
      Object.keys(window.localStorage).forEach(function(value){
        if(paramsName == JSON.parse(window.localStorage.getItem(value)).name){
          timeStartVoting = JSON.parse(window.localStorage.getItem(value)).votStart;
          timeVoting = JSON.parse(window.localStorage.getItem(value)).votEnd;
          if(timeVoting - timeStartVoting > 0)
            tmp.dontVotingTime = false;
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
            this.dontVotingTime = false;
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
