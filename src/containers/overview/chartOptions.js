export const chartOptions = {
  chart: {
    type: 'area',
    stacked: false,
    height: 350,
    zoom: {
      type: 'x',
      enabled: true,
      autoScaleYaxis: true
    },
    toolbar: {
      autoSelected: 'zoom'
    }
  },
  dataLabels: {
    enabled: false
  },
  markers: {
    size: 0,
  },
  title: {
    text: 'Thirm Balance',
    align: 'left'
  },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      inverseColors: false,
      opacityFrom: 0.5,
      opacityTo: 0,
      stops: [0, 90, 100]
    },
  },
  yaxis: {
    labels: {
      formatter: function (val) {
        return (val).toFixed(2);
      },
    },
    title: {
      text: 'Price'
    },
  },
  xaxis: {
    categories: [],
  },
  tooltip: {
    shared: false,
    y: {
      formatter: function (val) {
        return (val).toFixed(8)
      }
    }
  }
};

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
      enabled: false
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth'
  },
  title: {
    text: 'Dynamic Updating Chart',
    align: 'left'
  },
  markers: {
    size: 0
  },
  xaxis: {
    max: 10
  },
  yaxis: {
    max: 400,
    min: 200,
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