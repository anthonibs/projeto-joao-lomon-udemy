var overlay = document.querySelector('.jl-overlay');
var frameImage = document.querySelector('.jl-gallery-frame-image');
var frameContainer = document.querySelector('.jl-gallery-frame-container');
var galleryImagens = document.querySelectorAll('.jl-thumb-box');
var closeGallery = document.querySelectorAll('.jl-toggle-gallery');
var btnNext = document.querySelector('.jl-item-next');
var btnPrev = document.querySelector('.jl-item-prev');
var currCounter = document.querySelector('.jl-current-slide');
var totalCounter = document.querySelector('.jl-total-slide');
var skeletonLoading = document.querySelector('.jl-skeleton-loading');

// CALCULANDO A ALTURA QUE SOBROU POR CONTA DO POSITION NEGATIVO
var postGallery = document.querySelector('.jl-post-gallery');
var postGalleryHeight = postGallery.clientHeight;
postGallery.style.height = (postGalleryHeight - 270) + 'px';

// COUNTER FORMATER
var counterFormatter = function (n) {
    if (n < 10) {
        return '0' + n;
    }else {
        return n;
    }
}

totalCounter.innerHTML = counterFormatter(galleryImagens.length);

// SKELETON LOADING
const skelotinAnim = function(imagem) {
    var myImage = new Image();
            myImage.src = imagem;
            myImage.addEventListener('load', function() {
                skeletonLoading.classList.add('jl-fade-out');
                setTimeout(function() {
                    skeletonLoading.style.display = 'none';
                }, 2000);
            });
}

// CLICAR NAS IMAGENS DA TABELA E PARECER DENTRO DE UM CELULAR
const getImageSrc = function () {
    for (var i = 0; i < galleryImagens.length; i++) {
        galleryImagens[i].addEventListener('click', function() {
            var imageSrc = this.querySelector('img').getAttribute('data-src');
            var itemNum = this.querySelector('img').getAttribute('data-item');

            skeletonLoading.style.display = 'flex';

            frameImage.setAttribute('src', imageSrc);
            frameImage.setAttribute('data-index', itemNum);
            overlay.classList.add('jl-is-open');
            frameContainer.classList.add('jl-is-open');
            currCounter.innerHTML = counterFormatter(itemNum);

            skelotinAnim(imageSrc);

        });
    }
}
getImageSrc ();

// FECHAR MODAL CLICANDO NO X OU FORA DA IMAGEM
for (var c = 0; c < closeGallery.length; c++) {
    closeGallery[c].addEventListener('click', function () {
        overlay.classList.remove('jl-is-open');
        frameContainer.classList.remove('jl-is-open');
    });
}

// PASSA PARA PROXIMA IMAGEM
const nextItem = function () {
    
    // Idinfificamos o item autal no frame
    var currItemNum = frameImage.getAttribute('data-index');

    //  Definimos o número do próximo item
    var nextItemNum = parseInt(currItemNum) + 1;
    // Fazemos o loop e identificamos qual item faz match com o proximo numero
    for (var nt = 0; nt < galleryImagens.length; nt++) {
        var item = galleryImagens[nt].querySelector('img');
        var itemNum = parseInt(item.getAttribute('data-item'));

        if(itemNum === nextItemNum) {
            // Capturamos o data-src
            var nextSrc = item.getAttribute('data-src');
            var nextIndex = item.getAttribute('data-item');

            skeletonLoading.style.display = 'flex';

            // Passamos o data-src para a tag de img no frame
            frameImage.setAttribute('src', nextSrc);
            frameImage.setAttribute('data-index', nextIndex);

            currCounter.innerHTML = counterFormatter(nextIndex);

            skelotinAnim(nextSrc);
        }
    }
}

// PASSA PARA VOLTAR PARA IMAGEM ANTERIOR
const prevItem = function () {
    
    // Idinfificamos o item autal no frame
    var currItemNum = frameImage.getAttribute('data-index');

    //  Definimos o número do próximo item
    var prevItemNum = parseInt(currItemNum) - 1;
    // Fazemos o loop e identificamos qual item faz match com o proximo numero
    for (var pv = 0; pv < galleryImagens.length; pv++) {
        var item = galleryImagens[pv].querySelector('img');
        var itemNum = parseInt(item.getAttribute('data-item'))

        if(itemNum === prevItemNum) {
            // Capturamos o data-src
            var prevSrc = item.getAttribute('data-src');
            var prevIndex = item.getAttribute('data-item');

            skeletonLoading.style.display = 'flex';
            
            // Passamos o data-src para a tag de img no frame
            frameImage.setAttribute('src', prevSrc);
            frameImage.setAttribute('data-index', prevIndex);

            currCounter.innerHTML = counterFormatter(prevIndex);
           
            skelotinAnim(prevSrc);
        }
    }

}

// CLIQUE EVENTOS NEXT E PREV
btnNext.addEventListener('click', function () {
    nextItem();  
})

btnPrev.addEventListener('click', function () {
    prevItem();  
})