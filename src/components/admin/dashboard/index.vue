<template>
  <admin-layout>
    <v-container fluid>
      <v-row>
        <!-- first -->
        <v-col cols="3">
          <v-card tile=true>
            <v-alert type="info" tile=true icon="mdi-message">Subscribers</v-alert>Data comes here
          </v-card>
        </v-col>
        <!-- end -->

        <!-- first -->
        <v-col cols="3">
          <v-card tile=true>
            <v-alert type="success" tile=true color="pink">Shops</v-alert>Data comes here
          </v-card>
        </v-col>
        <!-- end -->

        <!-- first -->
        <v-col cols="3">
          <v-card tile=true>
            <v-alert type="warning" tile=true>Payments</v-alert>Data comes here
          </v-card>
        </v-col>
        <!-- end -->

        <!-- first -->
        <v-col cols="3">
          <v-card tile=true>
            <v-alert type="success" tile=true>Support Tickets</v-alert>Data comes here
          </v-card>
        </v-col>
        <!-- end -->
      </v-row>

      <v-row>
        <!-- charts come here -->
        <line-chart :chart-data="datacollection"></line-chart>
        <bar-chart :chart-data="datacollection"></bar-chart>
        <line-chart :chart-data="datacollection"></line-chart>
      </v-row>
    </v-container>
  </admin-layout>
</template>


<script>
  import LineChart from './LineChart.js'
  import BarChart from './BarChart.js'
  export default {
    components: {
      LineChart,
      BarChart
    },
    data () {
      return {
        datacollection: null
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