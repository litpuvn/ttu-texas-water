function StakeHolderViewer() {

    // this.wordCloud = new WordCloud('adminBoard');

}

StakeHolderViewer.prototype = {
    constructor: StakeHolderViewer,

    _getCtx: function (canvasElementId) {
        return document.getElementById(canvasElementId).getContext('2d');

    },

    _createAdminBoardVis: function () {

         // completely arbitrary data
      var sampleData = {
        labels: ['01-2017', '02-2017', '03-2017', '04-2017', '05-2017', '06-2017',
                 '07-2017', '08-2017', '09-2017','10-2017', '11-2017', '12-2017', '01-2018', '02-2018' ],
        datasets: [
            {label:"grant", data:  [0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0] },
            {label:"supply", data:  [0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0] },
            {label:"wastewater", data:  [0, 0, 0, 0, 8, 6, 10, 0, 0, 0, 0, 0, 0, 0] },
            {label:"improvements", data:  [12, 8, 0, 7, 8, 0, 14, 0, 0, 0, 0, 0, 7, 0] },
            {label:"harveyrecovery", data:  [0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 0] },
            {label:"aquifer", data:  [0, 0, 0, 0, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
            {label:"drought", data:  [16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0] },
            {label:"windmill", data:  [0, 0, 0, 0, 0, 0, 18, 0, 0, 0, 0, 0, 0, 0] },
            {label:"river", data:  [0, 0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0] },
            {label:"brackish", data:  [0, 0, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
            {label:"storage", data:  [0, 0, 0, 0, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
            {label:"dpr", data:  [13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
            // {label:"loss", data:  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 13] },
            {label:"projects", data:  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0] },
            {label:"lake", data:  [0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
            {label:"financial", data:  [0, 0, 0, 8, 0, 0, 0, 0, 9, 8, 0, 3, 6, 0] },
            {label:"conservation", data:  [23, 0, 8, 9, 0, 0, 0, 0, 0, 0, 5, 0, 6, 15] },
            {label:"rainfall", data:  [0, 0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0] },
            {label:"groundwater", data:  [17, 0, 21, 8, 0, 0, 0, 0, 0, 0, 4, 0, 0, 7] },
            {label:"well", data:  [0, 0, 0, 7, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0] }
        ]
      };

    var maxHeightChart = new Chart(this._getCtx('adminBoard'))
        .Streamgraph(sampleData, {
          responsive: true,
          labelPlacementMethod: 'maxHeight'
        });

    },

    _createAgChatConcerns: function () {

       // completely arbitrary data
      var sampleData = {
        labels: ['January', 'Feburary', 'March', 'April', 'May', 'June',
                 'July', 'August', 'September','October', 'November', 'December' ],
        datasets: [
          {
            label: 'Corn',
            data: [ 4, 4, 5.5, 4, 7, 12, 14, 9, 6, 5, 2, 1]
          },
          {
            label: 'Wheat',
            data: [ 8, 2, 1, 0, 0, 0, 1, 3, 8, 12, 11, 10]
          },
          {
            label: 'Rice',
            data: [0, 1, 2, 2, 3, 4, 3, 2, 2, 3, 0, 0]
          },
          {
            label: 'Rye',
            data: [0, 0, 0, 0, 0, 0, 2, 5, 9, 6, 5, 1]
          },
          {
            label: 'Oats',
            data: [0, 3, 2, 3, 6, 3, 4, 1, 2, 4, 8, 2]
          }
        ]
      };

    var maxHeightChart = new Chart(this._getCtx('agChatPlacementMaxHeightChart'))
        .Streamgraph(sampleData, {
          responsive: true,
          labelPlacementMethod: 'maxHeight'
        });

    },

    showAgChatGroup: function () {
        var self = this;
         vex.dialog.alert(
            {
                message: 'Agriculture Chat',
                className: 'ag-chat-board',
                overlayClassName: 'water-admin-board-overlay',
                showCloseButton: false,
                escapeButtonCloses: true,
                overlayClosesOnClick: true,
                input: '<canvas id="agChatPlacementMaxHeightChart"></canvas>',
                buttons: [],
                callback: function(data) {
                    if (!data) {
                        return console.log('No data for news');
                    }
                },

                afterOpen: function (element) {
                    self._createAgChatConcerns();
                }
            }
        );
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
                input: '<canvas id="adminBoard"></canvas>',
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