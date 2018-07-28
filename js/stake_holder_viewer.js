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
          colorAssignmentMethod: 'verticalPosition',
          labelPlacementMethod: 'maxHeight',
            colors: [
                '#1f77b4', '#aec7e8', '#ff7f0e', '#ffbb78', '#2ca02c', '#98df8a', '#d62728', '#ff9896', '#9467bd', '#c5b0d5', '#8c564b', '#c49c94',
                '#e377c2', '#f7b6d2', '#7f7f7f', '#c7c7c7', '#bcbd22', '#dbdb8d', '#17becf'
            ],
            labelFontColor: 'black',
            labelMinimumSize: 9,
            stroke: false
        });

    },

    _createAgChatConcerns: function () {

       // completely arbitrary data
      var sampleData = {
         labels: ['06-2017', '07-2017', '08-2017', '09-2017', '10-2017', '11-2017',
                 '12-2017', '01-2018', '02-2018','03-2018', '04-2018', '05-2018', '06-2018'],
        datasets: [
             {label:"harvest", data:  [6, 13, 11, 0, 13, 13, 0, 0, 0, 0, 0, 0, 0] },
            {label:"sugarcane", data:  [0, 0, 0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0] },
            {label:"beef", data:  [7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
            {label:"help", data:  [0, 9, 0, 21, 8, 0, 0, 0, 0, 0, 9, 9, 0] },
            {label:"drought", data:  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 0] },
            {label:"produce", data:  [5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
            {label:"affected", data:  [0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
            {label:"crop", data:  [0, 9, 9, 0, 0, 0, 0, 0, 0, 10, 0, 0, 0] },
            {label:"plant", data:  [0, 0, 0, 0, 0, 0, 0, 0, 10, 14, 0, 0, 0] },
            {label:"livestock", data:  [0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0] },
            {label:"shares", data:  [0, 0, 0, 0, 0, 0, 9, 0, 0, 8, 0, 0, 0] },
            {label:"rice", data:  [0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
            {label:"wotus", data:  [5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
            {label:"rural", data:  [5, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0] },
            {label:"grow", data:  [0, 0, 0, 0, 0, 8, 8, 0, 10, 8, 0, 10, 0] },
            {label:"farmbill", data:  [0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18] },
            {label:"president", data:  [0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0] },
            {label:"corn", data:  [0, 10, 0, 9, 0, 9, 0, 0, 0, 0, 0, 0, 0] },
            {label:"wheat", data:  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 0, 10] },
            {label:"cotton", data:  [0, 12, 20, 17, 16, 11, 16, 9, 0, 0, 0, 22, 10] },
            {label:"cattletales", data:  [0, 10, 0, 12, 0, 9, 8, 0, 8, 9, 0, 0, 0] },

        ]
      };

    var maxHeightChart = new Chart(this._getCtx('agChatPlacementMaxHeightChart'))
        .Streamgraph(sampleData, {
          responsive: true,
            colorAssignmentMethod: 'verticalPosition',
          labelPlacementMethod: 'maxHeight',
            colors: [
                '#1f77b4', '#aec7e8', '#ff7f0e', '#ffbb78', '#2ca02c', '#98df8a', '#d62728', '#ff9896', '#9467bd', '#c5b0d5', '#8c564b', '#c49c94',
                '#e377c2', '#f7b6d2', '#7f7f7f', '#c7c7c7', '#bcbd22', '#dbdb8d', '#17becf'
            ],
            labelFontColor: 'black',
            labelMinimumSize: 9,
            stroke: false        });

    },

    showAgChatGroup: function () {
        var self = this;
         vex.dialog.alert(
            {
                message: 'Farmer Bureau',
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