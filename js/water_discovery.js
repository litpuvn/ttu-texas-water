function WaterDiscovery() {

}

WaterDiscovery.prototype = {
    constructor: WaterDiscovery,

    showTopics: function() {
        var self = this;

        vex.dialog.open(
            {
                message: 'Water Discovery',
                className: 'discovery-window',
                overlayClassName: 'news-overlay',
                showCloseButton: false,
                escapeButtonCloses: true,
                overlayClosesOnClick: true,
                input: self._createWaterDiscoveryTopics(),
                buttons: [],
                callback: function(data) {
                    if (!data) {
                        return console.log('No data for news');
                    }
                },

                afterOpen: function (element) {
                    console.log(element);
                }
            }
        );
    },

    _createWaterDiscoveryTopics: function () {
        var content = '' +
            '<table class="discovery-content">' +
            '<tr class="discovery-content-row">' +
            '<td><img class="discovery-topic" src="http://cs409019.vk.me/v409019863/1b6/09FPiv6Nr5A.jpg" /><br/><span class="discovery-topic-link">Water Sources</span></td>' +
            '<td><img class="discovery-topic" src="http://cs409019.vk.me/v409019863/1b6/09FPiv6Nr5A.jpg" /><br/><span class="discovery-topic-link">Water Processing</span></td>' +
            '<td><img class="discovery-topic" src="http://cs409019.vk.me/v409019863/1b6/09FPiv6Nr5A.jpg" /><br/><span class="discovery-topic-link">Water Usage</span></td>' +
            '</tr>' +
            '<tr class="discovery-content-row">' +
            '<td><img class="discovery-topic" src="http://cs409019.vk.me/v409019863/1b6/09FPiv6Nr5A.jpg" /><br/><span class="discovery-topic-link">Water Treatment</span></td>' +
            '<td><img class="discovery-topic" src="http://cs409019.vk.me/v409019863/1b6/09FPiv6Nr5A.jpg" /></td>' +
            '<td><img class="discovery-topic" src="http://cs409019.vk.me/v409019863/1b6/09FPiv6Nr5A.jpg" /></td>' +
            '</tr>' +
            '</table>'
        ;

        return content;
    }

};