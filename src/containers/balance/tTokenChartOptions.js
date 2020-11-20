export const tTokenChartOptions = {
  chart: {
    type: 'line',
    animations: {
      enabled: true,
      easing: 'linear',
      dynamicAnimation: {
        speed: 1000,
      },
    },
    toolbar: {
      show: false,
    },
    zoom: {
      type: 'x',
      enabled: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'smooth',
    width: 3
  },
  xaxis: {
    labels: {
      show: false
    },
    axisBorder: {
      show: false,
    },
  },
  yaxis: {
    labels: {
      show: false
    },
  },
  legend: {
    show: false,
  },
  grid: {
    show: false,
    strokeDashArray: 0,
    xaxis: {
      lines: {
        show: false
      },
    },
    yaxis: {
      lines: {
        show: false
      },
    },
  },
  tooltip: {
    enabled: false,
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'dark',
      shadeIntensity: 1,
      opacityFrom: 0.7,
      opacityTo: 1,
      stops: [0, 100]
    }
  },
};
