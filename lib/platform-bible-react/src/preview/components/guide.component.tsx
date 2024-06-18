import {
  VerticalTabs,
  VerticalTabsContent,
  VerticalTabsList,
  VerticalTabsTrigger,
} from '@/components/shadcn-ui/tabs-vertical';

import { History } from 'lucide-react';
import { Button } from '@/components/shadcn-ui/button';
import { Input } from '@/components/shadcn-ui/input';
import { DirToggle, DirectionProps } from '../direction-toggle';
import { ThemeButton } from '../theme-toggle.component';

function Guide({ direction, changeDirection: setDirection }: DirectionProps) {
  return (
    <div>
      <p className="pr-mb-2">This section allows you too look up and learn about some concepts</p>
      <VerticalTabs dir={direction} defaultValue="Direction">
        <VerticalTabsList>
          <VerticalTabsTrigger value="Direction">Direction</VerticalTabsTrigger>
          <VerticalTabsTrigger value="Theming">Theming</VerticalTabsTrigger>
        </VerticalTabsList>

        <VerticalTabsContent value="Direction">
          <p>
            Direction is passed to the tabs using <code>dir&#61;&#39;ltr&#39;</code> or{' '}
            <code>dir&#61;&#39;rtl&#39;</code>
          </p>
          <p>
            You can easily try out your component / layout using the direction toggle in the upper
            right corner.
          </p>
          <div className="pr-flex pr-items-center pr-gap-2">
            Try it: change direction to
            <DirToggle direction={direction} changeDirection={setDirection} />
          </div>

          <br />
          <p>
            One of the things to keep in mind is to use logical margin/padding definitions instead
            of &#39;left&#39; or &#39;right&#39;. See{' '}
            <a
              href="https://tailwindcss.com/docs/margin#using-logical-properties"
              className="hover: pr-text-blue-600 pr-underline"
              target="_blank"
              rel="noreferrer"
            >
              https://tailwindcss.com/docs/margin#using-logical-properties
            </a>
          </p>
          <table>
            <tbody>
              <tr>
                <td>Bad example:</td>
                <td>
                  <div className="pr-flex">
                    <Button className="pr-mr-2">1</Button>
                    <Button className="pr-mr-2">2</Button>
                    <Button>3</Button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Bad example:</td>
                <td>
                  <div className="pr-flex pr-space-x-2">
                    <Button>1</Button>
                    <Button>2</Button>
                    <Button>3</Button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Good example:</td>
                <td>
                  <div className="pr-flex pr-gap-2">
                    <Button>1</Button>
                    <Button>2</Button>
                    <Button>3</Button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Good example:</td>
                <td>
                  <div className="pr-flex">
                    <Button className="pr-me-2">1</Button>
                    <Button className="pr-me-2">2</Button>
                    <Button>3</Button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <p>Another bad example</p>
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
        </VerticalTabsContent>
        <VerticalTabsContent value="Theming">
          <p>By default we are sticking to use the existing shadcn styles.</p>
          <p>
            The components we install from shadcn already come with these styles. That means have a
            look which properties the shadcn components expect (so that they will set their style
            themselves) and use them accordingly.
          </p>
          <div className="pr-flex pr-items-center pr-gap-2">
            Try it: change theme to
            <ThemeButton />
          </div>
          <p>
            Shadcn already provides theming, defining the current theme values in{' '}
            <code>styling.css</code>. You can easily test if your component adheres to the concept
            (and so can be themed) by using the dark mode toggle (upper right corner).
          </p>
          <table>
            <tbody>
              <tr>
                <td>
                  Bad example<div className="pr-text-xs">manual styles, unable to be themed</div>
                </td>
                <td>
                  <Input
                    value="This is some text"
                    className="pr-box-border pr-gap-2.5 pr-rounded-lg pr-border pr-border-solid pr-border-black pr-bg-white pr-py-2 pr-pl-4 pr-pr-3 pr-font-medium pr-text-slate-900 pr-shadow-none pr-outline-none"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  Good example
                  <div className="pr-text-xs">theme-able by using the default styles</div>
                </td>
                <td>
                  <Input
                    value="This is some text"
                    className="pr-full pr-file:border-0 pr-col-span-2 pr-flex pr-h-8 pr-rounded-md pr-border pr-border-input pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-cursor-not-allowed disabled:pr-opacity-50"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </VerticalTabsContent>
      </VerticalTabs>
    </div>
  );
}
export default Guide;
