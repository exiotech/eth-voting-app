<template>
  <section class="container">
    <center :style="{marginTop: '5rem'}">
      Address:
      <br>
      {{ coinbase }}
    </center>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import Logo from '~/components/Logo.vue';

export default {
  components: {
    Logo,
  },
  computed: {
    ...mapGetters({
      coinbase: 'web3/coinbase',
    }),
  },
  mounted() {
  },
};
</script>
