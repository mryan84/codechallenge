var applySearchTextFilter = false;
var applyPriceRangeFilter = false;
var applyColorFilter = false;

var colorFilters = [];

function loadItems(pageNumber) {
		
	$.getJSON(('http://localhost:8080/GetMany'), function(data) {
		data.forEach(obj => {
			    // probably the easiest way to do this
				var newItem = '<div class="col-sm-12 col-md-6 col-lg-4 p-b-50">' +
							'<div class="block2">' +
								'<div class="block2-img wrap-pic-w of-hidden pos-relative block2-labelnew">' +
									'<img src="' + obj.image + '" alt="IMG-PRODUCT">' +

									'<div class="block2-overlay trans-0-4">' +
										'<a href="#" class="block2-btn-addwishlist hov-pointer trans-0-4">' +
											'<i class="icon-wishlist icon_heart_alt" aria-hidden="true"></i>' +
											'<i class="icon-wishlist icon_heart dis-none" aria-hidden="true"></i>' +
										'</a>' +

										'<div class="block2-btn-addcart w-size1 trans-0-4">' +
											'<button class="flex-c-m size1 bg4 bo-rad-23 hov1 s-text1 trans-0-4">' +
												'Add to Cart' +
											'</button>' +
										'</div>' +
									'</div>' +
								'</div>' +

								'<div class="block2-txt p-t-20">' +
									'<a href="product-detail.html?id=' + obj._id + '" class="block2-name dis-block s-text3 p-b-5" id="a">' +
										obj.name +
									'</a>' +

									'<span class="block2-price m-text6 p-r-5">' +
										'$' + obj.price +
									'</span>' +
								'</div>' +
							'</div>' +
						'</div>';
			$('#sortRow').append(newItem);
		});
	});
}


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
			// i dont see any thing relevant to popularity in the data? -- confirmed by Sean, do not need to create this sorting
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

// none of the fake products from GetMany contain any kind of information about a color, but I got this working with the default product.html items if you'd like to try it
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
	var items = $(".col-sm-12.col-md-6.col-lg-4.p-b-50"); // get by class
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
	var items = $(".col-sm-12.col-md-6.col-lg-4.p-b-50");
	if(optionValue == "Price") {
		// Price probably should go back to default if this is chosen, so show all
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

// do not apply a filter again if you just applied it - be more restrictive always until a reset
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





