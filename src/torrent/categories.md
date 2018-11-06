# Categorization works based on:

1) Presence of certain Keywords
2) File extension

# A category

Matches are based on:

1) List of keywords
2) Keyword weight
3) List of matching file extensions
4) Typical file size range (?)

Structure of a category

```js
{
    "name": 'TV', // Display name of category
    "id": 0, // Unique ID
    "keywords": // Keywords are REGEX patterns
    [
        {
            "phrase": "S[0-9]{1,2}E[0-9]{1,2}",
            "value" : 50
        },
        {
            "phrase": "Season",
            "value": 20
        }
    ],
    "extensions":
    [
        "mp3",
        "wav"
    ]
}
```

# Estimate