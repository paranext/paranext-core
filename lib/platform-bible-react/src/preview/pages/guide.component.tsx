import {
  VerticalTabs,
  VerticalTabsContent,
  VerticalTabsList,
  VerticalTabsTrigger,
} from '@/components/basics/tabs-vertical';

import { DirectionProps } from '@/preview/preview-components/direction-toggle.component';
import DirectionGuide from './guide/direction.guide.component';
import ThemeColorDisplay from './guide/theme-color-display.component';
import ThemingGuide from './guide/theming.guide.component';
import HowToGuide from './guide/howto.component';

function Guide({ direction, onChangeDirection: setDirection }: DirectionProps) {
  return (
    <div>
      <p className="tw-mb-2 tw-text-muted-foreground">
        A place to look up and learn about some concepts
      </p>
      <VerticalTabs defaultValue="Howto">
        <VerticalTabsList>
          <VerticalTabsTrigger value="Howto">How to use</VerticalTabsTrigger>
          <VerticalTabsTrigger value="Direction">Direction</VerticalTabsTrigger>
          <VerticalTabsTrigger value="Theming">Theming</VerticalTabsTrigger>
          <VerticalTabsTrigger value="Theme">Current Theme Colors</VerticalTabsTrigger>
        </VerticalTabsList>

        <VerticalTabsContent value="Howto">
          <HowToGuide />
        </VerticalTabsContent>
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
