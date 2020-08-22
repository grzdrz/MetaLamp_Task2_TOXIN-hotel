import ApexCharts from 'apexcharts';

class PieChart {
    constructor(outerContainerElement) {
        this.outerContainerElement = outerContainerElement;
        this.chart = {};

        this._initialize();
    }

    _initialize() {
        this.containerElement = this.outerContainerElement.querySelector('.pie-chart .pie-chart__pie');

        const options = {
            chart: {
                offsetX: 0,
                type: 'donut',
                height: '150px',
                width: '150px',
            },
            dataLabels: {
                enabled: false,
            },
            legend: {
                show: false,
            },
            series: [25, 25, 50, 0],
            labels: ['Великолепно', 'Хорошо', 'Удовлетворительно', 'Разочарован'],
            plotOptions: {
                pie: {
                    donut: {
                        size: '112px',
                    },
                },
            },
            colors: ['#BC9CFF', '#6FCF97', '#FFE39C', '#919191'],
            fill: {
                type: 'gradient',
                gradient: {
                    gradientToColors: ['#8BA4F9', '#66D2EA', '#FFBA9C', '#3D4975'],
                    stops: [80, 100],
                },
            },
        };

        this.chart = new ApexCharts(this.containerElement, options);
        this.chart.render();
    }
}

export default PieChart;
