document.addEventListener('DOMContentLoaded', function() {
    // Inicialización del póster científico
    initPosterEnhancements();
    initSmoothScrolling();
    initPrintFunctionality();
    initAccessibilityFeatures();
});

/**
 * Mejoras visuales y de interacción para el póster
 */
function initPosterEnhancements() {
    // Efecto de aparición progresiva para las secciones
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Animar elementos hijos con delay
                const childElements = entry.target.querySelectorAll('.methodology-item, .highlight-item, .objectives-list li');
                childElements.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.transform = 'translateY(0)';
                        child.style.opacity = '1';
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    // Observar todas las tarjetas de sección
    document.querySelectorAll('.section-card').forEach(card => {
        sectionObserver.observe(card);
    });

    // Efectos hover mejorados para elementos interactivos
    enhanceHoverEffects();
}

/**
 * Mejora los efectos hover de los elementos
 */
function enhanceHoverEffects() {
    // Efecto para las tarjetas de metodología
    const methodologyItems = document.querySelectorAll('.methodology-item');
    methodologyItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });

    // Efecto para los aspectos destacados
    const highlightItems = document.querySelectorAll('.highlight-item');
    highlightItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Efecto para los objetivos específicos
    const objectiveItems = document.querySelectorAll('.objectives-list li');
    objectiveItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.borderLeftWidth = '6px';
            this.style.transition = 'border-left-width 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.borderLeftWidth = '4px';
        });
    });
}

/**
 * Navegación suave entre secciones
 */
function initSmoothScrolling() {
    // Crear navegación rápida (opcional, para versión digital)
    if (window.innerWidth > 768) {
        createQuickNavigation();
    }
}

/**
 * Crea una navegación rápida para el póster
 */
function createQuickNavigation() {
    const sections = document.querySelectorAll('.section-card');
    const nav = document.createElement('nav');
    nav.className = 'poster-nav';
    nav.innerHTML = `
        <div class="nav-title">Navegación</div>
        <ul class="nav-list"></ul>
    `;
    
    const navList = nav.querySelector('.nav-list');
    
    sections.forEach((section, index) => {
        const title = section.querySelector('.section-title');
        if (title) {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = '#';
            a.textContent = title.textContent;
            a.addEventListener('click', (e) => {
                e.preventDefault();
                section.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            });
            li.appendChild(a);
            navList.appendChild(li);
        }
    });
    
    // Insertar navegación solo si hay suficiente espacio
    if (sections.length > 3) {
        document.body.appendChild(nav);
        
        // Estilo para la navegación
        const navStyles = `
            .poster-nav {
                position: fixed;
                top: 50%;
                left: 20px;
                transform: translateY(-50%);
                background: var(--color-surface);
                border: 1px solid var(--color-border);
                border-radius: var(--radius-base);
                padding: var(--space-12);
                box-shadow: var(--shadow-md);
                z-index: 1000;
                max-width: 200px;
            }
            
            .nav-title {
                font-weight: var(--font-weight-semibold);
                font-size: var(--font-size-sm);
                margin-bottom: var(--space-8);
                color: var(--color-primary);
            }
            
            .nav-list {
                list-style: none;
                padding: 0;
                margin: 0;
            }
            
            .nav-list li {
                margin-bottom: var(--space-4);
            }
            
            .nav-list a {
                font-size: var(--font-size-xs);
                color: var(--color-text-secondary);
                text-decoration: none;
                padding: var(--space-4);
                display: block;
                border-radius: var(--radius-sm);
                transition: all 0.2s ease;
            }
            
            .nav-list a:hover {
                background: var(--color-secondary);
                color: var(--color-primary);
            }
            
            @media (max-width: 1024px) {
                .poster-nav {
                    display: none;
                }
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.textContent = navStyles;
        document.head.appendChild(styleSheet);
    }
}

/**
 * Funcionalidad de impresión mejorada
 */
function initPrintFunctionality() {
    // Crear botón de impresión
    const printButton = document.createElement('button');
    printButton.className = 'btn btn--primary print-button';
    printButton.innerHTML = '🖨️ Imprimir Póster';
    printButton.addEventListener('click', handlePrint);
    
    // Insertar botón en la cabecera
    const header = document.querySelector('.poster-header');
    if (header) {
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'print-button-container';
        buttonContainer.appendChild(printButton);
        header.appendChild(buttonContainer);
    }
    
    // Estilos para el botón de impresión
    const printStyles = `
        .print-button-container {
            position: absolute;
            top: var(--space-16);
            right: var(--space-16);
        }
        
        .print-button {
            background: rgba(255, 255, 255, 0.2);
            border: 1px solid rgba(255, 255, 255, 0.3);
            color: white;
            font-size: var(--font-size-sm);
            padding: var(--space-8) var(--space-12);
            backdrop-filter: blur(10px);
        }
        
        .print-button:hover {
            background: rgba(255, 255, 255, 0.3);
        }
        
        @media print {
            .print-button-container {
                display: none;
            }
        }
        
        @media (max-width: 768px) {
            .print-button-container {
                position: static;
                text-align: center;
                margin-top: var(--space-16);
            }
        }
    `;
    
    const printStyleSheet = document.createElement('style');
    printStyleSheet.textContent = printStyles;
    document.head.appendChild(printStyleSheet);
}

/**
 * Maneja la funcionalidad de impresión
 */
function handlePrint() {
    // Preparar el documento para impresión
    document.body.classList.add('printing');
    
    // Configuraciones específicas para impresión
    const originalTitle = document.title;
    document.title = 'Poster_Cientifico_Sede_Occidente_UCR';
    
    // Ejecutar impresión
    window.print();
    
    // Restaurar después de imprimir
    setTimeout(() => {
        document.body.classList.remove('printing');
        document.title = originalTitle;
    }, 1000);
}

/**
 * Mejoras de accesibilidad
 */
function initAccessibilityFeatures() {
    // Agregar navegación por teclado mejorada
    const focusableElements = document.querySelectorAll('.section-card, .methodology-item, .highlight-item');
    
    focusableElements.forEach(element => {
        // Hacer elementos focusables con tab
        if (!element.hasAttribute('tabindex')) {
            element.setAttribute('tabindex', '0');
        }
        
        // Agregar indicadores visuales de foco
        element.addEventListener('focus', function() {
            this.style.outline = '3px solid var(--color-focus-ring)';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
    
    // Agregar texto alternativo para elementos decorativos
    const logos = document.querySelectorAll('.logo-placeholder');
    logos.forEach(logo => {
        logo.setAttribute('role', 'img');
        logo.setAttribute('aria-label', logo.textContent === 'UCR' ? 
            'Logo Universidad de Costa Rica' : 
            'Logo Sede de Occidente');
    });
    
    // Mejorar la estructura semántica
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        title.setAttribute('role', 'heading');
        title.setAttribute('aria-level', '2');
    });
}

/**
 * Utilidades para el manejo de datos del póster
 */
const PosterData = {
    // Información básica del póster
    info: {
        title: "Impacto Socioeconómico de la Sede de Occidente de la Universidad de Costa Rica en el Desarrollo Regional",
        course: "SR 0307 Seminario de Realidad Nacional I: Desarrollo Regional Integral",
        instructor: "Ana Cristina Quesada Monge",
        date: "07 de julio, 2025"
    },
    
    // Exportar datos para uso externo si es necesario
    exportData: function() {
        return {
            title: this.info.title,
            authors: Array.from(document.querySelectorAll('.author')).map(el => el.textContent),
            sections: Array.from(document.querySelectorAll('.section-title')).map(el => el.textContent),
            timestamp: new Date().toISOString()
        };
    }
};

// Exponer utilidades globalmente si es necesario
window.PosterData = PosterData;