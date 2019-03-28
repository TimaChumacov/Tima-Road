import React from 'react';
import ReactDOM from 'react-dom';
import "./road.css";


class Road extends React.Component {
    render() {
        return(
            <div className="Road">
                <div className="RoadLine"></div>
                <div className="RoadLine"></div>
                <div className="RoadLine"></div>
                <div id="Car"></div>
                <div className="mWrapp">
                    <div className ="currentM">{this.props.countOfMetrs}m</div>
                    <div className="maxM">{this.props.countOfMax}m</div>
                </div>
                {(this.props.wasStarted) ? <div id="Block"></div> : <div></div>}
                {(this.props.wasStarted) ? <div id="Block2"></div> : <div></div>}
                {(this.props.isDeadForBomb) ? <div id="Bomb"></div> : <div></div>}
                {(this.props.isDead) ? 
                <div className="lostScreen"> You lose!
                <div className="restart" onClick={this.props.restart}>
                &crarr;</div></div>
                : <div></div>}
            </div>
        )
    }
}

export {Road as default}