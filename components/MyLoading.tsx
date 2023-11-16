import React, { useState, useLayoutEffect } from "react";
import MyImage from "./preview/MyImage";

export default function MyLoading() {
    const [loading, setLoading] = useState(true);

    useLayoutEffect(() => {
        const handleLoad = () => {
            setLoading(false);
        };

        if (document.readyState === "complete") {
            handleLoad();
        } else {
            window.addEventListener("load", handleLoad);
            return () => document.removeEventListener("load", handleLoad);
        }
    }, []);

    return (
        <div
            className={`fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-primary-color-light shadow-lg z-10 ${
                loading ? "visible" : "invisible"
            }`}
        >
            <div className="text-center animate-pulse">
                <MyImage alt="logo" src="/img/logo.png" className="max-h-20" />
                <p className="text-2xl text-white text-center font-bold font-sans">
                    GeoIT Developer
                </p>
            </div>
        </div>
    );
}
