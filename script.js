document.addEventListener('DOMContentLoaded', function() {
    // ============ SCROLL SUAVE PARA LINKS ÂNCORA ============
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);

            if(target) {
                // Corrigindo a rolagem suave com base na altura do cabeçalho fixo
                const headerHeight = document.querySelector('.main-header').offsetHeight;
                
                window.scrollTo({
                    top: target.offsetTop - headerHeight, // Ajusta a posição levando em conta o cabeçalho fixo
                    behavior: 'smooth' // Rolagem suave
                });
            }

            // Remove classe active de todos os links
            document.querySelectorAll('.nav-link').forEach(item => {
                item.classList.remove('active');
            });
            
            // Adiciona classe active no link clicado
            if(this.classList.contains('nav-link')) {
                this.classList.add('active');
            }
        });
    });
    
    // ============ ANIMAÇÕES AO ROLAR A PÁGINA ============
    const animateOnScroll = function() {
        const elements = document.querySelectorAll(
            '.hero-text, .about-content > div, .services-list li, .portfolio-item, .contact-item'
        );
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translate(0)';
                element.style.visibility = 'visible';
            }
        });
        
        // Atualiza o menu ativo conforme scroll
        updateActiveMenu();
    };
    
    // Adiciona estilos iniciais para animação
    const animatedElements = document.querySelectorAll(
        '.hero-text, .about-content > div, .services-list li, .portfolio-item, .contact-item'
    );
    
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.visibility = 'hidden';
        element.style.transition = 'all 0.6s ease';
        
        // Alterna a direção da animação
        if(element.classList.contains('about-image')) {
            element.style.transform = 'translateX(-30px)';
        } else if(element.classList.contains('about-text')) {
            element.style.transform = 'translateX(30px)';
        } else {
            element.style.transform = 'translateY(30px)';
        }
    });
    
    // ============ ATUALIZAR MENU ATIVO ============
    function updateActiveMenu() {
        const scrollPosition = window.scrollY;
        const headerHeight = document.querySelector('.main-header').offsetHeight;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if(link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // ============ HEADER COM SCROLL ============
    const header = document.querySelector('.main-header');
    
    window.addEventListener('scroll', function() {
        animateOnScroll();
        
        // Adiciona classe quando rolar a página
        if(window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Executa uma vez ao carregar
    animateOnScroll();

    // Carrossel de depoimentos
    let currentTestimonial = 0;
    const testimonials = document.querySelectorAll('.testimonial-card');
    const totalTestimonials = testimonials.length;

    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.style.display = i === index ? 'block' : 'none';
        });
    }

    // Botões de navegação (adicione no HTML)
    document.querySelector('.testimonial-prev').addEventListener('click', () => {
        currentTestimonial = (currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
        showTestimonial(currentTestimonial);
    });

    document.querySelector('.testimonial-next').addEventListener('click', () => {
        currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
        showTestimonial(currentTestimonial);
    });

    // Inicializar
    showTestimonial(0);
});
