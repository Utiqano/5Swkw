// Metrologie 5S Variables
let fiveSStep = 0;
let fiveSLangIndex = 0;
const fiveSLanguages = ['ar', 'fr', 'en', 'de'];
let fiveSLang = fiveSLanguages[fiveSLangIndex];
const fiveSTotalSteps = 6;

// Proposition d'Amélioration Variables
let propStep = 0;
let propLangIndex = 0;
const propLanguages = ['ar', 'fr', 'en'];
let propLang = propLanguages[propLangIndex];
const propTotalSteps = 4;

// Gemba OJT Variables
let gembaStep = 0;
let gembaLangIndex = 0;
const gembaLanguages = ['ar', 'fr', 'en'];
let gembaLang = gembaLanguages[gembaLangIndex];
const gembaTotalSteps = 3; // Updated to 3 slides

let currentSection = 'landing';
let autoCycleInterval = null;

const translations = {
    ar: { title: 'WKW Automotive - التحسين المستمر' },
    fr: { title: 'WKW Automotive - Amélioration Continue' },
    en: { title: 'WKW Automotive - Continuous Improvement' },
    de: { title: 'WKW Automotive - Kontinuierliche Verbesserung' }
};

function showSection(sectionId) {
    console.log(`Switching to section: ${sectionId}`);
    currentSection = sectionId;
    document.getElementById('landing-page').style.display = sectionId === 'landing' ? 'flex' : 'none';
    document.getElementById('metrologie-5s').style.display = sectionId === 'metrologie-5s' ? 'block' : 'none';
    document.getElementById('proposition-amelioration').style.display = sectionId === 'proposition-amelioration' ? 'block' : 'none';
    document.getElementById('gemba-ojt').style.display = sectionId === 'gemba-ojt' ? 'block' : 'none';

    const prevBtn = document.getElementById('prev-button');
    const nextBtn = document.getElementById('next-button');
    prevBtn.style.display = sectionId !== 'landing' ? 'inline-block' : 'none';
    nextBtn.style.display = sectionId !== 'landing' ? 'inline-block' : 'none';

    if (sectionId === 'metrologie-5s') {
        fiveSStep = 0;
        fiveSLang = fiveSLanguages[fiveSLangIndex];
        showFiveSStep(fiveSStep, fiveSLang);
        startAutoCycle('fiveS');
    } else if (sectionId === 'proposition-amelioration') {
        propStep = 0;
        propLang = propLanguages[propLangIndex];
        showPropStep(propStep, propLang);
        startAutoCycle('prop');
    } else if (sectionId === 'gemba-ojt') {
        gembaStep = 0;
        gembaLang = gembaLanguages[gembaLangIndex];
        console.log(`Initializing Gemba OJT: step ${gembaStep}, lang ${gembaLang}`);
        showGembaStep(gembaStep, gembaLang);
        startAutoCycle('gemba');
    } else {
        stopAutoCycle();
        document.getElementById('title').textContent = translations[fiveSLang].title;
    }
}

function showFiveSStep(step, lang) {
    console.log(`Showing 5S step ${step} in language ${lang}`);
    const steps = document.querySelectorAll('#metrologie-5s .step');
    steps.forEach(s => {
        s.classList.remove('active', 'entering');
        if (s.getAttribute('data-step') == step && s.getAttribute('data-lang') == lang) {
            s.classList.add('active');
            setTimeout(() => s.classList.add('entering'), 10);
        }
    });
    document.getElementById('title').textContent = translations[lang].title;
    document.documentElement.setAttribute('lang', lang);
}

function showPropStep(step, lang) {
    console.log(`Showing Prop step ${step} in language ${lang}`);
    const steps = document.querySelectorAll('#proposition-amelioration .step');
    steps.forEach(s => {
        s.classList.remove('active', 'entering');
        if (s.getAttribute('data-step') == step && s.getAttribute('data-lang') == lang) {
            s.classList.add('active');
            setTimeout(() => s.classList.add('entering'), 10);
        }
    });
    document.getElementById('title').textContent = translations[lang].title;
    document.documentElement.setAttribute('lang', lang);
}

function showGembaStep(step, lang) {
    console.log(`Showing Gemba step ${step} in language ${lang}`);
    const steps = document.querySelectorAll('#gemba-ojt .step');
    steps.forEach(s => {
        s.classList.remove('active', 'entering');
        if (s.getAttribute('data-step') == step && s.getAttribute('data-lang') == lang) {
            console.log(`Activating Gemba step ${step} for lang ${lang}`);
            s.classList.add('active');
            setTimeout(() => s.classList.add('entering'), 10);
        }
    });
    document.getElementById('title').textContent = translations[lang].title;
    document.documentElement.setAttribute('lang', lang);
}

function prevStep() {
    stopAutoCycle();
    if (currentSection === 'metrologie-5s') {
        if (fiveSStep > 0) {
            fiveSStep--;
        } else {
            fiveSLangIndex = (fiveSLangIndex - 1 + fiveSLanguages.length) % fiveSLanguages.length;
            fiveSLang = fiveSLanguages[fiveSLangIndex];
            fiveSStep = fiveSTotalSteps - 1;
        }
        showFiveSStep(fiveSStep, fiveSLang);
        startAutoCycle('fiveS');
    } else if (currentSection === 'proposition-amelioration') {
        if (propStep > 0) {
            propStep--;
        } else {
            propLangIndex = (propLangIndex - 1 + propLanguages.length) % propLanguages.length;
            propLang = propLanguages[propLangIndex];
            propStep = propTotalSteps - 1;
        }
        showPropStep(propStep, propLang);
        startAutoCycle('prop');
    } else if (currentSection === 'gemba-ojt') {
        console.log(`Previous Gemba step: current step ${gembaStep}, lang ${gembaLang}`);
        if (gembaStep > 0) {
            gembaStep--;
        } else {
            gembaLangIndex = (gembaLangIndex - 1 + gembaLanguages.length) % gembaLanguages.length;
            gembaLang = gembaLanguages[gembaLangIndex];
            gembaStep = gembaTotalSteps - 1;
        }
        showGembaStep(gembaStep, gembaLang);
        startAutoCycle('gemba');
    }
}

function nextStep() {
    stopAutoCycle();
    if (currentSection === 'metrologie-5s') {
        if (fiveSStep < fiveSTotalSteps - 1) {
            fiveSStep++;
        } else {
            fiveSLangIndex = (fiveSLangIndex + 1) % fiveSLanguages.length;
            fiveSLang = fiveSLanguages[fiveSLangIndex];
            fiveSStep = 0;
        }
        showFiveSStep(fiveSStep, fiveSLang);
        startAutoCycle('fiveS');
    } else if (currentSection === 'proposition-amelioration') {
        if (propStep < propTotalSteps - 1) {
            propStep++;
        } else {
            propLangIndex = (propLangIndex + 1) % propLanguages.length;
            propLang = propLanguages[propLangIndex];
            propStep = 0;
        }
        showPropStep(propStep, propLang);
        startAutoCycle('prop');
    } else if (currentSection === 'gemba-ojt') {
        console.log(`Next Gemba step: current step ${gembaStep}, lang ${gembaLang}`);
        if (gembaStep < gembaTotalSteps - 1) {
            gembaStep++;
        } else {
            gembaLangIndex = (gembaLangIndex + 1) % gembaLanguages.length;
            gembaLang = gembaLanguages[gembaLangIndex];
            gembaStep = 0;
        }
        showGembaStep(gembaStep, gembaLang);
        startAutoCycle('gemba');
    }
}

function startAutoCycle(section) {
    stopAutoCycle();
    console.log(`Starting auto-cycle for ${section}`);
    autoCycleInterval = setInterval(() => {
        if (section === 'fiveS' && currentSection === 'metrologie-5s') {
            nextStep();
        } else if (section === 'prop' && currentSection === 'proposition-amelioration') {
            nextStep();
        } else if (section === 'gemba' && currentSection === 'gemba-ojt') {
            nextStep();
        }
    }, 5000);
}

function stopAutoCycle() {
    if (autoCycleInterval) {
        console.log('Stopping auto-cycle');
        clearInterval(autoCycleInterval);
        autoCycleInterval = null;
    }
}

function goToLanding() {
    stopAutoCycle();
    showSection('landing');
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('Page loaded, initializing landing page');
    showSection('landing');
});
