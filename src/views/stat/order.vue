<template>
  <div class="app-container">
    <ve-line :extend="chartExtend" :data="chartData" :settings="chartSettings" />
  </div>
</template>

<script>
import { statOrder } from '@/api/stat'
import VeLine from 'v-charts/lib/line'

export default {
  components: { VeLine },
  data() {
    return {
      chartData: {},
      chartSettings: {},
      chartExtend: {}
    }
  },
  created() {
    statOrder().then(response => {
      this.chartData = response.data[0]
      this.chartSettings = {
        labelMap: {
          'orders': '订单量',
          'customers': '下单用户',
          'amount': '订单总额(千元)',
          'pcr': '客单价(千元)'
        }
      }
      this.chartExtend = {
        xAxis: { boundaryGap: true }
      }
    })
  }
}
</script>
