export const ethereumChartOptions = {
  chart: {
    id: 'realtime',
    height: 350,
    type: 'line',
    animations: {
      enabled: true,
      easing: 'linear',
      dynamicAnimation: {
        speed: 1000
      }
    },
    toolbar: {
      show: false
    },
    zoom: {
      enabled: false,
      autoScaleYaxis: true
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth'
  },
  title: {
    text: 'Ethereum chart',
    align: 'left'
  },
  markers: {
    size: 0
  },
  xaxis: {
    max: 100,
    labels: {
      formatter: function (val) {
        return "";
      },
    },
  },
  yaxis: {
    min: 350,
    max: 400,
    labels: {
      formatter: function (val) {
        if (val === Infinity) {
          val = 0;
        }
        return (val).toFixed(4)
      },
    },
    title: {
      text: 'Price'
    },
  },
  legend: {
    show: false
  },
};