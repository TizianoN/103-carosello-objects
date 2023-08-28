const slides = [
  {
    title: 'Slide 1',
    text: 'Lorem ipsum...',
    path: '01.jpg',
  },
  {
    title: 'Slide 2',
    text: 'Lorem ipsum...',
    path: '02.png',
  },
  {
    title: 'Slide 3',
    text: 'Lorem ipsum...',
    path: '03.jpg',
  },
  {
    title: 'Slide 4',
    text: 'Lorem ipsum...',
    path: '04.jpg',
  },
  {
    title: 'Slide 5',
    text: 'Lorem ipsum...',
    path: '05.jpg',
  },
];

// ### GENERO HTML

// * RECUPERO GLI ELEMENTI DI INTERESSE
const slidesContainerElement = document.getElementById('slides-container');
const thumbsContainerElement = document.getElementById('thumbnails-container');

// * SETTO IL CONTATORE DELLE SLIDE
let activeSlide = 0;

// * PER OGNI SLIDE
slides.forEach((slide, index) => {
  // * CREO UN NODO HTML E LO FORMATTO
  const slideElement = document.createElement('div');
  slideElement.classList.add('slide');

  // * AGGIUNGO LA CLASSE ACTIVE (SE E' LA PRIMA)
  if (index == activeSlide) slideElement.classList.add('active');

  // * GENERO L'HTML INTERNO
  slideElement.innerHTML = `
    <img src="./img/${slide.path}" alt="" />
    <div class="slide-text">
      <h2>${slide.title}</h2>
      <p>${slide.text}</p>
    </div>`;

  // * AGGIUNGO IL NODO "slideElement" ALL'OGGETTO SLIDE
  slide.slideNode = slideElement;

  // * CREO LA MINIATURA
  const thumbnailElement = document.createElement('div');
  thumbnailElement.classList.add('thumb');
  thumbnailElement.innerHTML = `<img src="./img/${slide.path}" alt="" />`;
  thumbnailElement.setAttribute('data-index', index);

  // * AGGIUNGO LA CLASSE ACTIVE (SE E' LA PRIMA)
  if (index == activeSlide) thumbnailElement.classList.add('active');

  // * GESTISCO IL CLICK SULLA MINIATURA
  thumbnailElement.addEventListener('click', function () {
    // * RECUPERO L'INDICE CLICCATO
    const index = this.getAttribute('data-index');

    // * ATTIVO LA SLIDE CORRISPONDENTE ALL'INDICE RECUPERATO
    goToSlide(index);
  });

  // * AGGIUNGO IL NODO "thumbnailElement" ALL'OGGETTO SLIDE
  slide.thumbNode = thumbnailElement;

  // * LA SLIDE E LA MINIATURA NEI RELATIVI CONTAINER
  slidesContainerElement.append(slideElement);
  thumbsContainerElement.append(thumbnailElement);
});

// ### NEXT & PREV
const nextButton = document.getElementById('go-next');
const prevButton = document.getElementById('go-prev');

// * FUNZIONE CHE GESTISCE L'AVANZAMENTO ALLA PROSSIMA SLIDE
function goNext() {
  // * CONTROLLO CHE LA PROSSIMA SLIDE SIA NELL'INTERVALLO DELL'ARRAY
  let nextIndex = activeSlide + 1;
  if (nextIndex >= slides.length) nextIndex = 0;

  // * VADO ALLA SLIDE SELEZIONATA
  goToSlide(nextIndex);
}

// * FUNZIONE CHE GESTISCE L'AVANZAMENTO ALLA SLIDE PRECEDENTE
function goPrev() {
  // * CONTROLLO CHE LA SLIDE PRECEDDENTE SIA NELL'INTERVALLO DELL'ARRAY
  let prevIndex = activeSlide - 1;
  if (prevIndex < 0) prevIndex = slides.length - 1;

  // * VADO ALLA SLIDE SELEZIONATA
  goToSlide(prevIndex);
}

// * FUNZIONE CHE ATTIVA UNA SLIDE DATO IL SUO INDICE
function goToSlide(index) {
  // * RIMUOVO LE CLASSI ACTIVE DA SLIDE E MINIATURA CORRENTI
  const oldSlide = slides[activeSlide].slideNode;
  const oldSlideThumb = slides[activeSlide].thumbNode;
  oldSlide.classList.remove('active');
  oldSlideThumb.classList.remove('active');

  // * SETTO LA NUOVA SLIDE ATTIVA
  activeSlide = index;

  // * SETTO LE CLASSI ACTIVE SU NUOVE SLIDE E MINIATURA CORRENTI
  const newSlide = slides[activeSlide].slideNode;
  const newSlideThumb = slides[activeSlide].thumbNode;
  newSlide.classList.add('active');
  newSlideThumb.classList.add('active');
}

// * GESTISCO I CLICK SUI PULSANTI NEXT E PREV
nextButton.addEventListener('click', goNext);
prevButton.addEventListener('click', goPrev);

// ### AUTOPLAY
const startAutoplayButton = document.getElementById('start-autoplay');
const stopAutoplayButton = document.getElementById('stop-autoplay');
const reverseAutoplayButton = document.getElementById('reverse-autoplay');

// * SETTO LE VARIABILI PER GESTIRE L'AUTOPLAY
let autoplayInterval = false;
let autoplayForward = true;

// * ATTIVO L'INTERVAL IN BASE ALLA DIRECTION DELL'AUTOPLAY
function setAutoplay() {
  if (!autoplayInterval) {
    if (autoplayForward) {
      autoplayInterval = setInterval(goNext, 1000);
    } else {
      autoplayInterval = setInterval(goPrev, 1000);
    }
  }
}

// * CLEARO L'INTERVAL
function stopAutoplay() {
  if (autoplayInterval) {
    clearInterval(autoplayInterval);
    autoplayInterval = false;
  }
}

// * INVERTO LA DIRECTION
function reverseAutoplay() {
  stopAutoplay();
  autoplayForward = !autoplayForward;
  setAutoplay();
}

// * GESTISCO I CLICK SUI PULSANTI AUTOPLAY
startAutoplayButton.addEventListener('click', setAutoplay);
stopAutoplayButton.addEventListener('click', stopAutoplay);
reverseAutoplayButton.addEventListener('click', reverseAutoplay);
