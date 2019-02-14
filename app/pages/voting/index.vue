<template>
  <div>
    <div class="row justify-content-end text-center">
      <div class="col-12">
        <h2 class="text-center">voting</h2>
      </div>
      <div class="col-auto">
        <div
          v-if="startTime"
          class="watch mb-5">
          <span class="countdown_title">voteing time start:</span>
          <div class="time-clock">
            <no-ssr>
              <flip-countdown
                :deadline="timeStart"
                @hook:updated="votingTimeStartDeadline"
              />
            </no-ssr>
          </div>
        </div>
        <div
          v-if="votingTime"
          v-show="!startTime"
          class="watch mb-5">
          <span class="countdown_title">voteing time:</span>
          <div class="time-clock">
            <no-ssr>
              <flip-countdown
                :deadline="timeVoting"
                @hook:updated="votingTimeDeadline"
              />
            </no-ssr>
          </div>
        </div>
        <div
          v-if="!startTime && !votingTime"
          class="watch mb-5">
          <span class="countdown_title">voteing time end:</span>
          <div class="countdown">20:00</div>
        </div>
      </div>
    </div>
    <section class="container">
      <table class="table table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>Candidate name</th>
            <th>Kargaxos</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="candidate in candidates"
            :key="candidate.id">
            <td>{{ candidate.id }}</td>
            <td>{{ candidate.name }}</td>
            <td>{{ candidate.kargaxos }}</td>
          </tr>
        </tbody>
      </table>
      <form
        v-show="isVotingOpen"
        class="form-group"
        @submit.prevent="submit">
        <div
          v-if="!startTime && votingTime"
          v-show="isVotingOpen"
          class="row">
          <div class="col-12 col-md">
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
          <div class="col-12 col-md-auto">
            <button
              :disabled="!selectedCandidateId || isLoading"
              type="submit"
              class="btn btn-dark px-5">
              Vote
            </button>
          </div>
        </div>
      </form>
    </section>
    <p class="text-center mt-5">Your account: </p>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import FlipCountdown from 'vue2-flip-countdown';
import moment from 'moment';

export default {
  components: { FlipCountdown },
  data () {
    return {
      startTime: true,
      votingTime: true,
      selectedCandidateId: 0,
      isLoading: false,
      address: '',
      voterData: false,
      newCandidate: '',
      timeStart: "2019-02-14 15:49:00",
      timeVoting: "2019-02-14 15:50:00",
    };
  },
  computed: {
    ...mapGetters({
      candidates: 'voting/candidates',
      isVotingOpen: 'voting/isOpen',
      time: 'voting/time',
    }),
  },
  methods: {
    submit(){
      this.isLoading = true;
    },
    votingTimeStartDeadline() {
      if(this.$emit("deadline").$children[0].diff == 0){
        this.startTime = false;
      }
    },
    votingTimeDeadline() {
      if(this.$emit("deadline").$children[0].diff == 0){
        this.votingTime = false;
      }
    }
  }
}

</script>
