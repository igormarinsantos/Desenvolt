/**
 * Aguarda o carregamento completo do DOM para executar o script.
 */
document.addEventListener('DOMContentLoaded', () => {

    /**
     * Efeito de "scroll" para a barra de navegação.
     */
    const initNavScrollEffect = () => {
        const nav = document.getElementById('main-nav');
        if (!nav) return;
        const handleScroll = () => {
            nav.classList.toggle('scrolled', window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
    };

    /**
     * Lógica para o seletor de idiomas.
     */
    const initLanguageSwitcher = () => {
        const switcher = document.getElementById('lang-switcher');
        if (!switcher) return;
        const button = switcher.querySelector('.language-switcher__button');
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            switcher.classList.toggle('open');
            button.setAttribute('aria-expanded', switcher.classList.contains('open'));
        });
        document.addEventListener('click', () => {
            if (switcher.classList.contains('open')) {
                switcher.classList.remove('open');
                button.setAttribute('aria-expanded', 'false');
            }
        });
    };

    /**
     * Efeito de desfoque no conteúdo principal ao interagir com o menu.
     */
    const initNavHoverBlur = () => {
        const nav = document.getElementById('main-nav');
        const mainContent = document.getElementById('main-content');
        if (!nav || !mainContent) return;

        const addBlur = () => mainContent.classList.add('is-blurred');
        const removeBlur = () => mainContent.classList.remove('is-blurred');

        nav.querySelectorAll('.mega-menu').forEach(menu => {
            menu.addEventListener('mouseenter', addBlur);
            menu.addEventListener('mouseleave', removeBlur);
        });
        
        nav.querySelectorAll('li > a').forEach(link => {
            link.addEventListener('mouseenter', addBlur);
            link.parentElement.addEventListener('mouseleave', removeBlur);
        });
    };

    /**
     * Animação dos números da seção de prova social.
     */
    const initCounterAnimation = () => {
        const statItems = document.querySelectorAll('.stat-item__number');
        if (statItems.length === 0) return;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const finalValue = parseInt(target.dataset.target, 10);
                    let currentValue = 0;
                    const duration = 2000;
                    const startTime = performance.now();

                    const animate = (currentTime) => {
                        const elapsedTime = currentTime - startTime;
                        const progress = Math.min(elapsedTime / duration, 1);
                        currentValue = Math.floor(progress * finalValue);
                        target.textContent = currentValue;

                        if (progress < 1) {
                            requestAnimationFrame(animate);
                        } else {
                             target.textContent = finalValue;
                        }
                    };
                    requestAnimationFrame(animate);
                    observer.unobserve(target);
                }
            });
        }, { threshold: 0.8 });
        statItems.forEach(item => observer.observe(item));
    };
    
    /**
     * Inicializa os carrosséis com loop infinito automático e contínuo.
     */
    const initInfiniteCarousel = () => {
        const carousels = document.querySelectorAll('.carousel');
        if (carousels.length === 0) return;

        carousels.forEach(carousel => {
            const track = carousel.querySelector('.carousel__track');
            if (!track || track.children.length <= 1) return;

            // Evita duplicar se o script rodar mais de uma vez
            if (track.dataset.initialized) return;
            track.dataset.initialized = 'true';

            const trackContent = Array.from(track.children);
            trackContent.forEach(item => {
                const clone = item.cloneNode(true);
                clone.setAttribute('aria-hidden', true);
                track.appendChild(clone);
            });

            const direction = carousel.dataset.direction || 'ltr';
            const animationName = direction === 'rtl' ? 'scroll-rtl' : 'scroll-ltr';
            track.style.animationName = animationName;
        });
    };

    /**
     * Controla a exibição da tabela de funcionalidades.
     */
    const initFeatureToggle = () => {
        const toggleBtn = document.getElementById('toggle-features-btn');
        const featuresTable = document.getElementById('features-table');

        if (!toggleBtn || !featuresTable) return;

        toggleBtn.addEventListener('click', () => {
            const isVisible = featuresTable.classList.contains('is-visible');
            
            toggleBtn.classList.toggle('is-open', !isVisible);
            toggleBtn.setAttribute('aria-expanded', !isVisible);
            featuresTable.classList.toggle('is-visible', !isVisible);
        });
    };

    /**
     * Iguala a altura de todos os cards de avaliação.
     */
    const equalizeCardHeights = () => {
        const cards = document.querySelectorAll('.testimonial-card');
        if (cards.length === 0) return;

        let maxHeight = 0;

        // Reseta qualquer altura inline para medir a altura natural
        cards.forEach(card => {
            card.style.height = 'auto';
        });

        // Encontra a altura máxima entre todos os cards
        cards.forEach(card => {
            if (card.offsetHeight > maxHeight) {
                maxHeight = card.offsetHeight;
            }
        });

        // Aplica a altura máxima a todos os cards
        cards.forEach(card => {
            card.style.height = `${maxHeight}px`;
        });
    };


    // Inicializa todos os componentes da página
    initNavScrollEffect();
    initLanguageSwitcher();
    initNavHoverBlur();
    initCounterAnimation();
    initInfiniteCarousel(); 
    initFeatureToggle();
    
    // Executa a função de igualar alturas
    equalizeCardHeights();
    window.addEventListener('resize', equalizeCardHeights);
    window.addEventListener('load', equalizeCardHeights);
});