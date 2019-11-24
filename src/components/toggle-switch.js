const toggleStyle = `
        .switch {
          position: relative;
          display: inline-block;
          width: 52px;
          height: 26px;
        }

        input.toggle {
          display: none;
        }

        .slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #ccc;
            background-color: var(--slider-background-color, #ccc);
            -webkit-transition: .4s;
            transition: .4s;

            box-shadow:         inset 0 0 3px #545454;
            box-shadow:         inset 0 0 3px var(--slider-box-shadow-color, #545454);
        }

        .slider:before {
            position: absolute;
            content: "";
            height: 25px;
            width: 25px;
            background-color: white;
            background-color: var(--slider-thumb-unchecked-color, white);
            -webkit-transition: .4s;
            transition: .4s;
            border-width: 0.5px;
            border-radius: 50%;
            border-color: #CDCDCD;
            border-style: solid;

            box-shadow:          0 0 3px #CDCDCD;
        }
        input:checked + .slider {
          background-color: #2196F3;
          background-color: var(--slider-checked-background-color, #2196F3);
        }

        input:checked + .slider:before {
          background-color: white;
          background-color: var(--slider-thumb-checked-color, white);
        }

        input:checked + .slider:before {
            -webkit-transform: translateX(26px);
            -ms-transform: translateX(26px);
            transform: translateX(26px);
        }

        input:disabled + .slider:before {
          background-color: #F2F2F2;
          background-color: var(--slider-thumb-disabled-color, #F2F2F2);
        }

        input:disabled + .slider {
          background-color: #E6E6E6;
          background-color: var(--slider-disabled-color, #E6E6E6);
        }

        /* Rounded sliders */
        .slider.round {
            border-radius: 34px;
        }

        .slider.round:before {
            border-radius: 50%;
        }
`;

/**
 * Toggle switch Component
 *
 * This is a web component that wraps an input checkbox and displays
 * as a toggle switch.
 *
 * Attributes available:
 *  1. checked attribute determines the current state of the toggle switch.
 *      expects a boolean value 'true'/'false'
 *
 * CSS customization variables:
 *  1. --slider-background-color
 *  2. --slider-checked-background-color
 *  3. --slider-thumb-unchecked-color
 *  4. --slider-thumb-checked-color
 *  5. --slider-disabled-color
 *  6. --slider-thumb-disabled-color
 *
 *
 *
 * Events bubbled:
 *   1. Input event on the input element
 *   2. Change event on the input element
 *
 * Example:
 * ```
 * <style>
 *  toggle-switch {
 *    .slider {
 *      --slider-background-color: white;
 *      --slider-checked-background-color: white;
 *      --slider-thumb-unchecked-color: grey;
 *      --slider-thumb-checked-color: blue;
 *      --slider-disabled-color: grey;
 *      --slider-thumb-disabled-color: moregrey;
 *
 *    }
 *  }
 * </style>
 *  <toggle-switch checked></toggle-switch>
 * ```
 *
 * @name toggle-switch
 */
class ToggleSwitch extends HTMLElement {
 static get observedAttributes() {
  return ['checked', 'disabled'];
 }

  get value() {
    return this.hasAttribute('checked');
  }

  set value(checked) {
    if (checked) {
      this.setAttribute('checked', '');
    } else {
      this.removeAttribute('checked');
    }
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }

  set disabled(disabled) {
    if (disabled) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }

  constructor() {
    super();
  }

  initializeDom() {
    this.setAttribute('role', 'switch checkbox');
    this.setAttribute('tabindex', '0');
    this.setAttribute('aria-checked', String(this.value));

    const label = document.createElement('label');
    label.classList.add('switch');
    label.setAttribute('id', 'toggle-label');

    this.input = document.createElement('input');
    this.input.setAttribute('type', 'checkbox');
    this.input.onchange = (e) => this.onChange(e);
    this.input.checked = this.value;
    this.input.classList.add('toggle');
    this.input.setAttribute('aria-describedby', 'toggle-label');
    if (this.disabled) {
      this.input.setAttribute('disabled', '');
    }

    this.addEventListener('keypress', (e) => this.onKeyPress(e));

    const span = document.createElement('span');
    span.classList.add('slider', 'round');
    span.setAttribute('id', 'slider');

    label.append(this.input, span);
    this.appendChild(label);
  }

  connectedCallback() {
    this.addStyles(toggleStyle);
    this.initializeDom();
  }

  addStyles(styles) {
    const toggleSwitchId = 'toggle-switch-style';

    // Don't add style more than once.
    if (!document.getElementById(toggleSwitchId)) {
      const styleEl = document.createElement('style');
      styleEl.id = toggleSwitchId;
      styleEl.appendChild(document.createTextNode(styles));

      let insertPoint = document.querySelector('style');
      if (insertPoint) {
        insertPoint.parentNode.insertBefore(styleEl, insertPoint);
      } else if (insertPoint = document.querySelector('head')) {
        insertPoint.appendChild(styleEl);
      } else {
        document.appendChild(styleEl);
      }
    }
  }

  onChange(event) {
    if (!this.disabled) {
      this.value = !this.value;
      this.input.checked = this.value;
      this.setAttribute('aria-checked', String(this.value));

      this.dispatchEvent(new Event('input', {bubbles: true, composed: true}));
      this.dispatchEvent(new Event('change', {bubbles: true, composed: true}));
    }
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    if (attrName === 'checked' && this.input) {
      this.input.checked = newVal === '';
      this.setAttribute('aria-checked', String(this.value));
    }

    if (attrName === 'disabled' && this.input) {
      if (newVal) {
        this.disabled = true;
        this.input.setAttribute('disabled', '');
      } else {
        this.disabled = false;
        this.input.removeAttribute('disabled');
      }
    }
  }

  onKeyPress(event) {
    if (event.keyCode === 32) {
      this.onChange(event);
      event.preventDefault();
    }
  }

  disconnectedCallback() {
    this.removeEventListener('keypress', (e) => this.onKeyPress(e));
  }
}

customElements.define('toggle-switch', ToggleSwitch);
