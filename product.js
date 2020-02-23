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
			defaultList[i].parentNode.appendChild(defaultList[i]); // the old fashioned way
		}
	}
}


function sortBySelectedType(dir) {
	sortNestedPrices($('#sortRow'), "div", "span.block2-price","span.block2-newprice", dir);
}

function filterByPriceRangeOption(optionValue) {
	var items = $(".col-sm-12.col-md-6.col-lg-4.p-b-50");
	if(optionValue == "Price") {
		// Price probably should go back to default, so show all
		items.show();
	} else if (optionValue.includes("+")) {
		var startPrice = parseFloat(optionValue.substring(0,optionValue.indexOf('+')).replace('$','').trim());
		for (var i = 0; i < items.length; i++) {
			if (parsedPrice >= startPrice) 
				items[i].style.display = "";
			else
				items[i].style.display = "none";
		}
	} else {
		var startPrice = parseFloat(optionValue.substring(0,optionValue.indexOf('-')).replace('$','').trim());
		var endPrice = parseFloat((optionValue.substring((optionValue.indexOf('-')+1), optionValue.length).replace('$','')).trim());

		for (var i = 0; i < items.length; i++) {
			var parsedPrice =  parseFloat($("span.block2-price", items[i]).text().replace('$','').trim());
			if(Number.isNaN(parsedPrice))
				parsedPrice = $("span.block2-newprice", items[i]).text().replace('$','').trim();
			
			if (parsedPrice >= startPrice && parsedPrice <= endPrice) // toggle display none
				items[i].style.display = "";
			else
				items[i].style.display = "none";
		}
	}
}
	
