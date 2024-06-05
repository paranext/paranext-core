import { useEffect, useState } from 'react';
import { WebViewProps } from '@papi/core';
import InventoryDataTable, { CharacterData } from './components/inventory-data-table.component';

// #region TemporaryRowData

const getRandomString = (length: number): string[] => {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,/μ';
  const result: string[] = [];
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    result.push(charset[randomIndex]);
  }
  return result;
};

const randomlyGeneratedData = (length: number): CharacterData[] => {
  const dataArray: CharacterData[] = [];
  const data = getRandomString(length);
  data.forEach((character) => {
    const dataPoint = dataArray.find((arrayElement) => {
      return arrayElement.character === character;
    });
    if (dataPoint) {
      dataPoint.count += 1;
    } else {
      dataArray.push({
        character,
        count: 1,
      });
    }
  });

  return dataArray;
};

// #endregion

global.webViewComponent = function CharacterInventory({ useWebViewState }: WebViewProps) {
  const [projectId] = useWebViewState('projectId', '');
  const [tableData, setTableData] = useState<CharacterData[]>([]);

  useEffect(() => {
    setTableData(randomlyGeneratedData(200));
  }, []);
  return <InventoryDataTable tableData={tableData} projectId={projectId} />;
};
