<template>
    <v-container fluid>
      <v-row>
        <!-- first -->
        <v-col cols="3">
          <v-card :tile="trueValue">
            <v-alert type="info" :tile="trueValue" icon="mdi-keyboard">Bids</v-alert>Bids Value
          </v-card>
        </v-col>
        <!-- end -->

        <!-- first -->
        <v-col cols="3">
          <v-card :tile="trueValue">
            <v-alert type="success" :tile="trueValue" color="pink" icon="mdi-adobe">Properties Value</v-alert>Data comes here
          </v-card>
        </v-col>
        <!-- end -->

        <!-- first -->
        <v-col cols="3">
          <v-card :tile="trueValue">
            <v-alert type="warning" :tile="trueValue" icon="mdi-alpha-w-box">My Wallet</v-alert>Data comes here
          </v-card>
        </v-col>
        <!-- end -->

        <!-- first -->
        <v-col cols="3">
          <v-card :tile="trueValue">
            <v-alert type="success" :tile="trueValue" icon="mdi-account-multiple-outline">Messages</v-alert>Data comes here
          </v-card>
        </v-col>
        <!-- end -->
      </v-row>

      <v-row>
    
      </v-row>

    </v-container>
</template>


<script>
  export default {
    components: {

    },
    data () {
      return {
        datacollection: {},
        trueValue: true
      }
    },
    mounted () {
      this.fillData()
    },
    methods: {
      fillData () {
        this.datacollection = {
          labels: [this.getRandomInt(), this.getRandomInt()],
          datasets: [
            {
              label: 'Data One',
              backgroundColor: '#f87979',
              data: [this.getRandomInt(), this.getRandomInt()]
            }, {
              label: 'Data One',
              backgroundColor: '#f87979',
              data: [this.getRandomInt(), this.getRandomInt()]
            }
          ]
        }
      },
      getRandomInt () {
        return Math.floor(Math.random() * (50 - 5 + 1)) + 5
      }
    }
  }
</script>

<style>
  .small {
    max-width: 600px;
    margin:  150px auto;
  }
</style>