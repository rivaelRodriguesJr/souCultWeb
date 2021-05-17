import React from "react";
import './styles.scss';

import { Pagination } from 'react-bootstrap';

class Pager extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {

        }
    };

    render() {
        return (
            <>
                <div className = "container">
                    <Pagination className="pager">
                        <Pagination.Prev />
                        <Pagination.Item>{1}</Pagination.Item>

                        <Pagination.Item>{11}</Pagination.Item>
                        <Pagination.Item active>{12}</Pagination.Item>
                        <Pagination.Item>{13}</Pagination.Item>

                        <Pagination.Ellipsis />
                        <Pagination.Item>{20}</Pagination.Item>
                        <Pagination.Next />
                    </Pagination>
                </div>
            </>

        );
    }
}

export default Pager;





