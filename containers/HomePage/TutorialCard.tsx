import MainCard from "@/components/layout/MainCard";
import { Button, Typography } from "antd";
import { useRouter } from "next/navigation";

export default function TutorialCard() {
    const router = useRouter();
    function onGoToApp() {
        router.push("/app");
    }

    return (
        <MainCard className="text-start">
            <Typography.Title level={2} className="mt-0">
                Tutorial
            </Typography.Title>
            <ol>
                <li>Aktifkan Alat</li>
                <li>
                    Aktifkan Hotspot atau Buat Mobile Hotspot dengan nama SSID :
                    <b>LAP_COUNTER</b>, dan password : <b>abcd1234</b>
                </li>
            </ol>
            <Button type="primary" size="large" onClick={onGoToApp}>
                Go to App
            </Button>
        </MainCard>
    );
}
