document.addEventListener('DOMContentLoaded', function() {
    window.simulateCall = function(number) {
        alert(`Simulação: Ligando para ${number}\nEm uma situação real, esta ação conectaria você diretamente ao serviço de emergência.`);
    };
    
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value.trim();
        
        if (!name || !email || !subject || !message) {
            alert('Por favor, preencha todos os campos do formulário.');
            return;
        }
        
        alert(`Obrigado, ${name}! Sua mensagem sobre "${subject}" foi enviada com sucesso. Entraremos em contato em breve pelo e-mail ${email}.`);
        
        contactForm.reset();
    });
    
    const emergencyButtons = document.querySelectorAll('.emergency-contacts button');
    
    emergencyButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
});
