document.addEventListener('DOMContentLoaded', function () {
// Countries Chart
    const countriesChart = echarts.init(document.getElementById('countriesChart'));
    const countriesOption = {
        animation: true,
        tooltip: {
            trigger: 'item',
            backgroundColor: 'rgba(20, 20, 22, 1)',
            borderColor: 'rgba(20, 20, 22, 1)',
            borderWidth: 1,
            textStyle: {
                color: '#1f2937'
            }
        },
        legend: {
            orient: 'vertical',
            right: 10,
            top: 'center',
            textStyle: {
                color: '#fff'
            }
        },
        series: [
            {
                name: 'Countries Visited',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 8,
                    borderColor: 'rgba(20, 20, 22, 1)',
                    borderWidth: 2
                },
                label: {
                    show: false
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '14',
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    {value: 7, name: 'Europe', itemStyle: {color: 'rgba(87, 181, 231, 1)'}},
                    {value: 2, name: 'Asia', itemStyle: {color: 'rgba(141, 211, 199, 1)'}},
                    {value: 1, name: 'North America', itemStyle: {color: 'rgba(251, 191, 114, 1)'}},
                    {value: 2, name: 'Oceania', itemStyle: {color: 'rgba(252, 141, 98, 1)'}}
                ]
            }
        ]
    };
    countriesChart.setOption(countriesOption);
// Timeline Chart
    const timelineChart = echarts.init(document.getElementById('timelineChart'));
    const timelineOption = {
        animation: false,
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(20, 20, 22, 1)',
            borderColor: 'rgba(20, 20, 22, 1)',
            borderWidth: 1,
            textStyle: {
                color: '#fff'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            axisLine: {
                lineStyle: {
                    color: '#fff'
                }
            },
            axisLabel: {
                color: '#ddd'
            }
        },
        yAxis: {
            type: 'value',
            axisLine: {
                show: false
            },
            axisLabel: {
                color: '#fff'
            },
            splitLine: {
                lineStyle: {
                    color: '#ddd'
                }
            }
        },
        series: [
            {
                name: '2023',
                type: 'line',
                stack: 'Total',
                smooth: true,
                lineStyle: {
                    width: 2,
                    color: 'rgba(87, 181, 231, 1)'
                },
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0, color: 'rgba(87, 181, 231, 0.2)'
                        }, {
                            offset: 1, color: 'rgba(87, 181, 231, 0.01)'
                        }]
                    }
                },
                emphasis: {
                    focus: 'series'
                },
                data: [0, 1, 0, 2, 1, 3, 2, 4, 1, 2, 0, 1]
            },
            {
                name: '2024',
                type: 'line',
                stack: 'Total',
                smooth: true,
                lineStyle: {
                    width: 2,
                    color: 'rgba(141, 211, 199, 1)'
                },
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0, color: 'rgba(141, 211, 199, 0.2)'
                        }, {
                            offset: 1, color: 'rgba(141, 211, 199, 0.01)'
                        }]
                    }
                },
                emphasis: {
                    focus: 'series'
                },
                data: [1, 0, 2, 1, 3, 2, 4, 3, 2, 1, 2, 0]
            },
            {
                name: '2025',
                type: 'line',
                stack: 'Total',
                smooth: true,
                lineStyle: {
                    width: 2,
                    color: 'rgba(251, 191, 114, 1)'
                },
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0, color: 'rgba(251, 191, 114, 0.2)'
                        }, {
                            offset: 1, color: 'rgba(251, 191, 114, 0.01)'
                        }]
                    }
                },
                emphasis: {
                    focus: 'series'
                },
                data: [2, 1, 3, 2, 0, 0, 0, 0, 0, 0, 0, 0]
            }
        ]
    };
    timelineChart.setOption(timelineOption);
// Responsive charts
    window.addEventListener('resize', function () {
        countriesChart.resize();
        timelineChart.resize();
    });
});
