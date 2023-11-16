import MainCard from "@/components/layout/MainCard";
import MyImage from "@/components/preview/MyImage";
import MainTable, { SORTING_TYPE } from "@/components/table/MainTable";
import {
    Button,
    Descriptions,
    DescriptionsProps,
    Divider,
    Flex,
    Tag,
    Typography,
} from "antd";

import ProjectListJSON from "@/data/project-list.json";
import AffiliationListJSON from "@/data/affiliation-list.json";
import { ProjectType } from "@/types/project-list.type";
import { EyeOutlined, GithubOutlined, LinkOutlined } from "@ant-design/icons";
import {
    BASE_URL,
    getPlatformColor,
    getRankSize,
    getStatusColor,
    splitStringComma,
} from "@/utils/constant";
import BasicModal from "@/components/modal/BasicModal";
import MyPDF from "@/components/preview/MyPDF";
import MyVideo from "@/components/preview/MyVideo";
import MyYoutube from "@/components/preview/MyYoutube";

function CellAffiliation({ text = "" }: { text: string }) {
    const arrText = splitStringComma(text);
    return (
        <>
            {arrText.map((txt, idx) => {
                const findAff = AffiliationListJSON.find(
                    (item) => item.key === txt
                );
                return (
                    <a
                        key={idx}
                        href={findAff?.url}
                        target="_blank"
                        className="block"
                    >
                        {findAff?.name}
                    </a>
                );
            })}
        </>
    );
}
function CellPlatform({ text = "" }: { text: string }) {
    const arrText = splitStringComma(text);
    return (
        <Flex wrap="wrap" gap="4px">
            {arrText.map((txt, idx) => {
                return (
                    <Tag key={idx} color={getPlatformColor(txt)}>
                        {txt}
                    </Tag>
                );
            })}
        </Flex>
    );
}

const COLUMNS = [
    {
        title: "Action",
        dataIndex: "action",
        key: "action",
        render: (_text: string, row: ProjectType) => {
            return (
                <Flex wrap="wrap" gap="small" vertical>
                    <DetailButton row={row} />
                    {row.url && (
                        <Button
                            type="primary"
                            danger
                            ghost
                            size="small"
                            icon={<LinkOutlined />}
                            onClick={() => window.open(row.url, "_blank")}
                        >
                            Open
                        </Button>
                    )}
                    {row.source_code && (
                        <Button
                            type="default"
                            size="small"
                            icon={<GithubOutlined />}
                            onClick={() =>
                                window.open(row.source_code, "_blank")
                            }
                        >
                            Src Code
                        </Button>
                    )}
                </Flex>
            );
        },
    },
    {
        title: "Rank",
        dataIndex: "rank",
        key: "rank",
        sorting: SORTING_TYPE.number,
        align: "center",
        render: (num: number) => {
            return <span className={getRankSize(num)}>{num}</span>;
        },
    },
    {
        title: "Name",
        dataIndex: "name",
        key: "name",
        sorting: SORTING_TYPE.text,
    },
    {
        title: "About",
        dataIndex: "about",
        key: "about",
        sorting: SORTING_TYPE.text,
        className: "max-w-sm",
    },
    {
        title: "Affiliation",
        dataIndex: "affiliation",
        key: "affiliation",
        sorting: SORTING_TYPE.text,
        render: (text: string) => <CellAffiliation text={text} />,
    },
    {
        title: "Platform",
        dataIndex: "platform",
        key: "platform",
        sorting: SORTING_TYPE.text,
        className: "max-w-[11rem]",
        render: (text: string) => <CellPlatform text={text} />,
    },
    {
        title: "Tech Stack",
        dataIndex: "tech_stack",
        key: "tech_stack",
        sorting: SORTING_TYPE.text,
        className: "max-w-sm",
    },
    {
        title: "Year",
        dataIndex: "year",
        key: "year",
        sorting: SORTING_TYPE.text,
    },
    {
        title: "Status",
        dataIndex: "status",
        key: "status",
        sorting: SORTING_TYPE.text,
        render: (text: string) => {
            return <Tag color={getStatusColor(text)}>{text}</Tag>;
        },
    },
];

function DetailButton({ row }: { row: ProjectType }) {
    const listItem: DescriptionsProps["items"] = [
        {
            key: "1",
            label: "Rank",
            children: row.rank,
        },
        {
            key: "2",
            label: "Name",
            children: <b>{row.name}</b>,
        },
        {
            key: "3",
            label: "About",
            children: row.about,
        },
        {
            key: "4",
            label: "Description",
            children: row.description,
        },
        {
            key: "5",
            label: "Affiliation",
            children: <CellAffiliation text={row.affiliation || ""} />,
        },
        {
            key: "6",
            label: "Platform",
            children: <CellPlatform text={row.platform} />,
        },
        {
            key: "7",
            label: "Tech Stack",
            children: row.tech_stack,
        },
        {
            key: "8",
            label: "Year",
            children: row.year,
        },
        {
            key: "9",
            label: "Status",
            children: (
                <Tag color={getStatusColor(row.status)}>{row.status}</Tag>
            ),
        },
    ];

    if (row.url) {
        listItem.push({
            key: "10",
            label: "URL",
            children: (
                <a href={row.url} target="_blank">
                    {row.url}
                </a>
            ),
        });
    }
    if (row.source_code) {
        listItem.push({
            key: "11",
            label: "Source Code",
            children: (
                <a href={row.source_code} target="_blank">
                    {row.source_code}
                </a>
            ),
        });
    }
    if (row.logo) {
        listItem.push({
            key: "12",
            label: "Logo",
            children: (
                <MyImage
                    src={`${BASE_URL.LOGO}${row.logo}`}
                    alt="logo"
                    className="max-h-20"
                />
            ),
        });
    }
    return (
        <BasicModal
            modalButton={
                <Button
                    type="primary"
                    ghost
                    size="small"
                    icon={<EyeOutlined />}
                >
                    Detail
                </Button>
            }
            footer={null}
            className="min-w-[50%]"
        >
            <Descriptions
                bordered
                size="small"
                items={listItem}
                column={1}
                labelStyle={{ fontWeight: "bold" }}
            />
            {row.file && (
                <>
                    <Divider />
                    <MyPDF title={row.key} url={`${BASE_URL.PDF}${row.file}`} />
                </>
            )}
            {row.video && (
                <>
                    <Divider />
                    <MyVideo src={`${BASE_URL.VIDEO}${row.video}`} />
                </>
            )}
            {row.youtube && (
                <>
                    <Divider />
                    <MyYoutube title={row.name} src={row.youtube} />
                </>
            )}
        </BasicModal>
    );
}

export default function ProjectCard() {
    return (
        <MainCard className="text-start">
            <Typography.Title level={2} className="mt-0">
                Projects ({ProjectListJSON.length}+ projects done)
            </Typography.Title>
            <MainTable columns={COLUMNS} dataSource={ProjectListJSON} />
        </MainCard>
    );
}
