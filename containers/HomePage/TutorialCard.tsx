import MainCard from "@/components/layout/MainCard";
import { Button, Divider, Image, Typography } from "antd";
import { useRouter } from "next/navigation";

export default function TutorialCard() {
    const router = useRouter();
    function onGoToApp() {
        router.push("/app");
    }

    return (
        <MainCard className="text-justify">
            <Typography.Title level={2} className="mt-0">
                Tutorial
            </Typography.Title>
            <div>
                <Divider />
                <Typography.Title level={4} className="mt-0">
                    1. Buat Hotspot
                </Typography.Title>
                <p className="text-base">
                    Alat ini menggunakan Wifi untuk terhubung dengan internet,
                    sehinga pastikan Anda sudah membuat Wifi dengan konfigurasi
                    sebagai berikut :
                </p>
                <ul>
                    <li>
                        Nama SSID : <b>LAP_COUNTER</b>
                    </li>
                    <li>
                        Password : <b>abcd1234</b>
                    </li>
                    <li>
                        Network Band : <b>2.4 GHz</b>
                    </li>
                </ul>
                <Image
                    alt="Hotspot"
                    src="/img/tutorial/hotspot.jpg"
                    className="max-h-[15rem] mx-auto"
                />
            </div>
            <div>
                <Divider />
                <Typography.Title level={4} className="mt-0">
                    2. Hubungkan Power
                </Typography.Title>
                <p className="text-base">
                    Alat ini menggunakan power <b>5V</b>. Dapat dihubungkan
                    dengan <b>Powerbank</b>, <b>Laptop</b>, atau{" "}
                    <b>Charger HP</b> secara langsung.
                </p>
            </div>
            <div>
                <Divider />
                <Typography.Title level={4} className="mt-0">
                    3. Pastikan Koneksi Wifi terhubung dengan baik
                </Typography.Title>
                <p className="text-base">
                    Jika lampu <b>LED Kuning/Hijau menyala</b>, berarti koneksi
                    wifi berhasil terhubung.
                </p>
                <Image
                    alt="led"
                    src="/img/tutorial/led_wifi.jpg"
                    className="max-h-[15rem] mx-auto"
                />
            </div>
            <div>
                <Divider />
                <Typography.Title level={4} className="mt-0">
                    4. Reset dan Memulai
                </Typography.Title>
                <p className="text-base">
                    Gunakan <b>Tombol Reset</b> di pojok kiri atas untuk mereset
                    perhitungan.
                </p>
                <Image
                    alt="led"
                    src="/img/tutorial/reset.png"
                    className="max-h-[15rem] mx-auto"
                />
                <p className="text-base">
                    Untuk memulai, <b>aktifkan Lane</b> mana saja yang akan
                    digunakan oleh mobil. Jika hanya menggunakan 1 mobil, cukup
                    aktifkan 1 Lane saja.
                </p>
                <Image
                    alt="led"
                    src="/img/tutorial/start.png"
                    className="max-h-[15rem] mx-auto"
                />
            </div>
            <div>
                <Divider />
                <p className="text-sm">
                    Sorce Code :
                    <br />
                    <a
                        href="https://github.com/Alf-Anas/lap-counter-iot-nextjs"
                        target="_blank"
                    >
                        https://github.com/Alf-Anas/lap-counter-iot-nextjs
                    </a>
                </p>
            </div>
            <Divider />
            <Button
                type="primary"
                size="large"
                className="w-full"
                onClick={onGoToApp}
            >
                Buka Aplikasi
            </Button>
        </MainCard>
    );
}
