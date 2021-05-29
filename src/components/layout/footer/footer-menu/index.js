import React from "react";
import {Link} from "react-router-dom";
import cn from "classnames";
import './index.scss';

export const FooterMenu = ({ menuList, title }) => {
    return (
        <div className={cn('footerMenu')}>
            <h3>{title}</h3>
            <ul>
                {
                    menuList.map((item) =>
                        <Link to={item.link} key={item.link}>
                            {item.label}
                        </Link>
                    )
                }
            </ul>
        </div>
    )
};
