// Intercept attachShadow to find and hide the Spline logo watermark inside closed/open shadow DOMs
(function () {
  if (typeof window !== "undefined") {
    const originalAttachShadow = Element.prototype.attachShadow;
    Element.prototype.attachShadow = function (init) {
      const shadowRoot = originalAttachShadow.call(this, init);
      
      const hideSplineLogo = () => {
        try {
          const logo = shadowRoot.getElementById("logo");
          if (logo) {
            logo.style.display = "none";
            logo.style.visibility = "hidden";
            logo.style.opacity = "0";
            logo.style.pointerEvents = "none";
            logo.remove();
          }
          const links = shadowRoot.querySelectorAll('a[href*="spline"]');
          links.forEach((link) => {
            const htmlLink = link as HTMLElement;
            htmlLink.style.display = "none";
            htmlLink.style.visibility = "hidden";
            htmlLink.style.opacity = "0";
            htmlLink.style.pointerEvents = "none";
            htmlLink.remove();
          });
        } catch (e) {
          // ignore
        }
      };

      // Run multiple times as Spline scene finishes loading dynamically
      hideSplineLogo();
      for (const delay of [100, 250, 500, 1000, 2000, 5000, 10000]) {
        setTimeout(hideSplineLogo, delay);
      }

      return shadowRoot;
    };
  }
})();

import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
