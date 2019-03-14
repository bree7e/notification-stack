/** Функция отправляющая событие нажатия клавиши из элемента.
 * @param type - тип события.
 * @param keyCode - код клавиши
 * @param target - позволяет работать с элементом на котором происходит событие во время одной из
 *  фаз (поднятие/всплытие).
 * @param key - DOMString, представлающее значение клавиши, на которой возникло событие.
 */
export function createKeyboardEvent(type: string, keyCode: number, target?: Element, key?: string) {
  const event = document.createEvent('KeyboardEvent') as any;
  // Firefox не поддерживает `initKeyboardEvent`, но поддерживает `initKeyEvent`.
  const initEventFn = (event.initKeyEvent || event.initKeyboardEvent).bind(event);
  const originalPreventDefault = event.preventDefault;

  initEventFn(type, true, true, window, 0, 0, 0, 0, 0, keyCode);

  // Webkit браузеры не устанавливают keyCode, во время инициализации.
  // См. ошибку https://bugs.webkit.org/show_bug.cgi?id=16735
  Object.defineProperties(event, {
    keyCode: { get: () => keyCode },
    key: { get: () => key },
    target: { get: () => target },
  });

  // IE не установит `defaultPrevented` на искусственное событие, поэтому мы должны сделать это вручную.
  event.preventDefault = function() {
    Object.defineProperty(event, 'defaultPrevented', { get: () => true });
    return originalPreventDefault.apply(this, arguments);
  };

  return event;
}
