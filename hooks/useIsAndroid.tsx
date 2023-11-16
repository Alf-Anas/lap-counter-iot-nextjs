import { useEffect, useState } from "react";

const useIsAndroid = () => {
    const [isAndroid, setIsAndroid] = useState(false);

    useEffect(() => {
        const checkIfAndroid = () => {
            const userAgent = navigator.userAgent;
            setIsAndroid(
                /Android/i.test(userAgent) &&
                    /WebKit/i.test(userAgent) &&
                    !/Chrome/i.test(userAgent)
            );
        };

        // Initial check
        checkIfAndroid();

        // Listen for orientation changes
        window.addEventListener("resize", checkIfAndroid);

        // Cleanup on component unmount
        return () => {
            window.removeEventListener("resize", checkIfAndroid);
        };
    }, []);

    return isAndroid;
};

export default useIsAndroid;
