import { Button } from '@/components/shadcn-ui/button';

export function ButtonExamples() {
  return (
    <table>
      <tbody>
        <tr>
          <td className="tw-pe-2">variant</td>
          <td className="tw-flex tw-gap-2">
            <Button onClick={() => alert('Hello World')} variant="default">
              default
            </Button>
            <Button variant="destructive">destructive</Button>
            <Button variant="outline">outline</Button>
            <Button variant="secondary">secondary</Button>
            <Button variant="ghost">ghost</Button>
            <Button variant="link">link</Button>
          </td>
        </tr>
        <tr>
          <td className="tw-pe-2">size</td>
          <td>
            <span className="tw-mx-2">default:</span>
            <Button size="default">AAA</Button>
            <span className="tw-mx-2">icon:</span>
            <Button size="icon">AAA</Button>
            <span className="tw-mx-2">sm:</span>
            <Button size="sm">AAA</Button>
            <span className="tw-mx-2">lg:</span>
            <Button size="lg">AAA</Button>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default ButtonExamples;
