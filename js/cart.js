Parse.initialize("mmcrSN69TR6IR6e6uo2pzlhpR2amZNkHl4b0GVh1", "ALR6Z7SnB2mWr2SBkZ9cnQX8dgqJph0F47b1aPjl");

function handleParseError(err) {
  switch (err.code) {
    case Parse.Error.INVALID_SESSION_TOKEN:
      Parse.User.logOut();
      break;
  }
}


$(document).ready(function() {
	$(".popup-num").keydown(function(event) {
		// Allow only backspace and delete
		if ( event.keyCode == 46 || event.keyCode == 8 ) {
			// let it happen, don't do anything
		}
		else {
			// Ensure that it is a number and stop the keypress
			if (event.keyCode < 48 || event.keyCode > 57 ) {
				event.preventDefault();	
			}	
		}
	});
});


var setTileWidth = function() {
	if($("#item-wrap-inner")[0]) {
		var clientWidth = $("#item-wrap-inner")[0].clientWidth;
		var noOfTiles = clientWidth / 200; //232
		//noOfTiles = Math.floor(noOfTiles);
		if(noOfTiles >= Math.floor(noOfTiles) + 0.75) {
			noOfTiles = Math.ceil(noOfTiles);
		} else {
			noOfTiles = Math.floor(noOfTiles);
		}
		$("#item-wrap-inner")[0].className = "col-xs-10 products-wrap " + "tile-" + noOfTiles;
	}
};



$(window).resize(setTileWidth);
$(window).load(setTileWidth);
$(setTileWidth);


var basedCost = 100;
var totalCost = 0;
var newItem = '';
var dCost = 100;
var mass = 0;
if (!sessionStorage.mass) {
	sessionStorage.mass = 0;
}
if (!sessionStorage.total) {
	sessionStorage.total = 0;
}

if (sessionStorage["ids"]) {
	ids = JSON.parse(sessionStorage["ids"]);
	counts = JSON.parse(sessionStorage["counts"]);
} else {
	var ids = [];
	var counts = [];
}


var currentUser = Parse.User.current();
// if (currentUser) {
// 	var User = Parse.Object.extend("User");
// 			var query = new Parse.Query(User);
// 			query.get(currentUser.id, {
// 			  success: function(user) {
// 			  	if (user.get("freeDelivery")) {
// 			  			dCost = 0;
// 						basedCost = 0;
// 						$('#delivery_cost').html(dCost);
// 						$('#cart-price').html(totalCost);
// 						$('#total_main').html((totalCost + dCost) + '  &#8381;');
// 						$('#freeDelivery').css('display', 'block');
// 			  	}
// 			  }
// 			});
// } else {
// 	dCost = 0;
// 	basedCost = 0;
// 	$('#delivery_cost').html(dCost);
// 	$('#cart-price').html(totalCost);
// 	$('#total_main').html((totalCost + dCost) + '  &#8381;');
// 	$('#freeDelivery').css('display', 'block');
// }

if (currentUser) {
	$('#freeDelivery').css('display', 'none');
} else {
	$('#freeDelivery').css('display', 'block');
}


if (sessionStorage.cart) {
	$("#ordered-items").prepend(sessionStorage.cart);
}
if (sessionStorage.total) {
	totalCost = Number(sessionStorage.total);
	$('#total_main').html(totalCost + '  &#8381;');
	$('#grocery-price').html(totalCost);
	$('#cart-price').html(totalCost);
}
if (sessionStorage.count) {
	$('#cart-number').html(Number(sessionStorage.count));
	$('#cart-number').css( "display", "block" );
	if (Number(sessionStorage.count) >= 10) {
		$('#cart-number').css( "width", "37px" );
	}
}

// alert(dCost);

$(document).on('click', ".increase_count", function(){
	var theId = $(this).closest('.product').attr('id');

	if (sessionStorage.count) {
    	sessionStorage.count = Number(sessionStorage.count)+1;
	} else {
	    sessionStorage.count = 1;
	}
	sessionStorage.mass = parseFloat(sessionStorage.mass) + parseFloat($(this).closest('.product').find('.product-howmuch').html());
	// console.log(sessionStorage.mass);

	// console.log( $(this).closest('.product').find('.reduce_count'));
	$(this).closest('div').children('.reduce_count').removeClass( "hidden" ).addClass( "visible" );
	$(this).closest('.product').children('.item_count').removeClass( "hidden" ).addClass( "visible" );

	if (sessionStorage[theId]) {
    	sessionStorage[theId] = Number(sessionStorage[theId])+1;
	} else {
	    sessionStorage[theId] = 1;
	}

	// console.log(theId + sessionStorage[theId]);
	$(this).closest('.product').children('.item_count').html(sessionStorage[theId]);

	newItem = (
				'<tr class="ordered-item" id="cart-'+$(this).closest('.product').attr('id')+'"> '+
					'<td class="image"> <span class="helper"></span>'+ $(this).closest('.product').find('img')[0].outerHTML + '</td>' +
					'<td class="name">'+$(this).closest('.product').find('.product-name').html()+ 
					'<span class="mass hidden">'+$(this).closest('.product').find('.product-howmuch').html()+'</span>' +
					'<td class="price"><span class="priceShow">'+parseFloat($(this).closest('.product').find('.product-price').html())+'</span><span class="kop">00</span></td>' +
					'<td class="quantity"> x '+Number(sessionStorage[theId])+'</td>' +
					'<td class="total"> = <span class="totalShow">'+ (parseFloat($(this).closest('.product').find('.product-price').html())*parseFloat(Number(sessionStorage[theId]))).toFixed(0)+ '<span class="kop">00</span></span>'+
					'<a href="#" class="cart-change cart-add"><span class="glyphicon glyphicon-arrow-up" aria-hidden="true"></span><span class="cart-del-txt"> Добавить</span></a>'  +
					'<a href="#" class="cart-change cart-min"><span class="glyphicon glyphicon-arrow-down" aria-hidden="true"></span><span class="cart-del-txt"> Убрать</span></a>' +
					'<a href="#" class="cart-change cart-del">×</a>' +
					'</td>'+
				'</tr>');
	
	$('#cart-number').html(Number(sessionStorage.count));

	if (Number(sessionStorage.count) == 1) {
		$('#cart-number').css( "display", "block" );
	}

	if (Number(sessionStorage.count) >= 10) {
		$('#cart-number').css( "width", "37px" );
	}
	var itemId = $(this).closest('.product').attr('id');
	// if (value > 1) {
		$("#cart-"+ itemId).remove();
	// }

	$("#ordered-items").prepend(newItem);


	totalCost = totalCost + parseFloat($(this).closest('.product').find('.product-price').html());

	totalCost = Math.round(totalCost);


	$('#cart-price').html(totalCost);

	if (totalCost >= 200) {
		$('#notmin').css( "display", "none" );
	}


	sessionStorage.cart = $("#ordered-items").html();
	sessionStorage.total = totalCost;
	return newItem;
});

$('#orderBtn').on({
	"click":function(e){
      
// $(document).on('click', "#orderBtn", function(){ // Parse
	if (totalCost < 200) {
		e.stopPropagation();
		$('#notmin').css( "display", "block" );
	}
	else {

		$('#notmin').css( "display", "none" );


	var OrderArchive = Parse.Object.extend("OrdersArchive");
	var orderArchive = new OrderArchive();
	orderArchive.set("html", $('#cart-items').html());
	orderArchive.save(null, {
	  success: function(order) {
	  	sessionStorage.cOrderArchive = orderArchive.id;
	  },
	  error: function(order, error) {
	  }
	});


	var Order = Parse.Object.extend("Orders");
	var order = new Order();
	order.set("html", $('#cart-items').html());


	order.save(null, {
	  success: function(order) {
	  	sessionStorage.cOrder = order.id;
	  	sessionStorage.cost = totalCost;
	  	sessionStorage.dCost = dCost;
	    // if (currentUser) {
	    	window.location = "order.html";
	    // } else {
	    // 	window.location = "signin.html";
	    // }
	    
	    
	  },
	  error: function(order, error) {
	    // Execute any logic that should take place if the save fails.
	    // error is a Parse.Error with an error code and message.
	    console.log(error.message);
	    // alert('Не удалось создать заказ: ' + error.message);

	  }
	});

}//end else
}//end on click
});
// $('.reduce_count').click(function () {
$(document).on('click', ".reduce_count", function(){
	// console.log(newItem);
	var theId = $(this).closest('.product').attr('id');
	sessionStorage[theId] = Number(sessionStorage[theId])-1;
	if (sessionStorage.count) {
    	sessionStorage.count = Number(sessionStorage.count)-1;
	} 
	$(this).closest('.product').children('.item_count').html(sessionStorage[theId]);

	sessionStorage.mass = parseFloat(sessionStorage.mass) - parseFloat($(this).closest('.product').find('.product-howmuch').html());

	newItem = (
				'<tr class="ordered-item" id="cart-'+$(this).closest('.product').attr('id')+'"> '+
					'<td class="image"> <span class="helper"></span>'+ $(this).closest('.product').find('img')[0].outerHTML + '</td>' +
					'<td class="name">'+$(this).closest('.product').find('.product-name').html()+ 
					'<span class="mass hidden">'+$(this).closest('.product').find('.product-howmuch').html()+'</span>' +
					'<td class="price"><span class="priceShow">'+parseFloat($(this).closest('.product').find('.product-price').html())+'</span><span class="kop">00</span></td>' +
					'<td class="quantity"> x '+Number(sessionStorage[theId])+'</td>' +
					'<td class="total"> = <span class="totalShow">'+ (parseFloat($(this).closest('.product').find('.product-price').html())*parseFloat(Number(sessionStorage[theId]))).toFixed(0)+ '<span class="kop">00</span></span>'+
					'<a href="#" class="cart-change cart-add"><span class="glyphicon glyphicon-arrow-up" aria-hidden="true"></span><span class="cart-del-txt"> Добавить</span></a>'  +
					'<a href="#" class="cart-change cart-min"><span class="glyphicon glyphicon-arrow-down" aria-hidden="true"></span><span class="cart-del-txt"> Убрать</span></a>' +
					'<a href="#" class="cart-change cart-del">×</a>' +
					'</td>'+
					
				'</tr>');



	var itemId = $(this).closest('.product').attr('id');

	var idIndex = ids.indexOf($(this).closest('.product').attr('id'));
	counts[idIndex] -= 1;

	sessionStorage["ids"] = JSON.stringify(ids);
	sessionStorage["counts"] = JSON.stringify(counts);

	$("#cart-"+ itemId).remove();


	if (sessionStorage[theId] <= 0) {
		$(this).closest('div').children('.reduce_count').removeClass( "visible" ).addClass( "hidden" );
		$(this).closest('.product').children('.item_count').removeClass( "visible" ).addClass( "hidden" );
		// sessionStorage[theId] = Number(sessionStorage[theId])-1;
	}
	else {
		$("#ordered-items").prepend(newItem);
	}

	$('#cart-number').html(sessionStorage.count);

	if (Number(sessionStorage.count) == 9) {
		$('#cart-number').css( "width", "30px" );
	}
	if (Number(sessionStorage.count) <= 0) {
		$('#cart-number').css( "display", "none" );
	}

	totalCost = totalCost - parseFloat($(this).closest('.product').find('.product-price').html());

	totalCost = Math.round(totalCost);




	$('#total_main').html((totalCost + dCost) + '  &#8381;');
	$('#grocery-price').html(totalCost);
	$('#cart-price').html(totalCost);

	sessionStorage.cart = $("#ordered-items").html();
	sessionStorage.total = totalCost;
	return newItem;
});
var h;
var m;
function updateClock() {
	var d = new Date();
	var h = d.getHours() + 1;
	var m = d.getMinutes();
	$("#cart_time_b").html(h+':'+ (m<10?'0':'') + m);
	// $(".order-time").html(h+':'+ (d.getMinutes()<10?'0':'') + m);
	// если верный работает с 9 до 22
	if (h > 22){
		$("#cart_time_b").html('11:00');
		$("#delivery_day").html('Доставим завтра до 11:00');

	} 
	if (h < 11){
		$("#cart_time_b").html('11:00');
	}
	

    setTimeout(updateClock, 6000);
    return [h,m];
}
updateClock(); // initial call

$("a[href='#top']").click(function() {
  $("html, body").animate({ scrollTop: 0 }, "fast");
  return false;
});


$('.dropdown-menu').click(function(e) {
        e.stopPropagation();
});


$(".cart-del").click(function() {
	var remid = $(this).closest('.ordered-item').attr('id');
	remid = remid.substring(5, remid.length);
	// alert(remid);
	// $("#"+remid).find(".reduce_count").click();
	$("#"+remid).find(".reduce_count").click();
	// alert($("#"+remid).find(".name").html());
	// alert(remid);
});


$("#ordered-items").on('click', '.cart-add', function() {
	var str = $(this).closest('tr').attr('id');
	var theId = str.substring(5);
	var thePrice = Number($(this).closest('tr').find('.priceShow').html());

	sessionStorage.count = Number(sessionStorage.count)+1;
	$('#cart-number').html(Number(sessionStorage.count));
	sessionStorage[theId] = Number(sessionStorage[theId])+1;
	$(this).closest('tr').find('.quantity').html('x ' + sessionStorage[theId]);
	$(this).closest('tr').find('.totalShow').html((thePrice * Number(sessionStorage[theId]))+ '<span class="kop">00</span>');
	sessionStorage.mass = parseFloat(sessionStorage.mass) + parseFloat($(this).closest('tr').find('.mass').html());
	totalCost = totalCost + thePrice;
	totalCost = Math.round(totalCost);
	sessionStorage.total = totalCost;
	$('#cart-price').html(totalCost);
	

	if (Number(sessionStorage.count) >= 10) {
		$('#cart-number').css( "width", "37px" );
	}
	if ($('#'+theId).length === 0) { 
	} else { 
		$('#'+theId).find('.item_count').html(sessionStorage[theId])
	}

	sessionStorage.cart = $("#ordered-items").html();
});


$("#ordered-items").on('click', '.cart-min', function() {
	var str = $(this).closest('tr').attr('id');
	var theId = str.substring(5);
	var thePrice = Number($(this).closest('tr').find('.priceShow').html());

	sessionStorage.count = Number(sessionStorage.count)-1;
	$('#cart-number').html(Number(sessionStorage.count));
	sessionStorage[theId] = Number(sessionStorage[theId])-1;
	$(this).closest('tr').find('.quantity').html('x ' + sessionStorage[theId]);
	$(this).closest('tr').find('.totalShow').html((thePrice * Number(sessionStorage[theId]))+ '<span class="kop">00</span>');
	sessionStorage.mass = parseFloat(sessionStorage.mass) - parseFloat($(this).closest('tr').find('.mass').html());
	totalCost = totalCost - thePrice;
	totalCost = Math.round(totalCost);
	sessionStorage.total = totalCost;
	$('#cart-price').html(totalCost);
	

	if (Number(sessionStorage.count) <= 9) {
		$('#cart-number').css( "width", "30px" );
	}
	if (Number(sessionStorage.count) <= 0) {
		$('#cart-number').css( "display", "none" );
	}
	if ($('#'+theId).length === 0) { 
	} else { 
		$('#'+theId).find('.item_count').html(sessionStorage[theId]);
	}

	if (Number(sessionStorage[theId]) <= 0) {
		$(this).closest('tr').remove();
		if ($('#'+theId).length === 0) { 
		} else { 
			$('#'+theId).find('.reduce_count').removeClass( "visible" ).addClass( "hidden" );
			$('#'+theId).find('.item_count').removeClass( "visible" ).addClass( "hidden" );
		}
	}

	sessionStorage.cart = $("#ordered-items").html();

});

$("#ordered-items").on('click', '.cart-del', function() {
	var str = $(this).closest('tr').attr('id');
	var theId = str.substring(5);
	var thePrice = Number($(this).closest('tr').find('.priceShow').html());
	sessionStorage.count = Number(sessionStorage.count)-Number(sessionStorage[theId]);
	$('#cart-number').html(Number(sessionStorage.count));
	sessionStorage.mass = parseFloat(sessionStorage.mass) - (parseFloat($(this).closest('tr').find('.mass').html() * Number(sessionStorage[theId])));
	
	totalCost = totalCost - (thePrice * Number(sessionStorage[theId]));
	totalCost = Math.round(totalCost);
	sessionStorage.total = totalCost;
	$('#cart-price').html(totalCost);
	

	if (Number(sessionStorage.count) <= 9) {
		$('#cart-number').css( "width", "30px" );
	}
	if (Number(sessionStorage.count) <= 0) {
		$('#cart-number').css( "display", "none" );
	}
	
	$(this).closest('tr').remove();
	if ($('#'+theId).length === 0) { 
	} else { 
		$('#'+theId).find('.reduce_count').removeClass( "visible" ).addClass( "hidden" );
		$('#'+theId).find('.item_count').html(sessionStorage[theId]);
		$('#'+theId).find('.item_count').removeClass( "visible" ).addClass( "hidden" );
	}
	
	sessionStorage[theId] = 0;
	sessionStorage.cart = $("#ordered-items").html();

});


$(document).scroll(function() {
  var y = $(this).scrollTop();
  if (y > 1950) {
    $('#cattop').css('display', 'block');
    $('#clicktop').css('display', 'block');
    $('#texttop').css('display', 'block');
  } else {
    $('#cattop').css('display', 'none');
    $('#clicktop').css('display', 'none');
    $('#texttop').css('display', 'none');
  }
});




// $('.product').click(function () {
//     // alert($(this).attr('id'));
//     alert("sadf");
// });
$(document).ready(function() {
	$(document).on('click', ".product", function(){
	  src = $('#idt' + $(this).attr('id')).find('img').attr('src');
	  newsrc = src.replace("table", "big");
	  $('#idt' + $(this).attr('id')).find('img').attr({
	  	src: newsrc,
	  });
	});
});

$(document).on('click', ".product_card_prop_item_value", function(e){
// $('.product_card_prop_item_value').find('a').click(function(e) { 
 e.preventDefault(); 
});

$(document).on('click', "#dd_btn", function(){
	$('#dd_body').toggle();
	$('.backdrop').toggle();

});


$(document).on('click', ".backdrop", function(){
	$('#dd_body').toggle();
	$('.backdrop').hide();

});


search_results = '';
function search(word) {
	word = word.toLowerCase();
	n = 0;
	search_results = '';
	$.each(json, function(i, v) {
        if (v.product_name.toLowerCase().indexOf(word) >= 0) {
        		if (Number(sessionStorage[v.objectId]) > 0) {
			    search_results  += '<div class="product-wrap"> <div class="product" id="' + v.objectId + '"> <a href="#" data-toggle="modal" data-target="#idt' + v.objectId + '"> <div class="product_img"> <span class="helper"></span> <img class="" src="' + v.img_sm + '"> </a> </div> <button class="item_count visible btn count btn-dark-blue btn-small-med btn-trans">'+sessionStorage[v.objectId]+'</button> <div class="action"> <div> <button href="javascript:void(0)" class="reduce_count visible btn minus btn-dark-blue btn-small-med btn-trans">-</button> <button href="javascript:void(0)" class="increase_count btn add btn-dark-blue btn-small-med btn-trans">Добавить</button> </div> </div> <div class="desc"> <div class="name"> <p class="product-name">' + v.product_name + '</p> </div>  <div class="price"> <p class="product-price">' + v.price + '<span class="kop">00</span></p> </div> <div class="product-howmuch">'+ v.amount +' </div></div> </div> </div>';

			    } else {
			    search_results  += '<div class="product-wrap"> <div class="product" id="' + v.objectId + '">  <a href="#" data-toggle="modal" data-target="#idt' + v.objectId + '"> <div class="product_img"> <span class="helper"></span> <img class="" src="' + v.img_sm + '">  </div> </a><button class="item_count hidden btn count btn-dark-blue btn-small-med btn-trans">'+sessionStorage[v.objectId]+'</button> <div class="action"> <div> <button href="javascript:void(0)" class="reduce_count hidden btn minus btn-dark-blue btn-small-med btn-trans">-</button> <button href="javascript:void(0)" class="increase_count btn add btn-dark-blue btn-small-med btn-trans">Добавить</button> </div> </div> <div class="desc"> <div class="name"> <p class="product-name">' + v.product_name + '</p> </div>  <div class="price"> <p class="product-price">' + v.price + '<span class="kop">00</span></p> </div><div class="product-howmuch">'+ v.amount +' </div> </div> </div> </div>';

			    }

			    search_results  += '<div class="modal fade bs-example-modal-lg" id="idt' + v.objectId + '" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true"> <div class="modal-dialog modal-lg"> <div class="modal-content row"> <div class="row"> <div class="popup-image";> <span class="popup-helper"></span> <img class="popimg" src="' + v.img_sm + '"> </div> <div class="popup-name"> <p class="popup-title" id="myModalLabel">' + v.product_name + '</p> <div class="popup-price"> ' + v.price + '<span class="kop">00</span> <span class="popup-rub">'+num2word(Math.floor(v.price),words)+'</span> </div> <div class="popup-mass"> '+ v.amount +'</div> </div> </div> <hr> <div class="row"> <div class="popup-description"> <strong>Описание</strong> <br> <div class="description-text">' + v.description + '</div> </div> '+v.consist+' </div> </div> </div> </div>'

			    n+=1;
        }
        });
		
		if (n == 0) {
		search_results = '<div id="nosearch"> <h1>К сожалению по Вашему запросу ничего не найдено</h1> <h2>Попробуйте ввести другое или более короткое слово</h2> </div>'
		}
		

        $(".products-wrap").empty();
        $(".products-wrap").prepend(search_results);

        $( ".product" ).each(function( index ) {
	      var theId = $(this).attr('id');
	      $(this).find('.item_count').html(sessionStorage[theId]);
	      if (sessionStorage[theId] > 0) {
	        $(this).find('.reduce_count').removeClass( "hidden" ).addClass( "visible" );
	        $(this).find('.item_count').removeClass( "hidden" ).addClass( "visible" );
	      } else {
	        $(this).find('.reduce_count').removeClass( "visible" ).addClass( "hidden" );
	        $(this).find('.item_count').removeClass( "visible" ).addClass( "hidden" );
	      }
	    });

        current = 'searchvar';
        
   console.log('done');
   console.log(n);
}



$("#search").keyup(function(event){
    if(event.keyCode == 13){
    	if (document.getElementById('search').value != ''){
    		word = document.getElementById('search').value;
        	search(word);
    	}
    }
});


$(document).on('click', ".glyphicon-search", function(){
    	if (document.getElementById('search').value != ''){
    		word = document.getElementById('search').value;
        	search(word);
    	}
});