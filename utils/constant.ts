export function getRankSize(rank: number) {
    switch (rank) {
        case 1:
        case 2:
            return "text-2xl";
        case 3:
        case 4:
        case 5:
            return "text-xl";
        case 6:
        case 7:
        case 8:
        case 9:
            return "text-lg";
        case 10:
        case 11:
        case 12:
        case 13:
        case 14:
        case 15:
            return "text-base";
        default:
            return "text-sm";
    }
}

export function splitStringComma(str: string) {
    const arrText = str.split(", ");
    return arrText;
}

export function getPlatformColor(platform: string) {
    switch (platform) {
        case "Web":
            return "geekblue";
        case "Windows":
            return "cyan";
        case "PWA":
        case "TWA":
            return "lime";
        case "Android":
        case "Mobile":
            return "green";
        case "Multiplatform":
            return "magenta";
        case "Script":
            return "red";
        case "iOS":
            return "blue";
        case "Server":
            return "gold";
        case "Game":
            return "purple";
        case "Virtual Reality":
        case "Augmeted Reality":
            return "orange";
        case "Automation":
            return "volcano";
        default:
            return "default";
    }
}

export function getStatusColor(platform: string) {
    switch (platform) {
        case "Active":
            return "green";
        case "Completed":
            return "geekblue";
        case "Archived":
            return "purple";
        case "Failed":
            return "volcano";
        case "Deprecated":
            return "orange";
        case "Paused":
            return "red";
        case "In Development":
            return "gold";
        case "Maintained":
            return "lime";
        default:
            return "default";
    }
}

function getCurrentOrigin() {
    if (typeof window == "undefined") return "";
    return `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;
}

export const BASE_URL = {
    PDF: getCurrentOrigin() + "/project/pdf/",
    VIDEO: getCurrentOrigin() + "/project/video/",
    LOGO: getCurrentOrigin() + "/project/logo/",
};
