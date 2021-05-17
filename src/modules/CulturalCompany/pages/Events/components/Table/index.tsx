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
                                <th>Nome do evento</th>
                                <th>Ingressos disponíveis</th>
                                <th>Status</th>
                                <th>Local</th>
                                <th>Avaliação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.from({ length: 3 }).map((_, index) => (
                                <tr>
                                    {Array.from({ length: 5 }).map((_, index) => (
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