import React, {useEffect} from "react";
import {connect} from "react-redux";
import {clearProducts, getAllProductsOfCategory, setPage} from "../../../actions/productList";
import ProductItem from "../../../components/productItem";
import Pagination from "@material-ui/lab/Pagination";


const ProductLIst = ({getAllProductsOfCategory, clearProducts, products, actualCategory, total, setPage, page}) => {

    useEffect(() => {
        if (actualCategory) {
            getAllProductsOfCategory({
                id: actualCategory,
                query: {
                    page,
                    pageSize: 10,
                }
            })
        }
    }, [actualCategory, getAllProductsOfCategory, page])

    useEffect(() => clearProducts,[clearProducts, actualCategory])

    return (
        <div className="productLIst">
            <div className="productLIst__content">
                {
                    products && actualCategory && products.map(el => (
                        <ProductItem
                            id={el.id}
                            key={el.id}
                            name={el.name}
                            price={el.price}
                            description={el.description}
                            img={el.image}
                        />
                    ))
                }
            </div>
            {
                !actualCategory && <div className="titleCont">Выберите категорию</div>
            }
            {
                products && Math.ceil(total / 10) > 1 && (
                    <Pagination onChange={(e, page)=> setPage(page)} count={Math.ceil(total / 10)} page={page}/>
                )
            }
            {
                products && products.length === 0 && (
                    <div className="titleCont">Нет телефонов в наличии</div>
                )
            }
        </div>
    )
}


export const mapStateToProps = (state) => {
    return {
        products: state.products.products,
        total: state.products.total,
        page: state.products.page,
        actualCategory: state.categories.actualCategory,
    };
};

const ConnectedComponent = connect(mapStateToProps, {
    getAllProductsOfCategory,
    clearProducts,
    setPage
})(ProductLIst);

export default ConnectedComponent;
