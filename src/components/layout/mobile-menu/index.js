import React, {Fragment} from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import cn from "classnames";
import {mobileMenuItems} from "../header/header-menu";
import {history} from "../../../store";
import {changeCategoriesFilter} from "../../../actions/categories";
import {ReactComponent as Arrow} from "../../../assets/icons/ArrowPagination.svg";
import {ReactComponent as Location} from "../../../assets/icons/mapForMobile.svg";
import Bonus from "../../../assets/icons/headredbonus.png";
import './index.scss'

export const MobileMenu = ({onClose, open}) => {
    const bonuses = 1500;
    const city = "Санкт-Петербург";

    const navigateToLink = (e, link) => {
        e.preventDefault();
        e.stopPropagation();
        onClose();
        history.push(link)
    };

    return (
        <div className={cn(
            'mobileMenu',
            {'mobileMenu_open': open}
        )}>
            <div>
                <div className="mobileMenu__header">
                    <button onClick={onClose}>
                        <Arrow/>
                        Весь сайт
                    </button>
                </div>
                <ul className="mobileMenu__list">
                    {mobileMenuItems.map((item) => (
                        <Fragment key={item.id}>
                            {
                                item.title === "Служба доставки" ?
                                    <div className="twoPoints  mobileMenu__title">
                                        <div className="titleCont">
                                            {item.title}
                                        </div>
                                        <div className="bonus">
                                            <Location/>
                                            <div className="greyLittleText">{city}</div>
                                        </div>
                                    </div>
                                    :
                                    <div className="titleCont mobileMenu__title">
                                        {item.title}
                                    </div>
                            }
                            <div className="mobileMenu__content">
                                {item.list.map(el => (
                                        el.label === "Программа лояльности" ?
                                            <div key={el.id} className="twoPoints">
                                                <Link
                                                    to={el.value}
                                                    onClick={(e) => navigateToLink(e, el.value)}
                                                    className={cn(
                                                        'mobileMenuItem',
                                                        // {'mobileMenuItem_active': isSelected(item.value),},
                                                    )}
                                                >
                                                    {el.label}
                                                </Link>
                                                <div className="bonus">
                                                    <img src={Bonus} alt="Bonus"/>
                                                    <div className="greyLittleText">
                                                        {bonuses}
                                                    </div>
                                                </div>
                                            </div>
                                            :
                                            <Link
                                                to={el.value}
                                                key={el.id}
                                                onClick={(e) => navigateToLink(e, el.value)}
                                                className={cn(
                                                    'mobileMenuItem',
                                                    // {'mobileMenuItem_active': isSelected(item.value),},
                                                )}
                                            >
                                                {el.label}
                                            </Link>
                                    )
                                )}
                            </div>
                        </Fragment>
                    ))}
                </ul>
            </div>
        </div>
    )
};

export const mapStateToProps = (state) => {
    return {
        categories: state.categories.list,
        filter: state.categories.filter
    };
};

const ConnectedComponent = connect(mapStateToProps, {
    changeCategoriesFilter
})(MobileMenu);

export default ConnectedComponent;
