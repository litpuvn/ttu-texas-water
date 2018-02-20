function StakeHolderViewer() {

    this.wordCloud = new WordCloud('adminBoard');

}

StakeHolderViewer.prototype = {
    constructor: StakeHolderViewer,

    _createAdminBoardVis: function () {
        this.wordCloud.populateWordCloud();
    },

    _createAgChatConcerns: function () {
      function ctx(elementId){
        return document.getElementById(elementId).getContext('2d');
      }

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

    var maxHeightChart = new Chart(ctx('agChatPlacementMaxHeightChart'))
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
                className: 'water-admin-board',
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