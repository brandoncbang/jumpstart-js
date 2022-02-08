# jumpstart-js
A quick way to wire up your DOM elements with interactivity using `data-` attributes

```HTML
<div data-mounts="dropdown">
  <button data-ref="button">Open</button>

  <ul data-ref="list">
    <li>Foo</li>
    <li>Bar</li>
    <li>Baz</li>
  </ul>
</div>

<script type="module">
  import { mount } from 'https://brandoncbang.github.io/jumpstart-js/jumpstart.js';

  mount('dropdown', (root, props, refs) => {
    let show = false;

    function updateList() {
      refs.list.style.display = show ? '' : 'none';
    }

    refs.button.onclick = (e) => {
      show = !show;
      updateList();
    }

    updateList();
  });
</script>
```

If you're enhancing your markup with Vanilla JS, using `document.querySelector()` for all the elements you need to interact with can get tedious. Jumpstart uses the attributes `data-mounts`, `data-props`, and `data-refs` to let you easily hook up your JavaScript to elements that use them.

## Attributes

### `data-mounts`

Set an identifier used to determine which callback to run on the element. The element is then passed as the root element of that callback.

```HTML
<div data-mounts="counter">
  ...
</div>

<script>
  mount('counter', (root, props, refs) => {
    root // <div data-mounts="counter">
  });
</script>
```

### `data-props`

Lets you add JSON data to your root element that gets passed to your mount callback function. Useful for when you need to configure interactivity differently in different parts of your markup that use the same interactivity.

```HTML
<form>
  <h2>Guests (limit: 8)</h2>
  <div class="guests-repeater" data-mounts="field-repeater" data-props='{ "maxRows": 8 }'>
    ...
  </div>
  
  <h2>Pets (limit: 2)</h2>
  <div class="pets-repeater" data-mounts="field-repeater" data-props='{ "maxRows": 2 }'>
    ...
  </div>
</form>

<script>
  mount('field-repeater', (root, props, refs) => {
    props.maxRows; // Guests field repeater: 8, Pets field repeater: 2
  });
</script>
```

### `data-ref`

Any child elements with this attribute get added to a `refs` object, with the attribute value as the key. Multiple elements with the same ref key get added to an array under the key.

```HTML
<div data-mounts="color-changer">
  <div class="w-16 h-16" data-ref="colorSquare"></div>
  
  <div class="flex space-x-2">
    <button data-ref="buttons" data-color="red">Make it red!</button>
    <button data-ref="buttons" data-color="blue">Make it blue!</button>
    <button data-ref="buttons" data-color="orange">Make it orange!</button>
    <button data-ref="buttons" data-color="green">Make it green!</button>
  </div>
</div>

<script>
  mount('color-changer', (root, props, refs) => {
    refs.buttons.forEach(button => {
      button.onclick = (e) => {
        refs.colorSquare.style.background = button.dataset.color;
      }
    });
  });
</script>
```
