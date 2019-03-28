import React from 'react';
import ReactDOM from 'react-dom';
import Road from './road.js';
import Buttons from './buttons.js';
import "./App.css";

class IndecisionApp extends React.Component {
    state = {
        carPosition: 240,
        blockPosition: 220,
        block2Position: 220,
        blockPositionLine: 0,
        block2PositionLine: 0,
        carRotation: 0,
        wasStarted: false,
        isDead: false,
        isDeadForBomb: false,
        countOfMetrs: 0,
        countOfMax: 0
    }

    componentDidMount() {
        const json = localStorage.getItem("max");
        this.setState(() => ({countOfMax: JSON.parse(json)}))
        
    }

    startReGame = () => {
        setTimeout( () => {
        const Btn = document.getElementById('StartBtn');
        Btn.style.cssText="visibility: hidden";
        this.setState({isDead: false});
        var i;
        for (i = 0; i < 99999; i++) {
          setTimeout( (i) => {
              if(!this.state.isDead) {
                    this.startGame()
              }
          }, 1800 * i + 1, i);
        }
        var j;
        for (j = 0; j < 99999; j++) {
          setTimeout( (j) => {
              if(!this.state.isDead) {
                    this.setState({countOfMetrs: this.state.countOfMetrs + 1})
                    if(this.state.countOfMetrs > this.state.countOfMax) {
                        this.setState({countOfMax: this.state.countOfMetrs})
                    }
              }
          }, 500 * j + 1, j);
        }
      }, 1500)
    }

    startGame = () => {
        this.setState({blockPositionLine: Math.floor(Math.random() * 3)})
        this.setState({block2PositionLine: Math.floor(Math.random() * 3)})
        this.setRandomLine();
        this.setRandomLine2();
        this.setState({wasStarted: true})
        setTimeout( () => {this.endGame()}, 900)
        setTimeout( () => {this.anotherOne()}, 1500)
    }

    restart = () => {
        this.setState({isDead: false});
    }

    setRandomLine = () => {
        switch(this.state.blockPositionLine) {
            case 0:
            this.setState({blockPosition: 20});
            break
            case 1:
            this.setState({blockPosition: 220});
            break
            case 2:
            this.setState({blockPosition: 420});
            break
            
        }
    }

    setRandomLine2 = () => {
        switch(this.state.block2PositionLine) {
            case 0:
            this.setState({block2Position: 20});
            break
            case 1:
            this.setState({block2Position: 220});
            break
            case 2:
            this.setState({block2Position: 420});
            break
            
        }
    }

    endGame = () => {
        if((this.state.carPosition - 40 == this.state.blockPosition - 20) ||(this.state.carPosition - 40 == this.state.block2Position - 20)) {
        this.setState({isDead: true});
        this.setState({countOfMetrs: 0})
        this.setState({isDeadForBomb: true});
        setTimeout( () => {this.setState({isDeadForBomb: false});}, 1500)
        }
    }

    anotherOne = () => {
        this.setState({wasStarted: false})
    }

    turnRight = () => {
        if(this.state.carPosition != 440) {
        this.setState({carPosition: this.state.carPosition + 200})
        this.setState({carRotation: this.state.carRotation + 30});
        
          setTimeout( () => {
            this.setState({carRotation: 0})
          }, 500);
        }
    }

    turnLeft = () => {
        if(this.state.carPosition != 40) {
        this.setState({carPosition: this.state.carPosition - 200})
        this.setState({carRotation: this.state.carRotation - 30});
        
          setTimeout( () => {
            this.setState({carRotation: 0})
          }, 500);
        }
    }
    
    

    componentDidUpdate = () => {
        const json = this.state.countOfMax;
            localStorage.setItem('max', json);
        const Car = document.getElementById('Car');
        Car.style.cssText="left: " + this.state.carPosition + "px; \
        transform: rotate(" + this.state.carRotation +"deg)";
        if(this.state.wasStarted) {
            const Block = document.getElementById('Block');
        Block.style.cssText="left: " + this.state.blockPosition + "px;";
            const Block2 = document.getElementById('Block2');
        Block2.style.cssText="left: " + this.state.block2Position + "px;";
        }
    }

    render() {
        return (
            <div className="Wrapp">
            <div className = "GameWrapp">
            <Road wasStarted = {this.state.wasStarted}
            restart = {this.restart}
            isDead = {this.state.isDead}
            isDeadForBomb = {this.state.isDeadForBomb}
            countOfMetrs = {this.state.countOfMetrs}
            countOfMax = {this.state.countOfMax}/>
            <Buttons turnRight = {this.turnRight}
            turnLeft = {this.turnLeft}
            startGame = {this.startReGame}/>
            </div>
            </div>
        )
    }
}


ReactDOM.render(<IndecisionApp />, document.getElementById("root"))