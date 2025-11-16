// Constantes e elementos DOM
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');
const header = document.querySelector('header');
const carrosselContainer = document.querySelector('.carrossel-container');
const cardItems = document.querySelectorAll('.card-item');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const indicators = document.querySelectorAll('.indicator');
const skillsSection = document.querySelector('.skills');
const contactForm = document.getElementById('contactForm');

// Estado do carrossel
let currentCardIndex = 0;
const totalCards = cardItems.length;
const cardWidth = 300;

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    initMenu();
    initScrollEffects();
    initSmoothScroll();
    initCarrossel();
    initSkillsAnimation();
    initContactForm();
    initScrollAnimations();
});

// Menu mobile
function initMenu() {
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
}

// Efeitos de scroll
function initScrollEffects() {
    function handleScroll() {
        header.classList.toggle('scrolled', window.scrollY > 100);
    }
    window.addEventListener('scroll', handleScroll);
}

// Scroll suave para links internos
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Carrossel de projetos
function initCarrossel() {
    if (!prevBtn || !nextBtn) return;
    
    function updateCarrossel() {
        const offset = -currentCardIndex * cardWidth;
        carrosselContainer.style.transform = `translateX(${offset}px)`;
        
        cardItems.forEach((card, index) => {
            card.classList.remove('active', 'prev', 'next', 'far-prev', 'far-next');
            
            if (index === currentCardIndex) card.classList.add('active');
            else if (index === currentCardIndex - 1) card.classList.add('prev');
            else if (index === currentCardIndex + 1) card.classList.add('next');
            else if (index === currentCardIndex - 2) card.classList.add('far-prev');
            else if (index === currentCardIndex + 2) card.classList.add('far-next');
        });
        
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentCardIndex);
        });
        
        prevBtn.disabled = currentCardIndex === 0;
        nextBtn.disabled = currentCardIndex === totalCards - 1;
    }
    
    function nextCard() {
        if (currentCardIndex < totalCards - 1) {
            currentCardIndex++;
            updateCarrossel();
        }
    }
    
    function prevCard() {
        if (currentCardIndex > 0) {
            currentCardIndex--;
            updateCarrossel();
        }
    }
    
    prevBtn.addEventListener('click', prevCard);
    nextBtn.addEventListener('click', nextCard);
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevCard();
        else if (e.key === 'ArrowRight') nextCard();
    });
    
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentCardIndex = index;
            updateCarrossel();
        });
    });
    
    updateCarrossel();
}

// Animação das habilidades
function initSkillsAnimation() {
    function animateSkills() {
        document.querySelectorAll('.skill-progress').forEach(progress => {
            const level = progress.getAttribute('data-level');
            progress.style.width = level + '%';
        });
    }
    
    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkills();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(skillsSection);
    }
}

// Formulário de contato
function initContactForm() {
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        clearErrors();
        
        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const mensagem = document.getElementById('mensagem').value.trim();
        let isValid = true;
        
        if (nome === '' || nome.length < 2) {
            showError('nomeError', 'Por favor, insira um nome válido (mínimo 2 caracteres).');
            isValid = false;
        }
        
        if (email === '' || !isValidEmail(email)) {
            showError('emailError', 'Por favor, insira um e-mail válido.');
            isValid = false;
        }
        
        if (mensagem === '' || mensagem.length < 10) {
            showError('mensagemError', 'Por favor, insira uma mensagem (mínimo 10 caracteres).');
            isValid = false;
        }
        
        if (isValid) {
            const submitBtn = document.querySelector('.submit-btn');
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Mensagem enviada com sucesso! Entrarei em contato em breve.');
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
                contactForm.reset();
            }, 2000);
        }
    });
    
    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        if (errorElement) errorElement.textContent = message;
    }
    
    function clearErrors() {
        document.querySelectorAll('.error-message').forEach(element => {
            element.textContent = '';
        });
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

// Animações de scroll
function initScrollAnimations() {
    function animateOnScroll() {
        const elements = document.querySelectorAll('.skill-category, .card-item, .info-card, .Mim-text, .Mim-image');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('animate-in');
            }
        });
    }
    
    document.querySelectorAll('.skill-category, .card-item, .info-card, .Mim-text, .Mim-image').forEach(el => {
        el.classList.add('animate-ready');
    });
    
    setTimeout(() => {
        document.querySelector('.Mim-text')?.classList.add('animate-in');
        document.querySelector('.Mim-image')?.classList.add('animate-in');
    }, 300);
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
}

// Loader da página
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    const loader = document.querySelector('.loader');
    if (loader) loader.style.display = 'none';
});