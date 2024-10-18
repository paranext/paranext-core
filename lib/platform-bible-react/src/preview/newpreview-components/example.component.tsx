import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/shadcn-ui/tabs';
import { ReactHTMLElement } from 'react';
import CodePreview from './code-preview.component';
import ComponentPreview from './component-preview.component';

type ExampleProps = {
  title: string | ReactHTMLElement;
  code: string;
  component: ReactHTMLElement;
};

export default function Example({ title, code, component }: ExampleProps) {
  return (
    <Tabs defaultValue="preview" className="tw-w-full">
      <div className="tw-flex tw-justify-between">
        <h3 className="tw-mb-2 tw-text-lg tw-font-medium">{title}</h3>
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="preview">
        <ComponentPreview component={component} />
      </TabsContent>
      <TabsContent value="code">
        <CodePreview code={code} />
      </TabsContent>
    </Tabs>
  );
}
