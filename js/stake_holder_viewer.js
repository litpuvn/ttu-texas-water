function StakeHolderViewer() {

    this.wordCloud = new WordCloud('adminBoard');

}

StakeHolderViewer.prototype = {
    constructor: StakeHolderViewer,

    _createAdminBoardVis: function () {
        this.wordCloud.populateWordCloud();
    },

    showAdminBoardGroup: function () {
        var self = this;
         vex.dialog.alert(
            {
                message: 'Admin Board',
                className: 'water-admin-board',
                overlayClassName: 'water-admin-board-overlay',
                showCloseButton: false,
                escapeButtonCloses: true,
                overlayClosesOnClick: true,
                input: '<div id="adminBoard"></div>',
                buttons: [],
                callback: function(data) {
                    if (!data) {
                        return console.log('No data for news');
                    }
                },

                afterOpen: function (element) {
                    self._createAdminBoardVis();
                }
            }
        );
    }
};