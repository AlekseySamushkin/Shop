import React, {useEffect} from "react";
import cn from "classnames";
import './index.scss';
import {connect} from "react-redux";
import {getAllCategory, setActualCategory} from "../../../actions/category";


const Category = ({ getAllCategory, setActualCategory, categories, actualCategory }) => {
    useEffect(() => {
        getAllCategory()
    },[getAllCategory])

    return (
        <div className="category">
            Категории
            <div className="category__content">
                {categories && categories.map(el => <button className={cn({"actualCategory": actualCategory === el.id})} onClick={()=> setActualCategory(el.id)} key={el.id}>{el.name}</button>)}
            </div>
        </div>
    )
}

export const mapStateToProps = (state) => {
    return {
        categories: state.categories.categories,
        actualCategory: state.categories.actualCategory,
    };
};

const ConnectedComponent = connect(mapStateToProps, {
    getAllCategory,
    setActualCategory
})(Category);

export default ConnectedComponent;
