import React, { } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row } from 'reactstrap';
import './Control.css';
import ControlSearch from './ControlSearch';
import ControlSort from './ControlSort'

const Control = (props) => {
    return (
        <Row className="mt-15">
            <ControlSearch />
            <ControlSort />
        </Row>
    )
}

export default Control;