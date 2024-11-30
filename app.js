const selectElement = document.querySelector('select');
const transletedElements = document.querySelectorAll('[data-lang]');

const getTranslate = async (translates) => {
    const response = await fetch(translates);
    const data = await response.json();
    return data;
};

const updateLanguage = async (language) => {
    const translate = await getTranslate(`./l10n/${language}.json`);
    for (const translatedElement of transletedElements) {
        const key = translatedElement.getAttribute('data-lang');
        translatedElement.textContent = translate[key];
    }
};

const handleSelect = async (e) => {
    const { target } = e;
    const { value } = target;
    console.log(value);

    localStorage.setItem('selectedLanguage', value);

    const result = await updateLanguage(value);
    return result
};

const initLanguage = async () => {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'ru'; 
    selectElement.value = savedLanguage; 
    const result = await updateLanguage(savedLanguage);
    return result
};

selectElement.addEventListener('change', handleSelect);

initLanguage();