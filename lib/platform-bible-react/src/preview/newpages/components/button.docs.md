<!-- markdownlint-disable MD041 MD033 -->

### Button sizes

Use the default button sizes. For small icon buttons use <code>tw-h-8</code> on the button and <code>tw-h-4</code> on the icon

### Button combinations

The primary button should always be the last button (right in a ltr layout), all other buttons should be secondary buttons.

<div>
  <span>Good</span>
  <div className="tw-bg-green-500 tw-p-2 tw-h-24">
    <iframe className="tw-border tw-w-[100%] tw-h-20" src="http://localhost:5173/" />
  </div>
</div>
<div>
  <span>Bad</span>
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
