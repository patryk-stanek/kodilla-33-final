//Importing methods
import React from "react";

import "./Pagination.scss";

//Pagination component
class Pagination extends React.Component {

    render() {
        //Condition for previous page
        let prevPage = this.props.currentPage >= 1 ? this.props.currentPage - 1 : this.props.currentPage;
        //Condition for next page
        let nextPage = this.props.currentPage <= this.props.pagesAmount ? this.props.currentPage + 1 : this.props.currentPage;
        return (
            <div>
                <button onClick={() => this.props.handleChangePage(prevPage)}>prev</button>
                {
                    Array.from(Array(this.props.pagesAmount)).map((id, index) => {
                        //Condition for setting style for active page
                        let currentPageStyle = this.props.currentPage === index ? "current-page" : "inactive-page";
                        return (
                            <button
                                key={index}
                                onClick={() => this.props.handleChangePage(index)}
                                className={currentPageStyle}
                            >
                                {index + 1}
                            </button>
                        )
                    })
                }
                <button onClick={() => this.props.handleChangePage(nextPage)}>next</button>
            </div>
        )
    }
}

export default Pagination;