// Resume Modal Functions
function openResumeModal() {
    const modal = document.getElementById('resumeModal');
    modal.classList.add('show');
    document.body.classList.add('modal-open');
}

function closeResumeModal() {
    const modal = document.getElementById('resumeModal');
    modal.classList.remove('show');
    document.body.classList.remove('modal-open');
}

// Close modal when clicking overlay
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