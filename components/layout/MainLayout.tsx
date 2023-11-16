import { Layout as LayoutANTD } from "antd";
import React, { ReactNode } from "react";
import MainHeader from "./MainHeader";
import MainFooter from "./MainFooter";

const { Content } = LayoutANTD;

export default function MainLayout({ children }: Props) {
    return (
        <LayoutANTD className="min-h-screen">
            <MainHeader />
            <LayoutANTD>
                <Content className="whitespace-break-spaces px-[24px] m-0 min-h-[50vh] max-sm:px-[12px]">
                    {children}
                </Content>
            </LayoutANTD>
            <MainFooter />
        </LayoutANTD>
    );
}

interface Props {
    children?: ReactNode;
    breadcrumbs?: ReactNode;
}
