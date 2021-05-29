import React from 'react';
import { connect } from 'react-redux';
import {check /* , getCurrentUser */ } from "../../actions/auth";


class Auth extends React.Component {

    state = {
        isLoading: true
    };

    componentDidMount() {
        const { check /* , getCurrentUser */ } = this.props;
        check();
        // check({ onFinish: (hasToken) => {
        //         if (hasToken) {
        //             setTimeout(() => getCurrentUser({ onFinish: () => {}}), 500)
        //
        //         }
        //     }
        // })
    }

    render() {
        const { children } = this.props;
        return children;
    }
}

export const mapStateToProps = ( {auth, currentUser} ) => ({ auth, currentUser });

const ConnectedComponent = connect( mapStateToProps, {
    check,
    // getCurrentUser
})( Auth );

export default ConnectedComponent;
