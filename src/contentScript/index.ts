import {StylesType} from "../types";

let styles: StylesType = {
    imagePosition: {
        top: 0,
        right: 0,
    },
    primaryBackgroundColor: '#00e3ca',
    secondaryBackgroundColor: '#ff0000',
    imageSrc: '',
    textColor: '#000dff',
    inputColor: '#00ff97',
    headColor: '#76ff03',

}

chrome.runtime.onMessage.addListener((message) => {
    styles = message;
    applyStyles(styles);
});


export function applyStyles(styles: StylesType) {
    function applyBackgroundColor(element: HTMLElement, color = 'white') {
        element.style.backgroundColor = color;
    }

    function applyTextAreaBackgroundColor(textareas: NodeListOf<HTMLTextAreaElement>, color: string) {
        textareas.forEach(textarea => {
            let parentElement = textarea.parentElement;
            while (parentElement) {
                parentElement.classList.remove('bg-white', 'dark:bg-gray-800', 'shadow-[0_0_0_2px_rgba(255,255,255,0.95)]');
                parentElement = parentElement.parentElement;
            }

            textarea.style.backgroundColor = color;
        });
    }


    const textTokens = document.querySelectorAll('.w-full.text-token-text-primary');
    const textareas = document.querySelectorAll('textarea');

    const avatars = document.querySelectorAll(".items-end");
    const main = document.querySelector('main');
    const chat = main!.lastElementChild;
    const up = document.querySelector('.sticky.top-0.mb-1\\.5.flex.items-center.justify-between.z-10.h-14.bg-white.p-2.font-semibold.dark\\:bg-gray-800') as HTMLElement | null;

    const body = document.querySelector('body');

    console.log('styles:', styles);

    const logo = document.createElement('img');
    logo.src = styles.imageSrc;
    logo.style.width = 'auto';
    logo.style.height = '50px';
    logo.style.top = `${styles.imagePosition.top}px`;
    logo.style.right = `${styles.imagePosition.right}px`;
    logo.style.position = 'fixed';

    body!.appendChild(logo);

    function changeColorAutomatically() {
        const elements = document.querySelectorAll('[data-testid^="conversation-turn-"]');
        elements.forEach((element, index) => {
            if (element instanceof HTMLElement) {
                const nestedDiv = element.querySelector('div');
                if (nestedDiv instanceof HTMLElement) {
                    const secondNestedDiv = nestedDiv.querySelector('div');
                    if (secondNestedDiv instanceof HTMLElement) {
                        if ((index + 1) % 2 === 0) {
                            secondNestedDiv.style.backgroundColor = styles.secondaryBackgroundColor;
                        } else {
                            secondNestedDiv.style.backgroundColor = styles.textColor;
                        }
                    }
                }
            }
        });
    }

    if (main) {
        applyBackgroundColor(main, styles.primaryBackgroundColor);
    }
    if (chat) {
        applyBackgroundColor(chat as HTMLElement, styles.primaryBackgroundColor);
    }
    if (up) {
        applyBackgroundColor(up, styles.headColor);
    }
    textTokens.forEach(item => {
        applyBackgroundColor(item as HTMLElement, styles.primaryBackgroundColor);
        applyBackgroundColor(item.firstElementChild as HTMLElement, styles.primaryBackgroundColor);
    });

    avatars.forEach(item => {
        const avatar = item as HTMLElement;
        avatar.style.marginLeft = '10px';
    });
    applyTextAreaBackgroundColor(textareas as NodeListOf<HTMLTextAreaElement>, styles.inputColor);

    const observer = new MutationObserver(() => {
        changeColorAutomatically();
    });
    observer.observe(document.body, {childList: true, subtree: true});
}