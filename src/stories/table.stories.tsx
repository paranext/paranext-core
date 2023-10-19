import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/client-api';
import {
  Table,
  TableCellClickArgs,
  TableCellMouseEvent,
  TableCopyEvent,
  TableCellKeyboardEvent,
  TableCellKeyDownArgs,
  TablePasteEvent,
  TableProps,
  TableSortColumn,
  TableEditorProps,
} from 'papi-components';
import { ChangeEvent, Key, ReactElement, UIEvent } from 'react';

type Row = {
  id: string;
  title: string;
};

type Story = StoryObj<typeof Table<Row>>;

function TableDecorator(Story: (update?: { args: Partial<TableProps<Row>> }) => ReactElement) {
  const [args, updateArgs] = useArgs();

  type Comparator = (a: Row, b: Row) => number;
  function getComparator(sortColumn: string): Comparator {
    switch (sortColumn) {
      case 'title':
        return (a, b) => {
          return a[sortColumn].localeCompare(b[sortColumn]);
        };
      case 'id':
        return (a, b) => {
          return +a[sortColumn] - +b[sortColumn];
        };
      default:
        throw new Error(`unsupported sortColumn: "${sortColumn}"`);
    }
  }

  const setRows = (rows: Row[]) => {
    updateArgs({ rows });
  };

  const setSortColumns = (sortColumns: TableSortColumn[]) => {
    updateArgs({ sortColumns });

    if (sortColumns.length === 0) {
      setRows(args.rows);
    } else {
      setRows(
        args.rows.sort((a: Row, b: Row) => {
          // eslint-disable-next-line no-restricted-syntax
          for (const sort of sortColumns) {
            const comparator = getComparator(sort.columnKey);
            const compResult = comparator(a, b);
            if (compResult !== 0) {
              return sort.direction === 'ASC' ? compResult : -compResult;
            }
          }
          // We expect the for loop to always return proper data, so this code
          // should never be reached
          throw new Error('An issue occurred while sorting table data');
        }),
      );
    }
  };

  const setSelectedRows = (rows: Set<Key>) => {
    updateArgs({ selectedRows: rows });
  };

  return (
    <Story
      args={{
        ...args,
        onSelectedRowsChange: setSelectedRows,
        onSortColumnsChange: setSortColumns,
        onRowsChange: setRows,
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
      },
    ],
    rows: [
      { id: '0', title: 'Loremm ipsum dolor sit amet' },
      { id: '1', title: 'Consectetur adipiscing elit' },
      { id: '2', title: 'Pellentesque suscipit tortor est' },
      { id: '3', title: 'Ut egestas massa aliquam a' },
      { id: '4', title: 'Nulla egestas vestibulum felis a venenatis' },
      { id: '5', title: 'Sed aliquet pulvinar neque' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "This is what the table looks like when only 'columns' and 'rows' are provided.\n" +
          'These props are always required.\n' +
          'Default behavior is:\n' +
          '- Resizable, sortable, non-editable, non-frozen columns\n' +
          '- Non-selectable rows',
      },
    },
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
      { id: '0', title: 'Lorem ipsum dolor sit amet' },
      { id: '1', title: 'Consectetur adipiscing elit' },
      { id: '2', title: 'Pellentesque suscipit tortor est' },
      { id: '3', title: 'Ut egestas massa aliquam a' },
      { id: '4', title: 'Nulla egestas vestibulum felis a venenatis' },
      { id: '5', title: 'Sed aliquet pulvinar neque' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "This story showcases all possible props that can be set on 'columns'.\n" +
          "Note that the 'editable' prop is meaningless when the 'editor' prop is not set.\n" +
          "When an 'editor' is provided, the 'editable' prop will default to 'true'",
      },
    },
  },
};

export const CustomizedColumnDefaults: Story = {
  args: {
    columns: [
      {
        key: 'id',
        name: 'ID',
      },
      {
        key: 'title',
        name: 'Title',
      },
    ],

    rows: [
      { id: '0', title: 'Lorem ipsum dolor sit amet' },
      { id: '1', title: 'Consectetur adipiscing elit' },
      { id: '2', title: 'Pellentesque suscipit tortor est' },
      { id: '3', title: 'Ut egestas massa aliquam a' },
      { id: '4', title: 'Nulla egestas vestibulum felis a venenatis' },
      { id: '5', title: 'Sed aliquet pulvinar neque' },
    ],

    defaultColumnWidth: 300,
    defaultColumnMinWidth: 100,
    defaultColumnMaxWidth: 500,
    defaultColumnSortable: false,
    defaultColumnResizable: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "This story showcases all possible defaults for 'column' props that can be set.\n" +
          'These defaults will be set to all columns and can be overridden by setting props' +
          ' on the individual columns',
      },
    },
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
        name: 'Title (sortable & editable)',
        sortable: true,
      },
    ],

    rows: [
      { id: '0', title: 'Lorem ipsum dolor sit amet' },
      { id: '1', title: 'Consectetur adipiscing elit' },
      { id: '2', title: 'Pellentesque suscipit tortor est' },
      { id: '3', title: 'Ut egestas massa aliquam a' },
      { id: '4', title: 'Nulla egestas vestibulum felis a venenatis' },
      { id: '5', title: 'Sed aliquet pulvinar neque' },
    ],

    onColumnResize: () => {
      // eslint-disable-next-line no-console
      console.log('Column resized');
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "This story showcases the 'onColumnResize' callback function.\n" +
          'Check the developer console for output.',
      },
    },
  },
};

export const CustomizedRows: Story = {
  args: {
    columns: [
      {
        key: 'id',
        name: 'ID',
      },
      {
        key: 'title',
        name: 'Title (editable)',
        editable: true,
      },
    ],

    rows: [
      { id: '0', title: 'Lorem ipsum dolor sit amet' },
      { id: '1', title: 'Consectetur adipiscing elit' },
      { id: '2', title: 'Pellentesque suscipit tortor est' },
      { id: '3', title: 'Ut egestas massa aliquam a' },
      { id: '4', title: 'Nulla egestas vestibulum felis a venenatis' },
      { id: '5', title: 'Sed aliquet pulvinar neque' },
    ],

    enableSelectColumn: true,
    rowHeight: 50,
    headerRowHeight: 100,
  },
  parameters: {
    docs: {
      description: {
        story: 'This story showcases how rows can be customized.',
      },
    },
  },
};

export const CellCallbackFunctions: Story = {
  args: {
    columns: [
      {
        key: 'id',
        name: 'ID',
      },
      {
        key: 'title',
        name: 'Title (editable)',
        editable: true,
      },
    ],

    rows: [
      { id: '0', title: 'Lorem ipsum dolor sit amet' },
      { id: '1', title: 'Consectetur adipiscing elit' },
      { id: '2', title: 'Pellentesque suscipit tortor est' },
      { id: '3', title: 'Ut egestas massa aliquam a' },
      { id: '4', title: 'Nulla egestas vestibulum felis a venenatis' },
      { id: '5', title: 'Sed aliquet pulvinar neque' },
    ],

    onCellClick: (args: TableCellClickArgs<Row>, event: TableCellMouseEvent) => {
      // eslint-disable-next-line no-console
      console.log(args);

      // eslint-disable-next-line no-console
      console.log(event);
    },

    onCellDoubleClick: (args: TableCellClickArgs<Row>, event: TableCellMouseEvent) => {
      // eslint-disable-next-line no-console
      console.log(args);

      // eslint-disable-next-line no-console
      console.log(event);
    },

    onCellContextMenu: (args: TableCellClickArgs<Row>, event: TableCellMouseEvent) => {
      // eslint-disable-next-line no-console
      console.log(args);

      // eslint-disable-next-line no-console
      console.log(event);
    },

    onCellKeyDown: (args: TableCellKeyDownArgs<Row>, event: TableCellKeyboardEvent) => {
      // eslint-disable-next-line no-console
      console.log(args);

      // eslint-disable-next-line no-console
      console.log(event);
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'This story showcases all callback functions related to cells.\n' +
          'It implements the following callback functions:\n' +
          '- onCellClick \n- onCellDoubleClick \n- onCellContextMenu \n- onCellKeyDown \n\n' +
          'Check the developer console for output',
      },
    },
  },
};

export const Direction: Story = {
  args: {
    columns: [
      {
        key: 'id',
        name: 'ID',
      },
      {
        key: 'title',
        name: 'Title (editable)',
        editable: true,
      },
    ],

    rows: [
      { id: '0', title: 'Lorem ipsum dolor sit amet' },
      { id: '1', title: 'Consectetur adipiscing elit' },
      { id: '2', title: 'Pellentesque suscipit tortor est' },
      { id: '3', title: 'Ut egestas massa aliquam a' },
      { id: '4', title: 'Nulla egestas vestibulum felis a venenatis' },
      { id: '5', title: 'Sed aliquet pulvinar neque' },
    ],

    direction: 'rtl',
  },
  parameters: {
    docs: {
      description: {
        story:
          "This story showcases the 'direction' prop. It can be set to either 'ltr' for left" +
          " to right behavior or 'rtl' for right to left behavior.",
      },
    },
  },
};

const generateRows = (): Row[] => {
  const rows: Row[] = [];

  for (let i = 0; i < 1000; i++) {
    rows.push({ id: i.toString(), title: 'Lorem ipsum dolor sit amet' });
  }
  return rows;
};

export const Virtualization: Story = {
  args: {
    columns: [
      {
        key: 'id',
        name: 'ID',
      },
      {
        key: 'title',
        name: 'Title (editable)',
        editable: true,
      },
    ],

    rows: generateRows(),

    enableVirtualization: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'This story showcases virtualization in large tables',
      },
    },
  },
};

export const MiscellaneousFunctions: Story = {
  args: {
    columns: [
      {
        key: 'id',
        name: 'ID',
      },
      {
        key: 'title',
        name: 'Title (editable)',
        editable: true,
      },
    ],

    rows: [
      { id: '0', title: 'Lorem ipsum dolor sit amet' },
      { id: '1', title: 'Consectetur adipiscing elit' },
      { id: '2', title: 'Pellentesque suscipit tortor est' },
      { id: '3', title: 'Ut egestas massa aliquam a' },
      { id: '4', title: 'Nulla egestas vestibulum felis a venenatis' },
      { id: '5', title: 'Sed aliquet pulvinar neque' },
      { id: '6', title: 'Lorem ipsum dolor sit amet' },
      { id: '7', title: 'Consectetur adipiscing elit' },
      { id: '8', title: 'Pellentesque suscipit tortor est' },
      { id: '9', title: 'Ut egestas massa aliquam a' },
      { id: '10', title: 'Nulla egestas vestibulum felis a venenatis' },
      { id: '11', title: 'Sed aliquet pulvinar neque' },
      { id: '12', title: 'Lorem ipsum dolor sit amet' },
      { id: '13', title: 'Consectetur adipiscing elit' },
      { id: '14', title: 'Pellentesque suscipit tortor est' },
      { id: '15', title: 'Ut egestas massa aliquam a' },
      { id: '16', title: 'Nulla egestas vestibulum felis a venenatis' },
      { id: '17', title: 'Sed aliquet pulvinar neque' },
    ],

    onScroll: (event: UIEvent<HTMLDivElement>) => {
      // eslint-disable-next-line no-console
      console.log(event);
    },

    onCopy: ({ sourceRow, sourceColumnKey }: TableCopyEvent<Row>) => {
      if (window.isSecureContext) {
        // CopyEvent in `react-data-grid` should declare its property as `sourceColumnKey: keyof TRow`
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        navigator.clipboard.writeText(sourceRow[sourceColumnKey as keyof Row]);
      }
    },

    onPaste: ({ sourceColumnKey, sourceRow, targetColumnKey, targetRow }: TablePasteEvent<Row>) => {
      const incompatibleColumns = ['email', 'zipCode', 'date'];
      if (
        sourceColumnKey === 'avatar' ||
        ['id', 'avatar'].includes(targetColumnKey) ||
        ((incompatibleColumns.includes(targetColumnKey) ||
          incompatibleColumns.includes(sourceColumnKey)) &&
          sourceColumnKey !== targetColumnKey)
      ) {
        return targetRow;
      }

      // CopyEvent in `react-data-grid` should declare its property as `sourceColumnKey: keyof TRow`
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      return { ...targetRow, [targetColumnKey]: sourceRow[sourceColumnKey as keyof Row] };
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'This story showcases miscellaneous callback functions.\n' +
          'It implements the following callback functions:\n' +
          '- onScroll \n- onCopy \n- onPaste \n\n' +
          'Check the developer console for output',
      },
    },
  },
};

export const CustomClassNames: Story = {
  args: {
    columns: [
      {
        key: 'id',
        name: 'ID',
      },
      {
        key: 'title',
        name: 'Title (editable)',
        editable: true,
      },
    ],

    rows: [
      { id: '0', title: 'Lorem ipsum dolor sit amet' },
      { id: '1', title: 'Consectetur adipiscing elit' },
      { id: '2', title: 'Pellentesque suscipit tortor est' },
      { id: '3', title: 'Ut egestas massa aliquam a' },
      { id: '4', title: 'Nulla egestas vestibulum felis a venenatis' },
      { id: '5', title: 'Sed aliquet pulvinar neque' },
    ],

    className: 'paratext',
  },
  parameters: {
    docs: {
      description: {
        story: 'This story showcases how custom CSS classes can be used',
      },
    },
  },
};

function CustomTextEditor<R>({ onRowChange, row, column }: TableEditorProps<R>): ReactElement {
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onRowChange({ ...row, [column.key]: e.target.value });
  };

  return <input onChange={changeHandler} />;
}

export const CustomRenderEditCell: Story = {
  args: {
    columns: [
      {
        key: 'id',
        name: 'ID',
      },
      {
        key: 'title',
        name: 'Title (The title for id == 0 is editable)',
        renderEditCell: CustomTextEditor<Row>,
        editable: (row: Row) => {
          return +row.id === 0;
        },
      },
    ],

    rows: [
      { id: '0', title: 'Lorem ipsum dolor sit amet' },
      { id: '1', title: 'Consectetur adipiscing elit' },
      { id: '2', title: 'Pellentesque suscipit tortor est' },
      { id: '3', title: 'Ut egestas massa aliquam a' },
      { id: '4', title: 'Nulla egestas vestibulum felis a venenatis' },
      { id: '5', title: 'Sed aliquet pulvinar neque' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'This story showcases how a custom cell editor can be set',
      },
    },
  },
};
