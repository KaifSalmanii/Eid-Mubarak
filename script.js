// Check if we're viewing a greeting
window.addEventListener('load', function() {
    const params = new URLSearchParams(window.location.search);
    
    if (params.has('name') || params.has('msg')) {
        viewGreeting();
    }
});

function generateLink() {
    const name = document.getElementById('name').value || 'Friend';
    const message = document.getElementById('message').value || 'Wishing you a blessed and joyful Eid!';
    
    const baseUrl = window.location.origin + window.location.pathname;
    const params = new URLSearchParams({
        name: name,
        msg: message
    });
    
    const fullUrl = `${baseUrl}?${params.toString()}`;
    
    // Display the greeting
    document.querySelector('.input-section').style.display = 'none';
    document.getElementById('displaySection').style.display = 'block';
    document.getElementById('greetingName').textContent = `Eid Mubarak, ${name}!`;
    document.getElementById('greetingMessage').textContent = message;
    document.getElementById('urlInput').value = fullUrl;
    
    // Generate QR Code
    generateQRCode(fullUrl);
}

function generateQRCode(url) {
    const qrContainer = document.getElementById('qrcode');
    qrContainer.innerHTML = ''; // Clear previous QR code
    
    new QRCode(qrContainer, {
        text: url,
        width: 200,
        height: 200,
        colorDark: '#667eea',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
    });
}

function viewGreeting() {
    const params = new URLSearchParams(window.location.search);
    const name = params.get('name') || 'Friend';
    const message = params.get('msg') || 'Wishing you a blessed and joyful Eid!';
    
    document.querySelector('.input-section').style.display = 'none';
    document.getElementById('displaySection').style.display = 'none';
    document.getElementById('viewGreeting').style.display = 'block';
    
    document.getElementById('viewName').textContent = `Eid Mubarak, ${name}!`;
    document.getElementById('viewMessage').textContent = message;
    document.getElementById('senderText').textContent = `📨 From your friend with ❤️`;
}

function shareWhatsApp() {
    const url = document.getElementById('urlInput').value;
    const encodedUrl = encodeURIComponent(url);
    const text = "Eid Mubarak! 🌙 Open this link for a special Eid greeting: " + url;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    showToast('Opening WhatsApp...');
}

function shareFacebook() {
    const url = document.getElementById('urlInput').value;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
    showToast('Opening Facebook...');
}

function shareTwitter() {
    const url = document.getElementById('urlInput').value;
    const text = "Eid Mubarak! 🌙 Check out this special greeting";
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
    showToast('Opening Twitter...');
}

function copyLink() {
    const urlInput = document.getElementById('urlInput');
    urlInput.select();
    document.execCommand('copy');
    showToast('✅ Link copied to clipboard!');
}

function downloadQR() {
    const qrImage = document.querySelector('#qrcode img');
    if (qrImage) {
        const link = document.createElement('a');
        link.href = qrImage.src;
        link.download = 'Eid-Mubarak-QR.png';
        link.click();
        showToast('📥 QR Code downloaded!');
    }
}

function resetForm() {
    document.getElementById('name').value = '';
    document.getElementById('message').value = '';
    document.querySelector('.input-section').style.display = 'block';
    document.getElementById('displaySection').style.display = 'none';
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}
