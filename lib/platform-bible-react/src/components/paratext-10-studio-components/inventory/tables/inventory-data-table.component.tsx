import { ColumnDef, Row, Table } from '@tanstack/react-table';
import DataTable from '@/components/advanced-components/data-table/data-table.component';
import { ItemData } from '../types';

interface InventoryDataTableProps {
  columns: ColumnDef<ItemData>[];
  tableData: ItemData[];
  onSelectItem: (item: string) => void;
}

function InventoryDataTable({ columns, tableData, onSelectItem }: InventoryDataTableProps) {
  const rowClickHandler = (row: Row<ItemData>, table: Table<ItemData>) => {
    table.toggleAllRowsSelected(false); // this is pretty hacky, and also prevents us from selecting multiple rows
    row.toggleSelected(undefined);

    onSelectItem(row.getValue('item'));
  };

  return (
    <div className="pr-overflow-y-auto">
      <DataTable columns={columns} data={tableData} onRowClickHandler={rowClickHandler} />
    </div>
  );
}

export default InventoryDataTable;
