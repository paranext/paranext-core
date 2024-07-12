import {
  VerticalTabs,
  VerticalTabsContent,
  VerticalTabsList,
  VerticalTabsTrigger,
} from '@/components/shadcn-ui/tabs-vertical';

import { DirectionProps } from '../direction-toggle';
import DirectionGuide from './guide/direction.guide.component';
import ThemingGuide from './guide/theming.guide.component';
import ThemeColorDisplay from './guide/theme-color-display.component';

function Guide({ direction, onChangeDirection: setDirection }: DirectionProps) {
  return (
    <div>
      <p className="pr-mb-2 pr-text-muted-foreground">
        A place to look up and learn about some concepts
      </p>
      <VerticalTabs dir={direction} defaultValue="Direction">
        <VerticalTabsList>
          <VerticalTabsTrigger value="Direction">Direction</VerticalTabsTrigger>
          <VerticalTabsTrigger value="Theming">Theming</VerticalTabsTrigger>
          <VerticalTabsTrigger value="Theme">Current Theme Colors</VerticalTabsTrigger>
        </VerticalTabsList>

        <VerticalTabsContent value="Direction">
          <DirectionGuide direction={direction} onChangeDirection={setDirection} />
        </VerticalTabsContent>
        <VerticalTabsContent value="Theming">
          <ThemingGuide />
        </VerticalTabsContent>
        <VerticalTabsContent value="Theme">
          <ThemeColorDisplay />
        </VerticalTabsContent>
      </VerticalTabs>
    </div>
  );
}
export default Guide;
