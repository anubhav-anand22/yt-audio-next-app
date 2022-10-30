interface ParseUrlInputReturnData {
    videoId?: string;
    listId?: string;
    error?: string;
    query?: string;
}

export const parseUrlInput = (inpStr: string = ""): ParseUrlInputReturnData => {
    if (inpStr.startsWith("https://") && inpStr.includes("youtu.be")) {
        return { videoId: inpStr.split("/").reverse()[0] };
    } else if (
        inpStr.startsWith("https://") &&
        inpStr.includes("youtube.com")
    ) {
        const query = inpStr.split("?").reverse()[0].split("&");
        for (let e of query) {
            const keyValue = e.split("=");
            if (keyValue[0] === "v") {
                return { videoId: keyValue[1] };
            } else if (keyValue[0] === "list" && keyValue[1].length === 11) {
                return { videoId: keyValue[1] };
            } else if (keyValue[0] === "list") {
                return { listId: keyValue[1] };
            }
        }

        return {
            query: inpStr,
        };
    } else {
        return {
            query: inpStr,
        };
    }
};
