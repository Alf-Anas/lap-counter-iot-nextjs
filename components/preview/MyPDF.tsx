import useIsAndroid from "@/hooks/useIsAndroid";
import { DownloadOutlined } from "@ant-design/icons";
import { Button } from "antd";

type Props = {
    title: string;
    url: string;
    height?: string | number;
    width?: string | number;
};

export default function MyPDF({
    title = "",
    url = "",
    height = "750px",
    width = "100%",
}: Props) {
    const isAndroid = useIsAndroid();

    if (isAndroid) {
        return (
            <>
                <Button
                    icon={<DownloadOutlined />}
                    onClick={() => window.open(url)}
                >
                    Download
                </Button>
                <br />
                <iframe
                    src={`https://drive.google.com/viewerng/viewer?url=${url}?pid=explorer&efh=false&a=v&chrome=false&embedded=true`}
                    width={width}
                    height={height}
                    title={title}
                />
            </>
        );
    }

    return (
        <object
            data={url}
            width={width}
            height={height}
            title={title}
            type="application/pdf"
        >
            <embed
                src={url}
                width={width}
                height={height}
                title={title}
                type="application/pdf"
            />
        </object>
    );
}
