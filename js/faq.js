document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            item.classList.toggle('active');
            
            if (item.classList.contains('active')) {
                item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    });
    
    if (faqItems.length > 0) {
        faqItems[0].classList.add('active');
    }
});
