import { SavedTabInfo, TabInfo } from '@shared/models/docking-framework.model';

export const TAB_TYPE_TEST = 'tab';

export default function TestPanel() {
  return (
    <div className="test-panel">
      <p>
        <strong>Priest ἱερεὺς</strong> (hiereus) <br />
        (derivative of ἱερουργέω or ἱερατεύω &apos;to serve as a priest,&apos; 53.85)
      </p>
      <p>one who performs religious rites and duties on behalf of others.</p>
      <p>Glosses: priest</p>
      <p>Domain: Roles and Functions (53.87)</p>
      <p>
        <strong>High priest</strong> ἀρχιερεὺς (archiereus)
      </p>
      <p>A principal priest, in view of belonging to one of the high-priestly families.</p>
      <p>Glosses: chief priest</p>
      <p>Domain: Roles and Functions (53.88)</p>
      <p>
        Comment: In a number of languages &apos;chief priests&apos; are referred to simply as
        &apos;big priests&apos; or &apos;important priests.&apos;
      </p>
      <p>The principal member among the chief priests.</p>

      <p>Glosses: high priest; most important priest Domain: Roles and Functions (53.89)</p>
    </div>
  );
}

export function loadTestTab(savedTabInfo: SavedTabInfo): TabInfo {
  if (!savedTabInfo.id) throw new Error('Tab creation "id" is missing');

  const tabTitle = savedTabInfo.id || 'Unknown';
  return {
    ...savedTabInfo,
    tabTitle,
    content: <TestPanel />,
  };
}
