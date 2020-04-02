import React from "react";
import {useTimer} from "../customHooks/useTimer";

export function MyTimer({ expiryTimestamp }) {
    const {
        seconds,
        minutes,
        start,
        pause,
        resume,
        restart,
    } = useTimer({
        expiryTimestamp,
        onExpire: () => console.warn("onExpire вызван"),
    });

    return (
        <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "100px" }}>
                <span>{minutes}</span>:
                <span>{seconds}</span>
            </div>
            <button onClick={start}>Start</button>
            <button onClick={pause}>Pause</button>
            <button onClick={resume}>Resume</button>
            <button
                onClick={() => {
                    // Restarts to 5 minutes timer
                    const time = new Date();
                    time.setSeconds(expiryTimestamp);
                    restart(time -20);
                    console.log('expiryTimestamp', expiryTimestamp);
                }}
            >
                Restart
            </button>
        </div>
    );
}
