 // CONFIGURACIÓN DE VALORES INICIALES Y TIPOS
 const labelConfig = {
    'campaigns-value': {
        currentValue: 86.00,
        type: 'percentage',
        minIncrease: 0.5,
        maxIncrease: 3.0
    },
    'notifications-value': {
        currentValue: 72.00,
        type: 'percentage', 
        minIncrease: 0.3,
        maxIncrease: 2.5
    },
    'analytics-value': {
        currentValue: 94.00,
        type: 'percentage',
        minIncrease: 0.1,
        maxIncrease: 1.5
    },
    'visibility-value': {
        currentValue: 422921,
        type: 'number',
        minIncrease: 50,
        maxIncrease: 500
    },
    'ads_click-value': {
        currentValue: 230624,
        type: 'number',
        minIncrease: 25,
        maxIncrease: 300
    }
};

// FUNCIÓN PARA ANIMAR VALORES GRADUALMENTE
function animateValue(elementId, startValue, endValue, duration, isPercentage = false) {
    const element = document.getElementById(elementId);
    const startTime = Date.now();
    const difference = endValue - startValue;

    function updateValue() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Usar easing para suavizar la animación
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const currentValue = startValue + (difference * easedProgress);

        // Formatear según el tipo
        if (isPercentage) {
            element.textContent = currentValue.toFixed(2) + '%';
        } else {
            element.textContent = Math.floor(currentValue).toLocaleString();
        }

        if (progress < 1) {
            requestAnimationFrame(updateValue);
        } else {
            // Actualizar el valor actual en la configuración
            labelConfig[elementId].currentValue = endValue;
        }
    }

    updateValue();
}

// FUNCIÓN PARA GENERAR INCREMENTO ALEATORIO
function getRandomIncrease(min, max) {
    return Math.random() * (max - min) + min;
}

// FUNCIÓN PARA ACTUALIZAR UN LABEL ALEATORIO
function updateRandomLabel() {
    const labelIds = Object.keys(labelConfig);
    const randomId = labelIds[Math.floor(Math.random() * labelIds.length)];
    const config = labelConfig[randomId];
    
    const increase = getRandomIncrease(config.minIncrease, config.maxIncrease);
    const newValue = config.currentValue + increase;
    const isPercentage = config.type === 'percentage';
    
    // Animar el cambio durante 1.5 segundos
    animateValue(randomId, config.currentValue, newValue, 1500, isPercentage);
    
    console.log(`Actualizando ${randomId}: ${config.currentValue} → ${newValue.toFixed(2)}`);
}

// FUNCIÓN PARA PROGRAMAR ACTUALIZACIONES ALEATORIAS
function scheduleRandomUpdates() {
    // Tiempo aleatorio entre 1-3 segundos para la próxima actualización
    const nextUpdateTime = Math.random() * 2000 + 1000;
    
    setTimeout(() => {
        updateRandomLabel();
        scheduleRandomUpdates(); // Programar la siguiente actualización
    }, nextUpdateTime);
}

// INICIAR EL SISTEMA DESPUÉS DE 3 SEGUNDOS
setTimeout(() => {
    console.log('🚀 Iniciando actualizaciones automáticas...');
    scheduleRandomUpdates();
}, 3000);

// FUNCIÓN MANUAL PARA TESTING (opcional)
function triggerUpdate() {
    updateRandomLabel();
}
;