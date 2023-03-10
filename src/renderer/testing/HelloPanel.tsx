import icon from '@assets/icon.png';
import { TabInfo } from '@shared/data/WebviewTypes';

const HelloPanel = () => {
  return (
    <div className="hello-panel">
      <div className="hello">
        <img width="200" alt="icon" src={icon} />
      </div>
      <div className="hello">
        <h1>Paranext</h1>
      </div>
    </div>
  );
};

const createHelloPanel = (): TabInfo => {
  return {
    type: 'hello',
    title: 'Hello',
    content: <HelloPanel />,
    minWidth: 230,
    minHeight: 230,
  };
};

export default createHelloPanel;
