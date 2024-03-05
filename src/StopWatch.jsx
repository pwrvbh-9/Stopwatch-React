import React, {useState, useRef, useEffect} from "react";


function Stopwatch() {

    const [isRunning, setisRunning] = useState(false);
    const [elapsedTime, setelapsedTime] = useState(0);
    const intervalIDRef = useRef(null);
    const startTimeRef = useRef(0);

    useEffect(() => {
        if(isRunning) {
            intervalIDRef.current =  setInterval(() => {
                setelapsedTime(Date.now() - startTimeRef.current);
            }, 10) 
        }

        return () => {
            clearInterval(intervalIDRef.current)
        }

    }, [isRunning]);

    function start() {
        setisRunning(true);
        startTimeRef.current = Date.now() - elapsedTime;
    }

    function stop() {
        setisRunning(false);
    }

    function reset(){
        setelapsedTime(0);
        setisRunning(false);
    }

    function format() {

        let minutes = Math.floor(elapsedTime / (1000*60) % 60);
        let seconds = Math.floor(elapsedTime / (1000) % 60);
        let milliseconds = Math.floor((elapsedTime % 1000) / 10);

        minutes = String(minutes).padStart(2, "0");
        seconds = String(seconds).padStart(2, "0");
        milliseconds = String(milliseconds).padStart(2, "0");
        return `${minutes}:${seconds}:${milliseconds}`
    }

    return(
        <div className="stopwatch">
            <div className="stopwatch-count">
                {format()}
            </div>
            <div >
                <button onClick={start} className="button start-button">Start</button>
                <button onClick={stop} className="button stop-button">Stop</button>
                <button onClick={reset} className="button reset-button">Reset</button>
            </div> 
        </div>
    );
}

export default Stopwatch