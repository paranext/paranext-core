import type { Meta, StoryContext, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/client-api';

import Table, {
  TableProps,
  TableTextEditor,
  TableSelectColumn,
  TableSortColumn,
} from '@renderer/components/papi-components/Table';
import { ReactElement } from 'react';

type Row = {
  id: number;
  title: string;
};

type Story = StoryObj<typeof Table<Row>>;

function TableDecorator(
  Story: (props: Partial<TableProps<Row>>) => ReactElement,
  context: StoryContext,
) {
  const [args, updateArgs] = useArgs();

  const setSortColumns = (cols: TableSortColumn[]) => {
    updateArgs({ sortColumns: cols });
  };

  const setSelectedRows = (rows: Row[]) => {
    updateArgs({ selectedRows: rows });
  };

  // const setRows = (rows: Row[]) => {
  //   updateArgs({ rows });
  // };

  // const rows: Row[] = [
  //   { id: 0, title: 'Lorem ipsum dolor sit amet' },
  //   { id: 1, title: 'Consectetur adipiscing elit' },
  //   { id: 2, title: 'Pellentesque suscipit tortor est' },
  //   { id: 3, title: 'Ut egestas massa aliquam a' },
  //   { id: 4, title: 'Nulla egestas vestibulum felis a venenatis' },
  //   { id: 5, title: 'Sed aliquet pulvinar neque' },
  // ];

  // type Comparator = (a: Row, b: Row) => number;
  // function getComparator(sortColumn: string): Comparator {
  //   switch (sortColumn) {
  //     case 'title':
  //       return (a, b) => {
  //         return a[sortColumn].localeCompare(b[sortColumn]);
  //       };
  //     case 'id':
  //       return (a, b) => {
  //         return a[sortColumn] - b[sortColumn];
  //       };
  //     default:
  //       throw new Error(`unsupported sortColumn: "${sortColumn}"`);
  //   }
  // }

  // const sortedRows = (): readonly Row[] => {
  //   console.log('hi');
  //   if (args.sortColumns.length === 0) return rows;

  //   return [...rows].sort((a, b) => {
  //     // eslint-disable-next-line no-restricted-syntax
  //     for (const sort of args.sortColumns) {
  //       const comparator = getComparator(sort.columnKey);
  //       const compResult = comparator(a, b);
  //       if (compResult !== 0) {
  //         return sort.direction === 'ASC' ? compResult : -compResult;
  //       }
  //     }
  //     return 0;
  //   });
  // };

  return (
    <Story
      {...context}
      args={{
        ...args,
        onSelectedRowsChange: setSelectedRows,
        onSortColumnsChange: setSortColumns,
        // onRowsChange: setRows,
        // rows: sortedRows,
      }}
    />
  );
}

const meta: Meta<typeof Table<Row>> = {
  title: 'Basics/Table',
  component: Table<Row>,
  tags: ['autodocs'],
  args: {
    rowKeyGetter: (row: Row) => {
      return row.id;
    },
  },
  argTypes: {
    defaultColumnWidth: { control: 'number' },
    defaultColumnMinWidth: { control: 'number' },
    defaultColumnMaxWidth: { control: 'number' },
    defaultColumnSortable: { control: 'boolean' },
    defaultColumnResizable: { control: 'boolean' },
    rowHeight: { control: 'number' },
    headerRowHeight: { control: 'number' },
    direction: {
      options: [0, 1],
      mapping: ['ltr', 'rtl'],
      control: {
        type: 'select',
        labels: ['LTR', 'RTL'],
      },
    },
    enableVirtualization: { control: 'boolean' },
    className: { control: 'text' },
  },
  decorators: [TableDecorator],
};
export default meta;

export const Default: Story = {
  args: {
    columns: [
      {
        key: 'id',
        name: 'ID',
      },
      {
        key: 'title',
        name: 'Title',
        editor: TableTextEditor,
      },
    ],
    rows: [
      { id: 0, title: 'Lorem ipsum dolor sit amet' },
      { id: 1, title: 'Consectetur adipiscing elit' },
      { id: 2, title: 'Pellentesque suscipit tortor est' },
      { id: 3, title: 'Ut egestas massa aliquam a' },
      { id: 4, title: 'Nulla egestas vestibulum felis a venenatis' },
      { id: 5, title: 'Sed aliquet pulvinar neque' },
    ],
  },
};

export const CustomizedColumns: Story = {
  args: {
    columns: [
      {
        key: 'id',
        name: 'ID',
        width: 300,
        minWidth: 200,
        maxWidth: 400,
        editable: true,
        frozen: false,
        resizable: true,
        sortable: true,
      },
      {
        key: 'title',
        name: 'Title',
        width: 300,
        minWidth: 200,
        maxWidth: 400,
        editable: false,
        frozen: false,
        resizable: true,
        sortable: true,
      },
    ],

    rows: [
      { id: 0, title: 'Lorem ipsum dolor sit amet' },
      { id: 1, title: 'Consectetur adipiscing elit' },
      { id: 2, title: 'Pellentesque suscipit tortor est' },
      { id: 3, title: 'Ut egestas massa aliquam a' },
      { id: 4, title: 'Nulla egestas vestibulum felis a venenatis' },
      { id: 5, title: 'Sed aliquet pulvinar neque' },
    ],
  },
};

export const ConfigureDefaultColumnSettings: Story = {
  args: {
    columns: [
      {
        key: 'id',
        name: 'ID',
      },
      {
        key: 'title',
        name: 'Title',
        editor: TableTextEditor,
      },
    ],

    rows: [
      { id: 0, title: 'Lorem ipsum dolor sit amet' },
      { id: 1, title: 'Consectetur adipiscing elit' },
      { id: 2, title: 'Pellentesque suscipit tortor est' },
      { id: 3, title: 'Ut egestas massa aliquam a' },
      { id: 4, title: 'Nulla egestas vestibulum felis a venenatis' },
      { id: 5, title: 'Sed aliquet pulvinar neque' },
    ],

    defaultColumnWidth: 300,
    defaultColumnMinWidth: 100,
    defaultColumnMaxWidth: 500,
    defaultColumnSortable: true, // Sorting columns doesn't seem to work yet
    defaultColumnResizable: true,
  },
};

export const ColumnCallBackFunctions: Story = {
  args: {
    columns: [
      {
        key: 'id',
        name: 'ID (sortable)',
        sortable: true,
      },
      {
        key: 'title',
        name: 'Title (not sortable)',
        sortable: false,
        editor: TableTextEditor,
      },
    ],

    rows: [
      { id: 0, title: 'Lorem ipsum dolor sit amet' },
      { id: 1, title: 'Consectetur adipiscing elit' },
      { id: 2, title: 'Pellentesque suscipit tortor est' },
      { id: 3, title: 'Ut egestas massa aliquam a' },
      { id: 4, title: 'Nulla egestas vestibulum felis a venenatis' },
      { id: 5, title: 'Sed aliquet pulvinar neque' },
    ],

    onColumnResize: () => {
      // eslint-disable-next-line no-console
      console.log('Column resized');
    },

    onSortColumnsChange: (col) => {
      console.log(col);
      // eslint-disable-next-line no-console
      console.log('SortColumns Changed');
    },
  },
};

export const RowCallBackFunctions: Story = {
  args: {
    columns: [
      TableSelectColumn,
      {
        key: 'id',
        name: 'ID',
      },
      {
        key: 'title',
        name: 'Title',
        editor: TableTextEditor,
      },
    ],

    rows: [
      { id: 0, title: 'Lorem ipsum dolor sit amet' },
      { id: 1, title: 'Consectetur adipiscing elit' },
      { id: 2, title: 'Pellentesque suscipit tortor est' },
      { id: 3, title: 'Ut egestas massa aliquam a' },
      { id: 4, title: 'Nulla egestas vestibulum felis a venenatis' },
      { id: 5, title: 'Sed aliquet pulvinar neque' },
    ],

    onSelectedRowsChange: () => {
      console.log('test');
    },

    // onRowsChange,

    // rowClassGetter,

    rowHeight: 50,
    headerRowHeight: 100,
  },
};
