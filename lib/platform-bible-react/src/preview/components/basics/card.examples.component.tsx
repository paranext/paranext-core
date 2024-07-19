import { Label } from '@/components/shadcn-ui/label';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
} from '../../..';
import SelectExamples from './select.examples.component';

export default function CardExamples() {
  return (
    <>
      <Card className="sm:col-span-2">Card only</Card>

      <Card className="sm:col-span-2">
        <CardDescription className="pb-3">Card with CardDescription only</CardDescription>
      </Card>

      <Card className="sm:col-span-2">
        <CardHeader className="pb-3">Card with CardHeader only</CardHeader>
      </Card>

      <Card className="sm:col-span-2">
        <CardHeader className="pb-3">
          <CardDescription>Card with CardHeader including a CardDescription</CardDescription>
        </CardHeader>
      </Card>

      <Card className="sm:col-span-2">
        <CardHeader className="pb-3">
          <CardTitle>Card with CardHeader including a CardTitle</CardTitle>
        </CardHeader>
      </Card>

      <Card className="sm:col-span-2">
        <CardHeader className="pb-3">
          <CardTitle>Psalms Layer-by-Layer</CardTitle>
          <CardDescription className="max-w-lg text-balance leading-relaxed flex">
            Unpacking the meaning of the Psalms for translators
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button>More information</Button>
        </CardFooter>
      </Card>

      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Create project</CardTitle>
          <CardDescription>Deploy your new project in one-click.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Name of your project" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Framework</Label>
                <SelectExamples />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button>Deploy</Button>
        </CardFooter>
      </Card>
    </>
  );
}
