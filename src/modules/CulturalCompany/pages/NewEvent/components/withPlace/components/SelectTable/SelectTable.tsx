import { Seat } from 'core/models/Seat';
import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import { Column, useRowSelect, useTable } from 'react-table';


const columns: Column<Seat>[] = [
  // {
  //   Header: 'Área',
  //   accessor: 'area'
  // },
  // {
  //   Header: 'Fileira',
  //   accessor: 'row'
  // },
  // {
  //   Header: 'Qtd. assentos',
  //   accessor: 'quantity'
  // }
];

interface Props {
  seats: Seat[];
  selectedSeatsIds: number[];
  onSumbitSelectedSeats: (selectedSeats: Seat[]) => void;
  setSelectedSeatsId: (ev: any) => void;
}

const SelectTable = ({ seats: data, selectedSeatsIds, onSumbitSelectedSeats, setSelectedSeatsId }: Props) => {

  const {
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    toggleRowSelected
  } = useTable<Seat>(
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
    rows.forEach(({ id, original }) => {
      toggleRowSelected(id, selectedSeatsIds.some(selectedSeat => Number(selectedSeat) === Number(original.id)));
    });
  }, [rows, selectedSeatsIds, toggleRowSelected]);

  useEffect(() => {
    console.log(selectedFlatRows.map(row => row.original));
  }, [selectedFlatRows]);


  return (
    <>
      <Row>
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
      </Row>
      <Row className="justify-content-end">
        <Col sm="2">
          <Button
            className="button"
            variant="secondary"
            onClick={() => onSumbitSelectedSeats(selectedFlatRows.map(row => row.original)) }
          >Adicionar sessão</Button>
        </Col>
      </Row>
    </>
  );
}

export default SelectTable;
