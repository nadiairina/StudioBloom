// JavaScript para animações ao rolar (Intersection Observer)
// Este script será executado em todas as páginas que o incluírem.
// Os elementos com a classe 'animate-on-scroll' serão observados.
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
            observer.unobserve(entry.target); // Deixa de observar depois de visível
        }
    });
}, observerOptions);

animateOnScrollElements.forEach(element => {
    observer.observe(element);
});

// JavaScript para o formulário de contacto (apenas na página contacto.html)
// Verifica se o formulário existe na página antes de adicionar o event listener
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Previne o envio padrão do formulário

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        const formMessage = document.getElementById('formMessage');

        // Validação básica
        if (!name || !email || !message) {
            formMessage.textContent = 'Por favor, preencha todos os campos obrigatórios.';
            formMessage.classList.remove('text-green-600');
            formMessage.classList.add('text-red-600');
            return;
        }

        // Validação de email simples
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            formMessage.textContent = 'Por favor, insira um endereço de email válido.';
            formMessage.classList.remove('text-green-600');
            formMessage.classList.add('text-red-600');
            return;
        }

        // Simulação de envio (num ambiente real, aqui faria uma requisição AJAX para um backend)
        formMessage.textContent = 'A enviar mensagem...';
        formMessage.classList.remove('text-red-600');
            formMessage.classList.add('text-gray-600');

        setTimeout(() => {
            formMessage.textContent = 'Mensagem enviada com sucesso! Em breve entraremos em contacto.';
            formMessage.classList.remove('text-red-600', 'text-gray-600');
            formMessage.classList.add('text-green-600');
            this.reset(); // Limpa o formulário
        }, 2000); // Simula um atraso de 2 segundos
    });
}

// JavaScript para a Galeria (Modal) (apenas na página galeria.html)
// Verifica se os elementos da galeria existem na página antes de adicionar os event listeners
const galleryItems = document.querySelectorAll('#galeria .group');
const galleryModal = document.getElementById('galleryModal');

if (galleryItems.length > 0 && galleryModal) {
    const modalImage = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const prevImageBtn = document.getElementById('prevImageBtn');
    const nextImageBtn = document.getElementById('nextImageBtn');

    let currentImageIndex = 0;
    const images = Array.from(galleryItems).map(item => ({
        src: item.dataset.image,
        caption: item.dataset.caption
    }));

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentImageIndex = index;
            openModal(images[currentImageIndex]);
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

    function openModal(image) {
        galleryModal.style.display = 'flex';
        modalImage.src = image.src;
        modalCaption.textContent = image.caption;
    }

    function closeModal() {
        galleryModal.style.display = 'none';
    }

    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        openModal(images[currentImageIndex]);
    }

    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        openModal(images[currentImageIndex]);
    }
}

// JavaScript para o Menu Hambúrguer (adicionado para todas as páginas)
const hamburgerBtn = document.getElementById('hamburgerBtn');
const mainNav = document.getElementById('mainNav');

if (hamburgerBtn && mainNav) {
    hamburgerBtn.addEventListener('click', () => {
        mainNav.classList.toggle('hidden');
        mainNav.classList.toggle('flex');
        mainNav.classList.toggle('flex-col'); // Garante que os links ficam em coluna no mobile
        mainNav.classList.toggle('absolute'); // Para posicionar o menu sobre o conteúdo
        mainNav.classList.toggle('top-full'); // Abaixo do cabeçalho
        mainNav.classList.toggle('left-0');
        mainNav.classList.toggle('w-full');
        mainNav.classList.toggle('bg-white'); // Fundo branco para o menu aberto
        mainNav.classList.toggle('shadow-lg'); // Sombra para o menu aberto
        mainNav.classList.toggle('py-4'); // Padding para o menu aberto
        mainNav.classList.toggle('px-6'); // Padding para o menu aberto
        mainNav.classList.toggle('rounded-b-xl'); // Cantos arredondados
        mainNav.classList.toggle('z-40'); // Z-index para ficar abaixo do cabeçalho fixo
    });
}
