import { Button } from '@/components/shadcn-ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/shadcn-ui/card';
import { Input } from '@/components/shadcn-ui/input';
import { Label } from '@/components/shadcn-ui/label';
import { Switch } from '@/components/shadcn-ui/switch';
import { HasDirection } from '@/preview/preview-components/direction-toggle.component';
import { BellRing, Check } from 'lucide-react';
import SelectExamples from './select.examples.component';

export default function CardExamples({ direction }: HasDirection) {
  const cardContent = (
    <div className="pr-flex pr-items-center pr-gap-x-4 pr-rounded-md pr-border pr-p-4">
      <BellRing />
      <div className="pr-flex-1 pr-space-y-1">
        <p className="pr-text-sm pr-font-medium pr-leading-none">Push Notifications</p>
        <p className="pr-text-sm pr-text-muted-foreground">Send notifications to device.</p>
      </div>
      <Switch />
    </div>
  );

  return (
    <div className="pr-flex pr-flex-col pr-gap-2">
      <Card>Card only</Card>

      <Card>
        <CardDescription>Card with CardDescription only</CardDescription>
      </Card>

      <Card>
        <CardHeader>Card with CardHeader only</CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardDescription>Card with CardHeader including a CardDescription</CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Card with CardHeader including a CardTitle</CardTitle>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader className="pr-pb-3">
          <CardTitle>Psalms Layer-by-Layer</CardTitle>
          <CardDescription className="pr-flex pr-max-w-lg pr-text-balance pr-leading-relaxed">
            Unpacking the meaning of the Psalms for translators
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button>More information</Button>
        </CardFooter>
      </Card>

      <Card className="pr-w-[350px]">
        <CardHeader>
          <CardTitle>Create project</CardTitle>
          <CardDescription>Deploy your new project in one-click.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="pr-grid pr-w-full pr-items-center pr-gap-4">
              <div className="pr-flex pr-flex-col pr-space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Name of your project" />
              </div>
              <div className="pr-flex pr-flex-col pr-space-y-1.5">
                <Label htmlFor="framework">Framework</Label>
                <SelectExamples direction={direction} />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="pr-flex pr-justify-between">
          <Button variant="outline">Cancel</Button>
          <Button>Deploy</Button>
        </CardFooter>
      </Card>

      <Card className="pr-w-[350px]">
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>You have 3 unread messages.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">{cardContent}</CardContent>
        <CardFooter>
          <Button className="w-full">
            <Check className="mr-2 h-4 w-4" /> Mark all as read
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
