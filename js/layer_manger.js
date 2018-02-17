function LayerManager() {

    this.layers = {};

}


LayerManager.prototype = {
    constructor: LayerManager,

    addState: function (stateId) {

        this.layers[stateId] = stateId + '.kml';
    },

    getLayers: function () {
        return this.layers;
    }

};