export const ethereumChartInitialOptions = {
	chart: {
		height: 350,
		type: 'area',
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
	},
	fill: {
		type: 'gradient',
		gradient: {
			shadeIntensity: 1,
			opacityFrom: 0.7,
			opacityTo: 0.9,
			stops: [0, 100]
		}
	},
	xaxis: {
		type: 'dateTime',

	},
	yaxis: {
		opposite: true,
		labels: {
			formatter: function (val) {
				if (val === Infinity) {
					val = 0;
				}
				return val.toFixed(2);
			},
		},
	},
	legend: {
		show: false,
	},
};
