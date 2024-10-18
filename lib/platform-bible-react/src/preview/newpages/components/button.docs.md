<!-- markdownlint-disable MD041 MD033 -->

### Button sizes

Use the default button sizes. For small icon buttons use <code>tw-h-8</code> on the button and <code>tw-h-4</code> on the icon

### Button combinations

The primary button should always be the last button (right in a ltr layout), all other buttons should be secondary buttons.

<div>
  <div className="tw-flex tw-items-center tw-gap-2 tw-py-2">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-check tw-text-green-500"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
    <span>Good Usage</span>
  </div>
  <div>the following is a placeholder...</div>
  <div className="tw-bg-green-500 tw-p-2 tw-h-24">
    <iframe className="tw-border tw-w-[100%] tw-h-20" src="http://localhost:5173/" />
  </div>
</div>
<div>
  <div className="tw-flex tw-items-center tw-gap-2 tw-py-2">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-x tw-text-red-500"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
    <span>Bad Usage</span>
  </div>
  <div>the following is a placeholder...</div>
  <div className="tw-bg-red-500 tw-p-2 tw-h-24">
    <iframe className="tw-border tw-w-[100%] tw-h-20" src="http://localhost:5173/" />
  </div>
</div>

### Here is some code

<details>
<summary>md pages can even include a code example</summary>

```js
import { Button } from '@/components/shadcn-ui/button';"

export default function ButtonExample() {
  return (
    <Button>Hello World</Button>
  )
}
```

</details>

### Now to the real usage pattern components

#### Button combinations

here is where the <code>.md file</code> ends.

<hr/>
