//Importing methods
import React from "react";
import { connect } from "react-redux";

//Importing components
import Sidebar from "../../components/Sidebar/Sidebar";
import ProductsListContainer from "../../components/Product/ProductsListContainer";
import Pagination from "../../components/Pagination/Pagination";

//Importing styles
import "./Home.scss";

//Importing actions for Searchbar states
import { getProducts } from "../../components/Product/Product.actions";

//Home component
class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            productsPage: [],
            currentPage: 0
        }

        this.handleChangePage = this.handleChangePage.bind(this);
    }

    componentWillMount() {
        this.props.dispatch(getProducts());//Getting products list
        this.setState({currentPage: 0})//Setting start page
    }
    
    handleUpdate() {
        this.setState({productsPage: []})//Clearing products on page
        this.setState({currentPage: 0})//Reseting start page
        this.forceUpdate();//Forcing component to update
    }

    handleChangePage(page) {
        this.setState({productsPage: []})//Clearing products on page  
        this.setState({currentPage: page})//Changin page to chosen
        window.scrollTo(0, 0);
        this.forceUpdate();//Forcing component to update
    }

    mapPropsToArray() {
        let state = this.state.productsPage;//state variable
        const props = this.props.visibleProducts;//props variable
        const size = 6;//Amount of displayed products on one page
        let newArray;

        //If amount of products is more than amount in size variable, put every next one to new array
        //If new array is also more than six, create another one
        for (let i=0; i<this.props.visibleProducts.length; i++) {
            newArray = state[state.length - 1];
            if (!newArray || newArray.length === size) {
                state.push([props[i]]);
            } else {
                newArray.push(props[i]);
            }
        }
        return newArray;
    }
    
    render() {
        //without this tweak it's hard to avoid not duplicating products on homepage
        // eslint-disable-next-line
        if (this.state.productsPage = []) {
            this.mapPropsToArray();
        }
        
        return (
            <div className="home">
                <Sidebar visibleProducts={this.props.visibleProducts} handleUpdate={this.handleUpdate.bind(this)}/>
                <div className="home__container">
                    <ProductsListContainer visibleProducts={this.state.productsPage[this.state.currentPage]} />
                    <Pagination handleChangePage={this.handleChangePage} pagesAmount={this.state.productsPage.length} currentPage={this.state.currentPage}/>
                </div>
            </div>
        )
    }
}

//Maping global state
const mapStateToProps = store => ({
    visibleProducts: store.productsReducer.visibleProducts
});

//Connecting state method with component
export default connect(mapStateToProps)(Home);