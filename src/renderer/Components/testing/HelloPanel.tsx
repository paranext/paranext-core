import icon from '@assets/icon.png';

const HelloPanel = () => {
  return (
    <div
      style={{
        background:
          'linear-gradient(200.96deg,#b8d432 -29.09%,#5f7333 51.77%,#47314e 129.35%',
      }}
    >
      <div className="Hello">
        <img width="200" alt="icon" src={icon} />
      </div>
      <div className="Hello">
        <h1>Paranext</h1>
      </div>
    </div>
  );
};

export default HelloPanel;
