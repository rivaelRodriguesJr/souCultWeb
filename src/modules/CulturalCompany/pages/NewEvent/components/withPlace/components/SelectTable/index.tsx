import { useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import { Column, useRowSelect, useTable } from 'react-table';

export interface TableRowFormat {
  id: number;
  row: string;
  areaId: number;
  area: string;
  quantity: number;
}

const columns: Column<TableRowFormat>[] = [
  {
    Header: 'Área',
    accessor: 'area'
  },
  {
    Header: 'Fileira',
    accessor: 'row'
  },
  {
    Header: 'Qtd. assentos',
    accessor: 'quantity'
  }
];

interface Props {
  seats: TableRowFormat[];
  selectedSeats: number[];
  setSelectedSeats: (selectedSeats: number[]) => void;
}

const SelectTable = ({ seats: data = [], selectedSeats = [], setSelectedSeats }: Props) => {

  const {
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    toggleRowSelected
  } = useTable<TableRowFormat>(
    {
      columns,
      data
    },
    useRowSelect,
    hooks => {
      hooks.visibleColumns.push(columns => [
        ...columns,
        {
          id: 'selection',
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <Form.Check {...getToggleAllRowsSelectedProps()} />
          ),
          Cell: ({ row }: any) => (
            <Form.Check {...row.getToggleRowSelectedProps()} />
          )
        }
      ]);
    }
  );

  useEffect(() => {
    if (!selectedFlatRows.every((val, index) => val.original.id === selectedSeats[index])) {
      return;
    }
    console.log({tablerows: rows, selectedSeats});
    rows.forEach(({ id, original }) => {
      toggleRowSelected(id, selectedSeats.some(selectedSeat => selectedSeat === original.id));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows, selectedSeats, toggleRowSelected]);

  useEffect(() => {
    setSelectedSeats(selectedFlatRows.map(row => row.original.id));
  }, [selectedFlatRows, setSelectedSeats]);


  return (
    <Table responsive className="table" >
      <thead className="tableHeader">
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </Table>
  );
}

export default SelectTable;
