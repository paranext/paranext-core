import { History } from 'lucide-react';
import { Button } from '@/components/shadcn-ui/button';
import { Input } from '@/components/shadcn-ui/input';
import { DirectionProps, DirToggle } from '@/preview/preview-components/direction-toggle';

export default function DirectionGuide({
  direction,
  onChangeDirection: setDirection,
}: DirectionProps) {
  return (
    <>
      <p>
        Direction is passed to the tabs using <code>dir&#61;&#39;ltr&#39;</code> or{' '}
        <code>dir&#61;&#39;rtl&#39;</code>
      </p>
      <p>
        You can easily try out your component / layout using the direction toggle in the upper right
        corner.
      </p>
      <div className="pr-flex pr-items-center pr-gap-2">
        Try it: change direction
        <DirToggle direction={direction} onChangeDirection={setDirection} />
      </div>
      <br />
      <p>
        One of the things to keep in mind is to use logical margin/padding definitions instead of
        &#39;left&#39; or &#39;right&#39;. See{' '}
        <a
          href="https://tailwindcss.com/docs/margin#using-logical-properties"
          className="pr-text-blue-600 hover:pr-underline"
          target="_blank"
          rel="noreferrer"
        >
          https://tailwindcss.com/docs/margin#using-logical-properties
        </a>
      </p>
      <table>
        <tbody>
          <tr>
            <td className="pr-text-destructive">
              Bad example: <code>pr-ml-2</code>, <code>pr-mr-2</code>
            </td>
            <td className="pr-text-destructive">
              <div className="pr-flex">
                <Button className="pr-mr-2">1</Button>
                <Button className="pr-mr-2">2</Button>
                <Button>3</Button>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              Good example: <code>pr-ms-2</code>, <code>pr-me-2</code>
            </td>
            <td>
              <div className="pr-flex">
                <Button className="pr-me-2">1</Button>
                <Button className="pr-me-2">2</Button>
                <Button>3</Button>
              </div>
            </td>
          </tr>
          <tr>
            <td className="pr-text-destructive">
              Bad example: <code>pr-space-x-2</code>
            </td>
            <td>
              <div className="pr-flex pr-space-x-2">
                <Button>1</Button>
                <Button>2</Button>
                <Button>3</Button>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              Good example: <code>pr-gap-2</code>
            </td>
            <td>
              <div className="pr-flex pr-gap-2">
                <Button>1</Button>
                <Button>2</Button>
                <Button>3</Button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <h2 className="pr-py-2 pr-font-bold">Other properties</h2>
      <p className="pr-text-destructive">
        Bad: <code>pr-text-right</code>
      </p>
      <p>
        Good: <code>pr-text-end</code>
      </p>
      <h2 className="pr-py-2 pr-font-bold">Another bad example</h2>
      <div className="pr-flex">
        <div className="pr-relative">
          <Input
            value="icon not to stay right"
            className="pr-box-border pr-gap-2.5 pr-rounded-lg pr-border pr-border-solid pr-border-black pr-bg-white pr-py-2 pr-pl-4 pr-pr-3 pr-font-medium pr-text-slate-900 pr-shadow-none pr-outline-none"
          />
          <History className="pr-absolute pr-right-3 pr-top-1/2 pr-h-4 pr-w-4 pr--translate-y-1/2 pr-transform pr-cursor-pointer pr-text-gray-500" />
        </div>
      </div>
      <div className="pr-flex">
        <div className="pr-relative">
          <Input
            value="text should clip before the icon"
            className="pr-box-border pr-gap-2.5 pr-rounded-lg pr-border pr-border-solid pr-border-black pr-bg-white pr-py-2 pr-pl-4 pr-pr-3 pr-font-medium pr-text-slate-900 pr-shadow-none pr-outline-none"
          />
          <History className="pr-absolute pr-right-3 pr-top-1/2 pr-h-4 pr-w-4 pr--translate-y-1/2 pr-transform pr-cursor-pointer pr-text-gray-500" />
        </div>
      </div>
    </>
  );
}
