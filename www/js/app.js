var curUser = null;
var dogs = [];
var domain = "http://pupmates.net/";
//domain = "http://localhost:1234/";

var pages = {
	Home: "home-page",
	Login: "login-page",
	Dogs: "dogs-page",
	OneDog: "one-dog-page"
}
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
	    url: domain + 'login',
	    type: 'POST',
	    data: user,
	    error : function (){ document.title='error'; }, 
	    success: function (data) {
	    	if(data.success){
	    		console.log(data.user);
	    		curUser = data.user;
	    		curUser.profPhoto = domain+"img/profPhoto/" + curUser._id;
	    		$("#output").html("<h2>" + curUser.firstName + "</h2>");
	    		$.mobile.changePage("#home-page", {reverse: false, transition: "slide"});
	    	}
	    }
	});

	

	return false;
}
function signout(){
	/*window.localStorage.setItem("username", null);
	window.localStorage.setItem("password", null);*/
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
$(document).delegate('#' + pages.Home, 'pagebeforeshow', function () {
    /*$.ajax({
	    url: domain + 'achievments/aquired/' + curUser._id,
	    type: 'GET',
	    error : function (){ document.title='error'; }, 
	    success: function (data) {
	    	console.log(data);
	    }
	});*/
});
$(document).delegate('#' + pages.Dogs, 'pagebeforeshow', function () {
    $.ajax({
	    url: domain + 'dogs/' + curUser._id,
	    type: 'GET',
	    error : function (){ document.title='error'; }, 
	    success: function (data) {
	    	if(data){
	    		dogs = data;
	    		console.log(data);
	    		for(var i=0;i<dogs.length;i++){
	    			dogs[i].profPhoto = domain + "curUser._id"+"/imgdog/"+dogs[i]._id;
	    		}
	    		loadDogs();
	    	}
	    }
	});
});
