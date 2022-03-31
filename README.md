# Feedback Fin

A tiny widget to collect feedback anywhere on your website. That’s it.

[![npm version](https://badgen.net/npm/v/feedbackfin)](https://www.npmjs.com/package/feedbackfin)
[![Package size](https://badgen.net/bundlephobia/minzip/feedbackfin)](https://bundlephobia.com/result?p=feedbackfin)
[![License](https://badgen.net/npm/license/feedbackfin)](https://github.com/rowyio/feedbackfin/blob/main/LICENSE)

![Demo GIF](./demo.gif)

[Try the widget&nbsp;&UpperRightArrow;](https://feedbackfin.com)

## Quick Start

1. Load the widget on your page:

   ```html
   <script src="https://unpkg.com/feedbackfin@^1" defer></script>
   ```

2. Configure with a webhook URL and user info:

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

## Options

Options are set in the `window.feedbackfin.config` object:

### `url`

The URL to send the feedback to. The widget will make a POST request to this URL
with the data as a JSON body.

You can connect it directly to your database using [Rowy](https://rowy.io).  
[Learn how&nbsp;&UpperRightArrow;](https://docs.rowy.io/webhooks)

### `user`

An object whose contents will be submitted as part of the form. Note the
`feedbackType`, `message`, and `timestamp` fields will be overwritten.

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
URL is set or the request fails. Default: `false`

## Usage

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

- overriding
  [the CSS variables](https://github.com/rowyio/feedbackfin/blob/main/src/form.css).

  For example, you can change the primary button color using:

  ```css
  :root {
    --feedbackfin-primary-color: #007aff;
    --feedbackfin-primary-color-text: #fff;
  }
  ```

- overriding
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
