export const ethereumChartOptions = {
  chart: {
    id: 'realtime',
    height: 350,
    type: 'line',
    stacked: false,
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
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'dark',
      gradientToColors: ['#FDD835'],
      shadeIntensity: 1,
      type: 'horizontal',
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 100, 100, 100]
    },
  },
  xaxis: {
    max: 50,
    labels: {
      formatter: function (val) {
        return "";
      },
    },
  },
  yaxis: {
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