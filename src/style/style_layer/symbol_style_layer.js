'use strict';

const StyleLayer = require('../style_layer');
const SymbolBucket = require('../../data/bucket/symbol_bucket');

class SymbolStyleLayer extends StyleLayer {

    getLayoutValue(name, globalProperties, featureProperties) {
        const value = super.getLayoutValue(name, globalProperties, featureProperties);
        if (value !== 'auto') {
            return value;
        }

        switch (name) {
        case 'text-rotation-alignment':
        case 'icon-rotation-alignment':
            return this.getLayoutValue('symbol-placement', globalProperties, featureProperties) === 'line' ? 'map' : 'viewport';
        case 'text-pitch-alignment':
            return this.getLayoutValue('text-rotation-alignment', globalProperties, featureProperties);
        default:
            return value;
        }
    }

    createBucket(options) {
        return new SymbolBucket(options);
    }

    isPaintValueFeatureConstant(name) {
        if (isPseudoPaintProperty(name)) {
            return this.isLayoutValueFeatureConstant(name);
        } else {
            return super.isPaintValueFeatureConstant(name);
        }
    }

    isPaintValueZoomConstant(name) {
        if (isPseudoPaintProperty(name)) {
            return this.isLayoutValueZoomConstant(name);
        } else {
            return super.isPaintValueZoomConstant(name);
        }
    }

    getPaintValueStopZoomLevels(name) {
        if (isPseudoPaintProperty(name)) {
            return this.getLayoutValueStopZoomLevels(name);
        } else {
            return super.getPaintValueStopZoomLevels(name);
        }
    }

    getPaintValue(name, globalProperties, featureProperties) {
        if (isPseudoPaintProperty(name)) {
            return this.getLayoutValue(name, globalProperties, featureProperties);
        } else {
            return super.getPaintValue(name, globalProperties, featureProperties);
        }
    }

    getPaintInterpolationT(name, globalProperties) {
        if (isPseudoPaintProperty(name)) {
            return this.getLayoutInterpolationT(name, globalProperties);
        } else {
            return super.getPaintInterpolationT(name, globalProperties);
        }
    }
}

function isPseudoPaintProperty(name) {
    return name === 'text-size' || name === 'icon-size';
}

module.exports = SymbolStyleLayer;
