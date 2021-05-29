import React from "react";
import cn from "classnames";

import './index.scss';


export const Footer = () => {
    return (
        <footer className={cn(
            'footer',
        )}>
            <div className={cn(
                'footer__top',
            )}>
                тут будет футтер
            </div>
            <div className={cn('footer__content')}>
                тут будет футтер
            </div>
            <div className={cn('footer__bottom')}>
                тут будет футтер
            </div>
        </footer>
    )
};
