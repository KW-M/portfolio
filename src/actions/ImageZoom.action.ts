import nStore from "$lib/libraries/nStore";

const durration = 600;
const MARGIN = 0;
export const previewZoomOpen = nStore<boolean>(false);


interface ZoomOptions {
  zoomed: boolean;
  width: number;
  height: number;
}

const calculateTargetZoom = (width: number, height: number) => {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const zoomedScale = Math.min(windowWidth / width, windowHeight / height);
  const fullWidth = width * zoomedScale - MARGIN * 2;
  const fullHeight = height * zoomedScale - MARGIN * 2;
  const fullX = (windowWidth - fullWidth) / 2;
  const fullY = (windowHeight - fullHeight) / 2;
  return { fullWidth, fullHeight, fullX, fullY }
}

const calculateReverseZoom = (originalBbox: DOMRect, fullWidth: number, fullHeight: number) => {
  const { width, height, left, top } = originalBbox;
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  fullWidth = fullWidth - MARGIN * 2;
  fullHeight = fullHeight - MARGIN * 2;

  const scale = Math.min(width / fullWidth, height / fullHeight);
  const translateX = -windowWidth / 2 + (left + width / 2)
  const translateY = -windowHeight / 2 + (top + height / 2)
  return { scale, translateX, translateY }
}

type TargetZoom = ReturnType<typeof calculateTargetZoom>;

export function attachZoom(zoomElem: HTMLElement, options: ZoomOptions) {
  const zoomContainer = document.getElementById('imgZoomContainer');

  let thisZoomOpen = false;
  let scrollStart = 0;
  let transitionDone = true;
  let transtitonOutStartTime = 0;
  let parentElement: HTMLElement;
  let originalBbox: DOMRect;
  let originalStyle: CSSStyleDeclaration;
  let targetZoom: TargetZoom;

  const handleKeyDown = () => {
    zoomContract();
  }

  const handleScroll = () => {
    if (Math.abs(window.scrollY - scrollStart) > 10) {
      zoomContract();
    }
  }

  const applyStyle = (applyReverseTransform: boolean, fixed: boolean, doTransition: boolean, showOnTop: boolean, transitionDurration: number = 600) => {
    if (!zoomContainer || !zoomElem) return;
    const { fullWidth, fullHeight, fullX, fullY } = targetZoom;
    let transform = '';
    if (applyReverseTransform) {
      const { scale, translateX, translateY } = calculateReverseZoom(originalBbox, fullWidth, fullHeight);
      transform = 'translate(' + translateX + 'px, ' + translateY + 'px) scale(' + scale + ')';
    } else {
      transform = 'translate(0px, 0px) scale(1)'
    }
    const position = fixed ? 'fixed' : 'absolute';
    const transition = doTransition ? `transform ${transitionDurration}ms` : 'none';
    const top = (fixed ? fullY : fullY + window.scrollY) + 'px';
    const left = fullX + 'px';
    Object.assign(zoomElem.style, {
      transition,
      transform,
      position,
      touchAction: 'pinch-zoom',
      borderRadius: '10px',
      zIndex: showOnTop ? 1001 : 0,
      width: fullWidth + 'px',
      height: fullHeight + 'px',
      top,
      left,
    })
  }

  const transitionOut = () => {
    if (previewZoomOpen.get() || !zoomContainer || !zoomElem || transitionDone) return;
    if (parentElement) originalBbox = parentElement.getBoundingClientRect();
    const transitionTimeLeft = Math.max(durration - (Date.now() - transtitonOutStartTime), 0);
    applyStyle(true, true, true, true, transitionTimeLeft);
    requestAnimationFrame(transitionOut);
  }

  const transitionOutFinished = () => {
    if (transitionDone) return;
    transitionDone = true;
    if (!zoomElem) return;
    if (zoomElem.nodeName == 'VIDEO') {
      (zoomElem as HTMLVideoElement).controls = false;
      (zoomElem as HTMLVideoElement).play();
    } if (parentElement) {
      parentElement.appendChild(zoomElem);
      Object.assign(zoomElem.style, originalStyle);
    } else zoomElem.parentElement?.removeChild(zoomElem);
    zoomElem.removeEventListener('transitionend', transitionOutFinished);
    zoomElem.dispatchEvent(new Event('zoomClose'));
  }

  const handleResize = () => {
    if (!open || !zoomContainer || !zoomElem) return;
    targetZoom = calculateTargetZoom(options.width, options.height);
    applyStyle(false, true, false, true);
  }

  const zoomExpand = () => {
    transitionDone = false;
    if (previewZoomOpen.get() || !zoomContainer || !zoomElem) return;
    if (zoomElem.nodeName == 'VIDEO') {
      (zoomElem as HTMLVideoElement).controls = true;
      (zoomElem as HTMLVideoElement).play();
    }
    const pe = zoomElem.parentElement;
    if (pe && pe != document.body) parentElement = zoomElem.parentElement as HTMLElement;
    if (!parentElement) return;
    previewZoomOpen.set(thisZoomOpen = true);
    scrollStart = window.scrollY;
    originalBbox = parentElement.getBoundingClientRect();
    if (!originalStyle) originalStyle = {
      transition: zoomElem.style.transition,
      transform: zoomElem.style.transform,
      width: zoomElem.style.width,
      height: zoomElem.style.height,
      top: zoomElem.style.top,
      left: zoomElem.style.left,
      opacity: zoomElem.style.opacity,
    } as CSSStyleDeclaration;

    zoomContainer.classList.add('zoomOpen');
    document.body.appendChild(zoomElem);
    targetZoom = calculateTargetZoom(options.width, options.height);
    zoomContainer.addEventListener('click', zoomContract);
    zoomElem.addEventListener('click', zoomContract);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    applyStyle(true, true, false, true);
    requestAnimationFrame(() => {
      if (!open || !zoomContainer || !zoomElem) return;
      applyStyle(false, true, true, true);
      transitionDone = true;
    });
  }

  const zoomContract = (event?: PointerEvent) => {
    if (event && event.bubbles) { event.preventDefault(); event.stopPropagation(); }
    if (!thisZoomOpen || !transitionDone) return;
    transitionDone = false;
    previewZoomOpen.set(thisZoomOpen = false);
    if (zoomContainer && zoomElem && parentElement) {
      zoomContainer.classList.remove('zoomOpen');
      zoomContainer.removeEventListener('click', zoomContract);
      zoomElem.removeEventListener('click', zoomContract);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      originalBbox = parentElement.getBoundingClientRect();
      zoomElem.addEventListener('transitionend', transitionOutFinished);
      transtitonOutStartTime = Date.now();
      transitionOut();
    } else {
      transitionOutFinished();
    }
  }

  return {
    update(newOptions: ZoomOptions) {
      if (newOptions.zoomed) {
        zoomExpand()
      } else {
        zoomContract()
      }
    },
    destroy() {
      if (thisZoomOpen) previewZoomOpen.set(thisZoomOpen = false);
      if (zoomElem) {
        zoomElem.removeEventListener('transitionend', transitionOutFinished);
        zoomElem.removeEventListener('click', zoomContract);
        if (parentElement) parentElement.appendChild(zoomElem);
        else zoomElem.parentElement?.removeChild(zoomElem);
        Object.assign(zoomElem.style, originalStyle);
      }
      if (zoomContainer) {
        zoomContainer.classList.remove('zoomOpen');
        zoomContainer.removeEventListener('click', zoomContract);
      }
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    },
  }
}
