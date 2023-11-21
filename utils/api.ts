import { ObjectLiteral } from "@/types/object-literal.type";

export async function postHistory(rawData: ObjectLiteral) {
    const response = await fetch("/api/history", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(rawData),
    });

    if (response.status === 201) {
        return { ok: true, message: "Record Saved!" };
    } else {
        return { ok: false, message: JSON.stringify(response.json()) };
    }
}
export async function getAllHistory() {
    const response = await fetch("/api/history");
    return response.json();
}

export async function getHistoryById(id: string) {
    const response = await fetch("/api/history/" + id);
    return response.json();
}
