import React, { Component, Fragment } from 'react'
import { Table } from 'react-bootstrap'
import * as ReactBootStrap from 'react-bootstrap'

export class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            stateValues: {
                showProducts: true,
                showAddproduct: false,
                showOrderproduct: false,
            },
            orderInfo: {

            },
            totalproducts: 0,
            showtotalproduct: "none"
        }
        this.myTimer = null;
    }

    componentDidMount() {
        const producturl = "https://uiexercise.onemindindia.com/api/Product";
        fetch(producturl)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        products: result
                    })
                },
                (error) => {
                    this.setState({
                        error: error
                    })
                }
            )

        this.myTimer = setTimeout(function () {
            this.findtotalProduct()
        }.bind(this), 2000)
    }

    componentWillUnmount() {
        clearTimeout(this.myTimer);
    }



    findtotalProduct = () => {
        const products = this.state.products;
        let tproduct = 0
        for (var prop in products) {
            if (products[prop].availableQuantity) {
                tproduct = tproduct + 1
            }
        }
        if (tproduct > 0) {
            this.setState({
                totalproducts: tproduct,
                showtotalproduct: "block",
            })
        }

    }

    showOrderbutton = (product, index) => {
        return (
            <Fragment>
                < tr key={index}>
                    <td>{product.productName}</td>
                    <td>{product.productId}</td>
                    <td>{product.availableQuantity}</td>
                    <td><img className="ordericon" src="../images/ordericon.png" alt="Order" onClick={() => this.callorderProduct(product)}></img></td>
                </tr>
            </Fragment >
        )

    }
    changestateValues = (val1, val2, val3) => {
        this.setState({
            stateValues: {
                showProducts: val1,
                showAddproduct: val2,
                showOrderproduct: val3
            }
        })
        setTimeout(() => {
            this.props.callbacktoshowComponent(this.state.stateValues, this.state.orderInfo)
        }, 100);
    }

    callorderProduct = (product) => {
        this.setState({
            orderInfo: product
        })
        this.changestateValues(false, false, true)
    }

    calladdProduct = () => {
        this.changestateValues(false, true, false)
    }
    callshowProducts = () => {
        const products = this.state.products;
        let mystyle = {
            display: this.state.showtotalproduct
        }
        return (
            <Fragment>
                <div className="productlistcontainer">
                    <div>
                        <p className="totalproducts" style={mystyle}><span className="productvalue">{this.state.totalproducts}</span>Products </p>
                        <button className="btn btn-primary addproduct" onClick={this.calladdProduct}>Add Product</button>
                    </div>

                    <div className="tablecontainer">
                        <Table bordered responsive>
                            <thead className="text-center">
                                <tr>
                                    <th>Product Name</th>
                                    <th>Product Id</th>
                                    <th>Available Quantity</th>
                                    <th>Order</th>
                                </tr>
                            </thead>
                            <tbody className="text-center" id="tablebody">
                                {
                                    products.map((product, index) => (
                                        (product.availableQuantity !== 0) ? this.showOrderbutton(product, index) : null
                                    ))
                                }

                            </tbody>
                        </Table>
                    </div>

                </div >
            </Fragment>
        )
    }
    showLoading = () => {
        return (
            <div className="spinner">
                <ReactBootStrap.Spinner animation="border" />
            </div>

        )

    }
    render() {
        return (
            (this.state.products.length > 0) ? this.callshowProducts() : this.showLoading()
        )
    }
}

export default ProductList
