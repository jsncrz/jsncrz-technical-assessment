
function createFooterDrawer() {
    const drawer = document.createElement('div');
    drawer.className = 'footer-drawer';
    drawer.id = 'footerDrawer';

    const header = document.createElement('div');
    header.className = 'drawer-header';
    header.id = 'drawerHeader';
    header.setAttribute('tabindex', '0');
    header.setAttribute('role', 'button');
    header.setAttribute('aria-expanded', 'false');
    header.innerHTML = `
            <svg class="chevron" id="chevron" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>`;

    const title = document.createElement('span');
    title.className = 'drawer-title';
    title.textContent = 'Sticky Drawer';
    const chevron = header.querySelector('.chevron');
    
    const paginationControls = document.createElement('div');
    paginationControls.className = 'pagination-controls';
    paginationControls.id = 'paginationControls';

    const prevArrow = document.createElement('button');
    prevArrow.className = 'pagination-arrow';
    prevArrow.id = 'prevArrow';
    prevArrow.innerHTML = '‹';
    prevArrow.setAttribute('aria-label', 'Previous slides');

    const paginationInfo = document.createElement('div');
    paginationInfo.className = 'pagination-info';
    paginationInfo.id = 'paginationInfo';
    paginationInfo.textContent = '1 / 1';

    const nextArrow = document.createElement('button');
    nextArrow.className = 'pagination-arrow';
    nextArrow.id = 'nextArrow';
    nextArrow.innerHTML = '›';
    nextArrow.setAttribute('aria-label', 'Next slides');

    paginationControls.appendChild(prevArrow);
    paginationControls.appendChild(paginationInfo);
    paginationControls.appendChild(nextArrow);
    header.prepend(paginationControls);
    header.prepend(title);

    const content = document.createElement('div');
    content.className = 'drawer-content';
    content.id = 'drawerContent';

    const contentInner = document.createElement('div');
    contentInner.className = 'content-inner';

    content.appendChild(contentInner);
    drawer.appendChild(header);
    drawer.appendChild(content);

    document.body.appendChild(drawer);


    return {
        drawer,
        header,
        content,
        chevron,
        prevArrow: prevArrow,
        nextArrow: nextArrow,
        paginationInfo: paginationInfo
    };
}

async function generateSlideFromPokemon(slide, grid) {
    const pokemon = await getRandomPokemon(slide);
    const card = document.createElement('div');
    card.className = 'drawer-card';
    const flipper = document.createElement('div');
    flipper.className = 'flipper';

    const front = document.createElement('div');
    front.className = 'card-front';
    const back = document.createElement('div');
    back.className = 'card-back';

    const cardHeader = document.createElement('div');
    cardHeader.className = 'card-header';

    const cardHeaderBanner = document.createElement('div');
    cardHeaderBanner.className = 'card-header-banner';
    cardHeaderBanner.innerHTML = `<h4>${pokemon.name}</h4>`;
    cardHeader.appendChild(cardHeaderBanner);

    const cardHeaderContent = document.createElement('div');
    cardHeaderContent.className = 'card-header-text';
    cardHeaderContent.innerHTML = `<h6>#${pokemon.id}</h6>`;
    cardHeader.appendChild(cardHeaderContent);
    front.appendChild(cardHeader);
    back.appendChild(cardHeader.cloneNode(true));

    // Front details and back details

    const cardBodyFront = document.createElement('div');
    cardBodyFront.className = 'card-body';
    const cardBodyImage = document.createElement('div');
    cardBodyImage.className = 'card-body-image';
    cardBodyImage.innerHTML = `<img src="${pokemon.sprites.other.home.front_default}" alt="${pokemon.name}">`;
    cardBodyFront.appendChild(cardBodyImage);

    const cardDetailsFrontDiv = document.createElement('div');
    cardDetailsFrontDiv.className = 'card-details';
    const pokemonDetailsDiv = document.createElement('div');
    pokemonDetailsDiv.className = 'card-body-pokemon-details';
    pokemonDetailsDiv.innerHTML = `<p> <b>Height:</b> ${pokemon.height / 10.00} m</p> <p> <b>Weight:</b> ${pokemon.weight / 10.00} kg</p>`;
    cardDetailsFrontDiv.appendChild(pokemonDetailsDiv);
    const pokemonAbilitiesDiv = document.createElement('div');
    pokemonAbilitiesDiv.className = 'card-body-abilities';
    pokemonAbilitiesDiv.innerHTML = `<h4>Abilities</h4>`;
    const abilityList = document.createElement('ul');
    for (i = 0; i < pokemon.abilities.length && i < 4; i++) {
        const cardBodyAbility = document.createElement('li');
        let abilityName = pokemon.abilities[i].ability.name;
        cardBodyAbility.textContent = abilityName.replace('-', ' ');
        abilityList.appendChild(cardBodyAbility);
    }
    pokemonAbilitiesDiv.append(abilityList);
    cardDetailsFrontDiv.appendChild(pokemonAbilitiesDiv);
    cardBodyFront.appendChild(cardDetailsFrontDiv);
    front.appendChild(cardBodyFront);

    const cardBodyBack = document.createElement('div');
    cardBodyBack.className = 'card-body';
    const cardBodyImageShiny = document.createElement('div');
    cardBodyImageShiny.className = 'card-body-image';
    cardBodyImageShiny.innerHTML = `<img src="${pokemon.sprites.other.home.front_shiny}" alt="${pokemon.name}">`;
    cardBodyBack.appendChild(cardBodyImageShiny);

    const cardDetailsBackDiv = document.createElement('div');
    cardDetailsBackDiv.className = 'card-details';
    const pokemonMovesDiv = document.createElement('div');
    pokemonMovesDiv.className = 'card-body-moves';
    pokemonMovesDiv.innerHTML = `<h4>Moves</h4>`;
    const moveList = document.createElement('ul');
    for (i = 0; i < pokemon.moves.length && i < 8; i++) {
        const pokemonMovesItem = document.createElement('li');
        let moveName = pokemon.moves[i].move.name;
        pokemonMovesItem.textContent = moveName.replace('-', ' ');
        moveList.appendChild(pokemonMovesItem);
    }
    pokemonMovesDiv.append(moveList);
    cardDetailsBackDiv.appendChild(pokemonMovesDiv);
    cardBodyBack.appendChild(cardDetailsBackDiv);
    back.appendChild(cardBodyBack);

    const cardFooterFront = document.createElement('div');
    cardFooterFront.className = 'card-footer';
    const cardButtonFront = document.createElement('button');
    cardButtonFront.className = 'flip-btn';
    cardButtonFront.textContent = 'Show Moves'
    cardFooterFront.appendChild(cardButtonFront);
    front.appendChild(cardFooterFront);

    cardButtonFront.addEventListener('click', () => {
        flipper.classList.toggle('flipped');
    });

    const cardFooterBack = document.createElement('div');
    cardFooterBack.className = 'card-footer';
    const cardButtonBack = document.createElement('button');
    cardButtonBack.className = 'flip-btn';
    cardButtonBack.textContent = 'Show Abilities'
    cardFooterBack.appendChild(cardButtonBack);
    back.appendChild(cardFooterBack);

    cardButtonBack.addEventListener('click', () => {
        flipper.classList.toggle('flipped');
    });

    flipper.appendChild(front);
    flipper.appendChild(back);
    card.appendChild(flipper);
    grid.appendChild(card);
}

async function initializeDrawer() {
    let isExpanded = false;
    let currentPage = 0;
    let cardsPerPage = 4;
    let totalPages = 0;
    let totalCards = 0;
    let isDragging = false;
    let startX = 0;
    let startTransformX = 0;
    let currentTransformX = 0;
    let dragThreshold = 50;

    const elements = createFooterDrawer();
    const modalBackdrop = document.createElement('div');
    modalBackdrop.id = 'drawer-backdrop';
    document.body.appendChild(modalBackdrop);

    // Create cards grid
    let contentInner = document.querySelector('.content-inner');
    const grid = document.createElement('div');
    grid.className = 'drawer-grid';
    let slides = new Set();
    for (i = 0; i < Math.floor(Math.random() * 5) + 6; i++) {
        slides.add(Math.floor(Math.random() * 1025) + 1);
    }
    totalCards = slides.size;
    for (const slide of slides) {
        await generateSlideFromPokemon(slide, grid);
    }
    contentInner.appendChild(grid);

    // Drag functionalities
    function getPointerX(event) {
        return event.type.includes('touch') ? event.touches[0]?.clientX || event.changedTouches[0]?.clientX : event.clientX;
    }

    function startDrag(event) {
        if (!isExpanded) return;

        isDragging = true;
        hasMoved = false;
        startX = getPointerX(event);
        startTransformX = currentTransformX;
        grid.classList.add('dragging');
    }

    function handleDrag(event) {
        if (!isDragging || !isExpanded) return;

        const currentX = getPointerX(event);
        const deltaX = currentX - startX;

        if (!hasMoved && Math.abs(deltaX) > 5) {
            hasMoved = true;
            event.preventDefault();
        }

        if (!hasMoved) return;

        const newTransformX = startTransformX + deltaX;

        let resistedDeltaX = deltaX;
        const cardWidth = grid.children[0]?.offsetWidth || 0;
        const gap = 24;
        const maxTranslateX = 0;
        const minTranslateX = -((totalPages - 1) * (cardWidth * cardsPerPage + gap * (cardsPerPage - 1)));

        if (newTransformX > maxTranslateX) {
            resistedDeltaX = deltaX * 0.3;
        } else if (newTransformX < minTranslateX) {
            resistedDeltaX = deltaX * 0.3;
        }

        updateCardPosition(resistedDeltaX);
        event.preventDefault();
    }

    function endDrag(event) {
        if (!isDragging || !isExpanded) return;

        isDragging = false;
        grid.classList.remove('dragging');
        if (hasMoved) {
            const endX = getPointerX(event);
            const deltaX = endX - startX;

            let newPage = currentPage;

            if (Math.abs(deltaX) > dragThreshold) {
                if (deltaX > 0 && currentPage > 0) {
                    newPage = currentPage - 1;
                } else if (deltaX < 0 && currentPage < totalPages - 1) {
                    newPage = currentPage + 1;
                }
            }
            goToPage(newPage);
        }

        hasMoved = false;
    }

    // Darg events
    grid.addEventListener('mousedown', startDrag);
    document.addEventListener('mousemove', handleDrag);
    document.addEventListener('mouseup', endDrag);

    // Touch events for mobile
    grid.addEventListener('touchstart', startDrag, { passive: false });
    document.addEventListener('touchmove', handleDrag, { passive: false });
    document.addEventListener('touchend', endDrag);

    // Prevent context menu on long press
    grid.addEventListener('contextmenu', (e) => {
        if (isDragging) {
            e.preventDefault();
        }
    });

    // Update cards per page based on screen size
    function updateCardsPerPage() {
        const width = window.innerWidth;
        if (width <= 768) {
            cardsPerPage = 1; // Mobile
        } else if (width <= 1024) {
            cardsPerPage = 2; // Tablet
        } else {
            cardsPerPage = 4; // Desktop
        }
        totalPages = Math.ceil(totalCards / cardsPerPage);
        currentPage = Math.min(currentPage, totalPages - 1);
        updatePagination();
        updateCardPosition();
    }

    function updatePagination() {
        elements.paginationInfo.textContent = `${currentPage + 1} / ${totalPages}`;
        elements.prevArrow.disabled = currentPage === 0;
        elements.nextArrow.disabled = currentPage === totalPages - 1;
    }

    function updateCardPosition() {
        const cardWidth = grid.children[0]?.offsetWidth || 0;
        const gap = 24;
        const translateX = -(currentPage * (cardWidth * cardsPerPage + gap * (cardsPerPage - 1)));
        grid.style.transform = `translateX(${translateX}px)`;
    }

    function goToPage(pageIndex) {
        if (pageIndex >= 0 && pageIndex < totalPages) {
            currentPage = pageIndex;
            updatePagination();
            updateCardPosition();
        }
    }

    function nextPage() {
        if (currentPage < totalPages - 1) {
            goToPage(currentPage + 1);
        }
    }

    function prevPage() {
        if (currentPage > 0) {
            goToPage(currentPage - 1);
        }
    }

    function toggleDrawer() {
        isExpanded = !isExpanded;

        if (isExpanded) {
            elements.content.classList.add('expanded');
            elements.chevron.classList.add('expanded');
            document.querySelector('#drawer-backdrop').classList.add('backdrop-shown');

            // Update pagination after drawer is expanded
            setTimeout(() => {
                updateCardsPerPage();
            }, 100);
        } else {
            elements.content.classList.remove('expanded');
            elements.chevron.classList.remove('expanded');
            document.querySelector('#drawer-backdrop').classList.remove('backdrop-shown');
        }

        elements.header.setAttribute('aria-expanded', isExpanded.toString());
    }

    elements.header.addEventListener('click', (e) => {
        if (!elements.prevArrow.contains(e.target) &&
            !elements.nextArrow.contains(e.target) &&
            !elements.paginationInfo.contains(e.target)) {
            toggleDrawer();
        }
    });

    elements.prevArrow.addEventListener('click', (e) => {
        e.stopPropagation();
        prevPage();
    });

    elements.nextArrow.addEventListener('click', (e) => {
        e.stopPropagation();
        nextPage();
    });

    document.addEventListener('click', function (event) {
        if (isExpanded && !elements.drawer.contains(event.target)) {
            toggleDrawer();
        }
    });

    elements.header.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            toggleDrawer();
        }
    });
    window.addEventListener('resize', () => {
        if (isExpanded) {
            updateCardsPerPage();
        }
    });

    let scrollTimeout;
    window.addEventListener('scroll', function () {
        clearTimeout(scrollTimeout);

        scrollTimeout = setTimeout(function () {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;

            const isAtBottom = scrollTop + windowHeight >= documentHeight - 10;

            if (isExpanded && isAtBottom) {
                toggleDrawer();
            }
        }, 150); // Debounce delay of 150ms
    });

    // Initialize pagination
    updateCardsPerPage();

    window.handleAction = handleAction;
}

async function getRandomPokemon(id) {

    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const gameData = await response.json();
        return gameData;

    } catch (error) {
        console.error('Error fetching game data:', error);
        throw error;
    }
}


// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeDrawer);
} else {
    initializeDrawer();

    let link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', 'https://cdn.jsdelivr.net/gh/jsncrz/jsncrz-technical-assessment/styles/sticky-drawer.css');

    document.head.appendChild(link);

}