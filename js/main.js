$(document).ready(function(){
	$("#searchbtn").click(function(){
		$("#searchinput").slideToggle();
	})

	$('.btnm').on('click', function(e) {
		e.preventDefault();
		$('.menu').toggleClass('menu_active');
	})

	const menuToggle = document.querySelector('#menu-toggle');
	menuToggle.onclick = function(){
		menuToggle.classList.toggle('menu-icon-active');
	}
    
    $(".fa-shopping-cart").click(function(){
		$("#popup").show();
	})
    
    $(".popup_close").click(function(){
		$("#popup").hide();
	})
});
