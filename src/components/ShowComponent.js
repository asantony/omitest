import React, { Component } from 'react'
import ProductList from "./ProductList";
import AddProduct from "./AddProduct";
import OrderProduct from "./OrderProduct";

export class ShowComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showProducts: true,
            showAddproduct: false,
            showOrderproduct: false,
            errorMessage: "",
            orderInfo: {}

        }
    }
    changetheStateValues = (showItem, orderInfo) => {
        this.setState({
            showProducts: showItem.showProducts,
            showAddproduct: showItem.showAddproduct,
            showOrderproduct: showItem.showOrderproduct,
            orderInfo: orderInfo
        })
    }

    callShowproducts = () => {
        return (
            < ProductList callbacktoshowComponent={this.changetheStateValues} />
        )
    }

    onFormSuccessorcancel = () => {
        this.setState({
            showProducts: true,
            showAddproduct: false,
            showOrderproduct: false
        })
    }

    callshowAddproduct = () => {
        return (
            <AddProduct onFormSuccessorcancel={this.onFormSuccessorcancel} />
        )
    }
    callshowOrderproduct = () => {
        return (
            <OrderProduct orderInfo={this.state.orderInfo} onFormSuccessorcancel={this.onFormSuccessorcancel} />
        )
    }

    render() {
        const { showProducts, showAddproduct, showOrderproduct } = this.state;
        return (
            <div className="showcomponenetcontainer">
                {
                    (showProducts) ?
                        this.callShowproducts()
                        : (showAddproduct) ?
                            this.callshowAddproduct()
                            : (showOrderproduct) ?
                                this.callshowOrderproduct()
                                : null
                }

            </div>
        )
    }
}

export default ShowComponent
