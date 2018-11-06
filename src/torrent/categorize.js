const categories = require('./../res/config.json').categories;

function categorize(torrent)
{
    if (!torrent.name)
    {
        console.error("categorize() - missing parameter name");
    }

    let maxCategory = {};
    let maxRank     = -1;

    for (let cat = 0; cat < categories.length; cat++)
    {
        rank = rankCategory(torrent, categories[cat]);

        if (rank > maxRank)
        {
            maxCategory = categories[cat];
            maxRank     = rank;
        }
    }

    return {
        "rank": maxRank,
        "category": maxCategory
    };
}

function rankCategory(torrent, category)
{
    let rankKeyword   = rankKeyword(torrent, category);
    let rankExtension = rankExtension(torrent, category) ? 100 : 0;

    return 0.4 * rankKeyword + 0.6 * rankExtension;
}

function rankKeyword(torrent, category)
{
    let tName = torrent.name;
    let value = 0;

    for (let i = 0; i < category.keywords; i++)
    {
        let keyword = category.keywords[i];

        if (keywordMatch(tName, keyword.phrase)) value += keyword.value;
    }
}

function rankExtension(torrent, category)
{
    let tName = torrent.name;

    for (let i = 0; i < category.extensions.length; i++)
    {
        let ext = category.extensions[i];

        if (extensionMatch(tName, ext)) return true;
    }

    return false;
}

function keywordMatch(name, phrase)
{
    return name.indexOf(phrase) !== -1;
}

function extensionMatch(name, ext)
{
    let fileExtension =
        name.substring(name.lastIndexOf(".") + 1);

    return fileExtension.toLowerCase() === ext.toLowerCase();
}