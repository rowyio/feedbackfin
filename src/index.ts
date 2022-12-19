import { computePosition, flip, shift } from "@floating-ui/dom";
import { createFocusTrap } from "focus-trap";

import { formHTML } from "./form-html";
import { npsHTML } from "./nps-html";
import formCSS from "./form.css";
import npsCSS from "./nps.css";

export type FeedbackFinConfig = {
  url: string;
  user: Record<any, any>;
  disableErrorAlert: boolean;
  mode: string;
};
const config: FeedbackFinConfig = {
  url: "",
  user: {},
  disableErrorAlert: false,
  mode: "form",
  // Spread user config when loaded
  ...(window as any).feedbackfin?.config,
};

function init() {
  const styleElement = document.createElement("style");
  styleElement.id = "feedbackfin__css";
  styleElement.innerHTML = config.mode === "nps" ? npsCSS : formCSS;

  document.head.insertBefore(styleElement, document.head.firstChild);

  document.querySelectorAll("[data-feedbackfin-button]").forEach((el) => {
    el.addEventListener("click", open);
  });
}
window.addEventListener("load", init);

const containerElement = document.createElement("div");
containerElement.id = "feedbackfin__container";

const trap = createFocusTrap(containerElement, {
  initialFocus: "#feedbackfin__radio--issue",
  allowOutsideClick: true,
});

function open(e: Event) {
  document.body.appendChild(containerElement);
  containerElement.innerHTML = config.mode === "nps" ? npsHTML : formHTML;
  containerElement.style.display = "block";

  const target = (e?.target as HTMLElement) || document.body;
  computePosition(target, containerElement, {
    placement: "bottom",
    middleware: [flip(), shift({ crossAxis: true, padding: 8 })],
    strategy: "fixed",
  }).then(({ x, y }) => {
    Object.assign(containerElement.style, {
      left: `${x}px`,
      top: `${y}px`,
    });
  });

  trap.activate();

  document
    .getElementById("feedbackfin__close")!
    .addEventListener("click", close);

  Array.from(
    containerElement.getElementsByClassName("feedbackfin__radio")
  ).forEach((el) => {
    el.addEventListener("change", changeType);
  });

  document
    .getElementById("feedbackfin__form")!
    .addEventListener("submit", submit);

  document.getElementById("feedbackfin__back")!.addEventListener("click", back);
}

function close() {
  trap.deactivate();

  containerElement.innerHTML = "";

  containerElement.remove();
  containerElement.removeAttribute("data-feedback-type");
  containerElement.removeAttribute("data-success");
}

function changeType(e: Event) {
  const value = (e.target as HTMLInputElement).value;

  containerElement.setAttribute("data-feedback-type", value);

  let placeholder = "I think…";
  if (value === "issue") placeholder = "I’m having an issue with…";
  else if (value === "idea") placeholder = "I’d like to see…";
  else placeholder = "Anything else you'd like to share?";

  document
    .getElementById("feedbackfin__message")
    ?.setAttribute("placeholder", placeholder);
}

function back() {
  containerElement.removeAttribute("data-feedback-type");
}

function submit(e: Event) {
  e.preventDefault();
  const target = e.target as HTMLFormElement;

  if (!config.url) {
    console.error("Feedback Fin: No URL provided");
    if (!config.disableErrorAlert)
      alert("Could not send feedback: No URL provided");
    return;
  }

  const submitElement = document.getElementById("feedbackfin__submit")!;
  submitElement.setAttribute("disabled", "");
  submitElement.innerHTML = "Sending…";

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const data = {
    ...config.user,
    feedbackType: (target.elements as any).feedbackType.value,
    message: (target.elements as any).message.value,
    timestamp: Date.now(),
  };

  fetch(config.url, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(data),
  })
    .then(() => {
      containerElement.setAttribute("data-success", "");
    })
    .catch((e) => {
      console.error("Feedback Fin:", e);
      if (!config.disableErrorAlert)
        alert(`Could not send feedback: ${e.message}`);
    });

  return false;
}

const feedbackfin = { init, open, changeType, close, submit, config };
(window as any).feedbackfin = feedbackfin;

export default feedbackfin;
