import React, {lazy, Suspense} from "react";
import {connect} from "react-redux";
import { Route, Switch } from 'react-router-dom';
import routes from "../../routes";
import Header from "./header";
// import {Footer} from "./footer";

const HomePage = lazy(() => import('../../pages/home'));
const PhonePage = lazy(() => import('../../pages/phonePage'));
const Basket = lazy(() => import('../../pages/basket'));


const Layout  = () => {
    return (
        <>
            <Header />
            <div>
                <Suspense fallback={<div />}>
                    <Switch>
                        <Route exact path={routes.home()} component={HomePage}/>
                        <Route exact path={routes.basket()} component={Basket}/>
                        <Route exact path={routes.phone(":id")} component={PhonePage}/>
                        <Route
                            path="*"
                            render={
                                ({ location }) => (
                                    <h3>
                                        404:
                                        {location.pathname}
                                    </h3>
                                )
                            }
                        />
                    </Switch>
                </Suspense>
            </div>
            {/*<Footer />*/}
        </>
    )
};

export const mapStateToProps = () => {
    return {};
};

const ConnectedComponent = connect( mapStateToProps, {
})( Layout );

export default ConnectedComponent;
