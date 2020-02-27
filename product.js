var applySearchTextFilter = false;
var applyPriceRangeFilter = false;
var applyColorFilter = false;

var colorFilters = [];

function removeColorFilter(color) {
	const index = colorFilters.indexOf(color);
	if (index > -1) {
		colorFilters.splice(index, 1);
	}
}

function compareColorsContains(check) {
	for(var i = 0; i < colorFilters.length; i++) {
		if(check.toLowerCase().includes(colorFilters[i]))
			return true;
	}
	return false;
}	


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
			// i dont see any thing relevant to popularity in the data?
		});
    parent.append(items);
	} else { 
		for (var i = 0; i < defaultList.length; i++) {
			defaultList[i].parentNode.appendChild(defaultList[i]); // the old fashioned way
		}
	}
}

function sortBySelectedType(dir, isExtraRestriction) {
	sortNestedPrices($('#sortRow'), "div", "span.block2-price","span.block2-newprice", dir);
}

function filterByColors(isExtraRestriction) {
	// check and see if none are selected - set applyColorFilter to false
	var items = $('#sortRow').children("div");
	if(colorFilters.length == 0) {
		applyColorFilter = false;
	} else {
		applyColorFilter = true;
	}
	
	for (var i = 0; i < items.length; i++) {
		if(compareColorsContains($("a.block2-name", items[i]).text())) {
			if(!isExtraRestriction)
				items[i].style.display = "";
		} else {
			items[i].style.display = "none";	
		}	
	}
		
	if(!isExtraRestriction)
		applyOtherActiveFilters('colors');
}	

function filterBySearchField(searchValue, isExtraRestriction) {
	console.info('calling search filter with extra of ' + isExtraRestriction);
	var items = $(".col-sm-12.col-md-6.col-lg-4.p-b-50");
	if(searchValue.trim() != '')
		applySearchTextFilter = true;
	else
		applySearchTextFilter = false;
	
	for (var i = 0; i < items.length; i++) {
		if(items[i].innerHTML.toLowerCase().includes(searchValue.toLowerCase())) {
			if(!isExtraRestriction)
				items[i].style.display = "";
		} else {
			items[i].style.display = "none";
		}
	}
	
	if(!isExtraRestriction)
		applyOtherActiveFilters('search');
}

function filterByPriceRangeOption(optionValue, isExtraRestriction) {
	console.info('calling price filter with extra of ' + isExtraRestriction);
	var items = $(".col-sm-12.col-md-6.col-lg-4.p-b-50");
	if(optionValue == "Price") {
		// Price probably should go back to default, so show all
		items.show();
		applyPriceRangeFilter = false;
	} else if (optionValue.includes("+")) {
		var startPrice = parseFloat(optionValue.substring(0,optionValue.indexOf('+')).replace('$','').trim());
		for (var i = 0; i < items.length; i++) {
			var parsedPrice =  parseFloat($("span.block2-price", items[i]).text().replace('$','').trim());
			if(Number.isNaN(parsedPrice))
				parsedPrice = $("span.block2-newprice", items[i]).text().replace('$','').trim();
			
			if (parsedPrice >= startPrice) {
				if(!isExtraRestriction)
					items[i].style.display = "";
			} else {
				items[i].style.display = "none";
			}
		}
		applyPriceRangeFilter = true;
	} else {
		var startPrice = parseFloat(optionValue.substring(0,optionValue.indexOf('-')).replace('$','').trim());
		var endPrice = parseFloat((optionValue.substring((optionValue.indexOf('-')+1), optionValue.length).replace('$','')).trim());

		for (var i = 0; i < items.length; i++) {
			var parsedPrice =  parseFloat($("span.block2-price", items[i]).text().replace('$','').trim());
			if(Number.isNaN(parsedPrice))
				parsedPrice = $("span.block2-newprice", items[i]).text().replace('$','').trim();
			
			if (parsedPrice >= startPrice && parsedPrice <= endPrice) { // toggle display none
				if(!isExtraRestriction)
					items[i].style.display = "";
			} else {
				items[i].style.display = "none";
			}
		}
		
		applyPriceRangeFilter = true;
	}
	
	if(!isExtraRestriction)
		applyOtherActiveFilters('priceRange');
}

// do not apply a filter again if you just applied it - be more restrictive always
function applyOtherActiveFilters(notThisFilter) {
	if(notThisFilter != 'search' && (applySearchTextFilter || !applyColorFilter))
		filterBySearchField($("#searchField").val(),true);
	if(notThisFilter != 'priceRange' && (applyPriceRangeFilter || !applyColorFilter))
		filterByPriceRangeOption($('#sortPriceRange').children("option:selected").text() ,true);
	if(notThisFilter != 'colors' && applyColorFilter)
		filterByColors(true);
	if(notThisFilter == 'colors' && (applyPriceRangeFilter && !applyColorFilter)) // if colors is blank and a price range option is chosen, override to only filtering by price range
		filterByPriceRangeOption($('#sortPriceRange').children("option:selected").text() ,false);
		
}