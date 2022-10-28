interface ParseUrlInputReturnData {
    videoId?: string,
    listId?: string,
    query?: string,
    error?: string
}

export const parseUrlInput = (inpStr:string = ''): ParseUrlInputReturnData => {
    let data = inpStr.trim(), newData : ParseUrlInputReturnData = {query: data};
    if(data.startsWith('https://www.youtube.com')){
        const adata = data.split("?")[1]
        if(!adata) return {query: data}
        const query = adata.split("&");
        for(let i of query){
            const j = i.split('=');
            if(j[0] === "v") {
                newData = {
                    videoId: j[1]
                }
            } else if (j[0] === 'list' && j[1].length === 11) {
                newData = {
                    videoId: j[1],
                }
            } else if (j[0] === 'list' && j[1].length > 18) {
                newData = {
                    listId: j[1],
                }
            } else {
                newData = {
                    query: data,
                }
            }
        }
    } else if (data.startsWith("https://youtu.be/")) {
        const id = data.replace("https://youtu.be/", "");
        if(id.length === 11) {
            newData = {
                videoId: id,
            }
        } else {
            newData = {
                error: "Error while parseing youtu.be url"
            }
        }
    } else {
        newData = {
            query: data,
        }
    }
    return newData;
}