<template>
  <div>
    <div class="jumbotron jumbotron-fluid text-center">
      <div class="title-election">
        <h1>Election</h1>
        <div class="text-right">
          <b-button
            v-b-modal.modalPrevent
            variant="primary"
          >create</b-button>
          <b-modal
            id="modalPrevent"
            ref="modal"
            hide-footer
            title="Submit your election"
            @shown="clearName"
          >
            <form @submit.prevent="handleSubmit">
              <b-form-input
                v-model="name"
                class="mx-auto"
                type="text"
                placeholder="election"
              />
            </form>
            <b-button
              class="mt-3 form-control"
              variant="secondary"
              @click="handleCancel"
            >Cancel</b-button>
            <b-button
              class="mt-3"
              variant="outline-primar"
              @click="handleOk"
            >OK</b-button>
          </b-modal>
        </div>
      </div>
      <table class="table table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>name</th>
            <th>candidateCount</th>
            <th>state</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="election in elections"
            :key="election.id">
            <td>{{ election.id }}</td>
            <td><nuxt-link :to="'elections/voting/' + election.name">{{ election.name }}</nuxt-link></td>
            <td>{{ election.candidateCount }}</td>
            <td>{{ election.state }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'


  export default {
    data () {
      return {
        name: '',
      };
    },
    computed: {
      ...mapGetters({
        elections: 'elections/elections',
      }),
      election() {
        return this.elections.filter((election) => {
            return election.id == this.elections.length;
        })[0];
      },
    },
    mounted () {
      this.getElection();
    },
    methods: {
      ...mapActions({
        addElectionName: 'elections/addElectionName',
        getElection: 'elections/getElection',
      }),
      clearName() {
        this.name = ''
      },
      handleOk(evt) {
        evt.preventDefault()
        if (!this.name) {
          alert('Please enter your election')
        } else {
          this.handleSubmit()
        }
      },
      handleSubmit() {
        this.addElectionName(this.name).then(()=>{
          this.name = ''
        });
        this.$refs.modal.hide();
        if(this.election){
          this.$router.push(`Elections/Election/${ (Number(this.election.id) + 1) }`);
        }
        else
          this.$router.push(`Elections/Election/${ 1 }`);
      },
      handleCancel(){
          this.$refs.modal.hide()
      }
    },

  }
</script>
