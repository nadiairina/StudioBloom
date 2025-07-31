// Espera que o DOM esteja completamente carregado antes de executar o script
document.addEventListener('DOMContentLoaded', () => {

    /* ==================================== */
    /* Lógica do Menu de Navegação */
    /* ==================================== */
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const mainNav = document.getElementById('mainNav');
    const closeNavBtn = document.getElementById('closeNavBtn');

    // Verifica se os elementos do menu existem antes de adicionar os event listeners
    if (hamburgerBtn && mainNav && closeNavBtn) {
        hamburgerBtn.addEventListener('click', () => {
            // Torna o menu visível e desliza para dentro da tela
            mainNav.classList.remove('hidden', 'translate-x-full');
            mainNav.classList.add('translate-x-0');
        });

        // Função para fechar o menu
        const closeNav = () => {
            // Desliza o menu para fora da tela
            mainNav.classList.remove('translate-x-0');
            mainNav.classList.add('translate-x-full');
            
            // Adiciona a classe 'hidden' após a transição para garantir que não interfere
            mainNav.addEventListener('transitionend', function handler() {
                mainNav.classList.add('hidden');
                mainNav.removeEventListener('transitionend', handler);
            }, { once: true }); // O listener é removido após a primeira execução
        };

        // Event listener para o botão de fechar
        closeNavBtn.addEventListener('click', closeNav);

        // Fecha o menu quando um link é clicado
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeNav);
        });
    }

    /* ==================================== */
    /* Lógica de Animação de Rolagem */
    /* ==================================== */
    const animateOnScrollElements = document.querySelectorAll('.animate-on-scroll');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // observer.unobserve(entry.target); // Para animar apenas uma vez
            }
        });
    }, observerOptions);

    animateOnScrollElements.forEach(element => {
        observer.observe(element);
    });

    /* ==================================== */
    /* Lógica do Formulário de Contacto */
    /* ==================================== */
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            const formMessage = document.getElementById('formMessage');

            if (!name || !email || !message) {
                formMessage.textContent = 'Por favor, preencha todos os campos obrigatórios.';
                formMessage.classList.remove('text-green-600');
                formMessage.classList.add('text-red-600');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                formMessage.textContent = 'Por favor, insira um endereço de email válido.';
                formMessage.classList.remove('text-green-600');
                formMessage.classList.add('text-red-600');
                return;
            }

            formMessage.textContent = 'A enviar mensagem...';
            formMessage.classList.remove('text-red-600', 'text-green-600');
            formMessage.classList.add('text-gray-600');

            setTimeout(() => {
                formMessage.textContent = 'Mensagem enviada com sucesso! Em breve entraremos em contacto.';
                formMessage.classList.remove('text-red-600', 'text-gray-600');
                formMessage.classList.add('text-green-600');
                this.reset();
            }, 2000);
        });
    }

    /* ==================================== */
    /* Lógica do Modal da Galeria (apenas na página galeria.html) */
    /* ==================================== */
    // A correção está aqui: Agora seleciona os elementos <img> que contêm os dados
    const galleryImages = document.querySelectorAll('#galeria img'); 
    const galleryModal = document.getElementById('galleryModal');

    if (galleryImages.length > 0 && galleryModal) {
        const modalImage = document.getElementById('modalImage');
        const modalCaption = document.getElementById('modalCaption');
        const closeModalBtn = document.getElementById('closeModalBtn');
        const prevImageBtn = document.getElementById('prevImageBtn');
        const nextImageBtn = document.getElementById('nextImageBtn');

        let currentImageIndex = 0;
        
        const openModal = (index) => {
            currentImageIndex = index;
            const image = galleryImages[currentImageIndex];
            galleryModal.style.display = 'flex';
            modalImage.src = image.getAttribute('data-src');
            modalCaption.textContent = image.getAttribute('data-caption');
        };

        const closeModal = () => {
            galleryModal.style.display = 'none';
        };

        const showPrevImage = () => {
            currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
            openModal(currentImageIndex);
        };

        const showNextImage = () => {
            currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
            openModal(currentImageIndex);
        };

        galleryImages.forEach((item, index) => {
            item.addEventListener('click', () => {
                openModal(index);
            });
        });

        closeModalBtn.addEventListener('click', closeModal);
        prevImageBtn.addEventListener('click', showPrevImage);
        nextImageBtn.addEventListener('click', showNextImage);

        // Fecha o modal ao clicar fora da imagem
        galleryModal.addEventListener('click', (e) => {
            if (e.target === galleryModal) {
                closeModal();
            }
        });
    }
});
