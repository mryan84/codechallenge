function loadSingleItem(id) {
	$.getJSON(('http://localhost:8080/GetSingle?id=' + id), function(data) {
	$('#name').text(data.name);
	$('#price').text('$' + data.price);
	$('#about').text(data.about);
	$("#image").attr("src",data.image);
	});
}

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};