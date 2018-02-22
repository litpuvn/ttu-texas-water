// Creating the master menu (SideMenu)
var myMenu = new SideMenu([
	// adding item(s) in constructor class.
	new SMLabelItem("My first item!")
]);

// adding item after create instance.
myMenu.addItem(new SMSubMenuItem("Colors", [
   new SMLabelItem("Red"),
   new SMLabelItem("Blue"),
   new SMLabelItem("Yellow"),
   new SMLabelItem("Green"),
   new SMLabelItem("etc")
]));

// adding mix type of items with multi-level menus using "SMSubMenuItem".
myMenu.addItem(new SMSubMenuItem("Animals", [
   new SMLinkItem("Bunny", "//www.google.com.pe/?#q=Bunny"),
   new SMLinkItem("Tiger", "//www.google.com.pe/?#q=Tiger"),
   new SMLinkItem("Dog", "//www.google.com.pe/?#q=Dog"),
   new SMLinkItem("Cat", "//www.google.com.pe/?#q=Cat", "_blank"),
   new SMSubMenuItem("Birds", [
       new SMLinkItem("Eagle", "//www.google.com.pe/?#q=eagle"),
       new SMLabelItem("Hawk"),
       new SMLabelItem("Tucan"),
       new SMButtonItem("Parrot", function () {
           alert("Hello World!")
       }),
       new SMLabelItem("Chicken"),
       new SMLabelItem("Duck")
   ]),
   new SMLabelItem("Pig"),
   new SMLinkItem("Crocodile", "//www.google.com.pe/?#q=Crocodile")
]));

// Adding new single item type "SMButtonItem" with click handler;
myMenu.addItem(
    new SMButtonItem("Download File", function(){
      alert("Go Download File!");
    })
);


// Using API
myMenu.addItem(
    new SMButtonItem("Close", function () {
        myMenu.close();
    })
);

// Finally add SideMenu object to DOM tree target.
myMenu.appendTo(document.getElementById('menu'));
 //
 // $(function() {
 //
 // 	/*
 // 	    ==========================================================================
 // 	        CODE FOR DEMO PAGE (IGNORE)
 // 	    ==========================================================================
 // 	*/
 //
 // 	var isTouch = !!('ontouchstart' in window || navigator.maxTouchPoints),
 // 		evt = isTouch ? 'touchend' : 'click';
 // 	var next = function() {
 // 		$(this).attr("disabled", "disabled").parent().next('li').find('button').removeAttr("disabled");
 // 	};
 //
 // 	$("#open-demo").one(evt, function(e) {
 // 		e.preventDefault();
 // 		sideMenu.open();
 // 		next.call(this);
 // 	});
 //
 // 	$("#close-demo").one(evt, function(e) {
 // 		e.preventDefault();
 // 		sideMenu.close();
 // 		if (confirm("Try again?"))  {
 // 			location.reload(true);
 // 		} else {
 // 			$(this).text("Try again!");
 // 			$("#close-demo").on(evt, function() {
 // 				location.reload(true);
 // 			});
 // 		}
 // 	});
 //
 // 	$("#add-item-1").one(evt, function(e) {
 // 		e.preventDefault();
 // 		sideMenu.addItem(new SMSubMenuItem("Others"));
 // 		next.call(this);
 // 	});
 //
 // 	$("#add-item-2").one(evt, function(e) {
 // 		e.preventDefault();
 // 		sideMenu.getSubMenuByName("others")
 // 			.open()
 // 			.addItem(
 // 				new SMLinkItem("Go to google", "http://google.com", "_blank")
 // 			);
 // 		next.call(this);
 // 	});
 //
 // 	$("#close-item-1").one(evt, function(e) {
 // 		e.preventDefault();
 // 		sideMenu.getSubMenuByName("others").close();
 // 		next.call(this);
 // 	});
 //
 // 	$("#move-item-1").one(evt, function(e) {
 // 		e.preventDefault();
 // 		sideMenu.getItemByName("Animals").moveToPosition(sideMenu.items.length);
 // 		next.call(this);
 // 	});
 //
 // 	$("#move-item-2").one(evt, function(e) {
 // 		e.preventDefault();
 // 		var share = sideMenu.getSubMenuByName("Share").open();
 // 		sideMenu.getItemByName("Animals").moveToMenu(share);
 // 		next.call(this);
 // 	});
 //
 // 	$("#return-item-1").one(evt, function(e) {
 // 		e.preventDefault();
 // 		var share = sideMenu.getSubMenuByName("Share");
 // 		share.getItemByName("Animals").moveToMenu(sideMenu, 0);
 // 		share.close();
 // 		next.call(this);
 // 	});
 //
 // 	$("#remove-item-1").one(evt, function(e) {
 // 		e.preventDefault();
 // 		sideMenu.getItemByName("Others").remove();
 // 		next.call(this);
 // 	});
 //
 // 	$("#move-item-3").one(evt, function(e) {
 // 		e.preventDefault();
 // 		sideMenu.getItemByIndex(1).moveToPosition(0);
 // 		next.call(this);
 // 	});
 // });

 myMenu.toggle();
