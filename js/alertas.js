document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('alertsConfigModal');
    const configBtn = document.getElementById('configureAlerts');
    const span = document.getElementsByClassName('close')[0];
    
    configBtn.onclick = function() {
        modal.style.display = "block";
    }
    
    span.onclick = function() {
        modal.style.display = "none";
    }
    
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    
    const rangeSlider = document.getElementById('notificationRange');
    const rangeValue = document.getElementById('rangeValue');
    
    rangeSlider.addEventListener('input', function() {
        rangeValue.textContent = `${this.value} km`;
    });
    
    const ctx = document.getElementById('alertsChart').getContext('2d');
    const alertsChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dec'],
            datasets: [
                {
                    label: 'Enchentes',
                    data: [5, 8, 12, 15, 10, 7, 4, 3, 6, 9, 11, 8],
                    backgroundColor: '#4361ee'
                },
                {
                    label: 'Incêndios',
                    data: [3, 5, 8, 6, 9, 12, 15, 14, 10, 7, 5, 4],
                    backgroundColor: '#f72585'
                },
                {
                    label: 'Tempestades',
                    data: [2, 4, 5, 7, 12, 8, 6, 5, 7, 10, 8, 6],
                    backgroundColor: '#4cc9f0'
                },
                {
                    label: 'Terremotos',
                    data: [0, 0, 0, 1, 0, 2, 1, 1, 0, 0, 0, 0],
                    backgroundColor: '#7209b7'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    stacked: true,
                },
                y: {
                    stacked: true,
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    position: 'bottom',
                },
                title: {
                    display: true,
                    text: 'Alertas por Tipo (2025)'
                }
            }
        }
    });
    document.getElementById('alertTypeFilter').addEventListener('change', function() {
        const filterValue = this.value;
        const alertItems = document.querySelectorAll('.alert-item');
        
        alertItems.forEach(item => {
            if (filterValue === 'all' || item.querySelector('.alert-icon i').classList.contains(`fa-${filterValue}`)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    });
    
    document.getElementById('alertsConfigForm').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Configurações de alerta salvas com sucesso!');
        modal.style.display = "none";
    });
});

