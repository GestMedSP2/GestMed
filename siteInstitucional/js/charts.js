// geral
Chart.defaults.font.family = 'Poppins';

const horario = [
        '12:00',
        '13:00',
        '14:00',
        '15:00',
        '16:00',
        '17:00',
    ]

//Linha pontilhada

    const horizontalDottedLine = {
        id: 'horizontalDottedLine', 
        beforeDatasetsDraw(chart, args, options) {
            const { ctx, chartArea: { top, right, bottom, left, width, height },
                scales: { x, y } } = chart;

            ctx.save();

            var chartId = chart.ctx.canvas.id; 
            var max = 0;
            var min = 0;

            if(chartId == 'chartTemperatura') {
                max = 8;
                min = 2;
            } else if (chartId ==  'chartUmidade') {
                max = 70;
                min = 40;
            }

            ctx.strokeStyle = 'red';
            ctx.setLineDash([10, 6]);
            ctx.strokeRect(left, y.getPixelForValue(max), width, 0);
            ctx.strokeRect(left, y.getPixelForValue(min), width, 0);
            ctx.restore();
        }
    }

   
// Gráfico temperatura

    const lineChart = document.getElementById('chartTemperatura');
    const temperatura = [5, 5, 3, 4, 6, 10];
    new Chart(lineChart, {
        data: {
            datasets: [
                {
                    type: 'line',
                    label: 'Temperatura',
                    data: temperatura,
                    backgroundColor: '#50C37E',
                    borderColor: '#50C37E'
                }
            ],
            labels: horario
        },
        options: {
            scales: {
                y: {
                    min: 0,
                    max: 12,
                }
            }
        },
        plugins: [horizontalDottedLine]
    });

// Gráfico umidade

    const umidade = [42, 50, 50, 55, 62, 66];
    const lineChart2 = document.getElementById('chartUmidade');
    new Chart(lineChart2, {
        data: {
            datasets: [
                {
                    type: 'line',
                    label: 'Umidade',
                    data: umidade,
                    backgroundColor: '#708BFF',
                    borderColor: '#708BFF'
                }
            ],
            labels: horario
        },
        options: {
            scales: {
                y: {
                    min: 25,
                    max: 80,
                }
            }
        },
        plugins: [horizontalDottedLine]
    });



// Gráfico média

    const temperaturaMedia = [22, 24, 27, 23, 20,18];
    const umidadeMedia = [90, 89, 93, 87, 88 , 70];

    const barChart = document.getElementById('myBarChart');

    new Chart(barChart, {
        data: {
            datasets: [
                {
                    type: 'bar',
                    label: 'Temperatura média',
                    data: temperaturaMedia,
                    backgroundColor: '#50C37E',
                    borderRadius: 10,
                },
                {
                    type: 'bar',
                    label: 'Umidade média',
                    data: umidadeMedia,
                    backgroundColor: '#708BFF',
                    borderRadius: 10,
                }
            ],
            labels: horario
        },
    });
