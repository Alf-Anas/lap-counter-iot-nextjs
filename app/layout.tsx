import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Mini 4WD Lap Counter",
    description:
        "Mini 4WD Lap Counter is an IOT (Internet of Things) app that can be used to counting lap and count the time of mini 4WD cars.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
