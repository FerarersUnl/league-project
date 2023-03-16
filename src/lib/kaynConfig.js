const { Kayn, REGIONS } = require("kayn");

export const kaynLAN = Kayn(process.env.RIOT_API_KEY)({
    region: REGIONS.LATIN_AMERICA_NORTH,
    apiURLPrefix: "https://%s.api.riotgames.com",
    locale: "es_MX",
    debugOptions: {
        isEnabled: true,
        showKey: false,
    },
    requestOptions: {
        shouldRetry: true,
        numberOfRetriesBeforeAbort: 3,
        delayBeforeRetry: 1000,
        burst: false,
        shouldExitOn403: false,
    },
    cacheOptions: {
        cache: null,
        timeToLives: {
            useDefault: false,
            byGroup: {},
            byMethod: {},
        },
    },
});
