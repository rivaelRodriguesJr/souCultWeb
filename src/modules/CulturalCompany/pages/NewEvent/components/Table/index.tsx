import React from "react";
import './styles.scss';

import { Button, Form, Row, Col, Table } from 'react-bootstrap';

class TableStandard extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {

        }
    };

    render() {
        return (
            <>
                <div>
                    <Table responsive className="table" >
                        <thead className="tableHeader">
                            <tr>
                                <th>Data</th>
                                <th>Horário</th>
                                <th>Sala</th>
                                <th>Qtd. ingressos</th>
                                <th>Plano</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.from({ length: 3 }).map((_, index) => (
                                <tr>
                                    {Array.from({ length: 6 }).map((_, index) => (
                                        <td key={index}>Table cell {index}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </>
        );
    }
}

export default TableStandard;