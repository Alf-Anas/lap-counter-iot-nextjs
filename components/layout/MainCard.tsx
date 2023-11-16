import { theme } from "antd";
import React, { ReactNode } from "react";

export default function MainCard({ children, className = "" }: Props) {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <div
            style={{
                background: colorBgContainer,
            }}
            className={`p-[24px] my-[24px] max-sm:px-[12px] max-sm:my-[12px] ${className} `}
        >
            {children}
        </div>
    );
}

interface Props {
    children?: ReactNode;
    className?: string;
}
