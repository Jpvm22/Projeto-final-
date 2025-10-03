const slide = document.querySelector('.carousel-slide');
const items = document.querySelectorAll('.carousel-item');

let counter = 0;

function getSlideWidth() {
    // Calcula a largura de UM item e a margem, garantindo que o deslocamento seja exato.
    // Usamos o offsetWidth que inclui padding e border (mas o item só tem margin-right)
    const itemWidth = items[0].offsetWidth; 
    const marginRight = 30; // Correspondente ao CSS
    return itemWidth + marginRight;
}

function moveCarousel() {
    // 1. Incrementa o contador.
    counter++;
    
    // 2. Verifica se o final do carrossel foi atingido (ou o ponto para voltar).
    // Para um carrossel que mostra N itens e tem M itens, o loop deve parar
    // quando o primeiro item do "último grupo" é alcançado. 
    // Como estamos fazendo um loop simples, vamos voltar ao início quando o último item visível passar.
    const maxIndex = items.length; 

    // Se o contador chegar ao total de itens, volta para o item 0
    if (counter >= maxIndex) {
        // Volta instantaneamente para o item 0 para dar a ilusão de loop
        slide.style.transition = 'none'; 
        counter = 0;
    }

    // Pega a largura do item + margem
    const slideWidth = getSlideWidth(); 

    // Aplica a transição
    slide.style.transform = `translateX(${-slideWidth * counter}px)`;

    // Reativa a transição para o próximo movimento
    if (counter === 0) {
        setTimeout(() => {
            slide.style.transition = 'transform 0.5s ease-in-out';
        }, 50); 
    }
}

// 3. Inicializa o carrossel e o intervalo
let carouselInterval = setInterval(moveCarousel, 3000);

// OPCIONAL: Adiciona listeners para garantir a largura correta ao carregar e redimensionar
window.addEventListener('resize', () => {
    // Resetar o contador e a transição ao redimensionar é uma boa prática
    counter = 0;
    slide.style.transition = 'none';
    slide.style.transform = 'translateX(0)';

    // Se quiser que ele continue rodando, reinicie o intervalo:
    clearInterval(carouselInterval);
    carouselInterval = setInterval(moveCarousel, 3000);
});

window.addEventListener('load', () => {
    // Garantir que a largura inicial seja calculada
    slide.style.transform = 'translateX(0)';
});