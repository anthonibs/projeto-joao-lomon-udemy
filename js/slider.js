// PORTIFOLIO SLIDER

// DECLARANDO VARIÁVEIS DO SLIDER
var sliderContaniner = document.querySelector('.jl-slider-container');
var sliderList = document.querySelector('.jl-slider-list');
var sliderItem = document.querySelectorAll('.jl-portfolio-item');
const sliderTotalItems = sliderItem.length;
var sliderListWidth = null;
var prevItem = document.querySelector('.jl-item-prev');
var nextItem = document.querySelector('.jl-item-next');
var sliderPos = 0;
var currentSlide = document.querySelector('.jl-current-slide');
var totalSlide = document.querySelector('.jl-total-slide');
var currentCounter = 1;
var navItems = document.querySelectorAll('.jl-item-navigator a');
var navCounter = document.querySelector('.jl-navigator-counter span');


// CAPTURANDO LARGURAS INDIVIDUAIS
var containerWidth = sliderContaniner.parentElement.offsetWidth;


// PASSANDO LARGURAS DINÂMICAS
sliderContaniner.style.width = containerWidth + 'px';

for(var p = 0; p < sliderItem.length; p++) {
    sliderItem[p].style.width = containerWidth + 'px';

    var sliderItemWidth = sliderItem[p].offsetWidth;

    sliderListWidth += sliderItemWidth;
}

sliderList.style.width = sliderListWidth + 'px';

//INÍCIO FAZENDO ANIMAÇÃO DO SLIDER ONCLICK


//HANDLERS


//NEXT SLIDER ANIMAÇÃO
var nextSliderAnim = function () {
        var lastItem = sliderListWidth - containerWidth;
         
        if ((-1*(sliderPos) === lastItem)) {
             return;
         }
     
         sliderPos -= containerWidth;
         anime({
            targets: sliderList,
            translateX: sliderPos,
            easing: 'cubicBezier(0,1.01,.32,1)'
        }); 
     };


//PREV SLIDER ANIMAÇÃO
var prevSliderAnim = function () {
    
    if (sliderPos === 0) {
        return;
    }

    sliderPos += containerWidth;
    anime({
        targets: sliderList,
        translateX: sliderPos,
        easing: 'cubicBezier(0,1.01,.32,1)'
    });
    
}

//COUNTER FORMATTER formatação da numeração para usar o zero na frente até 9 a partir do 10 fica sem
var counterFomatter = function (n) {
    if(n < 10) {
        return '0'+ n;
    }else {
        return n;
    }
}

//COUNTER ADD numeração quando passa o slider para frente
var counterAdd = function (){
    if ((currentCounter >=0) && (currentCounter < sliderTotalItems)) {
        currentCounter++;
        currentSlide.innerHTML = counterFomatter(currentCounter);
        navCounter.innerHTML = counterFomatter(currentCounter);
    }  
}

//COUNTER REMOVE diminu a numeração quando o slider for maior que 2
var counterRemove = function (){
    if ((currentCounter > 1) && (currentCounter <= sliderTotalItems)) {
        currentCounter--;
        currentSlide.innerHTML = counterFomatter(currentCounter);
        navCounter.innerHTML = counterFomatter(currentCounter);
    }  
}

//Set Active Nav
var setActiveNav = function () {

    for (var nv = 0; nv < navItems.length; nv++) {

        let myNavNum = parseInt(navItems[nv].getAttribute('data-nav'));

        if (myNavNum === currentCounter) {
            navItems[nv].classList.add('jl-item-active');
            
            anime({
                targets: navItems[nv],
                width: 90
            });
        }
    }
}


//Set Active Slide
var setActiveSlide = function () {

    for (var sld = 0; sld < sliderItem.length; sld++) {

        let mySlideNum = parseInt(sliderItem[sld].getAttribute('data-slide'));

        if (mySlideNum === currentCounter) {
            sliderItem[sld].classList.add('jl-slide-active');
            sliderItem[sld].querySelector('.jl-portfolio-item-box').classList.add('jl-scale-right');
            sliderItem[sld].querySelector('.jl-portfolio-item-thumb img').classList.add('jl-scale-up');
            sliderItem[sld].querySelector('.jl-portfolio-item-info').classList.add('jl-fade-from-left');
        }
    }
}

var changeActive = function () {
    for (var rm = 0; rm < navItems.length; rm++) {
        navItems[rm].classList.remove('jl-item-active');
        
        anime({
            targets: navItems[rm],
            width: 20
        });
    }

    for (var rms = 0; rms < sliderItem.length; rms++) {
        sliderItem[rms].classList.remove('jl-slide-active');
        sliderItem[rms].querySelector('.jl-portfolio-item-box').classList.remove('jl-scale-right');
        sliderItem[rms].querySelector('.jl-portfolio-item-thumb img').classList.remove('jl-scale-up');
        sliderItem[rms].querySelector('.jl-portfolio-item-info').classList.remove('jl-fade-from-left');
    }

    setActiveNav();
    setActiveSlide();

}

//ACTIONS 
totalSlide.innerHTML = counterFomatter(sliderTotalItems);

nextItem.addEventListener('click', function (){
    nextSliderAnim();
    counterAdd();
    changeActive();

});

prevItem.addEventListener('click', function (){
    prevSliderAnim();
    counterRemove();
    changeActive();

 });

