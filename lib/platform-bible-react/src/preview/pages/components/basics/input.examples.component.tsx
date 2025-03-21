import { TextField } from '@/components/basics/text-field.component';
import { Input } from '@/components/shadcn-ui/input';

export function InputExamples() {
  return (
    <table>
      <tbody>
        <tr>
          <td>
            Text Field <div className="tw-text-xs">(wrapped)</div>
          </td>
          <td>
            <TextField />
          </td>
        </tr>
        <tr>
          <td>
            Shadcn Input
            <div className="tw-text-xs">(shadcn-ui/input)</div>
          </td>
          <td>
            <Input />
          </td>
        </tr>
        <tr>
          <td>
            Shdcn Input <div className="tw-text-xs">(from ui.shadcn.com &rarr; input)</div>
          </td>
          <td className="">
            {/* copied from ui.shadcn.com but replaced ring-ring with tw-ring-[240 5% 64.9%], as they set --ring to this value in their style.css */}
            <Input className="tw-flex tw-h-10 tw-w-full tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-[color:hsl(240,5%,64.9%)] focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50" />
          </td>
        </tr>
        <tr>
          <td>
            Small Input
            <div className="tw-text-xs">(from ui.jln.dev &rarr; popover)</div>
          </td>
          <td>
            <Input className="tw-full tw-file:border-0 tw-col-span-2 tw-flex tw-h-8 tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background file:tw-bg-transparent file:tw-text-sm file:tw-font-medium placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50" />
          </td>
        </tr>
        <tr>
          <td>
            BVC Input <div className="tw-text-xs">(from book-chapter-control)</div>
          </td>
          <td>
            <Input className="tw-box-border tw-gap-2.5 tw-rounded-lg tw-border tw-border-solid tw-border-black tw-bg-white tw-py-2 tw-pl-4 tw-pr-3 tw-font-medium tw-text-slate-900 tw-shadow-none tw-outline-none" />
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default InputExamples;
