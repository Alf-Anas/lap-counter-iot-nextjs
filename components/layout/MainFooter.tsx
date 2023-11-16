import { Layout as LayoutANTD } from "antd";
import React from "react";

const { Footer: FooterANTD } = LayoutANTD;

export default function MainFooter() {
    return (
        <FooterANTD className="bg-primary-color text-center text-white">
            <p className="m-0">
                © 2023 |{" "}
                <a
                    href="https://geoit.dev"
                    target="_self"
                    className="text-white"
                >
                    GeoIT Developer
                </a>
            </p>
        </FooterANTD>
    );
}
