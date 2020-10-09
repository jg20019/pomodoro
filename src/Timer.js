import React from 'react'; 
import ReactDOM from 'react-dom'; 

import './Timer.css'; 

class Timer extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            // secondsRemaining: 25 * 60, // 25 minutes
            secondsRemaining: 5, // 5 seconds 
            isRunning: true, 
            startTime: new Date(), 
            onCompletion: this.props.onCompletion  
        };
    } 

    secondsToString() {
        const seconds = this.state.secondsRemaining; 
         
        const secondsString = `${seconds % 60}`.padStart(2, "0"); 
        const minutesString = `${Math.floor(seconds / 60)}`.padStart(2, "0"); 
        return `${minutesString}:${secondsString}`; 
    } 
   
    tick() {
        if (this.state.secondsRemaining == 0) {
            this.setState({isRunning: false}); 
            this.stopTimer();  
            this.state.onCompletion(this.state.startTime, new Date()); 
        } 
        else if (this.state.isRunning) {
            this.setState({secondsRemaining: this.state.secondsRemaining - 1}); 
        } 
    } 

    stopTimer() {
        clearInterval(this.timerID); 
    }   

    toggleRunning() {
        this.setState({isRunning: !this.state.isRunning}); 
    } 

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(), 1000 
        ); 
    } 

    componentWillUnmount() {
        this.stopTimer(); 
    } 

    render() {
        const pauseButtonText = this.state.isRunning ? "pause" : "continue"; 
        return (
            <div class="timer"> 
                <div class="timer-display">
                   { this.secondsToString() }
                </div> 
                <button onClick={ () => this.toggleRunning() }> { pauseButtonText }</button>
                <button> stop </button> 
            </div> 
        ); 
    }
}

export default Timer;
