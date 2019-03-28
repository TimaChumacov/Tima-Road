import React from 'react';
import ReactDOM from 'react-dom';
import "./buttons.css";


class Buttons extends React.Component {
    render() {
        return(
            <div className="BtnWrapp">
                <div className="Btn" onMouseDown={this.props.turnLeft}><div className = "Arrow left"></div></div>
                <div className="Btn" onMouseDown={this.props.turnRight}><div className = "Arrow right"></div></div>
                <a><div id="StartBtn" onMouseUp={this.props.startGame}> S T A R T</div></a>
            </div>
        )
    }
}

export {Buttons as default}