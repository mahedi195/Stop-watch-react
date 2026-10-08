import { useEffect, useRef, useState } from "react";
import './App.css';


function Watch() {

    const [running, isRunning] = useState(false);

    const [time, setTime] = useState(0);

    const previous_time = useRef(0);


    useEffect(() => {
        let interval;
        if (running == true) {

            let starting_time = Date.now();

            interval = setInterval(() => {
                const current_time = Date.now();
                const elapsed_time = current_time - starting_time;
                setTime(previous_time.current + elapsed_time);

            }, 20);
        }



        return (() => {
            clearInterval(interval);
        })

        //clearInterval()

    }, [running])



    function start() {
        isRunning(true);

    }


    function stop() {
        isRunning(false);
        previous_time.current = time;


    }

    function reset() {
        isRunning(false);
        previous_time.current = 0;
        setTime(0);

    }


    function formatTime() {
        // let time = 360000045;
        const hours = Math.floor(time / 3600000);
        let remaining_time = time % 3600000;

        const minutes = Math.floor(remaining_time / 60000);
        remaining_time = remaining_time % 60000;

        const seconds = Math.floor(remaining_time / 1000);
        remaining_time = remaining_time % 1000;

        const mili_seconds = Math.floor(remaining_time / 10);

        return `${prependZero(hours)}:${prependZero(minutes)}:${prependZero(seconds)}.${prependZero(mili_seconds)}`;

    }


    function prependZero(number) {
        if (number < 10)
            number = '0' + number;
        return number;

    }


    return (

        <div className="myTime">

            <h1 className='stopwatch'>My Stopwatch</h1>
            <p className="hh_mm_ss_miliSecond">HH MM SS MS</p>
            <h1 className="time">{formatTime()}</h1>

            <div className="all_btn">
                <button className="start_btn" onClick={start}>Start</button>
                <button className="stop_btn" onClick={stop}>Stop</button>
                <button className="reset_btn" onClick={reset}>Reset</button>
            </div>
            

        </div>
    );
}

export default Watch; 