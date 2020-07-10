import {capitalize} from '@core/utils';

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error(`No $root provided for DomListener!`);
    }
    this.$root = $root;
    this.listeners = listeners;
  }

  initDomListeners() {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener);
      if (!this[method]) {
        console.error(new Error(`Method ${method} is not implemented in ${this.name} component`));
      } else if (typeof this[method] !== 'function') {
        console.error(new Error(`${method} is not a function in ${this.name} component`));
      } else {
        this[method] = this[method].bind(this);
        this.$root.on(listener, this[method]);
      }
    });
  }

  removeDomListeners() {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener);
      this.$root.off(listener, this[method]);
    });
  }
}

function getMethodName(eventName, prefix = 'on') {
  return prefix + capitalize(eventName);
}
