const horario = [
        '12:00',
        '13:00',
        '14:00',
        '15:00',
        '16:00',
        '17:00',
    ]

    const temperatura = [30, 29, 28, 25, 22, 23];
    const umidade = [80, 82, 80, 85, 80, 83];

    const lineChart = document.getElementById('myLineChart');

    const horizontalDottedLine = {
        id: 'horizontalDottedLine', 
        beforeDatasetsDraw(chart, args, options) {
            const { ctx, chartArea: { top, right, bottom, left, width, height },
                scales: { x, y } } = chart;

            ctx.save();

            ctx.strokeStyle = '#00000030';
            ctx.setLineDash([10, 6]);
            ctx.strokeRect(left, y.getPixelForValue(52), width, 0);
            ctx.restore();
        }
    }

    Chart.defaults.font.family = 'Poppins';

    new Chart(lineChart, {
        data: {
            datasets: [
                {
                    type: 'line',
                    label: 'Temperatura',
                    data: temperatura,
                    backgroundColor: '#50C37E',
                    borderColor: '#50C37E'
                },
                {
                    type: 'line',
                    label: 'Umidade',
                    data: umidade,
                    backgroundColor: '#708BFF',
                    borderColor: '#708BFF'
                }
            ],
            labels: horario,
        },
        options: {
        },
        plugins: [horizontalDottedLine]
    });

    const mes = [
        '1:00',
        '2:00',
        '3:00',
        '4:00',
        '5:00',
        '6:00',
    ]

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
            labels: mes
        },
    });
