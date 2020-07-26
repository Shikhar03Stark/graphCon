import React from 'react';
import './DatapointStyle.css';

export default class Datapoint extends React.Component{

    render(props){
        return (
            <div className = "datapoint" style = {{marginTop: parseInt(this.props.y), marginLeft: parseInt(this.props.x),}}>
                <div className= "beacon-outter"><div className="beacon-inner"><div className="beacon-inner-inner">&nbsp;</div></div></div >
            </div>
        );
    }
};