document.addEventListener('DOMContentLoaded', () => {
    // Language arrays
    const fiveSLanguages = ['fr', 'ar', 'en', 'de'];
    const propLanguages = ['fr', 'ar', 'en'];
    const gembaLanguages = ['fr', 'ar', 'en'];
    let fiveSLang = 'fr', propLang = 'fr', gembaLang = 'fr';
    let fiveSLangIndex = 0, propLangIndex = 0, gembaLangIndex = 0;
    let currentSection = 'landing-page';
    let fiveSStep = 0, propStep = 0, gembaStep = 0;
    const fiveSTotalSteps = 6, propTotalSteps = 4, gembaTotalSteps = 3;
    let autoCycleInterval = null;

    // Translations for titles
    const translations = {
        fr: { title: 'WKW Automotive - Amélioration Continue' },
        ar: { title: 'WKW Automotive - التحسين المستمر' },
        en: { title: 'WKW Automotive - Continuous Improvement' },
        de: { title: 'WKW Automotive - Kontinuierliche Verbesserung' }
    };

    // Utility to update title data-text
    const updateTitleData = () => {
        const title = document.getElementById('title');
        title.setAttribute('data-text', title.textContent);
    };

    // Show section
    function showSection(sectionId) {
        document.querySelectorAll('.landing-page, #metrologie-5s, #proposition-amelioration, #gemba-ojt').forEach(el => el.classList.add('hidden'));
        document.getElementById(sectionId).classList.remove('hidden');
        document.getElementById('return-button').classList.toggle('hidden', sectionId === 'landing-page');
        document.getElementById('prev-button').classList.toggle('hidden', sectionId === 'landing-page');
        document.getElementById('next-button').classList.toggle('hidden', sectionId === 'landing-page');
        currentSection = sectionId;
        const lang = sectionId === 'metrologie-5s' ? fiveSLang : sectionId === 'proposition-amelioration' ? propLang : sectionId === 'gemba-ojt' ? gembaLang : 'fr';
        document.getElementById('title').textContent = translations[lang].title;
        document.documentElement.setAttribute('lang', lang);
        document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
        updateTitleData();
    }

    // Show steps
    function showFiveSStep(step, lang) {
        console.log(`[5S] Showing step ${step} in ${lang}`);
        document.querySelectorAll('#metrologie-5s .step').forEach((el, index) => {
            const isActive = parseInt(el.getAttribute('data-step')) === step && el.getAttribute('data-lang') === lang;
            el.classList.toggle('active', isActive);
            el.classList.toggle('entering', isActive);
            el.classList.toggle('hidden', !isActive);
        });
        document.getElementById('prev-button').classList.toggle('hidden', step === 0);
        document.getElementById('next-button').classList.toggle('hidden', step === fiveSTotalSteps - 1);
        document.getElementById('title').textContent = translations[lang].title;
        document.documentElement.setAttribute('lang', lang);
        document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
        updateTitleData();
    }

    function showPropStep(step, lang) {
        console.log(`[Proposition] Showing step ${step} in ${lang}`);
        document.querySelectorAll('#proposition-amelioration .step').forEach((el, index) => {
            const isActive = parseInt(el.getAttribute('data-step')) === step && el.getAttribute('data-lang') === lang;
            el.classList.toggle('active', isActive);
            el.classList.toggle('entering', isActive);
            el.classList.toggle('hidden', !isActive);
        });
        document.getElementById('prev-button').classList.toggle('hidden', step === 0);
        document.getElementById('next-button').classList.toggle('hidden', step === propTotalSteps - 1);
        document.getElementById('title').textContent = translations[lang].title;
        document.documentElement.setAttribute('lang', lang);
        document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
        updateTitleData();
    }

    function showGembaStep(step, lang) {
        console.log(`[Gemba] Showing step ${step} in ${lang}`);
        document.querySelectorAll('#gemba-ojt .step').forEach((el, index) => {
            const isActive = parseInt(el.getAttribute('data-step')) === step && el.getAttribute('data-lang') === lang;
            el.classList.toggle('active', isActive);
            el.classList.toggle('entering', isActive);
            el.classList.toggle('hidden', !isActive);
        });
        document.getElementById('prev-button').classList.toggle('hidden', step === 0);
        document.getElementById('next-button').classList.toggle('hidden', step === gembaTotalSteps - 1);
        document.getElementById('title').textContent = translations[lang].title;
        document.documentElement.setAttribute('lang', lang);
        document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
        updateTitleData();
    }

    // Auto-cycle
    function startAutoCycle(section) {
        stopAutoCycle();
        autoCycleInterval = setInterval(() => {
            if (section === 'fiveS') {
                fiveSStep = (fiveSStep + 1) % fiveSTotalSteps;
                showFiveSStep(fiveSStep, fiveSLang);
            } else if (section === 'prop') {
                propStep = (propStep + 1) % propTotalSteps;
                showPropStep(propStep, propLang);
            } else if (section === 'gemba') {
                gembaStep = (gembaStep + 1) % gembaTotalSteps;
                showGembaStep(gembaStep, gembaLang);
            }
        }, 5000);
    }

    function stopAutoCycle() {
        if (autoCycleInterval) {
            clearInterval(autoCycleInterval);
            autoCycleInterval = null;
        }
    }

    // Event listeners
    document.querySelectorAll('.section-link').forEach(link => {
        link.addEventListener('click', () => {
            stopAutoCycle();
            const section = link.getAttribute('data-section');
            showSection(section);
            if (section === 'metrologie-5s') {
                fiveSStep = 0;
                showFiveSStep(fiveSStep, fiveSLang);
                startAutoCycle('fiveS');
            } else if (section === 'proposition-amelioration') {
                propStep = 0;
                showPropStep(propStep, propLang);
                startAutoCycle('prop');
            } else if (section === 'gemba-ojt') {
                gembaStep = 0;
                showGembaStep(gembaStep, gembaLang);
                startAutoCycle('gemba');
            }
        });
    });

    document.getElementById('return-button').addEventListener('click', () => {
        stopAutoCycle();
        showSection('landing-page');
    });

    document.getElementById('prev-button').addEventListener('click', () => {
        stopAutoCycle();
        if (currentSection === 'metrologie-5s' && fiveSStep > 0) {
            fiveSStep--;
            showFiveSStep(fiveSStep, fiveSLang);
        } else if (currentSection === 'proposition-amelioration' && propStep > 0) {
            propStep--;
            showPropStep(propStep, propLang);
        } else if (currentSection === 'gemba-ojt' && gembaStep > 0) {
            gembaStep--;
            showGembaStep(gembaStep, gembaLang);
        }
        startAutoCycle(currentSection === 'metrologie-5s' ? 'fiveS' : currentSection === 'proposition-amelioration' ? 'prop' : 'gemba');
    });

    document.getElementById('next-button').addEventListener('click', () => {
        stopAutoCycle();
        if (currentSection === 'metrologie-5s' && fiveSStep < fiveSTotalSteps - 1) {
            fiveSStep++;
            showFiveSStep(fiveSStep, fiveSLang);
        } else if (currentSection === 'proposition-amelioration' && propStep < propTotalSteps - 1) {
            propStep++;
            showPropStep(propStep, propLang);
        } else if (currentSection === 'gemba-ojt' && gembaStep < gembaTotalSteps - 1) {
            gembaStep++;
            showGembaStep(gembaStep, gembaLang);
        }
        startAutoCycle(currentSection === 'metrologie-5s' ? 'fiveS' : currentSection === 'proposition-amelioration' ? 'prop' : 'gemba');
    });

    // Language switcher
    const langSelect = document.getElementById('language-select');
    if (langSelect) {
        langSelect.addEventListener('change', (e) => {
            const lang = e.target.value;
            stopAutoCycle();
            if (currentSection === 'metrologie-5s') {
                if (fiveSLanguages.includes(lang)) {
                    fiveSLangIndex = fiveSLanguages.indexOf(lang);
                    fiveSLang = lang;
                    showFiveSStep(fiveSStep, fiveSLang);
                    startAutoCycle('fiveS');
                }
            } else if (currentSection === 'proposition-amelioration') {
                if (propLanguages.includes(lang)) {
                    propLangIndex = propLanguages.indexOf(lang);
                    propLang = lang;
                    showPropStep(propStep, propLang);
                    startAutoCycle('prop');
                }
            } else if (currentSection === 'gemba-ojt') {
                if (gembaLanguages.includes(lang)) {
                    gembaLangIndex = gembaLanguages.indexOf(lang);
                    gembaLang = lang;
                    showGembaStep(gembaStep, gembaLang);
                    startAutoCycle('gemba');
                }
            } else {
                document.documentElement.setAttribute('lang', lang);
                document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
                document.getElementById('title').textContent = translations[lang].title;
                updateTitleData();
            }
        });
    }

    // Initialize
    showSection('landing-page');
    updateTitleData();
});
