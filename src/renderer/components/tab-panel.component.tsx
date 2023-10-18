import { ReactNode } from 'react';

type TabPanelProps = {
  children?: ReactNode;
  index: string;
  value: string;
  name: string;
};

export default function TabPanel({ children, value, index, name }: TabPanelProps) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`${name}-${index}`} className={name}>
      {value === index && children}
    </div>
  );
}
