# Feedback Fin

**A tiny widget to collect feedback anywhere on your website. That’s it.**

<p>
    <a target="_blank" rel="noopener" href="http://www.feedbackfin.com"><b>Website</b></a> •
    <a target="_blank" rel="noopener" href="https://discord.gg/fjBugmvzZP"><b>Discord</b></a> • 
    <a target="_blank" rel="noopener" href="https://twitter.com/rowyio"><b>Twitter</b></a>
</p>

[![npm version](https://badgen.net/npm/v/feedbackfin)](https://www.npmjs.com/package/feedbackfin)
[![Package size](https://badgen.net/bundlephobia/minzip/feedbackfin)](https://bundlephobia.com/result?p=feedbackfin)

<a href="https://feedbackfin.com" target="_blank" rel="noopener">
  <img src="https://user-images.githubusercontent.com/27017118/160980505-edf2c161-730d-4ba1-9ae2-2a0a01454954.gif" width="420" height="380" alt="Demo GIF" />
</a>

[Try the widget&nbsp;&UpperRightArrow;](https://feedbackfin.com)

## Quick Start

1. Load the widget on your page:

   ```html
   <script src="https://unpkg.com/feedbackfin@^1" defer></script>
   ```

2. Configure with a [webhook URL](#setting-up-a-webhook-url) and optionally, add
   [user info](#user):

   ```html
   <script>
     window.feedbackfin = { config: {}, ...window.feedbackfin };
     window.feedbackfin.config.url = "https://rowy-hooks.run.app/wh/...";
     window.feedbackfin.config.user = { name: "...", email: "..." };
   </script>
   ```

3. Set a button to open the widget:
   ```html
   <button data-feedbackfin-button>Feedback</button>
   ```

## Setting up a webhook URL

This is the URL to send the feedback to. The widget will make a POST request to
this URL with the feedback data as a JSON body.

Generate a webhook URL and view the feedback in a spreadsheet UI using Rowy.
[Learn how &nbsp;&UpperRightArrow;](https://feedbackfin.com/setup)

## Options

Options are set in the `window.feedbackfin.config` object:

### `url`

The URL to send the feedback to. The widget will make a POST request to this URL
with the data as a JSON body. See
[Setting up a webhook URL](#setting-up-a-webhook-url) above.

### `user`

An object whose contents will be submitted as part of the form. Note:
`feedbackType`, `message`, and `timestamp` are reserved fields and will be
overwritten by form values.

Typically:

```js
window.feedbackfin.config.user = {
  name: "...",
  email: "...",
};
```

### `disableErrorAlert`

Optionally, disables displaying
[alerts](https://developer.mozilla.org/en-US/docs/Web/API/Window/alert) if no
URL is set or the request fails. Default: `disableErrorAlert: false`

## How it works

When the script is loaded, it looks for any elements with the
`data-feedbackfin-button` attribute and opens the widget when any of those
elements are clicked.

```html
<button data-feedbackfin-button>Feedback</button>
```

The `window.feedbackfin` object exposes the `open`, `close`, and `submit`
methods, so they can also be called directly.

```html
<button onclick="window.feedbackfin.open(event)">Feedback</button>
```

The widget uses `event.target` to compute its position using
[Floating UI](https://floating-ui.com/).

## Customization

The widget is attached just before the closing `</body>` tag when it is open and
respects your page’s `font-family`. Styles are attached just before the opening
`<head>` tag so your customizations take precedence.

You can customize the widget’s appearance by:

- Overriding
  [the CSS variables](https://github.com/rowyio/feedbackfin/blob/main/src/form.css).

  For example, you can change the primary button color using:

  ```css
  :root {
    --feedbackfin-primary-color: #007aff;
    --feedbackfin-primary-color-text: #fff;
  }
  ```

- Overriding
  [the CSS rules](https://github.com/rowyio/feedbackfin/blob/main/src/form.css).
  Class names are prefixed with `feedbackfin__`.

## Dark mode

Dark mode is activated when either:

- the user sets their system theme to dark  
  i.e. `@media (prefers-color-scheme: dark)` is true, or

- any parent element has a `data-theme` attribute whose value contains `dark`.  
  Example: `<body data-theme="dark">`

Dark mode colors are set using CSS variables. You can override them with:

```css
@media (prefers-color-scheme: dark) {
  :root {
    ...;
  }
}

[data-theme*="dark"] {
  ...;
}
```

## Accessibility

This widget is built using standard HTML form elements with the appropriate
labels.

Focus is trapped within the widget when it is open using
[focus-trap](https://github.com/focus-trap/focus-trap).

## Contributing

Contribute to Feedback Fin with issues and pull requests in
[the GitHub repo](https://github.com/rowyio/feedbackfin).

## Support

- Join a community of developers on [Discord](https://discord.gg/fjBugmvzZP)
- Follow us on [Twitter](https://twitter.com/rowyio) and help
  [spread the word](https://twitter.com/intent/tweet?text=Came%20across%20this%20cute,%20tiny%20widget%20to%20collect%20feedback%20anywhere%20on%20your%20website.%0a%0aOpen-source,%20free,%20and%20fully%20customizable.%0a%0ahttp://www.feedbackfin.com/)
  🙏
