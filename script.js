// ============================
// Navegación
// ============================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Cambio de estilo del navbar al hacer scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Toggle menú móvil
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Cerrar menú al hacer click en un link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ============================
// Animaciones de scroll
// ============================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Observar elementos para animaciones
document.querySelectorAll('.service-card, .gallery-item, .contact-item').forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
});

// ============================
// Sistema de reserva de turnos
// ============================
const dateSelector = document.getElementById('dateSelector');
const timeSlotsContainer = document.getElementById('timeSlotsContainer');
const timeSlots = document.getElementById('timeSlots');
const bookingBtn = document.getElementById('bookingBtn');
const confirmationMessage = document.getElementById('confirmationMessage');
const confirmationDetails = document.getElementById('confirmationDetails');

// Estado de la reserva
let bookingState = {
    service: '',
    barber: '',
    date: null,
    time: null,
    name: '',
    phone: ''
};

// Horarios disponibles (simulado)
const availableSlots = [
    '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
    '17:00', '17:30', '18:00', '18:30', '19:00', '19:30'
];

// Generar próximos 7 días
function generateDates() {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        
        // Saltar domingos (día 0)
        if (date.getDay() !== 0) {
            dates.push(date);
        }
    }
    
    return dates;
}

// Renderizar selector de fechas
function renderDates() {
    const dates = generateDates();
    
    dateSelector.innerHTML = dates.map(date => {
        const dayName = date.toLocaleDateString('es-ES', { weekday: 'short' });
        const dayNumber = date.getDate();
        const monthName = date.toLocaleDateString('es-ES', { month: 'short' });
        const dateString = date.toISOString().split('T')[0];
        
        return `
            <div class="date-card" data-date="${dateString}">
                <div class="date-day">${dayName}</div>
                <div class="date-number">${dayNumber}</div>
                <div class="date-month">${monthName}</div>
            </div>
        `;
    }).join('');
    
    // Event listeners para las fechas
    document.querySelectorAll('.date-card').forEach(card => {
        card.addEventListener('click', () => {
            document.querySelectorAll('.date-card').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            
            bookingState.date = card.dataset.date;
            renderTimeSlots();
            timeSlotsContainer.style.display = 'block';
            validateBooking();
        });
    });
}

// Renderizar horarios disponibles
function renderTimeSlots() {
    // Simular algunos horarios no disponibles aleatoriamente
    const unavailableSlots = [];
    const randomCount = Math.floor(Math.random() * 5);
    
    for (let i = 0; i < randomCount; i++) {
        const randomIndex = Math.floor(Math.random() * availableSlots.length);
        unavailableSlots.push(availableSlots[randomIndex]);
    }
    
    timeSlots.innerHTML = availableSlots.map(slot => {
        const isUnavailable = unavailableSlots.includes(slot);
        return `
            <div class="time-slot ${isUnavailable ? 'unavailable' : ''}" 
                 data-time="${slot}"
                 ${isUnavailable ? 'title="No disponible"' : ''}>
                ${slot}
            </div>
        `;
    }).join('');
    
    // Event listeners para los horarios
    document.querySelectorAll('.time-slot:not(.unavailable)').forEach(slot => {
        slot.addEventListener('click', () => {
            document.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
            slot.classList.add('selected');
            
            bookingState.time = slot.dataset.time;
            validateBooking();
        });
    });
}

// Validar formulario de reserva
function validateBooking() {
    const service = document.getElementById('service').value;
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    
    bookingState.service = service;
    bookingState.name = name;
    bookingState.phone = phone;
    
    const isValid = service && bookingState.date && bookingState.time && name && phone;
    
    bookingBtn.disabled = !isValid;
}

// Event listeners para los campos del formulario
document.getElementById('service').addEventListener('change', validateBooking);
document.getElementById('barber').addEventListener('change', (e) => {
    bookingState.barber = e.target.value;
});
document.getElementById('name').addEventListener('input', validateBooking);
document.getElementById('phone').addEventListener('input', validateBooking);

// Confirmar reserva
bookingBtn.addEventListener('click', () => {
    // Formatear fecha
    const date = new Date(bookingState.date);
    const formattedDate = date.toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    // Obtener nombre del servicio
    const serviceSelect = document.getElementById('service');
    const serviceName = serviceSelect.options[serviceSelect.selectedIndex].text;
    
    // Obtener nombre del barbero
    const barberSelect = document.getElementById('barber');
    const barberName = barberSelect.value ? 
        barberSelect.options[barberSelect.selectedIndex].text : 
        'Cualquier barbero disponible';
    
    // Mostrar confirmación
    confirmationDetails.innerHTML = `
        <strong>${bookingState.name}</strong>, tu cita ha sido reservada para:<br><br>
        <strong>Servicio:</strong> ${serviceName}<br>
        <strong>Barbero:</strong> ${barberName}<br>
        <strong>Fecha:</strong> ${formattedDate}<br>
        <strong>Hora:</strong> ${bookingState.time}<br><br>
        Te enviaremos un recordatorio a <strong>${bookingState.phone}</strong>
    `;
    
    confirmationMessage.style.display = 'block';
    
    // Scroll suave a la confirmación
    setTimeout(() => {
        confirmationMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
    
    // Deshabilitar formulario
    document.getElementById('service').disabled = true;
    document.getElementById('barber').disabled = true;
    document.getElementById('name').disabled = true;
    document.getElementById('phone').disabled = true;
    bookingBtn.style.display = 'none';
    
    // Deshabilitar selección de fecha y hora
    document.querySelectorAll('.date-card, .time-slot').forEach(el => {
        el.style.pointerEvents = 'none';
        el.style.opacity = '0.6';
    });
    
    // En producción, aquí se enviaría la información al servidor
    console.log('Reserva confirmada:', bookingState);
});

// ============================
// Smooth scroll mejorado
// ============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================
// Parallax efecto en hero
// ============================
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.scrollY;
            const hero = document.querySelector('.hero');
            
            if (hero && scrolled < window.innerHeight) {
                hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
            
            ticking = false;
        });
        
        ticking = true;
    }
});

// ============================
// Inicialización
// ============================
document.addEventListener('DOMContentLoaded', () => {
    renderDates();
    
    // Precargar animación del hero
    setTimeout(() => {
        document.querySelector('.hero-content').style.opacity = '1';
    }, 100);
});

// ============================
// Prevenir zoom en inputs (mobile)
// ============================
if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.style.fontSize = '16px';
        });
    });
}

// ============================
// Gallery lightbox (opcional)
// ============================
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
        // Aquí se podría implementar un lightbox/modal
        // Por ahora solo agregamos feedback visual
        item.style.transform = 'scale(0.95)';
        setTimeout(() => {
            item.style.transform = 'scale(1)';
        }, 200);
    });
});
