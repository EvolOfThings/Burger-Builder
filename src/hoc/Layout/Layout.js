import React, { Fragment, Component } from 'react';
// import PropTypes from 'prop-types';

import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState( { showSideDrawer:false } );
    }

    //this is the better approach to set a state when it depends on previous state,
    // otherwise it would cause bugs due to async nature of setState
    sideDrawerToggleHandler = () => {
        this.setState( ( prevState ) =>{
            return  {showSideDrawer: !prevState.showSideDrawer};
        } );
    }
    render() {
        return (
            <Fragment>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Fragment>
            )
    }
}

// Layout.propTypes = {
//     children: PropTypes.node
// }

export default Layout;