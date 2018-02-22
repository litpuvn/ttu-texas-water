function MenuItemHandler(stakeHolderViewer) {
    this.stakeHolderViewer = stakeHolderViewer;
    this.discovery = new WaterDiscovery();
}

MenuItemHandler.prototype = {
    constructor: MenuItemHandler,

    onAdminBoardClick: function () {
        this.showStakeHolders();

        this.stakeHolderViewer.showAdminBoardGroup();
    },

    onAgChatClick: function () {
        this.showStakeHolders();

        this.stakeHolderViewer.showAgChatGroup();
    },

    onDiscoveryClick: function () {
        this.discovery.showTopics();
    },

    showStakeHolders: function () {
        document.getElementById("myDropdown").classList.toggle("show");
    }
};