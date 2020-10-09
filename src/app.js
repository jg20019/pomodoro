import React from 'react'; 
import ReactDOM from 'react-dom'; 

import Home from './home.js'; 
import Timer from './timer.js'; 

function isSameDay(aDate, bDate) {
    /* Returns true if aDate and bDate occur on the same day. 
     * (Has the same month, date, and year) 
     */ 

    return (aDate.getMonth() === bDate.getMonth() &&
            aDate.getDate() === bDate.getDate() &&
            aDate.getFullYear() === bDate.getFullYear()); 
} 

class App extends React.Component {
    constructor(props){
        super(props); 
        this.state = {
            history: [], 
            page: 'home', // home | timer 
        };  
    } 
    
    get completedPomodoros() { 
        /* Returns the number of pomodoros completed today */ 

        const today = new Date(); 
        const history = this.state.history; 

        // we look at the endDate to determine when a pomodoro was
        // completed
        const numCompletedToday = history.reduce((numCompleted, {endTime}) => {
            if (isSameDay(endTime, today)) {
                return numCompleted + 1; 
            } else {
                return numCompleted; 
            } 
        }, 0); 

        return numCompletedToday; 
    } 
   
    startTimer() {
        this.setState({page: 'timer'}); 
    } 


    renderHome() {
        return (
            <Home 
              completedPomodoros={ this.completedPomodoros }
              onClick={ () => this.startTimer()} /> 
        ); 
    }

    showReport(startTime, endTime){
        const history = this.state.history.concat({startTime, endTime})
        this.setState({history, page: 'home'}); 
    } 

    renderTimer() {
        return (
            <Timer onCompletion={ (startTime, endTime) => this.showReport(startTime, endTime) } />   
        ); 
    }

    render() {
        if (this.state.page === 'home') {
            return this.renderHome();
        } else if (this.state.page === 'timer') {
            return this.renderTimer(); 
        } 
    } 
} 

export default App; 
