export default defineCachedEventHandler((e) => {
    const sitename = getRouterParam(e, "site")!
    const query = getQuery(e);
    const headers = {
        // copy enough headers so this functions as a proxy
        "User-Agent": e.node.req.headers["user-agent"] || "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
        "Accept": e.node.req.headers["accept"] || "*/*",
        "Accept-Language": e.node.req.headers["accept-language"] || "en-US,en;q=0.9",
        "Accept-Encoding": e.node.req.headers["accept-encoding"] || "gzip, deflate, br",
        "Referer": `https://${sitename}.fandom.com/`,
        "Origin": `https://${sitename}.fandom.com`,
        "Cookie": e.node.req.headers["cookie"] || "",
    }
    // https://love-live.fandom.com/wikia.php?controller=ArticleCommentsController&method=getComments&title=Hanamaru Kunikida&namespace=0&hideDeleted=true
    query["controller"] = getRouterParam(e, "ctrl")!;
    query["method"] = getRouterParam(e, "method")!;
    delete query["wikia"]
    return $fetch(`https://${sitename}.fandom.com/wikia.php`, {
        query: query,
        headers: headers
    },)
}, {
    maxAge: 60 * 10,
    swr: true
})