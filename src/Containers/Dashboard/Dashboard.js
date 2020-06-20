import React, { Component } from 'react';
import classes from './Dashboard.module.css';
import BusItem from '../../Components/BusItem/BusItem';
import {connect} from 'react-redux';
import Backdrop from '../../Components/UI/Backdrop/Backdrop';
import BusForm from '../../Components/BusForm/Busform';
import * as actions from '../../store/actions/index';

class Dashboard extends Component {

    constructor(props){
        super(props);
        this.state = {
            modal : false,
            form_Data : {
                busno : '',
                capacity : 0,
                endpointA: '',
                endpointB: '',
                timingA:'',
                timingB:'',
                fare : 0.00
            }
        }
    
    }

    onBackdropClick = ()=>{
        this.setState( (prevstate,props)=> {
            return {modal:false};
        } );
    }
    onAddbusClick = ()=>{
        this.setState( (prevstate,props)=> {
            return {modal:true};
        } );
    }
    onformSubmit = (event) =>{
        event.preventDefault();
    }

    onAddClicked = (event) => {
        const form_data = {...this.state.form_Data};
        console.log('sdf',this.props.token);
        this.props.onAddData(this.props.token,form_data,this.onCancelClicked);
    }

    onCancelClicked = (event) =>{
        this.setState( (prevstate,props)=> {
            return {modal:false};
        } );
    }

    

    onFormItemChanged = (event,id) =>{
        const Update_FormData = {...this.state.form_Data};
        Update_FormData[id] = event.target.value
        this.setState((prevstate)=>{
            return {...prevstate,form_Data :{...Update_FormData}};
        });
        
    }

    componentDidMount(){
        this.props.FetchBuses(this.props.token);
    }


    render(){

        let busList = this.props.bus_list.map(bus => {
            return <li key={bus.id}><BusItem Bus={bus} /></li> ;
        });

        return (
            <React.Fragment>
            <div className={classes['dash-board']}>
                <div className={classes['middle-section']}>
                    <a onClick={this.onAddbusClick}>Add bus</a>
                    <hr />
                    <div>
                        <ul className={classes['bus-list']}>
                            {busList}
                        </ul>
                    </div>
                </div>
            </div>
            <Backdrop visible={this.state.modal} onClick={this.onBackdropClick}>
                <BusForm inputFormData={this.state.form_Data} OnFormChange={this.onFormItemChanged} onCancelClicked={this.onCancelClicked} onAddClicked={this.onAddClicked} onformSubmit={this.onformSubmit}/>
            </Backdrop>
            </React.Fragment>
            
        );
    }

}

const mapStateToProps = state => ({
    bus_list : state.dashboard.busList,
    token : state.auth.token
});


const mapDispatchToProps = dispatch =>({
    onAddData : (id,form_data,positive_cb) => dispatch(actions.StartAddBusAsync(id,form_data,positive_cb)),
    FetchBuses : (token) => dispatch(actions.FetchBusStartAsync(token))
});

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);





