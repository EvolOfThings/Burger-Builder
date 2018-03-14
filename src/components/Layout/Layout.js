import React, { Fragment, Component } from 'react';

import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

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
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Fragment>
            )
    }
}

export default Layout;