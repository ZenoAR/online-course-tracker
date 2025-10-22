import React from 'react';

const Greetings = () => {
    let myDate = new Date();
    let hours = myDate.getHours();
    let greet;
    let username = "Akmal";

    if (hours < 12) {
        greet = "morning";
    } else if (hours >= 12 && hours <= 17) {
        greet = "afternoon";
    } else if (hours >= 17 && hours <= 24) {
        greet = "evening";
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh', fontSize: 18 }}>
            <span>Good {greet}, {username}</span>
        </div>
    );
};

export default Greetings;
