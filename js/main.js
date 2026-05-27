/* 
   IBSE - Instituto Brasileiro de Saberes e Expressões
   Core JS - Versão v1.0 (Design 2030)
   Controlador de interações do usuário e recursos de acessibilidade.
*/

document.addEventListener('DOMContentLoaded', () => {
    // --- Inicialização de Acessibilidade ---
    initAccessibility();
    
    // --- Menu Mobile ---
    initMobileMenu();
    
    // --- Accordion (Áreas de Atuação) ---
    initAccordion();
    
    // --- Diagrama do Logo (8 Caixas) ---
    initLogoDiagram();
    
    // --- Formulários ---
    initFormHandlers();
});

// ==========================================
// 1. Recursos de Acessibilidade (Acessibilidade ativa)
// ==========================================
function initAccessibility() {
    const htmlElement = document.documentElement;
    const bodyElement = document.body;
    
    // Carregar configurações salvas no localStorage
    const savedContrast = localStorage.getItem('ibse-high-contrast');
    const savedFontScale = localStorage.getItem('ibse-font-scale');
    
    if (savedContrast === 'true') {
        bodyElement.classList.add('high-contrast');
    }
    
    if (savedFontScale) {
        htmlElement.style.setProperty('--font-scale', savedFontScale);
    }
    
    // Selecionar botões do painel de acessibilidade
    const btnContrast = document.getElementById('btn-contrast');
    const btnTextPlus = document.getElementById('btn-text-plus');
    const btnTextMinus = document.getElementById('btn-text-minus');
    const btnReset = document.getElementById('btn-reset');
    
    if (btnContrast) {
        btnContrast.addEventListener('click', () => {
            const isHighContrast = bodyElement.classList.toggle('high-contrast');
            localStorage.setItem('ibse-high-contrast', isHighContrast);
            announceToScreenReader(isHighContrast ? "Modo de alto contraste ativado." : "Modo de alto contraste desativado.");
        });
    }
    
    if (btnTextPlus) {
        btnTextPlus.addEventListener('click', () => {
            let currentScale = parseFloat(getComputedStyle(htmlElement).getPropertyValue('--font-scale')) || 1.0;
            if (currentScale < 1.4) {
                currentScale = parseFloat((currentScale + 0.1).toFixed(1));
                htmlElement.style.setProperty('--font-scale', currentScale);
                localStorage.setItem('ibse-font-scale', currentScale);
                announceToScreenReader(`Tamanho do texto aumentado para ${Math.round(currentScale * 100)}%.`);
            }
        });
    }
    
    if (btnTextMinus) {
        btnTextMinus.addEventListener('click', () => {
            let currentScale = parseFloat(getComputedStyle(htmlElement).getPropertyValue('--font-scale')) || 1.0;
            if (currentScale > 0.8) {
                currentScale = parseFloat((currentScale - 0.1).toFixed(1));
                htmlElement.style.setProperty('--font-scale', currentScale);
                localStorage.setItem('ibse-font-scale', currentScale);
                announceToScreenReader(`Tamanho do texto reduzido para ${Math.round(currentScale * 100)}%.`);
            }
        });
    }
    
    if (btnReset) {
        btnReset.addEventListener('click', () => {
            bodyElement.classList.remove('high-contrast');
            htmlElement.style.setProperty('--font-scale', 1.0);
            localStorage.removeItem('ibse-high-contrast');
            localStorage.removeItem('ibse-font-scale');
            announceToScreenReader("Configurações de acessibilidade redefinidas para o padrão.");
        });
    }
}

// Auxiliar para anunciar alterações via leitor de tela (aria-live)
function announceToScreenReader(message) {
    let announcer = document.getElementById('accessibility-announcer');
    if (!announcer) {
        announcer = document.createElement('div');
        announcer.id = 'accessibility-announcer';
        announcer.setAttribute('aria-live', 'polite');
        announcer.setAttribute('style', 'position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); border: 0;');
        document.body.appendChild(announcer);
    }
    announcer.textContent = '';
    // Pequeno timeout para leitores de tela capturarem a mudança
    setTimeout(() => {
        announcer.textContent = message;
    }, 100);
}

// ==========================================
// 2. Menu Responsivo Mobile
// ==========================================
function initMobileMenu() {
    const toggle = document.querySelector('.mobile-toggle');
    const menu = document.querySelector('.nav-menu');
    
    if (toggle && menu) {
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            menu.classList.toggle('open');
            toggle.classList.toggle('active');
            
            const isOpen = menu.classList.contains('open');
            toggle.setAttribute('aria-expanded', isOpen);
            toggle.setAttribute('aria-label', isOpen ? "Fechar menu de navegação" : "Abrir menu de navegação");
        });
        
        // Fechar menu ao clicar em qualquer link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('open');
                toggle.classList.remove('active');
                toggle.setAttribute('aria-expanded', false);
            });
        });
        
        // Fechar ao clicar fora do menu
        document.addEventListener('click', (e) => {
            if (menu.classList.contains('open') && !menu.contains(e.target) && !toggle.contains(e.target)) {
                menu.classList.remove('open');
                toggle.classList.remove('active');
                toggle.setAttribute('aria-expanded', false);
            }
        });
    }
}

// ==========================================
// 3. Comportamento de Sanfona (Accordion)
// ==========================================
function initAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const isActive = item.classList.contains('active');
            
            // Fechar todos os outros accordions (opcional, mantém limpo)
            const allItems = document.querySelectorAll('.accordion-item');
            allItems.forEach(i => {
                i.classList.remove('active');
                const h = i.querySelector('.accordion-header');
                if (h) h.setAttribute('aria-expanded', false);
            });
            
            // Alternar estado do clicado
            if (!isActive) {
                item.classList.add('active');
                header.setAttribute('aria-expanded', true);
            } else {
                item.classList.remove('active');
                header.setAttribute('aria-expanded', false);
            }
        });
    });
}

// ==========================================
// 4. Diagrama Interativo do Logo (8 Caixas)
// ==========================================
const logoDetails = {
    tucano: {
        title: "Tucano (Patrimônio Natural & Salvaguarda)",
        description: "Representa a riqueza ecológica brasileira, o respeito à fauna e a preservação ambiental. No IBSE, evoca a vigilância, o olhar atento sobre o território e a salvaguarda de nossas raízes e ecossistemas.",
        colorClass: "bg-tucano"
    },
    chapeu: {
        title: "Chapéu de Couro (Tradição e Memória Oral)",
        description: "Simboliza a força do sertão, o trabalho rural, a ancestralidade nordestina e a memória viva das nossas tradições. Representa a valorização da cultura popular, do artesanato e dos saberes herdados.",
        colorClass: "bg-chapeu"
    },
    sanfona: {
        title: "Acordeon / Sanfona (Expressão Musical Popular)",
        description: "Traduz a musicalidade que pulsa nas festas de terreiro, no folclore e nos bailes tradicionais. Expressa o papel da música como linguagem de integração social e diálogo intercultural.",
        colorClass: "bg-sanfona"
    },
    livros: {
        title: "Livros (Educação, Literatura e Memória)",
        description: "Evoca o conhecimento sistemático, o acesso às bibliotecas comunitárias, à qualificação profissional e à democratização do ensino. No IBSE, representa o método técnico e a formação de cidadãos.",
        colorClass: "bg-livros"
    },
    periferia: {
        title: "Casas de Periferia (Território e Integração Urbana)",
        description: "Demonstra o compromisso histórico do Instituto com as periferias, favelas e comunidades de base (como a EQNP na Ceilândia e o Sol Nascente). É o símbolo do pertencimento territorial e do desenvolvimento comunitário.",
        colorClass: "bg-periferia"
    },
    capoeira: {
        title: "Silhuetas de Capoeira (Cultura de Base & Esporte)",
        description: "Celebra o Legado Capoeira, expressão máxima de resistência de matriz africana, reconhecida mundialmente. Une cultura, esporte, disciplina física e educação social em uma única manifestação viva.",
        colorClass: "bg-capoeira"
    },
    atomo: {
        title: "Átomo (Ciência, Tecnologia e Pesquisa Aplicada)",
        description: "Simboliza a inovação social responsável, a pesquisa aplicada e a disseminação de tecnologias limpas nas comunidades. Representa a busca pelo conhecimento científico prático voltado para resolver problemas locais.",
        colorClass: "bg-atomo"
    },
    radio: {
        title: "Rádio Gravador (Comunicação Comunitária & Mídia)",
        description: "Representa a rádio comunitária, a produção audiovisual periférica, o Hip Hop e a comunicação popular como ferramenta de dar voz ao território. Simboliza a circulação e difusão de conteúdos sem ruído.",
        colorClass: "bg-radio"
    }
};

function initLogoDiagram() {
    const items = document.querySelectorAll('.diagram-item');
    const detailsBox = document.getElementById('diagram-details-content');
    
    if (items.length > 0 && detailsBox) {
        items.forEach(item => {
            item.addEventListener('click', () => {
                // Remover classe ativa de todos
                items.forEach(i => i.classList.remove('active'));
                
                // Adicionar ativa ao clicado
                item.classList.add('active');
                
                // Pegar chave do detalhe
                const key = item.getAttribute('data-key');
                const data = logoDetails[key];
                
                if (data) {
                    // Atualizar box de detalhes com animação suave
                    detailsBox.style.opacity = 0;
                    setTimeout(() => {
                        detailsBox.innerHTML = `
                            <div class="diagram-details-header">
                                <div class="diagram-icon-container ${data.colorClass} diagram-details-icon">
                                    ${item.querySelector('.diagram-icon-container').innerHTML}
                                </div>
                                <h3 class="diagram-details-title">${data.title}</h3>
                            </div>
                            <p class="diagram-details-text">${data.description}</p>
                        `;
                        detailsBox.style.opacity = 1;
                    }, 150);
                }
            });
        });
    }
}

// ==========================================
// 5. Manipulação de Formulários e Validações
// ==========================================
function initFormHandlers() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Pegar bloco de feedback
            const feedbackId = form.getAttribute('data-feedback');
            const feedback = document.getElementById(feedbackId);
            
            // Validações básicas antes de enviar
            let isValid = true;
            const requiredInputs = form.querySelectorAll('[required]');
            
            requiredInputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = 'var(--color-error)';
                } else {
                    input.style.borderColor = 'var(--border-color)';
                }
            });
            
            // Para formulários com termos de voluntário ou LGPD
            const consentCheckbox = form.querySelector('.consent-checkbox');
            if (consentCheckbox && !consentCheckbox.checked) {
                isValid = false;
                alert("Você precisa concordar com os termos de compromisso e a política de privacidade para continuar.");
            }
            
            if (!isValid) {
                if (feedback) {
                    feedback.className = "form-feedback error";
                    feedback.textContent = "Por favor, preencha todos os campos obrigatórios em vermelho.";
                    feedback.focus();
                }
                return;
            }
            
            // Simular envio AJAX bem-sucedido
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn ? submitBtn.textContent : "Enviar";
            
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = "Processando registro...";
            }
            
            setTimeout(() => {
                if (feedback) {
                    feedback.className = "form-feedback success";
                    
                    // Personalizar mensagem baseado no tipo de formulário
                    if (form.id === 'form-denuncia') {
                        const isAnonymous = form.querySelector('input[name="anonymous"]:checked')?.value === 'true';
                        const protocol = Math.floor(100000 + Math.random() * 900000);
                        feedback.innerHTML = `
                            <strong>Relato enviado com sucesso!</strong><br>
                            Sua denúncia foi registrada sob o rito do Comitê de Ética.<br>
                            ${isAnonymous ? 'Como você optou pelo envio anônimo, guarde seu código para consultas futuras se aplicável.' : 'Enviamos uma confirmação de recebimento para o seu e-mail.'}<br>
                            <strong>Número de Protocolo: IBSE-${protocol}</strong>
                        `;
                    } else if (form.id === 'form-associado') {
                        feedback.innerHTML = `
                            <strong>Candidatura registrada!</strong><br>
                            Sua solicitação de admissão como Membro Efetivo foi encaminhada à Diretoria Executiva.<br>
                            Entraremos em contato em até 15 dias úteis com o parecer da homologação.
                        `;
                    } else if (form.id === 'form-contato') {
                        feedback.innerHTML = `
                            <strong>Mensagem enviada com sucesso!</strong><br>
                            Agradecemos seu contato. Nossa equipe retornará sua mensagem pelo e-mail informado em até 48 horas úteis.
                        `;
                    } else {
                        feedback.innerHTML = `
                            <strong>Inscrição de Voluntário concluída!</strong><br>
                            Obrigado pelo seu interesse em fortalecer o IBSE.<br>
                            Nossa coordenação de projetos entrará em contato em breve para agendar seu acolhimento técnico.
                        `;
                    }
                    
                    feedback.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    announceToScreenReader("Formulário enviado com sucesso!");
                    
                    // Limpar formulário
                    form.reset();
                }
                
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalBtnText;
                }
            }, 1500);
        });
    });
}
