
const AppState = {
    currentText: "",
    fontFamily: "'Inter', sans-serif",
    fontSize: "16px",
    color: "#e0e0e0"
};

const dom = {
    input: document.getElementById('textInput'),
    preview: document.getElementById('livePreview'),
    charCount: document.getElementById('charCount'),
    wordCount: document.getElementById('wordCount'),
    fontSelect: document.getElementById('fontSelect'),
    fontSize: document.getElementById('fontSizeInput'),
    colorInput: document.getElementById('colorInput')
};

const updatePreview = () => {
    dom.preview.textContent = dom.input.value || "Start typing to see the preview...";

    const text = dom.input.value;
    dom.charCount.textContent = `${text.length} Characters`;


    const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
    dom.wordCount.textContent = `${words} Words`;
};

const textManager = {

    updateText: (newText) => {
        dom.input.value = newText;
        updatePreview();
    },

    toUpperCase: () => {
        textManager.updateText(dom.input.value.toUpperCase());
    },

    toLowerCase: () => {
        textManager.updateText(dom.input.value.toLowerCase());
    },

    toTitleCase: () => {
        const text = dom.input.value.toLowerCase();
        const titleCase = text.split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
        textManager.updateText(titleCase);
    },

    toSentenceCase: () => {
        const text = dom.input.value.toLowerCase();

        const sentenceCase = text.charAt(0).toUpperCase() + text.slice(1);
        textManager.updateText(sentenceCase);
    },

    toPascalCase: () => {
        const text = dom.input.value.toLowerCase();
        const pascalCase = text.split(/[^a-zA-Z0-9]/) 
            .filter(word => word.length > 0)
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join('');
        textManager.updateText(pascalCase);
    },

    toCamelCase: () => {
        const text = dom.input.value.toLowerCase();
        const words = text.split(/[^a-zA-Z0-9]/).filter(word => word.length > 0);

        const camelCase = words.map((word, index) => {
            if (index === 0) return word;
            return word.charAt(0).toUpperCase() + word.slice(1);
        }).join('');

        textManager.updateText(camelCase);
    },

    toSnakeCase: () => {
        const text = dom.input.value.toLowerCase().trim();
        const snakeCase = text.split(/\s+/).join('_');
        textManager.updateText(snakeCase);
    }
};

const styleManager = {

    changeFont: () => {
        const font = dom.fontSelect.value;
        dom.preview.style.fontFamily = font;
        AppState.fontFamily = font;
    },

    changeSize: () => {
        const size = dom.fontSize.value + "px";
        dom.preview.style.fontSize = size;
        AppState.fontSize = size;
    },

    changeColor: () => {
        const color = dom.colorInput.value;
        dom.preview.style.color = color;
        AppState.color = color;
    }
};

const featureManager = {

    copyText: () => {
        const text = dom.input.value;
        if (!text) return;

        navigator.clipboard.writeText(text).then(() => {
            alert("Text copied to clipboard!"); 
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    },

    clearText: () => {
        if (confirm("Are you sure you want to clear the text?")) {
            dom.input.value = "";
            updatePreview();
        }
    }
};

const translateManager = {
    mockTranslate: () => {
        const lang = document.getElementById('langSelect').value;
        const text = dom.input.value;

        if (!text) return;
        if (lang === 'en') return;

        const suffixMap = {
            'es': ' [Translated to Spanish]',
            'fr': ' [Translated to French]',
            'de': ' [Translated to German]',
            'jp': ' [Translated to Japanese]'
        };

        dom.preview.textContent = "Translating...";

        setTimeout(() => {
            dom.input.value = text + suffixMap[lang];
            updatePreview();
            alert(`Mock Translation to ${lang.toUpperCase()} completed!\n(Note: This is a demo feature without a real backend)`);
        }, 500);
    }
};


dom.input.addEventListener('input', updatePreview);
updatePreview();
