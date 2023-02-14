console.log('Sample JavaScript #5 HW #17');

function createCarousel(slidesCount = 5) {
  //Завожу все переменные из HTML документа какие могут понадобиться
  let slides = document.querySelector('.slides');
  let slidesItem = document.querySelectorAll('.slides__item');
  let controls = document.querySelector('.controls');
  let controlItem = document.querySelectorAll('.control');
  let nextbtn = document.querySelector('.controls__item.controls__next');
  let prevbtn = document.querySelector('.controls__item.controls__prev');
  let playbtn = document.querySelector('.controls__item.controls__pause');
  let indicators = document.querySelector('.indicators');
  let indicatorItem = document.querySelectorAll('.indicators__item');

  let i = 0;
  let isPause = false;
  let interval = 5000;

  slidesCount = slidesItem.length;

  function move() {
    slidesItem[i].classList.toggle('active');
    indicatorItem[i].classList.toggle('active');
  }

  function slider() {
    move();
    i = (i + 1 + slidesCount) % slidesCount;
    move();
    console.log(`next ${i}`);
  }

  let iteration = setInterval(slider, interval);

  function next() {
    clearInterval(iteration);
    slider()
    setTimeout(iteration, interval);
  }

  function prev() {
    move();
    i = (i - 1 + slidesCount) % slidesCount;
    move();
    console.log(`prev ${i}`);
  }

  //функция паузы для события на кпопку паузы
  function playpause(e) {
    if (e.target) {
      clearInterval(iteration);
      playbtn.firstChild.classList.toggle('active')
      console.log(`isPause=${isPause}`);

    } else {
      setTimeout(iteration, interval);
      playbtn.firstChild.classList.toggle('active')
      console.log(`isPause=${isPause}`);
    }
  }


  //события
  prevbtn.addEventListener('click', prev)
  nextbtn.addEventListener('click', next)
  playbtn.addEventListener('click', playpause)
  //событие перехода по индикаторам, после перехода по правильному слайду обнуляет i
  indicators.addEventListener('click', function (e) {
    if (e.target.tagName === 'SPAN') {
      let number = e.target.getAttribute('data-slide-to');

      if (i != number) {
        move();
        i = number;
        move();
        console.log(`indicator ${i}`);
      }
    }
  })
  // отладить код выше, привязать индикаторы и события на кнопки. Описать стили
  // P.S короче некст и превойс подумать мб можно сократить внутри вместо кучи строк функцию мув, но сначала отладить.
  // slidesItem[i + slidesCount % slidesCount + 1]; - вот эту строчку переделать в i = i + slidesCount %. ..... везде

}

createCarousel(4);


//------------------------
