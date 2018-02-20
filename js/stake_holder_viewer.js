function StakeHolderViewer() {

}

StakeHolderViewer.prototype = {
    constructor: StakeHolderViewer,

    showAdminBoardGroup: function () {
         vex.dialog.open(
            {
                message: 'Admin Board',
                className: 'water-admin-board',
                overlayClassName: 'water-admin-board-overlay',
                showCloseButton: false,
                escapeButtonCloses: true,
                overlayClosesOnClick: true,
                input: 'Admin group concerns and concerns evolve',
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
    }
};