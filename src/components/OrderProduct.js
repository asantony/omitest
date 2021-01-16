import React, { Component } from 'react'
import { Row, Form, Col, Button } from 'react-bootstrap';

export class OrderProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: 0,
            errorMessage: "",
            errordisplay: "none"
        }
        this.orderSchema = {}
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        this.orderSchema = {
            orderId: this.props.productId,
            customerId: this.props.productId,
            productId: this.props.productId
        }

    }
    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            errorMessage: "",
            errordisplay: "none",
            [name]: parseInt(value)
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        let productId = this.props.orderInfo.productId;
        console.log("quantity === ", this.state.quantity)
        this.orderSchema = {
            orderId: productId,
            customerId: productId,
            productId: productId,
            quantity: this.state.quantity
        }
        this.onFormSubmit(this.orderSchema);
        this.setState(this.initialState);
    }

    onFormSubmit = (data) => {
        const postUrl = "https://uiexercise.onemindindia.com/api/OrderProducts";
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }

        fetch(postUrl, requestOptions)
            .then(async response => {
                //const data = await response.json();
                if (!response.ok) {
                    /* const error = (data && data.message) || response.status; */
                    this.setState({
                        errordisplay: "block",
                        errorMessage: "Sorry!"
                    })
                    return;
                }
                this.props.onFormSuccessorcancel();
            })
            .catch(error => {
                this.setState({
                    errordisplay: "block",
                    errorMessage: "Sorry! Check your Data"
                })
            });
    }

    render() {
        const productId = this.props.orderInfo.productId;
        const productName = this.props.orderInfo.productName;
        const availableQuantity = this.props.orderInfo.availableQuantity;
        let mystyle = {
            display: this.state.errordisplay
        }
        return (
            <div className="orderproductcontainer shadow p-3 mb-5 bg-white rounded" id="ordercontainer">
                <Row className="formtittle">
                    <Col className="titlecol">
                        <h4 className="titlehead">Order Product</h4>
                    </Col>
                </Row>
                <Row className="formitemcontainer">
                    <Col>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="productName">
                                <Form.Label>Product Name</Form.Label>
                                <Form.Control value={productName} disabled />
                            </Form.Group>
                            <Form.Group controlId="productId">
                                <Form.Label>Product Id</Form.Label>
                                <Form.Control value={productId} disabled />
                            </Form.Group>
                            <Form.Group controlId="availableQuantity">
                                <Form.Label>Available Quantity</Form.Label>
                                <Form.Control value={availableQuantity} disabled />
                            </Form.Group>
                            <Form.Group controlId="quantity">
                                <Form.Label>Quantity</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="quantity"
                                    value={this.state.quantity}
                                    onChange={this.handleChange}
                                    placeholder="Quantity" />
                            </Form.Group>
                            <Form.Group controlId="error" className="error" style={mystyle}>
                                <Form.Label>{this.state.errorMessage}</Form.Label>
                            </Form.Group>
                            <Form.Group>
                                <Button variant="success" type="submit">Save</Button>
                                <span className="errormsg" style={{ float: "right", fontWeight: "bolder", display: "none" }}>Sorry Can't Add Product</span>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default OrderProduct
