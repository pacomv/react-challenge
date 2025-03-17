import ReactDOM from "react-dom/client";
import globalStyles from "@/index.css?inline";
import phoneInputStyles from "react-international-phone/style.css?inline";

import { AccommodationForm } from "@/components/AccommodationForm";

class AccommodationFormElement extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: "open" });
    const root = ReactDOM.createRoot(shadowRoot);

    const style = document.createElement("style");
    style.textContent = globalStyles;
    shadowRoot.appendChild(style);

    const phoneInputStyle = document.createElement("style");
    phoneInputStyle.textContent = phoneInputStyles;
    shadowRoot.appendChild(phoneInputStyle);

    root.render(<AccommodationForm onSubmit={this?.onSubmit} />);
  }

  async onSubmit(values: unknown) {
    this?.dispatchEvent(
      new CustomEvent("custom-react-submit", {
        detail: values,
        bubbles: true,
        composed: true,
      })
    );
  }
}

customElements.define("custom-react-form", AccommodationFormElement);
