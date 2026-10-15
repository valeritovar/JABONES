// DOMContentLoaded para asegurar que el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // MENÚ HAMBURGUESA
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // CARRUSEL AUTOMÁTICO
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        // Ocultar todas las slides
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Mostrar slide actual
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
        
        // Reiniciar animación
        const slideContent = slides[index].querySelector('.carousel-content');
        slideContent.style.animation = 'none';
        setTimeout(() => {
            slideContent.style.animation = 'fadeInUp 1s ease';
        }, 10);
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function startSlideShow() {
        slideInterval = setInterval(nextSlide, 5000); // Cambiar cada 5 segundos
    }

    function stopSlideShow() {
        clearInterval(slideInterval);
    }

    // Iniciar carrusel
    showSlide(0);
    startSlideShow();

    // Pausar carrusel al hacer hover
    const carousel = document.querySelector('.carousel');
    carousel.addEventListener('mouseenter', stopSlideShow);
    carousel.addEventListener('mouseleave', startSlideShow);

    // Indicadores clickeables
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
            stopSlideShow();
            startSlideShow();
        });
    });

    // HEADER SCROLL EFFECT
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
        }
        
        lastScroll = currentScroll;
    });

    // SMOOTH SCROLL para navegación
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Ajuste por header fijo
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ANIMACIÓN DE ENTRADA PARA ELEMENTOS
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar elementos para animación
    const animateElements = document.querySelectorAll('.benefit-card, .product-card, .mission, .vision');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // BOTONES DE COMPRA
    const buyButtons = document.querySelectorAll('.buy-button');
    
    buyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Obtener información del producto
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const aroma = productCard.querySelector('.aroma').textContent;
            
            // Crear mensaje para WhatsApp
            const message = `¡Hola! Estoy interesado(a) en el jabón ${productName}. ${aroma}. ¿Podrían darme más información?`;
            const whatsappUrl = `https://wa.me/3112617515?text=${encodeURIComponent(message)}`;
            
            // Abrir WhatsApp
            window.open(whatsappUrl, '_blank');
        });
    });

    // CTA BUTTONS del carrusel
    const ctaButtons = document.querySelectorAll('.cta-button');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetSection = document.querySelector('#productos');
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        });
    });

    // FORMULARIO DE CONTACTO
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener datos del formulario
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // Validación básica
            if (!name || !email || !message) {
                showNotification('Por favor, completa todos los campos', 'error');
                return;
            }
            
            // Crear mensaje para WhatsApp
            const whatsappMessage = `¡Hola! Soy ${name} (${email}).${message ? ' Mensaje: ' + message : ''}`;
            const whatsappUrl = `https://wa.me/3112617515?text=${encodeURIComponent(whatsappMessage)}`;
            
            // Abrir WhatsApp
            window.open(whatsappUrl, '_blank');
            
            // Limpiar formulario
            this.reset();
            showNotification('¡Mensaje enviado! Te contactaremos pronto.', 'success');
        });
    }

    // SISTEMA DE NOTIFICACIONES
    function showNotification(message, type = 'info') {
        // Crear elemento de notificación
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Estilos para la notificación
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? 'var(--green)' : type === 'error' ? '#e74c3c' : 'var(--gold)'};
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            box-shadow: var(--shadow-lg);
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            font-family: var(--font-secondary);
            font-weight: 500;
        `;
        
        // Agregar al DOM
        document.body.appendChild(notification);
        
        // Mostrar notificación
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Ocultar y remover después de 3 segundos
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // ANIMACIÓN DE CONTADOR PARA ESTADÍSTICAS (si se agregan en el futuro)
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start);
            }
        }, 16);
    }

    // EFECTO PARALLAX SUTIL
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.carousel-content');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
        
        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick);

    // DETECCIÓN DE DISPOSITIVO MÓVIL
    function isMobile() {
        return window.innerWidth <= 768;
    }

    // AJUSTES PARA MÓVIL
    if (isMobile()) {
        // Reducir complejidad de animaciones en móviles
        document.querySelectorAll('.product-card').forEach(card => {
            card.style.transition = 'transform 0.3s ease';
        });
    }

    // LAZY LOADING PARA IMÁGENES (si se agregan en el futuro)
    function lazyLoad() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // Inicializar lazy loading
    lazyLoad();

    // ACCESIBILIDAD: TECLADO PARA NAVEGACIÓN
    document.addEventListener('keydown', function(e) {
        // ESC para cerrar menú móvil
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
        
        // Flechas para navegar carrusel
        if (e.key === 'ArrowLeft') {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
            stopSlideShow();
            startSlideShow();
        } else if (e.key === 'ArrowRight') {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
            stopSlideShow();
            startSlideShow();
        }
    });

    // PERFORMANCE: DEBOUNCE PARA EVENTOS SCROLL
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Aplicar debounce a eventos scroll
    const optimizedScroll = debounce(() => {
        // Lógica de scroll aquí
    }, 10);

    window.addEventListener('scroll', optimizedScroll);

    // CONSOLE MESSAGE para desarrolladores
    console.log('%c🌟 CLAUVITAE - Jabones Artesanales Zodiacales 🌟', 'color: #D4AF37; font-size: 20px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);');
    console.log('%cDiseñado con amor y energía natural ✨', 'color: #2E7D32; font-size: 14px; font-style: italic;');
});

// PRELOADER (opcional)
window.addEventListener('load', function() {
    // Remover preloader si existe
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1000);
    }
});

// EXPORTAR FUNCIONES ÚTILES PARA DESARROLLO FUTURO
window.CLAUVITAE = {
    showNotification: function(message, type) {
        // Función global para mostrar notificaciones
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? 'var(--green)' : type === 'error' ? '#e74c3c' : 'var(--gold)'};
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            box-shadow: var(--shadow-lg);
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            font-family: var(--font-secondary);
            font-weight: 500;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    },
    
    scrollToSection: function(sectionId) {
        const section = document.querySelector(sectionId);
        if (section) {
            const offsetTop = section.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
};
