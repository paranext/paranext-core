import { Button } from '@/components/shadcn-ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/shadcn-ui/card';

export function DialogExamples() {
  return (
    <>
      <Card className="tw-w-[350px]">
        <CardHeader>
          <CardTitle>Confirm</CardTitle>
          <CardDescription>Are you really sure</CardDescription>
        </CardHeader>
        <CardFooter className="tw-flex tw-justify-between">
          <Button variant="outline">Cancel</Button>
          <Button>Save</Button>
        </CardFooter>
      </Card>

      <div className="tw-h-4" />

      <div className="tw-w-[350px] tw-rounded-md tw-border tw-p-4">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
        <div className="tw-flex tw-gap-2 tw-pt-4">
          <Button variant="secondary">Proceed with unsaved changes</Button>
          <Button>Save</Button>
        </div>
      </div>
    </>
  );
}

export default DialogExamples;
