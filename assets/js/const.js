const CIRCUITS = {
    'bahrain' : {
        'track-outline' : 'bahrain.png',
        'track-sectors' : 'bahrain-sectors.png',
        'countryCode' : 'BH' },
    'imola' : {
        'track-outline' : 'imola.png',
        'track-sectors' : 'imola-sectors.png',
        'countryCode' : 'IT' },
    'portimao' : {
        'track-outline' : 'portimao.png',
        'track-sectors' : 'portimao-sectors.png',
        'countryCode' : 'PT' },
    'catalunya' : {
        'track-outline' : 'catalunya.png',
        'track-sectors' : 'catalunya-sectors.png',
        'countryCode' : 'ES' },
    'monaco' : {
        'track-outline' : 'monaco.png',
        'track-sectors' : 'monaco-sectors.png',
        'countryCode' : 'MC' },
    'BAK' : {
        'track-outline' : 'baku.png',
        'track-sectors' : 'baku-sectors.png',
        'countryCode' : 'AZ' },
    'ricard' : {
        'track-outline' : 'ricard.png',
        'track-sectors' : 'ricard-sectors.png',
        'countryCode' : 'FR' },
    'red_bull_ring' : {
        'track-outline' : 'red-bull-ring.png',
        'track-sectors' : 'red-bull-ring-sectors.png',
        'countryCode' : 'AT' },
    'silverstone' : {
        'track-outline' : 'silverstone.png',
        'track-sectors' : 'silverstone-sectors.png',
        'countryCode' : 'GB' },
    'hungaroring' : {
        'track-outline' : 'hungaroring.png',
        'track-sectors' : 'hungaroring-sectors.png',
        'countryCode' : 'HU' },
    'spa' : {
        'track-outline' : 'spa.png',
        'track-sectors' : 'spa-sectors.png',
        'countryCode' : 'BE' },
    'zandvoort' : {
        'track-outline' : 'zandvoort.png',
        'track-sectors' : 'zandvoort-sectors.png',
        'countryCode' : 'NL' },
    'monza' : {
        'track-outline' : 'monza.png',
        'track-sectors' : 'monza-sectors.png',
        'countryCode' : 'IT' },
    'sochi' : {
        'track-outline' : 'sochi.png',
        'track-sectors' : 'sochi-sectors.png',
        'countryCode' : 'RU' },
    'marina_bay' : {
        'track-outline' : 'istanbul.png',
        'track-sectors' : 'istanbul-sectors.png',
        'countryCode' : 'SG' },
    'suzuka' : {
        'track-outline' : 'suzuka.png',
        'track-sectors' : 'suzuka-sectors.png',
        'countryCode' : 'JP' },
    'americas' : {
        'track-outline' : 'americas.png',
        'track-sectors' : 'americas-sectors.png',
        'countryCode' : 'US' },
    'rodriguez' : {
        'track-outline' : 'rodriguez.png',
        'track-sectors' : 'rodriguez-sectors.png',
        'countryCode' : 'MX' },
    'interlagos' : {
        'track-outline' : 'interlagos.png',
        'track-sectors' : 'interlagos-sectors.png',
        'countryCode' : 'BR' },
    'albert_park' : {
        'track-outline' : 'albert-park.png',
        'track-sectors' : 'albert-park-sectors.png',
        'countryCode' : 'AU' },
    'jeddah' : {
        'track-outline' : 'jeddah.png',
        'track-sectors' : 'jeddah-sectors.png',
        'countryCode' : 'SA' },
    'yas_marina' : {
        'track-outline' : 'yas-marina.png',
        'track-sectors' : 'yas-marina-sectors.png',
        'countryCode' : 'AE' },
    'hockenheimring' : {
        'track-outline' : 'hockenheimring.png',
        'track-sectors' : 'hockenheimring-sectors.png',
        'countryCode' : 'DE' },
    'istanbul' : {
        'track-outline' : 'istanbul.png',
        'track-sectors' : 'istanbul-sectors.png',
        'countryCode' : 'TR' },
    'mugello' : {
        'track-outline' : 'mugello.png',
        'track-sectors' : 'mugello-sectors.png',
        'countryCode' : 'IT' },
    'nurburgring' : {
        'track-outline' : 'nurburgring.png',
        'track-sectors' : 'nurburgring-sectors.png',
        'countryCode' : 'DE' },
    'shanghai' : {
        'track-outline' : 'shanghai.png',
        'track-sectors' : 'shanghai-sectors.png',
        'countryCode' : 'CN' },
    'villeneuve' : {
        'track-outline' : 'villeneuve.png',
        'track-sectors' : 'villeneuve-sectors.png',
        'countryCode' : 'CA' },


};

const COUNTRIES = [
    {
        'nationality' : 'Dutch',
        'code' : 'NL'
    },
    {
        'nationality' : 'Spanish',
        'code' : 'ES'
    },
    {
        'nationality' : 'British',
        'code' : 'GB'
    },
    {
        'nationality' : 'Mexican',
        'code' : 'MX'
    },
    {
        'nationality' : 'German',
        'code' : 'DE'
    },
    {
        'nationality' : 'Canadian',
        'code' : 'CA'
    },
    {
        'nationality' : 'French',
        'code' : 'FR'
    },
    {
        'nationality' : 'Italian',
        'code' : 'IT'
    },
    {
        'nationality' : 'Finnish',
        'code' : 'FI'
    },
    {
        'nationality' : 'Australian',
        'code' : 'AU'
    },
    {
        'nationality' : 'Japanese',
        'code' : 'JP'
    },
    {
        'nationality' : 'Russian',
        'code' : 'RU'
    },
    {
        'nationality' : 'Thai',
        'code' : 'TH'
    },
    {
        'nationality' : 'Danish',
        'code' : 'DK'
    },
    {
        'nationality' : 'Polish',
        'code' : 'PL'
    },
    {
        'nationality' : 'Belgian',
        'code' : 'BE'
    },
    {
        'nationality' : 'Swedish',
        'code' : 'SE'
    },
    {
        'nationality' : 'Brazilian',
        'code' : 'BR'
    },
    {
        'nationality' : 'New Zealander',
        'code' : 'NZ'
    },
    {
        'nationality' : 'Monegasque',
        'code' : 'MC'
    }
];
