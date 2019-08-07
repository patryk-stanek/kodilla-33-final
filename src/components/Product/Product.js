//Importing methods
import React from "react";

//Importing styles
import "./Product.scss";

//Product container
const Product = props => {
    return (
        <div className="product">
            <div className="product__container">
                <img 
                    className="product__cover"
                    src={props.product.cover}
                    alt={props.product.name + "_cover"}
                />
                <div className="product__details">
                    <div className="product__box">
                        <span className="product__name">{props.product.name}</span>
                        <span className="product__artist">{props.product.artist}</span>
                    </div>
                    <span className="product__price">{props.product.price}</span>
                </div>
            </div>
        </div>
    )
}

export default Product;