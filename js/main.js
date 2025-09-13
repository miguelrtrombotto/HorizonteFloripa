/**
 * CONTROLADOR DEL SLIDER
 */
class Slider {
  constructor() {
    this.slides = document.querySelectorAll('.slide');
    this.dotsContainer = document.getElementById('dots');
    this.prevBtn = document.getElementById('prev');
    this.nextBtn = document.getElementById('next');
    this.currentIndex = 0;
    this.autoPlayInterval = null;
    this.autoPlayDelay = 5000;

    this.init();
  }

  init() {
    this.createDots();
    this.setupEventListeners();
    this.preloadImages();
    this.showSlide(this.currentIndex);
    this.startAutoPlay();
  }

  createDots() {
    this.slides.forEach((_, index) => {
      const dot = document.createElement('span');
      dot.addEventListener('click', () => this.goToSlide(index));
      this.dotsContainer.appendChild(dot);
    });
  }

  showSlide(index) {
    this.slides.forEach(slide => slide.classList.remove('active'));
    this.slides[index].classList.add('active');
    
    const dots = this.dotsContainer.querySelectorAll('span');
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
    
    this.currentIndex = index;
  }

  nextSlide() {
    const newIndex = (this.currentIndex + 1) % this.slides.length;
    this.showSlide(newIndex);
  }

  prevSlide() {
    const newIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    this.showSlide(newIndex);
  }

  goToSlide(index) {
    this.showSlide(index);
    this.resetAutoPlay();
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => this.nextSlide(), this.autoPlayDelay);
  }

  resetAutoPlay() {
    clearInterval(this.autoPlayInterval);
    this.startAutoPlay();
  }

  preloadImages() {
    this.slides.forEach(slide => {
      const img = new Image();
      img.src = slide.style.backgroundImage.match(/url\(['"]?(.*?)['"]?\)/i)[1];
    });
  }

  setupEventListeners() {
    this.prevBtn.addEventListener('click', () => {
      this.prevSlide();
      this.resetAutoPlay();
    });

    this.nextBtn.addEventListener('click', () => {
      this.nextSlide();
      this.resetAutoPlay();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.prevSlide();
      if (e.key === 'ArrowRight') this.nextSlide();
    });
  }
}

/**
 * CONTROLADOR DE MODALES
 */
class ModalSystem {
  constructor() {
    this.modals = document.querySelectorAll('.modal-bg');
    this.setupModals();
  }

  setupModals() {
    document.querySelectorAll('.btn-detalle').forEach(btn => {
      btn.addEventListener('click', () => {
        const modalId = btn.dataset.modal;
        this.openModal(modalId);
      });
    });

    document.querySelectorAll('.modal-close').forEach(btn => {
      btn.addEventListener('click', () => {
        const modalId = btn.dataset.close;
        this.closeModal(modalId);
      });
    });

    this.modals.forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('active');
        }
      });
    });
  }

  openModal(id) {
    document.getElementById(id).classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  closeModal(id) {
    document.getElementById(id).classList.remove('active');
    document.body.style.overflow = '';
  }
}

/**
 * INICIALIZACIÓN
 */
document.addEventListener('DOMContentLoaded', () => {
  new Slider();
  new ModalSystem();
});