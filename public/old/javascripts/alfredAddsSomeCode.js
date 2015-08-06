$(document).ready(function() {
	var documentWidth = $('body').innerWidth();
	var topPercentageOfDocument = documentWidth * 0.02;
	var navBarHeight = 34;
	var offsetWithNavHeight = topPercentageOfDocument + navBarHeight;

	$('#nav').singlePageNav({
		offset: offsetWithNavHeight
	});

});

$(window).resize(function() {
	var documentWidth = $('body').innerWidth();
	var topPercentageOfDocument = documentWidth * 0.02;
	var navBarHeight = 34;
	var offsetWithNavHeight = topPercentageOfDocument + navBarHeight;

	$('#nav').singlePageNav({
		offset: offsetWithNavHeight
	});
})

function resumeRedirect() {
	window.location="http://www.alfredabab.io/Resume.pdf";
}
