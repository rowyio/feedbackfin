export const formHTML = `
<button
  id="feedbackfin__close"
  class="feedbackfin__icon-button"
  type="reset"
  aria-label="Close"
>
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2.4"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="feather feather-x"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
</button>

<form id="feedbackfin__form">
  <h1 id="feedbackfin__title">Send feedback</h1>

  <div
    id="feedbackfin__radio-group"
    role="radiogroup"
    aria-label="Feedback type"
  >
    <input
      class="feedbackfin__radio"
      type="radio"
      id="feedbackfin__radio--issue"
      name="feedbackType"
      value="issue"
      required
    />
    <label
      for="feedbackfin__radio--issue"
      class="feedbackfin__button feedbackfin__radio-label"
    >
      <span class="feedbackfin__radio-icon">&#x2757;</span> Issue
    </label>

    <input
      class="feedbackfin__radio"
      type="radio"
      id="feedbackfin__radio--idea"
      name="feedbackType"
      value="idea"
      required
    />
    <label
      for="feedbackfin__radio--idea"
      class="feedbackfin__button feedbackfin__radio-label"
    >
      <span class="feedbackfin__radio-icon">&#x1F4A1;</span> Idea
    </label>

    <input
      class="feedbackfin__radio"
      type="radio"
      id="feedbackfin__radio--other"
      name="feedbackType"
      value="other"
      required
    />
    <label
      for="feedbackfin__radio--other"
      class="feedbackfin__button feedbackfin__radio-label"
    >
      <span class="feedbackfin__radio-icon">&#x1F4AD;</span> Other
    </label>
  </div>

  <div id="feedbackfin__step2">
    <textarea
      id="feedbackfin__message"
      name="message"
      type="text"
      placeholder="I think…"
      required
      rows="2"
      aria-label="Message"
    ></textarea>

    <button id="feedbackfin__submit" class="feedbackfin__button" type="submit">
      Send
    </button>
  </div>
</form>

<div id="feedbackfin__success">
  <svg viewBox="0 0 18 18" width="3em" height="3em" role="presentation">
    <polyline
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      points="2.705 8.29 7 12.585 15.295 4.29"
      fill="none"
      id="feedbackfin__check"
    />
  </svg>

  Thanks for your feedback!
</div>

<div id="feedbackfin__branding">
  <a href="https://feedbackfin.com" target="_blank" rel="noopener">
    Powered by Feedback Fin
  </a>
</div>
`;
