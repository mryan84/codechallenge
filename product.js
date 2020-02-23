function sortNestedPrices(parent, childSelector, keySelector, revisedValueKeySelector, sortDir) {
	if(sortDir != "def") {
    var items = parent.children(childSelector).sort(function(a, b) {
        var vA = parseFloat($(keySelector, a).text().replace('$','').trim());
		if(Number.isNaN(vA)) {
			vA = parseFloat($(revisedValueKeySelector, a).text().replace('$','').trim());
		}
		
        var vB = parseFloat($(keySelector, b).text().replace('$','').trim());
		if(Number.isNaN(vB)) {
			vB = parseFloat($(revisedValueKeySelector, b).text().replace('$','').trim());
		} 
		
		if(sortDir == "asc")
			return (vA < vB) ? -1 : (vA > vB) ? 1 : 0;
		else if(sortDir == "desc")
			return (vA < vB) ? 1 : (vA > vB) ? -1 : 0;
    });
    parent.append(items);
	} else { 
		for (var i = 0; i < defaultList.length; i++) {
			defaultList[i].parentNode.appendChild(defaultList[i]);
		}
	}
}


function sortBySelectedType(dir) {
	sortNestedPrices($('#sortRow'), "div", "span.block2-price","span.block2-newprice", dir);
}
	
