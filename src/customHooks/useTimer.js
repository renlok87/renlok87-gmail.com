import { useState, useEffect, useRef } from "react";
import Time from "../utils/Time";
import Validate from "../utils/Validate";

export function useTimer(settings) {
    const { expiryTimestamp: expiry, onExpire } = settings || {};
    const [expiryTimestamp, setExpiryTimestamp] = useState(expiry);
    const [seconds, setSeconds] = useState(
        Time.getSecondsFromExpiry(expiryTimestamp)
    );
    const intervalRef = useRef();

    function clearIntervalRef() {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = undefined;
        }
    }

    function handleExpire() {
        clearIntervalRef();
        Validate.onExpire(onExpire) && onExpire();
    }

    function start() {
        if (!intervalRef.current) {
            intervalRef.current = setInterval(() => {
                const secondsValue = Time.getSecondsFromExpiry(expiryTimestamp);
                if (secondsValue <= 0) {
                    handleExpire();
                }
                setSeconds(secondsValue);
            }, 1000);
        }
    }

    function pause() {
        clearIntervalRef();
    }

    function resume() {
        if (!intervalRef.current) {
            intervalRef.current = setInterval(
                () =>
                    setSeconds((prevSeconds) => {
                        const secondsValue = prevSeconds - 1;
                        if (secondsValue <= 0) {
                            handleExpire();
                        }
                        return secondsValue;
                    }),
                1000
            );
        }
    }

    function restart(newExpiryTimestamp) {
        clearIntervalRef();
        setExpiryTimestamp(newExpiryTimestamp);
    }

    useEffect(() => {
        if (Validate.expiryTimestamp(expiryTimestamp)) {
            setSeconds(Time.getSecondsFromExpiry(expiryTimestamp));
            start();
        }
        return clearIntervalRef;
    }, [expiryTimestamp]);

    return {
        ...Time.getTimeFromSeconds(seconds),
        start,
        pause,
        resume,
        restart,
    };
}
