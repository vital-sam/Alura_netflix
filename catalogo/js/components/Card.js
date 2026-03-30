// Card.js

// Listener global: captura erros enviados pelo YouTube via postMessage
// Erro 153 = dono do vídeo desativou embedding externo
if (!window._ytErrorListenerAdded) {
    window._ytErrorListenerAdded = true;
    window.addEventListener('message', function (event) {
        if (event.origin !== 'https://www.youtube.com') return;
        try {
            const data = JSON.parse(event.data);
            // Erros: 2=inválido, 5=HTML5, 100=não encontrado, 101/150/153=embedding bloqueado
            if (data.event === 'onError') {
                document.querySelectorAll('iframe.playing').forEach(function (iframe) {
                    if (iframe.contentWindow === event.source) {
                        var card = iframe.closest('.movie-card');
                        if (card) {
                            // Esconde o iframe com erro e mostra de volta a imagem do poster
                            iframe.classList.remove('playing');
                            iframe.src = '';
                            var img = card.querySelector('img');
                            if (img) img.classList.remove('playing-video');
                        }
                    }
                });
            }
        } catch (e) { /* ignora mensagens que não são do YouTube */ }
    });
}

function createCard(item) {
    const card = document.createElement('div');
    card.className = 'movie-card';
    if (item.progress) {
        card.classList.add('has-progress');
    }

    const img = document.createElement('img');
    img.src = item.img;
    img.alt = 'Capa do filme';

    const iframe = document.createElement('iframe');
    iframe.frameBorder = "0";
    // enablejsapi=1: ativa os eventos postMessage do YouTube (necessário para receber erros)
    iframe.allow = "autoplay; encrypted-media";

    const videoId = getYouTubeId(item.youtube);

    card.appendChild(iframe);
    card.appendChild(img);

    const ageBadge = getRandomAgeBadge();

    const details = document.createElement('div');
    details.className = 'card-details';
    details.innerHTML = `
        <div class="details-buttons">
            <div class="left-buttons">
                <button class="btn-icon btn-play-icon"><i class="fas fa-play"></i></button>
                ${item.progress
                    ? '<button class="btn-icon"><i class="fas fa-check"></i></button>'
                    : '<button class="btn-icon"><i class="fas fa-plus"></i></button>'
                }
                <button class="btn-icon"><i class="fas fa-thumbs-up"></i></button>
            </div>
            <div class="right-buttons">
                <button class="btn-icon"><i class="fas fa-chevron-down"></i></button>
            </div>
        </div>
        <div class="details-info">
            <span class="match">${getRandomMatchScore()}% relevante</span>
            <span class="age-badge ${ageBadge.class}">${ageBadge.text}</span>
            <span>${getRandomDuration(item.progress)}</span>
            <span class="hd-badge">HD</span>
        </div>
        <div class="details-genres">
            <span>Suspense</span>
            <span>Ficção Científica</span>
        </div>
    `;
    card.appendChild(details);

    if (item.progress) {
        const pbContainer = document.createElement('div');
        pbContainer.className = 'progress-bar-container';
        const pbValue = document.createElement('div');
        pbValue.className = 'progress-value';
        pbValue.style.width = `${item.progress}%`;
        pbContainer.appendChild(pbValue);
        card.appendChild(pbContainer);
    }

    let playTimeout;

    card.addEventListener('mouseenter', () => {
        playTimeout = setTimeout(() => {
            // enablejsapi=1 ativa os eventos postMessage (necessário para detectar erro 153)
            iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&modestbranding=1&loop=1&playlist=${videoId}&enablejsapi=1`;
            iframe.classList.add('playing');
            img.classList.add('playing-video');
        }, 600);
    });

    card.addEventListener('mouseleave', () => {
        clearTimeout(playTimeout);
        iframe.classList.remove('playing');
        img.classList.remove('playing-video');
        iframe.src = '';
    });

    return card;
}