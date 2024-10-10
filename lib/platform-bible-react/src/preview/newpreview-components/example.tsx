import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/shadcn-ui/tabs';
import { ReactHTMLElement } from 'react';
import CodePreview from './code-preview.component';
import { ThemeProvider } from '../preview-components/theme-provider.component';

type ExampleProps = {
  title: string;
  code: string;
  component: ReactHTMLElement;
};

export default function Example({ title, code, component }: ExampleProps) {
  return (
    <Tabs defaultValue="preview" className="pr-w-full">
      <div className="pr-flex pr-justify-between">
        <h3 className="pr-mb-2 pr-text-lg pr-font-medium">{title}</h3>
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="preview" className="pr-rounded-md pr-border pr-p-4">
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          {component}
        </ThemeProvider>
      </TabsContent>
      <TabsContent value="code">
        <CodePreview code={code} />
      </TabsContent>
    </Tabs>
  );
}
