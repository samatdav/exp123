Parse.initialize("mmcrSN69TR6IR6e6uo2pzlhpR2amZNkHl4b0GVh1", "ALR6Z7SnB2mWr2SBkZ9cnQX8dgqJph0F47b1aPjl");

	var currentUser = Parse.User.current();
	if (currentUser) {
	    var User = Parse.Object.extend("User");
		var query = new Parse.Query(User);
		query.get(currentUser.id, {
		  success: function(user) {
		  	// console.log(user);

		  	if (user.get("FirstName") != null ) {
		    	document.getElementById('name').value = user.get("FirstName");
		    }
    	    if (user.get("phone") != null ) {
		    	document.getElementById('phone').value = user.get("phone");
		    }
		    if (user.get("AdressField") != null ) {
		    	document.getElementById('pac-input').value = user.get("AdressField");
		    }
		    if (user.get("flat") != null ) {
		    	document.getElementById('flat').value = user.get("flat");
		    }

		    if (user.get("comment") != null ) {
		    	document.getElementById('comment').value = user.get("comment");
		    }

		    $(document).on('click', "#toPay", function(){
				// alert(currentUser);
				user.set("FirstName", document.getElementById('name').value);
				user.set("phone", document.getElementById('phone').value);
				user.set("AdressField", document.getElementById('pac-input').value);
				user.set("flat", document.getElementById('flat').value);
				user.set("howpay", $("input[name=howpay]:checked").val());
				user.set("comment", document.getElementById('comment').value);
				user.set("freeDelivery", 0);				

				user.save();


				sessionStorage.userInfo = document.getElementById('name').value + '<br>' + document.getElementById('phone').value + '<br>' + document.getElementById('pac-input').value + '<br>' + document.getElementById('flat').value + '<br>' + document.getElementById('time').value + '<br>';



					if ($('#creditcard').is(':checked')) { //кредитка
						window.location = "payment.html";
					}

					if ($('#cash').is(':checked')) { //наличные
						window.location = "success.html";
					}


					

					

				});
			  },
			  error: function(object, error) {
			  	alert(error);
			    // The object was not retrieved successfully.
			    // error is a Parse.Error with an error code and message.
			  }
	    
			});

			

			// $('#phone').focus(function() {
			//     // turn on timer
			//     startTimer();
			// }).blur(function() {
			//     // turn off timer
			//     endTimer();
			// });

			// var lastValue = "",
			//     $timer = $('#phone'),
			//     timerCheckCount = 0,
			//     checkInputChange = function() {
			//         timerCheckCount += 1;
			//         if (lastValue !== $timer.val()) {
			//             $timer.next().stop(true, true).fadeIn(0).html('[timer detected change (timer has fired ' + timerCheckCount + ' times!]: ' + $timer.val()).fadeOut(2000);
			//             lastValue = $timer.val();
			//         }
			//     },
			//     timer = undefined,
			//     startTimer = function() {
			//         timer = setInterval(checkInputChange, 200); // check input field every 200 ms (1/5 sec)
			//     },
			//     endTimer = function() {
			//         clearInterval(timer);
			//         timerCheckCount = 0;
			//     };

			// setInterval(function(){ console.log($('#phone').val()); }, 1000);

			// $('#phone').on('input', function() { 
			//     console.log($('#phone').val());
			// });



				// $('#name').change(function() {
				// 	alert($(this).val());
	  	//     		query.equalTo("FirstName", $(this).val());
				// 	query.find({
				//   success: function(results) {
				//     alert("Successfully retrieved " + results.length + " scores.");
				//     // Do something with the returned Parse.Object values
				//     for (var i = 0; i < results.length; i++) {
				//       var object = results[i];
				//       alert(object.id + ' - ' + object.get('phone'));
				//     }
				//   },
				//   error: function(error) {
				//     alert("Error: " + error.code + " " + error.message);
				//   }
				// 	});
				// });

			// $('#phone').bind('input', function() { 
	  //   		query.equalTo("phone", $(this).val());
			// 	query.first({
			// 	  success: function(object) {
			// 	    alert('suc');
			// 	  },
			// 	  error: function(error) {
			// 	    alert("Error: " + error.code + " " + error.message);
			// 	  }
			// 	});
			// });


				    

	    
	} else {
		// alert("You are not logged in");
		window.location = "index.html";
	}




$(document).on('click', ".checkout_button", function(){
	var time = updateClock();	
}); // end checkout click




$(document).ready(function() {
    $(document).on('click', "#toPay", function(){
        $("#submit_order_data").click();
    });
});







$(document).on('click', "#backToMain", function(){
	$('.page-container').html(mainBack);
});

$(document).on('click', "#backToOrder", function(){
	$('.page-container').html(orderBack);
});

!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a("object"==typeof exports?require("jquery"):jQuery)}(function(a){var b,c=navigator.userAgent,d=/iphone/i.test(c),e=/chrome/i.test(c),f=/android/i.test(c);a.mask={definitions:{9:"[0-9]",a:"[A-Za-z]","*":"[A-Za-z0-9]"},autoclear:!0,dataName:"rawMaskFn",placeholder:"_"},a.fn.extend({caret:function(a,b){var c;if(0!==this.length&&!this.is(":hidden"))return"number"==typeof a?(b="number"==typeof b?b:a,this.each(function(){this.setSelectionRange?this.setSelectionRange(a,b):this.createTextRange&&(c=this.createTextRange(),c.collapse(!0),c.moveEnd("character",b),c.moveStart("character",a),c.select())})):(this[0].setSelectionRange?(a=this[0].selectionStart,b=this[0].selectionEnd):document.selection&&document.selection.createRange&&(c=document.selection.createRange(),a=0-c.duplicate().moveStart("character",-1e5),b=a+c.text.length),{begin:a,end:b})},unmask:function(){return this.trigger("unmask")},mask:function(c,g){var h,i,j,k,l,m,n,o;if(!c&&this.length>0){h=a(this[0]);var p=h.data(a.mask.dataName);return p?p():void 0}return g=a.extend({autoclear:a.mask.autoclear,placeholder:a.mask.placeholder,completed:null},g),i=a.mask.definitions,j=[],k=n=c.length,l=null,a.each(c.split(""),function(a,b){"?"==b?(n--,k=a):i[b]?(j.push(new RegExp(i[b])),null===l&&(l=j.length-1),k>a&&(m=j.length-1)):j.push(null)}),this.trigger("unmask").each(function(){function h(){if(g.completed){for(var a=l;m>=a;a++)if(j[a]&&C[a]===p(a))return;g.completed.call(B)}}function p(a){return g.placeholder.charAt(a<g.placeholder.length?a:0)}function q(a){for(;++a<n&&!j[a];);return a}function r(a){for(;--a>=0&&!j[a];);return a}function s(a,b){var c,d;if(!(0>a)){for(c=a,d=q(b);n>c;c++)if(j[c]){if(!(n>d&&j[c].test(C[d])))break;C[c]=C[d],C[d]=p(d),d=q(d)}z(),B.caret(Math.max(l,a))}}function t(a){var b,c,d,e;for(b=a,c=p(a);n>b;b++)if(j[b]){if(d=q(b),e=C[b],C[b]=c,!(n>d&&j[d].test(e)))break;c=e}}function u(){var a=B.val(),b=B.caret();if(a.length<o.length){for(A(!0);b.begin>0&&!j[b.begin-1];)b.begin--;if(0===b.begin)for(;b.begin<l&&!j[b.begin];)b.begin++;B.caret(b.begin,b.begin)}else{for(A(!0);b.begin<n&&!j[b.begin];)b.begin++;B.caret(b.begin,b.begin)}h()}function v(){A(),B.val()!=E&&B.change()}function w(a){if(!B.prop("readonly")){var b,c,e,f=a.which||a.keyCode;o=B.val(),8===f||46===f||d&&127===f?(b=B.caret(),c=b.begin,e=b.end,e-c===0&&(c=46!==f?r(c):e=q(c-1),e=46===f?q(e):e),y(c,e),s(c,e-1),a.preventDefault()):13===f?v.call(this,a):27===f&&(B.val(E),B.caret(0,A()),a.preventDefault())}}function x(b){if(!B.prop("readonly")){var c,d,e,g=b.which||b.keyCode,i=B.caret();if(!(b.ctrlKey||b.altKey||b.metaKey||32>g)&&g&&13!==g){if(i.end-i.begin!==0&&(y(i.begin,i.end),s(i.begin,i.end-1)),c=q(i.begin-1),n>c&&(d=String.fromCharCode(g),j[c].test(d))){if(t(c),C[c]=d,z(),e=q(c),f){var k=function(){a.proxy(a.fn.caret,B,e)()};setTimeout(k,0)}else B.caret(e);i.begin<=m&&h()}b.preventDefault()}}}function y(a,b){var c;for(c=a;b>c&&n>c;c++)j[c]&&(C[c]=p(c))}function z(){B.val(C.join(""))}function A(a){var b,c,d,e=B.val(),f=-1;for(b=0,d=0;n>b;b++)if(j[b]){for(C[b]=p(b);d++<e.length;)if(c=e.charAt(d-1),j[b].test(c)){C[b]=c,f=b;break}if(d>e.length){y(b+1,n);break}}else C[b]===e.charAt(d)&&d++,k>b&&(f=b);return a?z():k>f+1?g.autoclear||C.join("")===D?(B.val()&&B.val(""),y(0,n)):z():(z(),B.val(B.val().substring(0,f+1))),k?b:l}var B=a(this),C=a.map(c.split(""),function(a,b){return"?"!=a?i[a]?p(b):a:void 0}),D=C.join(""),E=B.val();B.data(a.mask.dataName,function(){return a.map(C,function(a,b){return j[b]&&a!=p(b)?a:null}).join("")}),B.one("unmask",function(){B.off(".mask").removeData(a.mask.dataName)}).on("focus.mask",function(){if(!B.prop("readonly")){clearTimeout(b);var a;E=B.val(),a=A(),b=setTimeout(function(){z(),a==c.replace("?","").length?B.caret(0,a):B.caret(a)},10)}}).on("blur.mask",v).on("keydown.mask",w).on("keypress.mask",x).on("input.mask paste.mask",function(){B.prop("readonly")||setTimeout(function(){var a=A(!0);B.caret(a),h()},0)}),e&&f&&B.off("input.mask").on("input.mask",u),A()})}})});

$("#phone").mask("+7 (999) 999-99-99");



var d = new Date();
var h = d.getHours();
var m = d.getMinutes();

$(".chooseTime").append("<option>Сегодня до "+(h+1)+":"+m+"</option>");

for (h+1; h < 23; h++) {
	$(".chooseTime").append("<option>Сегодня "+(h+1)+":00"+" - "+(h+2)+":00"+"</option>");
}


$('#creditcard').click(function() {
    $( "#toPay" ).html( 'Оплатить <span aria-hidden="true">&rarr;</span>' );
});

$('#cash').click(function() {
    $( "#toPay" ).html( 'Завершить <span aria-hidden="true">&rarr;</span>' );
});


$('#nocomment').click(function() {
    $( "#comment" ).css( 'display', 'none' );
});

$('#yescomment').click(function() {
    $( "#comment" ).css( 'display', 'block' );
});
