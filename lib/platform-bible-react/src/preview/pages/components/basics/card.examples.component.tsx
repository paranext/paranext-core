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
import { BellRing, Check } from 'lucide-react';
import { SelectExamples } from './select.examples.component';

export function CardExamples() {
  const cardContent = (
    <div className="tw-flex tw-items-center tw-gap-x-4 tw-rounded-md tw-border tw-p-4">
      <BellRing />
      <div className="tw-flex-1 tw-space-y-1">
        <p className="tw-text-sm tw-font-medium tw-leading-none">Push Notifications</p>
        <p className="tw-text-sm tw-text-muted-foreground">Send notifications to device.</p>
      </div>
      <Switch />
    </div>
  );

  return (
    <div className="tw-flex tw-flex-col tw-gap-2">
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
        <CardHeader className="tw-pb-3">
          <CardTitle>Psalms Layer-by-Layer</CardTitle>
          <CardDescription className="tw-flex tw-max-w-lg tw-text-balance tw-leading-relaxed">
            Unpacking the meaning of the Psalms for translators
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button>More information</Button>
        </CardFooter>
      </Card>

      <Card className="tw-w-[350px]">
        <CardHeader>
          <CardTitle>Create project</CardTitle>
          <CardDescription>Deploy your new project in one-click.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="tw-grid tw-w-full tw-items-center tw-gap-4">
              <div className="tw-flex tw-flex-col tw-space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Name of your project" />
              </div>
              <div className="tw-flex tw-flex-col tw-space-y-1.5">
                <Label htmlFor="framework">Framework</Label>
                <SelectExamples />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="tw-flex tw-justify-between">
          <Button variant="outline">Cancel</Button>
          <Button>Deploy</Button>
        </CardFooter>
      </Card>

      <Card className="tw-w-[350px]">
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

export default CardExamples;
