// Resume Modal Functions - Define globally
function openResumeModal() {
    console.log('Opening modal...');
    const modal = document.getElementById('resumeModal');
    modal.classList.add('show');
    document.body.classList.add('modal-open');
}

function closeResumeModal() {
    console.log('Closing modal...');
    const modal = document.getElementById('resumeModal');
    modal.classList.remove('show');
    document.body.classList.remove('modal-open');
}

// Set up event listeners when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('resumeModal');
    const overlay = modal?.querySelector('.modal-overlay');
    
    if (overlay) {
        overlay.addEventListener('click', closeResumeModal);
    }
    
    // Close modal on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeResumeModal();
        }
    });
});



    