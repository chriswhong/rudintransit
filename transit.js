$(document).ready(function() {

	var firstDraw = 1;
	update(firstDraw);
	firstDraw = 0;
	var interval = window.setInterval(function() {
		update(firstDraw)
	}, 5000);

});

function update(firstDraw) {

	var tripArray = new Array();
	var currTime = new Date().getTime() / 1000;
	$.ajax({
		type : "GET",
		url : "http://www.jfxart.com/rudin/feed.php",
		dataType : "xml",

		success : function(xml) {
			console.log("I got data! ");
			console.log(xml);
			$(xml).find('stop').each(function() {
				var id = $(this).children('id').text();
				//console.log(id);
				var q = new Array;
				var s = new Array();
				var i = 0;
				$(this).find('direction0').each(function() {

					$(this).find('trip').each(function() {
						var route = $(this).children('route').text();
						var tripID = $(this).children('id').text();
						var did = $(this).children('did').text();
						var depUTC = $(this).children('depUTC').text();
						s.direction = $(this).children('direction').text();
						var minutes = Math.round((depUTC - currTime) / 60);

						if (minutes < 0) {

						} else {
							var t = new Array();
							t[0] = route;
							t[1] = did;
							t[2] = minutes;
							t[3] = tripID;
							s[i] = t;
							i += 1;
						}
					})
				})
				q[0] = s;
				var s = new Array();
				var i = 0;
				$(this).find('direction1').each(function() {

					$(this).find('trip').each(function() {
						var route = $(this).children('route').text();
						var tripID = $(this).children('id').text();
						var did = $(this).children('did').text();
						var depUTC = $(this).children('depUTC').text();
						s.direction = $(this).children('direction').text();
						var minutes = Math.round((depUTC - currTime) / 60);

						if (minutes < 0) {

						} else {
							var t = new Array();
							t[0] = route;
							t[1] = did;
							t[2] = minutes;
							t[3] = tripID;
							s[i] = t;
							i += 1;
						}
					})
				})
				q[1] = s;

				tripArray[id] = q;

			});
			console.log("firstdraw is " + firstDraw);
			if ( firstDraw == 1) {
				draw(tripArray);
			} else {
				console.log("I would update here");

			}

		}
	});

}

function draw(tripArray) {
	//console.log("hi from draw");
	//console.log(tripArray);

	var stops = [152, 266, 447];
	var currTime = new Date().getTime() / 1000;

	//console.log(tripArray);

	//loop once for each station/line
	for ( i = 0; i < 3; i++) {

		switch(stops[i]) {
			case 152:
				stopName = "Bleeker St";
				divID = "green";
				lineColor = "#37a600";
				textColor = "#FFFFFF";
				break;
			case 266:
				stopName = "Broadway-Lafayette";
				divID = "orange";
				lineColor = "#f8a809";
				textColor = "#FFFFFF";
				break;
			case 447:
				stopName = "Prince St";
				divID = "yellow";
				lineColor = "#fefe00";
				textColor = "#000000";
				break;
		}

		//document.getElementById('green').innerHTML += "stop: " + stopName + "<br/>";

		//loop once for each direction
		for ( j = 0; j < 2; j++) {

			//sorts all trips on a route by arrival time... we are going to take the 3 with the lowest times
			localArray = tripArray[stops[i]][j];
			localArray.sort(function(a, b) {
				return a[2] > b[2] ? 1 : -1;

			})
			document.getElementById(divID).innerHTML += "<div id = '" + divID + j + "' class = 'group'>";
			document.getElementById(divID + j).innerHTML += "<div class='direction'>" + localArray.direction + "</div>";

			//console.log(localArray.length);

			//Just loop through localArray 3 times to grab the next three trains for this route and direction
			k = 0;
			while (k < localArray.length) {

				minutes = localArray[k][2];

				line = localArray[k][0];

				document.getElementById(divID + j).innerHTML += "<div class= 'trip " + localArray[k][3] + "'><span class = 'line'style = 'background:" + lineColor + ";color:" + textColor + "'>" + line + " </span><span class = 'minutes'>" + minutes + " min</span></div>";

				k++;
				if (k == 3) {
					break;
				}
			}

			document.getElementById(divID + j).innerHTML += "<div class='ender'> </div>";

		}

	}

}

