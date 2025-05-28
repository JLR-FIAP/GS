const mapData = {
    incidents: [
        {
            id: 1,
            type: "flood",
            location: [-23.5505, -46.6333],  // São Paulo
            severity: "high",
            description: "Enchente na região central",
            reportedAt: "2025-05-15T10:30:00",
            radius: 2000  
        },
        {
            id: 2,
            type: "fire",
            location: [-22.9068, -43.1729],  // Rio de Janeiro
            severity: "medium",
            description: "Incêndio na zona norte",
            reportedAt: "2025-04-16T14:45:00",
            radius: 1500
        },
        {
            id: 3,
            type: "storm",
            location: [-12.9714, -38.5014],  // Salvador
            severity: "high",
            description: "Tempestade com ventos fortes",
            reportedAt: "2024-02-17T08:15:00",
            radius: 3000
        },
        {
            id: 4,
            type: "earthquake",
            location: [-15.7939, -47.8828],  // Brasília
            severity: "low",
            description: "Pequeno tremor de terra",
            reportedAt: "2023-11-18T03:20:00",
            radius: 500
        }
    ],
    shelters: [
        {
            id: 101,
            name: "Abrigo Central",
            location: [-23.5489, -46.6388],
            capacity: 200,
            currentOccupancy: 45
        },
        {
            id: 102,
            name: "Escola Segura",
            location: [-23.5435, -46.6291],
            capacity: 150,
            currentOccupancy: 120
        }
    ]
};

let map;
let incidentMarkers = [];
let shelterMarkers = [];

document.addEventListener('DOMContentLoaded', function() {
    map = L.map('disasterMap').setView([-15.7801, -47.9292], 4);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    loadMapData();
    
    const modal = document.getElementById('incidentModal');
    const span = document.getElementsByClassName('close')[0];
    const reportBtn = document.getElementById('reportIncident');
    
    span.onclick = function() {
        modal.style.display = "none";
    }
    
    reportBtn.onclick = function() {
        modal.style.display = "block";
    }
    
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    
    document.getElementById('incidentForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const type = document.getElementById('incidentType').value;
        const location = document.getElementById('incidentLocation').value;
        const severity = document.getElementById('incidentSeverity').value;
        const description = document.getElementById('incidentDescription').value;
        
        alert(`Incidente reportado com sucesso!\nTipo: ${getTypeName(type)}\nLocal: ${location}`);
        modal.style.display = "none";
    });
    
    map.on('click', function(e) {
        document.getElementById('incidentLocation').value = 
            `Lat: ${e.latlng.lat.toFixed(4)}, Lng: ${e.latlng.lng.toFixed(4)}`;
    });
    
    document.getElementById('applyFilters').addEventListener('click', applyFilters);
    
    loadSavedFilters();
});

function loadMapData() {
    clearMarkers();
    
    mapData.incidents.forEach(incident => {
        const marker = L.circleMarker(incident.location, {
            radius: getRadiusSize(incident.severity),
            fillColor: getColorForType(incident.type),
            color: "#fff",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8,
            type: incident.type,
            severity: incident.severity
        }).addTo(map);
        
        marker.bindPopup(`
            <h3>${getTypeName(incident.type)}</h3>
            <p><strong>Gravidade:</strong> ${getSeverityName(incident.severity)}</p>
            <p>${incident.description}</p>
            <p><small>Reportado em: ${new Date(incident.reportedAt).toLocaleString()}</small></p>
        `);
        
        incidentMarkers.push(marker);
    });
    
    mapData.shelters.forEach(shelter => {
        const marker = L.marker(shelter.location, {
            icon: L.divIcon({
                className: 'marker-icon',
                html: `<div class="marker-shelter"><i class="fas fa-home"></i></div>`,
                iconSize: [30, 30]
            }),
            type: 'shelter'
        }).addTo(map);
        
        const availability = shelter.capacity - shelter.currentOccupancy;
        const status = availability > 0 ? 
            `<span style="color: green;">${availability} vagas disponíveis</span>` : 
            '<span style="color: red;">Lotado</span>';
        
        marker.bindPopup(`
            <h3>${shelter.name}</h3>
            <p><strong>Capacidade:</strong> ${shelter.capacity} pessoas</p>
            <p><strong>Ocupação atual:</strong> ${shelter.currentOccupancy}</p>
            <p><strong>Status:</strong> ${status}</p>
        `);
        
        shelterMarkers.push(marker);
    });
}

function applyFilters() {
    const disasterType = document.getElementById('disasterType').value;
    const riskLevel = document.getElementById('riskLevel').value;
    
    saveFilters(disasterType, riskLevel);
    
    incidentMarkers.forEach(marker => {
        const matchesType = disasterType === 'all' || marker.options.type === disasterType;
        const matchesRisk = riskLevel === 'all' || marker.options.severity === riskLevel;
        
        if (matchesType && matchesRisk) {
            if (!map.hasLayer(marker)) {
                marker.addTo(map);
            }
        } else {
            if (map.hasLayer(marker)) {
                map.removeLayer(marker);
            }
        }
    });
    
    shelterMarkers.forEach(marker => {
        if (!map.hasLayer(marker)) {
            marker.addTo(map);
        }
    });
    
    showFilterFeedback(disasterType, riskLevel);
}

function clearMarkers() {
    incidentMarkers.forEach(marker => map.removeLayer(marker));
    shelterMarkers.forEach(marker => map.removeLayer(marker));
    incidentMarkers = [];
    shelterMarkers = [];
}

function saveFilters(type, level) {
    localStorage.setItem('mapFilters', JSON.stringify({
        disasterType: type,
        riskLevel: level
    }));
}

function loadSavedFilters() {
    const savedFilters = localStorage.getItem('mapFilters');
    if (savedFilters) {
        const filters = JSON.parse(savedFilters);
        document.getElementById('disasterType').value = filters.disasterType;
        document.getElementById('riskLevel').value = filters.riskLevel;
        applyFilters();
    }
}

function showFilterFeedback(type, level) {
    const typeName = type === 'all' ? 'Todos os tipos' : getTypeName(type);
    const levelName = level === 'all' ? 'Todos os níveis' : getSeverityName(level);

    const filterInfo = L.popup()
        .setLatLng(map.getCenter())
        .setContent(`
            <strong>Filtros aplicados:</strong><br>
            Tipo: ${typeName}<br>
            Nível de risco: ${levelName}
        `)
        .openOn(map);
    
    setTimeout(() => map.closePopup(filterInfo), 3000);
}

function getColorForType(type) {
    const colors = {
        flood: '#4361ee',
        fire: '#f72585',
        earthquake: '#7209b7',
        storm: '#4cc9f0',
        shelter: '#38b000'
    };
    return colors[type] || '#666';
}

function getTypeName(type) {
    const names = {
        flood: 'Enchente',
        fire: 'Incêndio',
        earthquake: 'Terremoto',
        storm: 'Tempestade',
        shelter: 'Abrigo'
    };
    return names[type] || 'Desconhecido';
}

function getSeverityName(severity) {
    const names = {
        high: 'Alta',
        medium: 'Média',
        low: 'Baixa'
    };
    return names[severity] || 'Desconhecida';
}

function getRadiusSize(severity) {
    const sizes = {
        high: 10,
        medium: 7,
        low: 4
    };
    return sizes[severity] || 5;
}
