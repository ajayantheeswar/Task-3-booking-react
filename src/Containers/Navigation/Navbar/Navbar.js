import React from 'react';
import classes from './Navbar.module.css';
import { NavLink } from 'react-router-dom';
import {connect} from 'react-router';

const Navbar = props =>{
    let link;
    if(props.isAdmin){
        link = props.isAuth ? <li><NavLink className={classes['link']} activeStyle={{backgroundColor : 'brown'}} to={'/admin/dashboard'}>Dashboard</NavLink></li> : null
    }else{
        link = props.isAuth ? <li><NavLink className={classes['link']} activeStyle={{backgroundColor : 'brown'}} to={'/customer/yourtickets'}>Your Tickets</NavLink></li> : null
    }
    
    
    return(
    <div className={classes.navbar}>
        <div className={classes.logo}>
            <p>Iba Bus</p>
        </div>
        <ul className={classes["nav-list"]}>
            {link}
            {props.isAuth ? <li><NavLink exact className={classes['link']} activeStyle={{backgroundColor : 'brown'}} to={'/customer/search'}>Home</NavLink></li> : null} 
            {props.isAuth ? null: <li><NavLink className={classes['link']} activeStyle={{backgroundColor : 'brown'}} to={'/auth'}>SignIn</NavLink></li>}
            {props.isAuth ? <li onClick={props.logout}><NavLink className={classes['link']} activeStyle={{backgroundColor : 'brown'}} to={'/auth'}>Logout</NavLink></li>: null}
        </ul>
    </div>
)
}



export default Navbar;