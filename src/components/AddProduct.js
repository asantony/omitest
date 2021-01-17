
import React from 'react';
import { Row, Form, Col, Button } from 'react-bootstrap';
import PostData from './PostData';

class AddProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productName: '',
            productId: '',
            availableQuantity: 0,
            errorMessage: ""
        }
        this.productSchema = {}
        //   this.state = this.initialState;
        this.errorMessage = ""
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        const type = event.target.type;

        this.setState({
            errorMessage: "",
            errordisplay: "none",
            [name]: (type === 'number') ? parseInt(value) : value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        this.productSchema = {
            productName: this.state.productName,
            productId: this.state.productId,
            availableQuantity: this.state.availableQuantity
        }
        this.onFormSubmit(this.productSchema);
        this.setState(this.initialState);
    }

    onFormSubmit = (data) => {
        const me = this;
        const myPostData = new PostData();

        function respondonSuccess(res) {
            me.props.onFormSuccessorcancel();
        }
        function respondonFailure() {
            me.setState({
                errordisplay: "block",
                errorMessage: "Sorry! Check your Data"
            })

        }
        const postUrl = "https://uiexercise.onemindindia.com/api/Product";
        myPostData.postdatatoServer(postUrl, data, respondonSuccess, respondonFailure);
    }

    render() {
        let mystyle = {
            display: this.state.errordisplay
        }
        return (
            <div className="addproductcontainer shadow p-3 mb-5 bg-white rounded" id="productcontainer">
                <Row className="formtittle">
                    <Col className="titlecol">
                        <h4 className="titlehead">Add Product</h4>
                    </Col>
                </Row>
                <Row className="formitemcontainer">
                    <Col>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="productName">
                                <Form.Label>Product Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="productName"
                                    value={this.state.productName}
                                    onChange={this.handleChange}
                                    placeholder="Product Name" />
                            </Form.Group>
                            <Form.Group controlId="productId">
                                <Form.Label>Product Id</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="productId"
                                    value={this.state.productId}
                                    onChange={this.handleChange}
                                    placeholder="Product Id" />
                            </Form.Group>
                            <Form.Group controlId="availableQuantity">
                                <Form.Label>Available Quantity</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="availableQuantity"
                                    value={this.state.availableQuantity}
                                    onChange={this.handleChange}
                                    placeholder="Available Quantity" />
                            </Form.Group>
                            <Form.Group controlId="error" className="error" style={mystyle}>
                                <Form.Label>{this.state.errorMessage}</Form.Label>
                            </Form.Group>
                            <Form.Group>
                                <Button variant="success" type="submit">Save</Button>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default AddProduct;
