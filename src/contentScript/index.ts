import { StylesType } from "../types";

let styles: StylesType = {
    imagePosition: {
        top: 0,
        right: 0,
    },
    primaryBackgroundColor: '#000',
    secondaryBackgroundColor: '#FFF',
    imageSrc: '',
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    styles = message;
    applyStyles(styles);
});

export function applyStyles(styles: StylesType) {
    function applyBackgroundColor(element: HTMLElement, color = 'white') {
        element.style.backgroundColor = color;
    }
    function handleNewElements(mutationsList: MutationRecord[], _: MutationObserver) {
        mutationsList.forEach((mutation) => {
            if (mutation.type === "childList") {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1) {
                        const elementNode = node as HTMLElement;
                        if (elementNode.classList.contains("text-token-text-primary")) {
                            applyBackgroundColor(elementNode, "#E51A4B");
                            applyBackgroundColor(elementNode.firstElementChild as HTMLElement, 'white');
                            const avatar = elementNode.firstElementChild?.firstElementChild as HTMLElement | null;
                            if (avatar && avatar.classList.contains("items-end")) {
                                avatar.style.marginLeft = '10px';
                            }
                        }

                    }
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        const elementNode = node as Element;
                        if (elementNode.tagName === 'HEADER') {
                          elementNode.remove();
                        }
                    }
                });
            }
        });
    }

    const textTokens = document.querySelectorAll(".text-token-text-primary");
    const avatars = document.querySelectorAll(".items-end");
    const main = document.querySelector('main');
    const chat = main!.lastElementChild;

    const body = document.querySelector('body');
    const header = document.querySelector('header');

    console.log('styles:', styles);

    const logo = document.createElement('img');
    logo.src = styles.imageSrc;
    logo.style.width = 'auto';
    logo.style.height = '50px';
    logo.style.top = `${styles.imagePosition.top}px`;
    logo.style.right = `${styles.imagePosition.right}px`;
    logo.style.position = 'fixed';

    body!.appendChild(logo);
    
    if (main) {
        applyBackgroundColor(main, styles.primaryBackgroundColor);
    }

    if (header) {
        header.remove();
    }

    if (chat) {
        applyBackgroundColor(chat as HTMLElement, styles.primaryBackgroundColor);
    }

    
    textTokens.forEach(item => {
        applyBackgroundColor(item as HTMLElement, styles.primaryBackgroundColor);
        applyBackgroundColor(item.firstElementChild as HTMLElement, styles.secondaryBackgroundColor);
    });
    avatars.forEach(item => {
        const avatar = item as HTMLElement;
        avatar.style.marginLeft = '10px';
    });
    const observer = new MutationObserver(handleNewElements);
    observer.observe(document.body, { childList: true, subtree: true });
}