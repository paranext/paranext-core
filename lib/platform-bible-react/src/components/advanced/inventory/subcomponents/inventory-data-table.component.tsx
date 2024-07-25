import DataTable, {
  ColumnDef,
  RowContents,
  TableContents,
} from '@/components/advanced/data-table/data-table.component';
import { ItemData } from '../types';

interface InventoryDataTableProps {
  columns: ColumnDef<ItemData>[];
  tableData: ItemData[];
  onSelectItem: (item: string) => void;
}

function InventoryDataTable({ columns, tableData, onSelectItem }: InventoryDataTableProps) {
  const rowClickHandler = (row: RowContents<ItemData>, table: TableContents<ItemData>) => {
    table.toggleAllRowsSelected(false); // this is pretty hacky, and also prevents us from selecting multiple rows
    row.toggleSelected(undefined);

    onSelectItem(row.getValue('item'));
  };

  return (
    <DataTable
      columns={columns}
      data={tableData}
      stickyHeader
      onRowClickHandler={rowClickHandler}
    />
  );
}

export default InventoryDataTable;
