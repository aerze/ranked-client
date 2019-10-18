import React from "react";
import { Table } from "reactstrap";

export interface TableColumn<T> {
  title: string;
  renderTitle?: (column: TableColumn<T>) => any;
  render: (item: T, index: number, column: TableColumn<T>) => any;
}

export interface TableHeadProps<T> {
  columns: TableColumn<T>[];
}

export interface Item {
  _id: string;
}

export function TableHead<T>({ columns }: TableHeadProps<T>) {
  return (
    <thead>
      <tr>
        {columns.map(column => (
          <th key={column.title}>
            {column.renderTitle ? column.renderTitle(column) : column.title}
          </th>
        ))}
      </tr>
    </thead>
  );
}
export interface DataTableProps<T> {
  columns: TableColumn<T>[];
  items: T[];
}

export default function DataTable<T extends Item>({
  columns,
  items
}: DataTableProps<T>) {
  return (
    <Table responsive striped hover size="sm">
      <TableHead<T> columns={columns} />
      <tbody>
        {items.map((item, index) => (
          <tr key={item._id}>
            {columns.map(column => (
              <React.Fragment key={column.title}>
                {column.render(item, index, column)}
              </React.Fragment>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
