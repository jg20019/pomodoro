import React from 'react'; 
import ReactDOM from 'react-dom'; 

import './home.css';  


function Home(props){
   let message; 
   if (props.completedPomodoros == 0) {
     message = "You haven't completed any pomodoros"; 
   } else if (props.completedPomodoros == 1) {
     message = "You have completed 1 pomodoro"; 
   } else {
     message = `You have completed ${props.completedPomodoros} pomodoros`; 
   } 
   return (
       <div class="home-page"> 
           <h1>  { message } </h1> 
           <button onClick={ () => props.onClick() }> start </button> 
       </div> 
   ); 
} 

export default Home; 
