import MainCard from "@/components/layout/MainCard";
import MyImage from "@/components/preview/MyImage";
import { TOOLS_DATA } from "@/data/tool-list";
import useResponsive, { getColSpan } from "@/hooks/useResponsive";
import { generateRowGrid, safeString } from "@/utils";
import { Col, Row, Tag, Typography } from "antd";
import { Fragment } from "react";

export default function ToolCard() {
    const breakpoint = useResponsive();

    const listTool: JSX.Element[] = [];
    TOOLS_DATA.forEach((tool) => {
        const textSize =
            safeString(tool.title).length <= 30 ? "text-base" : "text-sm";
        listTool.push(
            <Tag
                color={`${tool.color}-inverse`}
                className={`py-1 px-2 ${textSize} w-full font-bold`}
                style={tool.text_color ? { color: tool.text_color } : {}}
            >
                {tool.title}
            </Tag>
        );
        tool.items.forEach((item) => {
            const textSize =
                safeString(item.label).length <= 30 ? "text-base" : "text-sm";
            listTool.push(
                <Tag
                    color={tool.color}
                    className={`py-1 px-2 ${textSize} w-full`}
                >
                    {item.icon && <item.icon className="mr-2" />}
                    {item.image && (
                        <MyImage
                            src={item.image}
                            alt="icon"
                            className="mr-2 max-h-4 max-w-[2rem]"
                            style={
                                item.color
                                    ? { backgroundColor: item.color }
                                    : {}
                            }
                        />
                    )}
                    <a
                        href={item.url}
                        target="_blank"
                        className="!text-inherit"
                    >
                        {item.label}
                    </a>
                </Tag>
            );
        });
    });

    const colSpan = getColSpan(breakpoint);

    return (
        <MainCard className="text-start">
            <Typography.Title level={2} className="mt-0">
                Tools & Equipments
            </Typography.Title>
            <Row gutter={[8, 8]}>
                {generateRowGrid(
                    listTool,
                    Math.ceil(listTool.length / colSpan),
                    colSpan
                ).map((item, idx) => {
                    return (
                        <Fragment key={idx}>
                            <Col span={24 / colSpan}>
                                {item ? (
                                    item
                                ) : (
                                    <Tag
                                        color="default"
                                        className="py-1 px-2 text-base w-full"
                                    >
                                        -
                                    </Tag>
                                )}
                            </Col>
                        </Fragment>
                    );
                })}
            </Row>
        </MainCard>
    );
}
