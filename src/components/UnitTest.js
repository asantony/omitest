import React, { Component } from 'react'

export class UnitTest extends Component {
    render() {
        return (
            <div className="unittestcontainer shadow p-3 mb-5 bg-white">
                <h4 className="testtittle">Unit Testing</h4>
                <ul className="ullist">
                    <li className="listitem">The product will be displayed only if the product is available.</li>

                    <li className="listitem">Check whether total product is increased after adding the product.</li>

                    <li className="listitem">Check whether available quantity is reduced after placed the order.</li>

                    <li className="listitem"> While adding the product if the enter values are wrong the error message will be shown.</li>

                    <li className="listitem">While placing the order if the order quantity is more than the available quantity the error message will be shown.</li>
                </ul>
            </div>
        )
    }
}

export default UnitTest
