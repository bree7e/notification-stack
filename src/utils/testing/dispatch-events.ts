import {
  createKeyboardEvent,
} from './event-objects';

/**
 * Функция вызывающая события на ноде.
 * @param node - нода на которой вызывается событие.
 * @param event - вызываемое на ноде событие.
 */
export function dispatchEvent(node: Node | Window, event: Event): Event {
  node.dispatchEvent(event);
  return event;
}

/** Функция генерирующая событие нажатия клавиши.
 * @param node - нода на которой вызывается событие.
 * @param type - тип события (тип нажатия на клавишу).
 * @param keyCode - код клавиши.
 * @param target - позволяет работать с элементом на котором происходит событие во время одной из
 *  фаз (поднятие/всплытие).
*/
export function dispatchKeyboardEvent(node: Node, type: string, keyCode: number, target?: Element):
KeyboardEvent {
  return dispatchEvent(node, createKeyboardEvent(type, keyCode, target)) as KeyboardEvent;
}
