document.addEventListener('DOMContentLoaded', function() {
    window.simulateCall = function(number) {
        alert(`Simulação: Ligando para ${number}\nEm uma situação real, esta ação conectaria você diretamente ao serviço de emergência.`);
    };
    
    window.openGuide = function(guideId) {
        document.querySelectorAll('.guide-content').forEach(content => {
            content.classList.remove('active');
        });
        
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        document.getElementById(guideId).classList.add('active');
        
        event.currentTarget.classList.add('active');
    };
    
    document.querySelectorAll('.training-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const cardTitle = this.closest('.training-card').querySelector('h3').textContent;
            alert(`Simulação: Você selecionou "${cardTitle}".\nEm uma implementação real, isso levaria você para a página de treinamentos.`);
        });
    });
    
    document.querySelectorAll('.contact-card, .training-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        });
    });
});
