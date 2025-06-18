import { Button } from '@/components/shadcn-ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/shadcn-ui/drawer';

export function DrawerExamples() {
  return (
    <div className="tw-flex tw-flex-col tw-items-start tw-gap-4">
      <Drawer direction="top">
        <DrawerTrigger asChild>
          <Button variant="outline">Open Drawer (Top)</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Title</DrawerTitle>
            <DrawerDescription>Description</DrawerDescription>
          </DrawerHeader>
          Content
          <DrawerFooter>
            Footer
            <DrawerClose asChild>
              <Button variant="outline">Close Drawer</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <Drawer direction="right">
        <DrawerTrigger asChild>
          <Button variant="outline">Open Drawer (Right)</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Title</DrawerTitle>
            <DrawerDescription>Description</DrawerDescription>
          </DrawerHeader>
          Content
          <DrawerFooter>
            Footer
            <DrawerClose asChild>
              <Button variant="outline">Close Drawer</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <Drawer direction="left">
        <DrawerTrigger asChild>
          <Button variant="outline">Open Drawer (Left)</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Title</DrawerTitle>
            <DrawerDescription>Description</DrawerDescription>
          </DrawerHeader>
          Content
          <DrawerFooter>
            Footer
            <DrawerClose asChild>
              <Button variant="outline">Close Drawer</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline">Open Drawer (Bottom)</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Title</DrawerTitle>
            <DrawerDescription>Description</DrawerDescription>
          </DrawerHeader>
          Content
          <DrawerFooter>
            Footer
            <DrawerClose asChild>
              <Button variant="outline">Close Drawer</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default DrawerExamples;
