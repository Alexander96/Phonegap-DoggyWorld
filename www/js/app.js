var curUser = null;

var domain = "http://pupmates.net/";
//domain = "http://localhost:1234/";
var user_id_access_token = "";

var pages = {
	Home: "home-page",
	Login: "login-page",
	Dogs: "dogs-page",
	Places: "places-page",
	Search: "search-page",
	EditDog: "edit-dog-dialog",
	UserProfile: "user-profile-page",  // another user profile NOT the current one
	AllAchievements: "all-achievements-page"
}
$(window).on("navigate", function (event, data) {
  /*var direction = data.state.direction;
  if (direction == 'back') {
    var activePage = $.mobile.activePage.attr('id');
    if(activePage == pages.UserProfile){
    	$.mobile.changePage("#" + pages.Search, {reverse: false, transition: "slide"});
    	return;
    }
    if(activePage == pages.Home){
    	navigator.app.exitApp();
    	return;
    }
    $.mobile.changePage("#" + pages.Home, {reverse: false, transition: "slide"});
  }
  if (direction == 'forward') {
    // do something else
  }*/
});
$(document).on("pagecreate", function () {
    $("[data-role=panel]").one("panelbeforeopen", function () {
        var height = $.mobile.pageContainer.pagecontainer("getActivePage").outerHeight();
        $(".ui-panel-wrapper").css("height", height + 1);
    });
});
$(function () {
    $("[data-role=header],[data-role=footer]").toolbar().enhanceWithin();
    $("[data-role=panel]").panel().enhanceWithin();

    //auto login
    if(window.localStorage.getItem("username")!=null){
    	$('[name="uname"]').val(window.localStorage.getItem("username"));
    	$('[name="password"]').val(window.localStorage.getItem("password"));
    	loginForm();
    }
});
function loginForm(){
	var uname = $('[name="uname"]').val();
	var pass = $('[name="password"]').val();
	var user = {
		username: uname,
		password: pass
	};

	//local storage so when the application is started again to login automatically
	window.localStorage.setItem("username", uname);
	window.localStorage.setItem("password", pass);

	$.ajax({
	    url: domain + 'login?method=login&returnformat=json',
	    type: 'POST',
	    data: user,
	    error : function (){ document.title='error'; }, 
	    success: function (data) {
	    	if(data.success){
	    		console.log(data.user);
	    		curUser = data.user;
	    		curUser.profPhoto = domain+"img/profPhoto/" + curUser._id;
	    		user_id_access_token = curUser._id;
	    		$("#main-names").html("<h3>" + curUser.firstName + "</h3>" + "<h3>" + curUser.lastName + "</h3>");
	    		$("#main-img-container").html('<img src="'+ curUser.profPhoto +'">');
	    		$.mobile.changePage("#" + pages.Home, {reverse: false, transition: "slide"});
	    	}
	    }
	});

	

	return false;
}
function saveProfile(){
	$( "#edit-profile-dialog" ).dialog( "close" );
}
function signout(){
	window.localStorage.setItem("username", "");
	window.localStorage.setItem("password", "");
	$.ajax({
	    url: domain + 'logout',
	    type: 'POST',
	    data: curUser,
	    error : function (){ document.title='error'; }, 
	    success: function (data) {
    		$.mobile.changePage("#" + pages.Login, {reverse: false, transition: "fade"});
	    }
	});

}
function goHome(){
	$.mobile.changePage("#" + page.Home, {reverse: false, transition: "slide"});
}
function goToPage(pageChange){
	var activePage = $.mobile.activePage.attr('id');
	if(activePage == pageChange){
		$( "#main-menu" ).panel( "close");
		$("#friends-menu").panel("close");
	}
	else{
		$.mobile.changePage("#" + pageChange, {reverse: false, transition: "pop"});
	}
}
function closeFriendsMenu(){
	$( "#friends-menu" ).panel( "close");
}
function closeMainMenu(){
	$( "#main-menu" ).panel( "close");
}
