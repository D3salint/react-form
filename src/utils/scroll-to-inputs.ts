const getPosY = (el: HTMLElement) => {
    return el.getBoundingClientRect().top + window.pageYOffset;
}

export function scrollToError(errors: Record<string,any>) {
    const names = Object.keys(errors);

    let scrollEl: HTMLElement | null = null;

    
    for(const name of names) {
        const el = (document.querySelector(`input[name="${name}"]`)
            || document.querySelector(`[data-input-name="${name}"]`)) as HTMLElement;
        
        if(!el) {
            continue;
        }
        
        if(!scrollEl) {
            scrollEl = el;
            continue;
        }

        if(getPosY(el) < getPosY(scrollEl)) {
            scrollEl = el;
        }
    }

    if(scrollEl) {
        scrollEl.scrollIntoView({ 
            behavior: "smooth",
            block: "center" 
        });
    }
}