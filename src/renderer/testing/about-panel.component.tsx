import icon from '@assets/icon.png';
import { TabInfo } from '@shared/data/web-view.model';

function AboutPanel() {
  return (
    <div className="about-panel">
      <div className="hello">
        <img width="200" alt="icon" src={icon} />
      </div>
      <div className="hello">
        <h1>Paranext</h1>
      </div>
    </div>
  );
}

export default function createAboutPanel(): TabInfo {
  return {
    title: 'About',
    content: <AboutPanel />,
    minWidth: 230,
    minHeight: 230,
  };
}
