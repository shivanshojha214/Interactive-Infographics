const populationData = {
    labels: [1970, 1980, 1990, 2000, 2010, 2020],
    datasets: [{
        label: 'World Population (in billions)',
        data: [3.7, 4.4, 5.3, 6.1, 6.9, 7.8],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(75, 192, 192, 1)'
    }]
};

const config = {
    type: 'line',
    data: populationData,
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Population (in billions)'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Year'
                }
            }
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return `${context.label}: ${context.raw} billion`;
                    }
                }
            }
        }
    }
};

const populationChart = new Chart(
    document.getElementById('populationChart'),
    config
);

document.getElementById('yearRange').addEventListener('input', function(event) {
    const year = event.target.value;
    document.getElementById('yearLabel').textContent = year;
    updateChart(year);
    animateChart();
});

function updateChart(year) {
    const dataIndex = populationData.labels.indexOf(parseInt(year));
    if (dataIndex !== -1) {
        populationChart.data.labels = populationData.labels.slice(0, dataIndex + 1);
        populationChart.data.datasets[0].data = populationData.datasets[0].data.slice(0, dataIndex + 1);
        populationChart.update();
    }
}

function animateChart() {
    anime({
        targets: populationChart.data.datasets[0].data,
        easing: 'easeInOutQuad',
        duration: 750,
        update: function() {
            populationChart.update();
        }
    });
}

// Initialize tooltips
tippy('[data-tippy-content]', {
    placement: 'top',
    animation: 'scale'
});
