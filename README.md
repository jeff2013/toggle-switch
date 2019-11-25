# toggle-switch
Toggle switch web-component

This is a web component that wraps an input checkbox and displays
as a toggle switch.

Attributes available:
1. checked attribute determines the current state of the toggle switch.
    expects a boolean value 'true'/'false'

CSS customization variables:
1. --slider-background-color
2. --slider-checked-background-color
3. --slider-thumb-unchecked-color
4. --slider-thumb-checked-color
5. --slider-disabled-color
6. --slider-thumb-disabled-color



Events bubbled:
1. Input event on the input element
2. Change event on the input element

Example:
```
<style>
toggle-switch {
    .slider {
    --slider-background-color: white;
    --slider-checked-background-color: white;
    --slider-thumb-unchecked-color: grey;
    --slider-thumb-checked-color: blue;
    --slider-disabled-color: grey;
    --slider-thumb-disabled-color: moregrey;

    }
}
</style>
<toggle-switch checked></toggle-switch>
  ```