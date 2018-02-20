function MenuItemHandler(stakeHolderViewer) {
    this.stakeHolderViewer = stakeHolderViewer;
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

    showStakeHolders: function () {
        document.getElementById("myDropdown").classList.toggle("show");
    }
};