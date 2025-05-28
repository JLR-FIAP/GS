const disasterData = {
    activeAlerts: 3,
    peopleAtRisk: 1245,
    affectedAreas: 7,
    procedures: {
        flood: {
            title: "Procedimento para Enchentes",
            steps: [
                "1. Desligue a energia elétrica se a água estiver subindo",
                "2. Suba para locais elevados",
                "3. Evite contato com água de enchente (pode estar contaminada)",
                "4. Não tente atravessar áreas alagadas a pé ou de carro",
                "5. Siga para abrigos designados se necessário"
            ],
            contacts: ["Defesa Civil: 199", "Bombeiros: 193"]
        },
        fire: {
            title: "Procedimento para Incêndios",
            steps: [
                "1. Mantenha a calma e evacue imediatamente",
                "2. Feche portas e janelas atrás de você",
                "3. Use escadas, não elevadores",
                "4. Se houver fumaça, rasteje no chão",
                "5. Toque nas portas antes de abrir - se estiverem quentes, não abra"
            ],
            contacts: ["Bombeiros: 193", "Emergências: 192"]
        },
        earthquake: {
            title: "Procedimento para Terremotos",
            steps: [
                "1. Se estiver dentro de casa, fique lá - procure abrigo sob móveis resistentes",
                "2. Fique longe de janelas e objetos que possam cair",
                "3. Se estiver ao ar livre, afaste-se de edifícios e postes",
                "4. Se estiver em um carro, pare em local seguro e fique dentro do veículo",
                "5. Esteja preparado para réplicas"
            ],
            contacts: ["Defesa Civil: 199"]
        },
        storm: {
            title: "Procedimento para Tempestades",
            steps: [
                "1. Fique em casa e evite sair",
                "2. Afaste-se de janelas e portas de vidro",
                "3. Desligue aparelhos elétricos",
                "4. Evite usar telefone com fio durante tempestades",
                "5. Se estiver ao ar livre, procure abrigo em edifícios sólidos"
            ],
            contacts: ["Defesa Civil: 199", "Emergências: 192"]
        }
    },
    shelters: [
        { name: "Escola Municipal ABC", address: "Rua Principal, 123", distance: "1.2km", capacity: 150 },
        { name: "Ginásio Esportivo", address: "Av. Central, 456", distance: "2.5km", capacity: 300 },
        { name: "Igreja São Francisco", address: "Praça da Matriz,", distance: "3.1km", capacity: 100 }
    ]
};

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('activeAlerts').textContent = disasterData.activeAlerts;
    document.getElementById('peopleAtRisk').textContent = disasterData.peopleAtRisk;
    document.getElementById('affectedAreas').textContent = disasterData.affectedAreas;
    
    const modal = document.getElementById('emergencyModal');
    const span = document.getElementsByClassName('close')[0];
    
    span.onclick = function() {
        modal.style.display = "none";
    }
    
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    
    document.getElementById('emergencyBtn').addEventListener('click', function() {
        showProcedure('emergency');
    });
});

function showProcedure(type) {
    const modal = document.getElementById('emergencyModal');
    const title = document.getElementById('modalTitle');
    const content = document.getElementById('modalContent');
    
    if (type === 'emergency') {
        title.textContent = "O que fazer em caso de emergência";
        content.innerHTML = `
            <p>Se você estiver em perigo iminente:</p>
            <ol>
                <li>Mantenha a calma</li>
                <li>Ligue para o número de emergência apropriado</li>
                <li>Siga para um local seguro</li>
                <li>Aguarde instruções das autoridades</li>
            </ol>
            <div class="emergency-contacts">
                <h4>Números de Emergência:</h4>
                <p><strong>Defesa Civil:</strong> 199</p>
                <p><strong>Bombeiros:</strong> 193</p>
                <p><strong>Polícia:</strong> 190</p>
                <p><strong>Samu:</strong> 192</p>
            </div>
        `;
    } else {
        const procedure = disasterData.procedures[type];
        title.textContent = procedure.title;
        
        let stepsHTML = '<ol>';
        procedure.steps.forEach(step => {
            stepsHTML += `<li>${step}</li>`;
        });
        stepsHTML += '</ol>';
        
        let contactsHTML = '<div class="emergency-contacts"><h4>Contatos de Emergência:</h4>';
        procedure.contacts.forEach(contact => {
            contactsHTML += `<p>${contact}</p>`;
        });
        contactsHTML += '</div>';
        
        content.innerHTML = stepsHTML + contactsHTML;
    }
    
    modal.style.display = "block";
}

function showNearestShelters() {
    const modal = document.getElementById('emergencyModal');
    const title = document.getElementById('modalTitle');
    const content = document.getElementById('modalContent');
    
    title.textContent = "Abrigos mais próximos";
    
    let sheltersHTML = '<div class="shelters-list">';
    disasterData.shelters.forEach(shelter => {
        sheltersHTML += `
            <div class="shelter-item">
                <h4>${shelter.name}</h4>
                <p><i class="fas fa-map-marker-alt"></i> ${shelter.address}</p>
                <p><i class="fas fa-walking"></i> ${shelter.distance} de distância</p>
                <p><i class="fas fa-users"></i> Capacidade: ${shelter.capacity} pessoas</p>
            </div>
        `;
    });
    sheltersHTML += '</div>';
    
    content.innerHTML = sheltersHTML;
    modal.style.display = "block";
}

function reportEmergency() {
    const modal = document.getElementById('emergencyModal');
    const title = document.getElementById('modalTitle');
    const content = document.getElementById('modalContent');
    
    title.textContent = "Reportar Emergência";
    content.innerHTML = `
        <form id="emergencyForm">
            <div class="form-group">
                <label for="emergencyType">Tipo de Emergência:</label>
                <select id="emergencyType" required>
                    <option value="">Selecione...</option>
                    <option value="flood">Enchente</option>
                    <option value="fire">Incêndio</option>
                    <option value="earthquake">Terremoto/Tremor</option>
                    <option value="storm">Tempestade/Furacão</option>
                    <option value="other">Outro</option>
                </select>
            </div>
            
            <div class="form-group">
                <label for="emergencyLocation">Localização (endereço aproximado):</label>
                <input type="text" id="emergencyLocation" required placeholder="Ex: Rua das Flores, 100">
            </div>
            
            <div class="form-group">
                <label for="emergencyDescription">Descrição (opcional):</label>
                <textarea id="emergencyDescription" placeholder="Descreva brevemente a situação"></textarea>
            </div>
            
            <button type="submit">Enviar Relatório</button>
        </form>
    `;
    
    document.getElementById('emergencyForm').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Seu relatório foi enviado às autoridades. Mantenha-se em segurança!');
        modal.style.display = "none";
    });
    
    modal.style.display = "block";
}


