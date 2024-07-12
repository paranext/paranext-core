import { Input, TextField } from '../../..';

export default function InputExamples() {
  return (
    <table>
      <tbody>
        <tr>
          <td>
            Text Field <div className="pr-text-xs">(wrapped)</div>
          </td>
          <td>
            <TextField />
          </td>
        </tr>
        <tr>
          <td>
            Shadcn Input
            <div className="pr-text-xs">(shadcn-ui/input)</div>
          </td>
          <td>
            <Input />
          </td>
        </tr>
        <tr>
          <td>
            Shdcn Input <div className="pr-text-xs">(from ui.shadcn.com &rarr; input)</div>
          </td>
          <td className="">
            {/* copied from ui.shadcn.com but replaced ring-ring with pr-ring-[240 5% 64.9%], as they set --ring to this value in their style.css */}
            <Input className="pr-flex pr-h-10 pr-w-full pr-rounded-md pr-border pr-border-input pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background file:pr-border-0 file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-[color:hsl(240,5%,64.9%)] focus-visible:pr-ring-offset-2 disabled:pr-cursor-not-allowed disabled:pr-opacity-50" />
          </td>
        </tr>
        <tr>
          <td>
            Small Input
            <div className="pr-text-xs">(from ui.jln.dev &rarr; popover)</div>
          </td>
          <td>
            <Input className="pr-full pr-file:border-0 pr-col-span-2 pr-flex pr-h-8 pr-rounded-md pr-border pr-border-input pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-cursor-not-allowed disabled:pr-opacity-50" />
          </td>
        </tr>
        <tr>
          <td>
            BVC Input <div className="pr-text-xs">(from book-chapter-control)</div>
          </td>
          <td>
            <Input className="pr-box-border pr-gap-2.5 pr-rounded-lg pr-border pr-border-solid pr-border-black pr-bg-white pr-py-2 pr-pl-4 pr-pr-3 pr-font-medium pr-text-slate-900 pr-shadow-none pr-outline-none" />
          </td>
        </tr>
      </tbody>
    </table>
  );
}
