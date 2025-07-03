const testimonialsConfig = {
    data: [
      {
        id: 1,
        rating: 5,
        text: "Increíble servicio y atención al cliente. Superaron todas mis expectativas y entregaron exactamente lo que necesitaba para mi negocio.",
        author: {
          name: "María Rodríguez",
          position: "CEO, TechStart",
          initials: "MR"
        }
      },
      {
        id: 2,
        rating: 5,
        text: "El equipo es muy profesional y siempre está disponible para resolver cualquier duda. Definitivamente recomendaría sus servicios.",
        author: {
          name: "Juan López",
          position: "Fundador, Innovate Co",
          initials: "JL"
        }
      },
      {
        id: 3,
        rating: 5,
        text: "Trabajar con ellos ha sido una experiencia transformadora. Su enfoque en la calidad es incomparable.",
        author: {
          name: "Ana Silva",
          position: "Directora, Digital Plus",
          initials: "AS"
        }
      },
      {
        id: 4,
        rating: 5,
        text: "Resultados excepcionales en tiempo récord. Su metodología de trabajo es muy eficiente y efectiva.",
        author: {
          name: "Carlos Mendoza",
          position: "CTO, FutureTech",
          initials: "CM"
        }
      },
      {
        id: 5,
        rating: 5,
        text: "La mejor inversión que hemos hecho para nuestro negocio. El ROI ha sido excepcional desde el primer mes.",
        author: {
          name: "Laura García",
          position: "Gerente, EcoSolutions",
          initials: "LG"
        }
      },
      {
        id: 6,
        rating: 4,
        text: "Un servicio excepcional que realmente entiende las necesidades del cliente. Muy recomendado para cualquier empresa.",
        author: {
          name: "Roberto Vega",
          position: "Director, SmartBiz",
          initials: "RV"
        }
      }
    ],
    settings: {
      autoplay: false,
      autoplayInterval: 4000,
      cardWidth: 350,
      cardGap: 24,
      siteWidth: 1076,
      initialPosition: 'container-left',
      initialSlide: 0
    }
  };
  
  class TestimonialCard {
    constructor(data) {
      this.data = data;
    }
  
    generateStars(rating) {
      let stars = '';
      for (let i = 0; i < 5; i++) {
        stars += `<span class="testimonials__star">${i < rating ? '★' : '☆'}</span>`;
      }
      return stars;
    }
  
    render() {
      return `
        <div class="testimonials__card" data-testimonial-id="${this.data.id}">
          <div class="testimonials__content">
            <div class="testimonials__rating">
              ${this.generateStars(this.data.rating)}
            </div>
            <p class="testimonials__quote">${this.data.text}</p>
          </div>
          <div class="testimonials__author">
            <div class="testimonials__avatar">${this.data.author.initials}</div>
            <div class="testimonials__author-info">
              <h4 class="testimonials__author-name">${this.data.author.name}</h4>
              <p class="testimonials__author-role">${this.data.author.position}</p>
            </div>
          </div>
        </div>
      `;
    }
  }
  
  class TestimonialsSlider {
    constructor(config) {
      this.config = config;
      this.data = config.data;
      this.settings = config.settings;
      
      // DOM elements
      this.slider = null;
      this.track = null;
      this.prevBtn = null;
      this.nextBtn = null;
      this.dotsContainer = null;
      this.cards = null;
      this.dots = null;
      
      // Transform state
      this.currentTranslateX = 0;
      this.initialTranslateX = 0;
      this.maxTranslateLeft = 0;
      this.maxTranslateRight = 0;
      
      // Slide state
      this.currentSlide = 0;
      this.totalSlides = 0;
      
      // Interaction state
      this.isDragging = false;
      this.startX = 0;
      this.startTranslateX = 0;
      
      this.isInitialized = false;
      
      this.init();
    }
  
    init() {
      this.renderTestimonials();
      this.setupElements();
      this.calculateSlides();
      this.renderDots();
      this.calculateLimits();
      this.setInitialPosition();
      this.bindEvents();
      this.updateControls();
      
      this.isInitialized = true;
      console.log('Testimonials slider initialized with full content access');
    }
  
    renderTestimonials() {
      const track = document.getElementById('testimonialsTrack');
      if (!track) return;
      
      track.innerHTML = '';
      
      this.data.forEach(testimonialData => {
        const testimonial = new TestimonialCard(testimonialData);
        track.innerHTML += testimonial.render();
      });
    }
  
    setupElements() {
      this.slider = document.querySelector('.testimonials__slider');
      this.track = document.getElementById('testimonialsTrack');
      this.prevBtn = document.getElementById('testimonialsBtn-prev');
      this.nextBtn = document.getElementById('testimonialsBtn-next');
      this.dotsContainer = document.getElementById('testimonialsDots');
      this.cards = document.querySelectorAll('.testimonials__card');
    }

    calculateSlides() {
      // Calcular cuántas tarjetas caben por slide según el ancho de pantalla
      const viewportWidth = window.innerWidth;
      const cardTotalWidth = this.settings.cardWidth + this.settings.cardGap;
      
      // Calcular margen del contenedor
      const containerMargin = viewportWidth <= 600 ? 32 : 
                             viewportWidth - this.settings.siteWidth;
      
      // Ancho disponible para tarjetas
      const availableWidth = viewportWidth - containerMargin;
      
      // Cartas por slide (mínimo 1)
      this.cardsPerSlide = Math.max(1, Math.floor(availableWidth / cardTotalWidth));
      
      // Total de slides necesarios
      this.totalSlides = Math.ceil(this.data.length / this.cardsPerSlide);
      
      console.log('Slides calculated:', {
        cardsPerSlide: this.cardsPerSlide,
        totalSlides: this.totalSlides,
        availableWidth: availableWidth,
        cardTotalWidth: cardTotalWidth
      });
    }

    renderDots() {
      // Comentar o eliminar esta función para no generar dots
      return;
      
      /*
      if (!this.dotsContainer) return;
      
      this.dotsContainer.innerHTML = '';
      
      for (let i = 0; i < this.totalSlides; i++) {
        const dot = document.createElement('button');
        dot.className = 'testimonials__dot';
        dot.setAttribute('data-slide', i);
        
        if (i === this.currentSlide) {
          dot.classList.add('testimonials__dot--active');
        }
        
        this.dotsContainer.appendChild(dot);
      }
      
      this.dots = document.querySelectorAll('.testimonials__dot');
      */
    }
  
    calculateLimits() {
      if (!this.slider || !this.track) return;
      
      const sliderWidth = window.innerWidth; // Usar ancho completo de la ventana
      const trackWidth = this.track.scrollWidth;
      
      // Calcular el offset del contenedor
      const containerOffset = window.innerWidth <= 600 ? 16 : (window.innerWidth - this.settings.siteWidth) / 2;
      
      // CONFIGURACIÓN: Margen adicional desde el borde derecho
      // Cambia este valor para controlar cuánto contenido extra puede entrar
      const rightEdgeMargin = 200; // píxeles - aumenta para más espacio, disminuye para menos
      
      // Límite izquierdo: permitir mostrar desde el inicio
      this.maxTranslateLeft = containerOffset;
      
      // Límite derecho: permitir ver todo el contenido más el margen extra
      // Calcular cuánto contenido hay después del viewport
      const totalContentWidth = trackWidth - (containerOffset * 2);
      const visibleWidth = sliderWidth - rightEdgeMargin; // Restar el margen del ancho visible
      
      // El límite derecho debe permitir ver todo el contenido
      this.maxTranslateRight = -(totalContentWidth - visibleWidth + containerOffset);
      
      // Asegurar que podemos ver todo el contenido
      if (totalContentWidth > visibleWidth) {
        // Si el contenido es más ancho que el viewport, necesitamos poder desplazarnos
        this.maxTranslateRight = Math.min(this.maxTranslateRight, -(totalContentWidth - visibleWidth + containerOffset));
      } else {
        // Si el contenido cabe en el viewport, no necesitamos desplazamiento negativo
        this.maxTranslateRight = 0;
      }
      
      console.log('Limits calculated:', {
        maxLeft: this.maxTranslateLeft,
        maxRight: this.maxTranslateRight,
        sliderWidth: sliderWidth,
        trackWidth: trackWidth,
        totalContentWidth: totalContentWidth,
        containerOffset: containerOffset,
        rightEdgeMargin: rightEdgeMargin,
        effectiveVisibleWidth: visibleWidth
      });
    }
  
    setInitialPosition() {
      this.initialTranslateX = 0;
      this.currentTranslateX = this.initialTranslateX;
      this.applyTransform();
    }
  
    applyTransform() {
      if (!this.track) return;
      this.track.style.transform = `translateX(${this.currentTranslateX}px)`;
    }
  
    bindEvents() {
      this.bindWheelEvents();
      this.bindDragEvents();
      this.bindButtonEvents();
      this.bindDotEvents();
    }
  
    bindWheelEvents() {
      if (!this.track) return;
      
      this.track.addEventListener('wheel', (e) => {
        // Solo interceptar scroll horizontal REAL o cuando Shift está presionado
        const hasHorizontalDelta = Math.abs(e.deltaX) > 0;
        const isShiftHorizontal = e.shiftKey && Math.abs(e.deltaY) > 0;
        
        if (hasHorizontalDelta || isShiftHorizontal) {
          e.preventDefault();
          e.stopPropagation();
          
          const delta = hasHorizontalDelta ? e.deltaX : e.deltaY;
          const moveAmount = delta * 1.5;
          
          this.moveBy(-moveAmount);
        }
        
        // Si es solo deltaY (scroll vertical), dejar pasar
        
      }, { passive: false });
    }
  
    bindDragEvents() {
      if (!this.track) return;
      
      let startY = 0;
      let hasMoved = false;
      let isHorizontalDrag = false;
      
      // Mouse events
      this.track.addEventListener('mousedown', (e) => {
        e.preventDefault();
        this.isDragging = true;
        this.startX = e.clientX;
        startY = e.clientY;
        this.startTranslateX = this.currentTranslateX;
        hasMoved = false;
        isHorizontalDrag = false;
        
        this.track.style.transition = 'none';
        this.track.style.cursor = 'grabbing';
      });
      
      document.addEventListener('mousemove', (e) => {
        if (!this.isDragging) return;
        
        const currentX = e.clientX;
        const currentY = e.clientY;
        const diffX = currentX - this.startX;
        const diffY = currentY - startY;
        
        // Determinar dirección al inicio del drag
        if (!hasMoved && (Math.abs(diffX) > 5 || Math.abs(diffY) > 5)) {
          hasMoved = true;
          
          // Si es principalmente horizontal, activar drag horizontal
          if (Math.abs(diffX) > Math.abs(diffY) * 1.5) {
            isHorizontalDrag = true;
          } else {
            // Si es vertical, cancelar drag
            this.isDragging = false;
            this.track.style.transition = 'transform 0.3s ease-out';
            this.track.style.cursor = 'grab';
            return;
          }
        }
        
        if (isHorizontalDrag) {
          e.preventDefault();
          this.moveTo(this.startTranslateX + diffX);
        }
      });
      
      document.addEventListener('mouseup', () => {
        if (!this.isDragging) return;
        
        this.isDragging = false;
        hasMoved = false;
        isHorizontalDrag = false;
        this.track.style.transition = 'transform 0.3s ease-out';
        this.track.style.cursor = 'grab';
        
        setTimeout(() => {
          this.ensureCardVisibility();
          this.updateControls(); // Actualizar controles después del drag
        }, 100);
      });
      
      // Touch events
      this.track.addEventListener('touchstart', (e) => {
        this.isDragging = true;
        this.startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        this.startTranslateX = this.currentTranslateX;
        hasMoved = false;
        isHorizontalDrag = false;
        
        this.track.style.transition = 'none';
      }, { passive: true });
      
      this.track.addEventListener('touchmove', (e) => {
        if (!this.isDragging) return;
        
        const currentX = e.touches[0].clientX;
        const currentY = e.touches[0].clientY;
        const diffX = currentX - this.startX;
        const diffY = currentY - startY;
        
        // Determinar dirección al inicio
        if (!hasMoved && (Math.abs(diffX) > 10 || Math.abs(diffY) > 10)) {
          hasMoved = true;
          
          // Si es principalmente horizontal, activar
          if (Math.abs(diffX) > Math.abs(diffY)) {
            isHorizontalDrag = true;
            e.preventDefault();
          } else {
            // Si es vertical, cancelar y permitir scroll de página
            this.isDragging = false;
            this.track.style.transition = 'transform 0.3s ease-out';
            return;
          }
        }
        
        if (isHorizontalDrag) {
          this.moveTo(this.startTranslateX + diffX);
        }
        
      }, { passive: false });
      
      this.track.addEventListener('touchend', () => {
        this.isDragging = false;
        hasMoved = false;
        isHorizontalDrag = false;
        this.track.style.transition = 'transform 0.3s ease-out';
        
        setTimeout(() => {
          this.ensureCardVisibility();
          this.updateControls(); // Actualizar controles después del touch
        }, 100);
      }, { passive: true });
    }
  
    bindButtonEvents() {
      if (this.prevBtn) {
        this.prevBtn.addEventListener('click', () => this.prevSlide());
      }
      
      if (this.nextBtn) {
        this.nextBtn.addEventListener('click', () => this.nextSlide());
      }
    }

    bindDotEvents() {
      if (!this.dots) return;
      
      this.dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
          this.goToSlide(index);
        });
      });
    }
  
    moveBy(amount) {
      this.moveTo(this.currentTranslateX + amount);
    }
  
    moveTo(newTranslateX) {
      const clampedTranslateX = Math.min(
        this.maxTranslateLeft, 
        Math.max(this.maxTranslateRight, newTranslateX)
      );
      
      this.currentTranslateX = clampedTranslateX;
      this.applyTransform();
      this.updateCurrentSlide();
      this.updateControls();
    }
  
    ensureCardVisibility() {
      if (!this.track || !this.cards.length) return;
      
      const sliderRect = this.slider.getBoundingClientRect();
      const sliderLeft = sliderRect.left;
      const sliderRight = sliderRect.right;
      
      let hasVisibleCard = false;
      let partiallyVisibleCard = false;
      
      this.cards.forEach(card => {
        const cardRect = card.getBoundingClientRect();
        const cardLeft = cardRect.left;
        const cardRight = cardRect.right;
        
        // Una tarjeta está visible si al menos parte de ella está en el viewport
        const isVisible = cardRight > sliderLeft && cardLeft < sliderRight;
        
        if (isVisible) {
          hasVisibleCard = true;
          
          // Considerar como parcialmente visible si está cortada
          if (cardLeft < sliderLeft || cardRight > sliderRight) {
            partiallyVisibleCard = true;
          }
        }
      });
      
      // Solo ajustar si no hay tarjetas visibles
      if (!hasVisibleCard) {
        this.adjustToNearestCard();
      }
    }
  
    adjustToNearestCard() {
      if (!this.cards.length) return;
      
      const sliderCenter = this.slider.clientWidth / 2;
      let nearestCard = null;
      let nearestDistance = Infinity;
      
      this.cards.forEach((card, index) => {
        const cardRect = card.getBoundingClientRect();
        const sliderRect = this.slider.getBoundingClientRect();
        
        const cardCenter = cardRect.left + cardRect.width / 2 - sliderRect.left;
        const distance = Math.abs(cardCenter - sliderCenter);
        
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestCard = { element: card, index };
        }
      });
      
      if (nearestCard) {
        const cardTotalWidth = this.settings.cardWidth + this.settings.cardGap;
        const targetTranslateX = -nearestCard.index * cardTotalWidth;
        
        this.currentTranslateX = Math.min(
          this.maxTranslateLeft,
          Math.max(this.maxTranslateRight, targetTranslateX)
        );
        
        this.applyTransform();
      }
    }
  
    prevSlide() {
      if (this.currentSlide > 0) {
        this.goToSlide(this.currentSlide - 1);
      }
    }
  
    nextSlide() {
      if (this.currentSlide < this.totalSlides - 1) {
        this.goToSlide(this.currentSlide + 1);
      }
    }

    goToSlide(slideIndex) {
      if (slideIndex < 0 || slideIndex >= this.totalSlides) return;
      
      this.currentSlide = slideIndex;
      
      // Calcular la posición del slide
      const cardTotalWidth = this.settings.cardWidth + this.settings.cardGap;
      const cardsToMove = slideIndex * this.cardsPerSlide;
      const targetTranslateX = -cardsToMove * cardTotalWidth;
      
      this.moveTo(targetTranslateX);
    }

    updateCurrentSlide() {
      // Calcular el slide actual basado en la posición
      const cardTotalWidth = this.settings.cardWidth + this.settings.cardGap;
      const movedCards = Math.abs(this.currentTranslateX) / cardTotalWidth;
      const newSlide = Math.round(movedCards / this.cardsPerSlide);
      
      if (newSlide !== this.currentSlide && newSlide >= 0 && newSlide < this.totalSlides) {
        this.currentSlide = newSlide;
        this.updateDots();
      }
    }

    updateDots() {
      if (!this.dots) return;
      
      this.dots.forEach((dot, index) => {
        dot.classList.toggle('testimonials__dot--active', index === this.currentSlide);
      });
    }

    updateControls() {
      // Actualizar estado de botones basado en la posición actual
      if (this.prevBtn) {
        // Desactivar botón izquierdo si estamos en la posición inicial o más a la derecha
        this.prevBtn.disabled = this.currentTranslateX >= this.maxTranslateLeft - 10; // -10 para tolerancia
      }
      
      if (this.nextBtn) {
        // Desactivar botón derecho si estamos en el límite derecho (no hay más contenido)
        this.nextBtn.disabled = this.currentTranslateX <= this.maxTranslateRight + 10; // +10 para tolerancia
      }
      
      // Actualizar dots si existen
      this.updateDots();
      
      console.log('Controls updated:', {
        currentTranslateX: this.currentTranslateX,
        maxTranslateLeft: this.maxTranslateLeft,
        maxTranslateRight: this.maxTranslateRight,
        prevDisabled: this.prevBtn?.disabled,
        nextDisabled: this.nextBtn?.disabled
      });
    }
  
    goToInitialPosition() {
      this.moveTo(this.initialTranslateX);
    }
  
    updateData(newData) {
      this.data = newData;
      this.currentSlide = 0; // Reset al primer slide
      this.renderTestimonials();
      this.setupElements();
      this.calculateSlides();
      this.renderDots();
      this.calculateLimits();
      this.setInitialPosition();
      this.updateControls();
      setTimeout(() => {
        this.ensureCardVisibility();
      }, 100);
    }
  
    addTestimonial(testimonialData) {
      this.data.push(testimonialData);
      this.updateData(this.data);
    }
  
    removeTestimonial(id) {
      this.data = this.data.filter(item => item.id !== id);
      this.updateData(this.data);
    }
  
    destroy() {
      console.log('Testimonials slider destroyed');
    }
  }
  
  // Inicialización
  document.addEventListener('DOMContentLoaded', () => {
    window.testimonialsSlider = new TestimonialsSlider(testimonialsConfig);
  });
  
  // Resize
  window.addEventListener('resize', () => {
    if (window.testimonialsSlider?.isInitialized) {
      window.testimonialsSlider.calculateSlides();
      window.testimonialsSlider.renderDots();
      window.testimonialsSlider.calculateLimits();
      window.testimonialsSlider.ensureCardVisibility();
      window.testimonialsSlider.updateControls();
    }
  });
  
  // API pública
  window.TestimonialsAPI = {
    getInstance: () => window.testimonialsSlider,
    addTestimonial: (testimonial) => window.testimonialsSlider?.addTestimonial(testimonial),
    removeTestimonial: (id) => window.testimonialsSlider?.removeTestimonial(id),
    updateData: (newData) => window.testimonialsSlider?.updateData(newData),
    goToInitialPosition: () => window.testimonialsSlider?.goToInitialPosition(),
    moveBy: (amount) => window.testimonialsSlider?.moveBy(amount),
    moveTo: (position) => window.testimonialsSlider?.moveTo(position),
    goToSlide: (index) => window.testimonialsSlider?.goToSlide(index),
    nextSlide: () => window.testimonialsSlider?.nextSlide(),
    prevSlide: () => window.testimonialsSlider?.prevSlide(),
    getCurrentSlide: () => window.testimonialsSlider?.currentSlide,
    getTotalSlides: () => window.testimonialsSlider?.totalSlides
  };