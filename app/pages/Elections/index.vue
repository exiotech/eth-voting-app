<template>
  <div>
    <div class="jumbotron jumbotron-fluid text-center">
      <div class="title-election">
        <h1>Elections</h1>
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
            <th>Id</th>
            <th>name</th>
            <th>Candidate Count</th>
            <th>state</th>
          </tr>
        </thead>
        <tbody v-if="test">
          <tr
            v-for="election in elections"
            :key="election.id">
            <td>{{ election.id }}</td>
            <td><nuxt-link :to="'elections/election/' + election.id">{{ election.name }}</nuxt-link></td>
            <td>{{ election.candidateCount }}</td>
            <td>{{ election.state }}</td>
          </tr>
        </tbody>
        <tbody v-else>
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
  import { mapGetters, mapActions } from 'vuex';

  export default {
    data () {
      return {
        name: "",
      };
    },
    computed: {
      ...mapGetters({
        elections: 'elections/elections',
        admin: 'elections/admin',
        web3: 'web3/coinbase',

      }),
      test: function(){
        this.setAdmin();
        if(this.web3 == this.admin.toLowerCase())
          return true;
        else
          return false;
      }
    },
    mounted () {
      this.addElections();
    },
    methods: {
      ...mapActions({
        addElectionName: 'elections/addElectionName',
        addElections: 'elections/addElections',
        setAdmin: 'elections/setAdmin',
      }),
      clearName() {
        this.name = "";
      },
      handleOk(evt) {
        evt.preventDefault();
        if (!this.name) {
          alert('Please enter your election');
        } else {
          this.handleSubmit();
        }
      },
      handleSubmit() {
        this.addElectionName(this.name).then(()=>{
          this.name = "";
        });
        this.$refs.modal.hide();
      },
      handleCancel(){
        this.$refs.modal.hide();
      }
      // test(){
      //   let interval = setInterval(() => {
      //     console.log('*******');
      //     Object.keys(window.localStorage).forEach(function(value){
      //       let data = JSON.parse(window.localStorage.getItem(value));
      //       if(Math.floor(new Date().getTime()/1000.0) == data.votStart){
      //         console.log('+++++');
      //         data.state = "active";
      //         window.localStorage.setItem(data.id, JSON.stringify(data));
      //       }
      //       if(Math.floor(new Date().getTime()/1000.0) == data.votEnd){
      //         console.log('-----');
      //         data.state = "EndVoting";
      //         window.localStorage.setItem(data.id, JSON.stringify(data));
      //         clearInterval(interval);
      //       }
      //     })
      //   },1000)
      // }
    },

  }
</script>
