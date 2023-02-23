let createCarousel = function () {

  //завожу все переменные которые понадобятся
  let slidesItem = document.querySelectorAll('.slides__item');
  let nextbtn = document.querySelector('.controls__item.controls__item--next');
  let prevbtn = document.querySelector('.controls__item.controls__item--prev');
  let playbtn = document.querySelector('.controls__item.controls__item--pause');
  let indicators = document.querySelector('.indicators');
  let indicatorItem = document.querySelectorAll('.indicators__item');

  let i = 0;
  let interval = 5000;
  let isPause = false

  let slidesCount = slidesItem.length;

  //функция переключения классов
  function move() {
    slidesItem[i].classList.toggle('active');
    indicatorItem[i].classList.toggle('active');
  }

  //основная функция движения
  function slider() {
    if (isPause === false) {
      move();
      i = (i + 1 + slidesCount) % slidesCount;
      move();
      console.log(`next ${i}`);

    } else {
      return 'paused'
    }
  }

  //интервал с идентификатором который можно будет выключить и включить снова что бы избежать повторного срабатывания slider при переходе на другие слайды
  let iteration = setInterval(slider, interval);

  //функция для события кнопки next
  function next() {
    clearInterval(iteration);
    slider();
    setTimeout(iteration, interval);
  }

  //функция для события кнопки prev
  function prev() {
    clearInterval(iteration);
    move();
    i = (i - 1 + slidesCount) % slidesCount;
    move();
    setTimeout(iteration, interval);
    console.log(`prev ${i}`);
  }

  //функция паузы для события на кпопку pause
  function playPause(e = playbtn) {
    if (e.target) {
      isPause = isPause === true ? false : true;
      playbtn.firstChild.classList.toggle('active');
      console.log(`isPause = ${isPause}`);
    }
  }


  //события
  prevbtn.addEventListener('click', prev)
  nextbtn.addEventListener('click', next)
  playbtn.addEventListener('click', playPause)

  //событие перехода по индикаторам
  indicators.addEventListener('click', function (e) {
    clearInterval(iteration);
    if (e.target.tagName === 'SPAN') {

      let number = parseInt(e.target.getAttribute('data-slide-to'));
      console.log(number, 50);
      if (i != number) {
        move();
        i = number;
        move();
        console.log(`indicator ${i}`);
      }
    }
    setTimeout(iteration, interval);
  })

}

createCarousel()
