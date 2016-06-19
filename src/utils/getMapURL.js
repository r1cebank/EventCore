import { PixelRatio } from 'react-native';

function urlForMap(map) {
    if (!map) {
        return '';
    }
    switch (PixelRatio.get()) {
        case 1: return map.x1.url;
        case 2: return map.x2.url;
        case 3: return map.x3.url;
        default: return map.x3.url;
    }
}

module.exports = urlForMap;
