/**
 * FitDelicias - JavaScript principal
 * Este arquivo contém todas as funcionalidades do site FitDelicias */

// Executar quando o DOM estiver completamente carregado
document.addEventListener('DOMContentLoaded', function() {
  // Inicializar componentes
  initSplashScreen();
  initWelcomeScreen();
  initSwiper();
  initMobileMenu();
  initHighlightsModal();
  setupOrderButtons();
});

/**
 * Inicializa o splash screen
 */
function initSplashScreen() {
  const splashScreen = document.getElementById('splashScreen');
  if (!splashScreen) return;

  // Remover splash screen após 1.5 segundos
  setTimeout(() => {
    splashScreen.style.opacity = '0';
    setTimeout(() => {
      splashScreen.style.display = 'none';
      document.body.style.opacity = '1';
    }, 500);
  }, 1500);
}

/**
 * Inicializa a tela de boas-vindas
 */
function initWelcomeScreen() {
  const welcomeScreen = document.getElementById('welcomeScreen');
  const closeWelcomeBtn = document.getElementById('closeWelcomeScreen');
  const exploreMenuBtn = document.getElementById('exploreMenuBtn');
  
  if (!welcomeScreen || !closeWelcomeBtn || !exploreMenuBtn) return;
  
  // Função para fechar a tela de boas-vindas
  function closeWelcomeScreen() {
    welcomeScreen.style.display = 'none';
  }
  
  // Adicionar evento de clique ao botão de fechar
  closeWelcomeBtn.addEventListener('click', closeWelcomeScreen);
  
  // Adicionar evento de clique ao botão de explorar
  exploreMenuBtn.addEventListener('click', function() {
    closeWelcomeScreen();
    // Rolar até a seção do cardápio
    const menuSection = document.querySelector('#breakfast-menu, #lunch-menu, #dessert-menu');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
  
  // Fechar ao clicar fora do card
  welcomeScreen.addEventListener('click', function(e) {
    if (e.target === welcomeScreen) {
      closeWelcomeScreen();
    }
  });
  
  // Verificar se já mostrou a tela de boas-vindas antes
  const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
  if (hasSeenWelcome) {
    welcomeScreen.style.display = 'none';
  } else {
    // Mostrar a tela de boas-vindas após o splash screen
    setTimeout(function() {
      welcomeScreen.style.display = 'flex';
      // Armazenar que o usuário já viu a tela de boas-vindas
      localStorage.setItem('hasSeenWelcome', 'true');
    }, 2000);
  }
}

/**
 * Inicializa o carrossel Swiper
 */
function initSwiper() {
  // Verificar se o Swiper está disponível
  if (typeof Swiper === 'undefined') return;
  
  // Inicializar o carrossel Swiper
  new Swiper('.swiper-container', {
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
  });
}

/**
 * Inicializa o menu inferior mobile
 */
function initMobileMenu() {
  const highlightsMobileBtn = document.getElementById('highlightsMobileBtn');
  if (!highlightsMobileBtn) return;
  
  highlightsMobileBtn.addEventListener('click', function() {
    const highlightsModal = document.getElementById('highlightsModal');
    if (highlightsModal) {
      highlightsModal.style.display = 'flex';
    }
  });
}

/**
 * Inicializa o modal de destaques
 */
function initHighlightsModal() {
  const highlightsModal = document.getElementById('highlightsModal');
  const closeHighlightsModal = document.getElementById('closeHighlightsModal');
  
  if (!highlightsModal || !closeHighlightsModal) return;
  
  // Fechar modal de destaques
  closeHighlightsModal.addEventListener('click', function() {
    highlightsModal.style.display = 'none';
  });
  
  // Fechar modal de destaques ao clicar fora dele
  highlightsModal.addEventListener('click', function(e) {
    if (e.target === highlightsModal) {
      highlightsModal.style.display = 'none';
    }
  });
  
  // Configurar botões de pedido nos destaques
  const highlightOrderButtons = highlightsModal.querySelectorAll('.bg-green-600');
  highlightOrderButtons.forEach(button => {
    button.addEventListener('click', function() {
      const menuItem = this.closest('div.flex').querySelector('h3').textContent;
      alert(`Seu pedido de "${menuItem}" com desconto foi adicionado ao carrinho!`);
      highlightsModal.style.display = 'none';
    });
  });
}

/**
 * Configura os botões de pedido em todo o site
 */
function setupOrderButtons() {
  const orderButtons = document.querySelectorAll('.bg-green-600');
  
  orderButtons.forEach(button => {
    // Verificar se é um botão de pedido (contém o texto "Pedir")
    if (button.textContent.trim() === 'Pedir') {
      button.addEventListener('click', function() {
        // Encontrar o nome do item de menu mais próximo
        const menuItem = this.closest('.rounded-lg')?.querySelector('h3')?.textContent || 'item';
        alert(`Seu pedido de "${menuItem}" foi adicionado ao carrinho!`);
      });
    }
  });
}

/**
 * Função para resetar a tela de boas-vindas (útil para testes)
 * Pode ser chamada no console do navegador
 */
function resetWelcomeScreen() {
  localStorage.removeItem('hasSeenWelcome');
  console.log('Tela de boas-vindas resetada. Recarregue a página para ver novamente.');
}

/**
 * Função para mostrar a tela de boas-vindas (útil para testes)
 * Pode ser chamada no console do navegador
 */
function showWelcomeScreen() {
  const welcomeScreen = document.getElementById('welcomeScreen');
  if (welcomeScreen) {
    welcomeScreen.style.display = 'flex';
  }
}

/**
 * Função para mostrar o modal de destaques (útil para testes)
 * Pode ser chamada no console do navegador
 */
function showHighlightsModal() {
  const highlightsModal = document.getElementById('highlightsModal');
  if (highlightsModal) {
    highlightsModal.style.display = 'flex';
  }
}

/**
 * Função para verificar se um elemento existe no DOM
 * @param {string} selector - Seletor CSS do elemento
 * @returns {boolean} - Verdadeiro se o elemento existir
 */
function elementExists(selector) {
  return document.querySelector(selector) !== null;
}

/**
 * Função para adicionar uma classe a um elemento se ele existir
 * @param {string} selector - Seletor CSS do elemento
 * @param {string} className - Nome da classe a ser adicionada
 */
function addClassIfExists(selector, className) {
  const element = document.querySelector(selector);
  if (element) {
    element.classList.add(className);
  }
}

/**
 * Função para remover uma classe de um elemento se ele existir
 * @param {string} selector - Seletor CSS do elemento
 * @param {string} className - Nome da classe a ser removida
 */
function removeClassIfExists(selector, className) {
  const element = document.querySelector(selector);
  if (element) {
    element.classList.remove(className);
  }
}

/**
 * Inicializa a funcionalidade de pesquisa
 */
function initSearch() {
  // Elementos de pesquisa desktop
  const searchInput = document.querySelector('input[placeholder*="Buscar pratos"]');
  const searchButton = document.querySelector('.fas.fa-search').parentElement;
  
  // Elementos de pesquisa mobile
  const searchMobileBtn = document.getElementById('searchMobileBtn');
  const searchModal = document.getElementById('searchModal');
  const closeSearchModal = document.getElementById('closeSearchModal');
  const searchInputMobile = document.getElementById('searchInputMobile');
  const searchButtonMobile = document.getElementById('searchButtonMobile');
  const searchResultsMobile = document.getElementById('searchResultsMobile');
  
  // Dados de exemplo para pesquisa (em um app real, estes viriam de uma API)
  const menuItems = [
    { name: 'Salada Caesar', category: 'Entradas', ingredients: 'alface, croutons, parmesão, molho caesar', price: 'R$ 25,90' },
    { name: 'Wrap de Frango', category: 'Almoço', ingredients: 'tortilha, frango, alface, tomate, molho especial', price: 'R$ 28,90' },
    { name: 'Bowl de Açaí', category: 'Sobremesas', ingredients: 'açaí, banana, granola, mel', price: 'R$ 19,90' },
    { name: 'Smoothie Verde', category: 'Bebidas', ingredients: 'espinafre, abacaxi, maçã verde, gengibre', price: 'R$ 15,90' },
    { name: 'Omelete Fit', category: 'Café da Manhã', ingredients: 'ovos, espinafre, queijo branco, tomate', price: 'R$ 22,90' },
    { name: 'Salmão Grelhado', category: 'Almoço', ingredients: 'salmão, legumes, arroz integral', price: 'R$ 45,90' },
    { name: 'Suco Detox', category: 'Bebidas', ingredients: 'couve, limão, maçã, gengibre', price: 'R$ 14,90' },
    { name: 'Panqueca Proteica', category: 'Café da Manhã', ingredients: 'aveia, banana, whey protein, canela', price: 'R$ 18,90' }
  ];
  
  // Função para realizar a pesquisa
  function performSearch(query) {
    if (!query || query.length < 2) return [];
    
    query = query.toLowerCase();
    
    return menuItems.filter(item => 
      item.name.toLowerCase().includes(query) || 
      item.category.toLowerCase().includes(query) || 
      item.ingredients.toLowerCase().includes(query)
    );
  }
  
  // Função para renderizar os resultados da pesquisa
  function renderSearchResults(results, container) {
    if (results.length === 0) {
      container.innerHTML = '<p class="text-gray-500 text-center py-4">Nenhum resultado encontrado.</p>';
      return;
    }
    
    let html = '';
    
    results.forEach(item => {
      html += `
        <div class="border-b border-gray-200 py-3">
          <div class="flex justify-between items-start">
            <div>
              <h4 class="font-medium text-gray-800">${item.name}</h4>
              <p class="text-sm text-gray-500">${item.category}</p>
              <p class="text-xs text-gray-600 mt-1">${item.ingredients}</p>
            </div>
            <div class="text-right">
              <p class="font-medium text-[#327639]">${item.price}</p>
              <button class="mt-2 bg-[#327639] text-white text-xs py-1 px-3 rounded hover:bg-[#3c8a45] transition-colors">
                Pedir
              </button>
            </div>
          </div>
        </div>
      `;
    });
    
    container.innerHTML = html;
  }
  
  // Configurar pesquisa desktop
  if (searchInput && searchButton) {
    // Criar container para resultados desktop
    const searchResultsDesktop = document.createElement('div');
    searchResultsDesktop.id = 'searchResultsDesktop';
    searchResultsDesktop.className = 'absolute top-full left-0 right-0 bg-white mt-1 rounded-lg shadow-lg z-10 max-h-96 overflow-y-auto hidden';
    searchInput.parentElement.appendChild(searchResultsDesktop);
    
    // Evento de pesquisa desktop
    function handleDesktopSearch() {
      const query = searchInput.value.trim();
      const results = performSearch(query);
      
      if (query.length >= 2) {
        renderSearchResults(results, searchResultsDesktop);
        searchResultsDesktop.classList.remove('hidden');
      } else {
        searchResultsDesktop.classList.add('hidden');
      }
    }
    
    searchButton.addEventListener('click', handleDesktopSearch);
    searchInput.addEventListener('keyup', function(e) {
      if (e.key === 'Enter') {
        handleDesktopSearch();
      } else if (e.key === 'Escape') {
        searchResultsDesktop.classList.add('hidden');
      } else if (this.value.trim().length >= 2) {
        handleDesktopSearch();
      }
    });
    
    // Fechar resultados ao clicar fora
    document.addEventListener('click', function(e) {
      if (!searchInput.contains(e.target) && !searchResultsDesktop.contains(e.target)) {
        searchResultsDesktop.classList.add('hidden');
      }
    });
  }
  
  // Configurar pesquisa mobile
  if (searchMobileBtn && searchModal && closeSearchModal && searchInputMobile && searchButtonMobile) {
    // Abrir modal de pesquisa
    searchMobileBtn.addEventListener('click', function() {
      searchModal.classList.remove('hidden');
      searchInputMobile.focus();
    });
    
    // Fechar modal de pesquisa
    closeSearchModal.addEventListener('click', function() {
      searchModal.classList.add('hidden');
    });
    
    // Evento de pesquisa mobile
    function handleMobileSearch() {
      const query = searchInputMobile.value.trim();
      const results = performSearch(query);
      
      if (query.length >= 2) {
        renderSearchResults(results, searchResultsMobile);
      } else {
        searchResultsMobile.innerHTML = '<p class="text-gray-500 text-center py-4">Digite pelo menos 2 caracteres para buscar.</p>';
      }
    }
    
    searchButtonMobile.addEventListener('click', handleMobileSearch);
    searchInputMobile.addEventListener('keyup', function(e) {
      if (e.key === 'Enter') {
        handleMobileSearch();
      } else if (this.value.trim().length >= 2) {
        handleMobileSearch();
      }
    });
    
    // Fechar modal ao clicar fora
    searchModal.addEventListener('click', function(e) {
      if (e.target === searchModal) {
        searchModal.classList.add('hidden');
      }
    });
  }
}

// Adicionar a inicialização da pesquisa ao carregamento do DOM
document.addEventListener('DOMContentLoaded', function() {
  // Inicializar componentes existentes
  initSplashScreen();
  initWelcomeScreen();
  initSwiper();
  initMobileMenu();
  initHighlightsModal();
  
  // Adicionar inicialização da pesquisa
  initSearch();
});
