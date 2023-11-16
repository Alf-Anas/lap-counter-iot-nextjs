import { useState, useEffect } from "react";

const useResponsive = (defaultBreakpoint: string = "xxl") => {
    const [breakpoint, setBreakpoint] = useState(defaultBreakpoint);

    useEffect(() => {
        const handleResize = () => {
            setBreakpoint(getCurrentBreakpoint());
        };

        // Initial call
        handleResize();

        // Attach the event listener
        window.addEventListener("resize", handleResize);

        // Cleanup on component unmount
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return breakpoint;
};

const getCurrentBreakpoint = () => {
    if (typeof window == "undefined") return "xxl";
    const width = window.innerWidth;

    if (width < 576) {
        return "xs";
    } else if (width < 768) {
        return "sm";
    } else if (width < 992) {
        return "md";
    } else if (width < 1200) {
        return "lg";
    } else if (width < 1600) {
        return "xl";
    } else {
        return "xxl";
    }
};

export function getColSpan(breakpoint: string) {
    switch (breakpoint) {
        case "xl":
            return 4;
        case "lg":
            return 3;
        case "md":
            return 3;
        case "sm":
            return 2;
        case "xs":
            return 1;
        default:
            return 4;
    }
}

export default useResponsive;
