import Abstract from '@view/abstract.js';

export const RenderPosition = {
  AFTER_BEGIN: 'afterbegin',
  BEFORE_END: 'beforeend',
};

export const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};


export const render = (container, child, place) => {
  if (container instanceof Abstract) {
    container = container.getElement();
  }

  if (child instanceof Abstract) {
    child = child.getElement();
  }

  switch (place) {
    case RenderPosition.AFTER_BEGIN:
      container.prepend(child);
      break;
    case RenderPosition.BEFORE_END:
      container.append(child);
      break;
  }
};
