import { Layout as LayoutANTD } from "antd";
import React, { ReactNode } from "react";
import MainHeader from "./MainHeader";

const { Content } = LayoutANTD;

export default function AppLayout({ children }: Props) {
    return (
        <LayoutANTD className="h-screen">
            <MainHeader />
            <LayoutANTD>
                <Content className="whitespace-break-spaces px-[24px] m-0 min-h-[50vh] max-sm:px-[12px]  overflow-auto">
                    {children}
                </Content>
            </LayoutANTD>
        </LayoutANTD>
    );
}

interface Props {
    children?: ReactNode;
    breadcrumbs?: ReactNode;
}
