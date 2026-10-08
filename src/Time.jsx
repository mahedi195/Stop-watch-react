import { useEffect, useRef, useState } from "react";

function Stopwatch() {
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);

    //   const startTime = useRef(0);
    const previousTime = useRef(0);


    let startTime = 0;
    //let previousTime = 0;


    useEffect(() => {
        let interval;

        if (running) {
            //  startTime.current = Date.now();
            startTime = Date.now();
 
            interval = setInterval(() => {
                const currentTime = Date.now();
                // const elapsedTime = currentTime - startTime.current;
                const elapsedTime = currentTime - startTime;
                
                //setTime(previousTime + elapsedTime);
                setTime(previousTime.current + elapsedTime);
            }, 10);
        }

        return () => {
            clearInterval(interval);
        };
    }, [running]);

    function formatTime() {
        const hour = Math.floor(time / 3600000);

        const remaining_time = Math.floor(time % 3600000);

        const minutes = Math.floor(remaining_time / 60000);

        const remaining_seconds = remaining_time % 60000;

        const seconds = Math.floor(remaining_seconds / 1000);

        const milliseconds = Math.floor((time % 1000) / 10);

        return `${addZero(hour)}:${addZero(minutes)}:${addZero(seconds)}:${addZero(milliseconds)}`;
    }

    function addZero(value) {
        if (value < 10)
            value = "0" + value;

        return value;
    }

    function start() {
        setRunning(true);
    }

    function stop() {
        // previousTime= time;
        previousTime.current = time;
        setRunning(false);
    }

    function reset() {
        setRunning(false);
        setTime(0);
        previousTime.current = 0;
        // previousTime = 0;
    }

    return (
        <>
            <h1>Stopwatch</h1>

            <p>{formatTime()}</p>

            <button onClick={start}>Startt</button>
            <button onClick={stop}>Stop</button>
            <button onClick={reset}>Reset</button>
        </>
    );
}

export default Stopwatch;