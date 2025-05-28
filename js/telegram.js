  document.addEventListener('DOMContentLoaded', function() {
    const trigger = document.getElementById('chatbotTrigger');
    const popup = document.getElementById('chatbotPopup');
    const closeBtn = document.querySelector('.close-popup');
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);

    trigger.addEventListener('click', function(e) {
        e.stopPropagation();
        popup.style.display = 'block';
        overlay.style.display = 'block';
    });

    closeBtn.addEventListener('click', function() {
        popup.style.display = 'none';
        overlay.style.display = 'none';
    });

    overlay.addEventListener('click', function() {
        popup.style.display = 'none';
        this.style.display = 'none';
    });

    document.addEventListener('click', function(e) {
        if (!popup.contains(e.target) && e.target !== trigger) {
            popup.style.display = 'none';
            overlay.style.display = 'none';
        }
    });
});

