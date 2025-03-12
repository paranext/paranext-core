import PlatformMenubar from '@/components/advanced/platform-menubar.component';
import * as menuData from './sample.menu.json';

export default function PlatformMenubarExample() {
  return (
    <PlatformMenubar
      commandHandler={(command) => console.log('Run command: ', command)}
      menuData={menuData}
    />
  );
}
