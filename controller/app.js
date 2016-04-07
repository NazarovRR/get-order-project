var main=function(){

	loadJSON(function(response) {
		if(response){
			var data=JSON.parse(response).orders;
			createTableElements(data);
		}
	});
}

function createTableElements(data){
	//creating a table for each order
	var elements_array=[];
	for(var i=0;i<data.length;i++){
		var dateTime=filterDate(new Date(data[i].order_time));
		var data_element='<div class="col-md-8">';
		data_element+='<table class="table table-condensed table-striped">';
		data_element+='<tr><td>Time of order</td><td></td><td></td><td></td><td>'+dateTime+'</td></tr>';
		for(var j=0;j<data[i].positions.length;j++){
			data_element+='<tr>';
			if(+data[i].positions[j].quantity==1){                                
				if(j==0){
					data_element+='<td>Order</td>';
					data_element+='<td>Weight</td>';
					data_element+='<td>Qty</td>';
					data_element+='<td>Cost</td>';
					data_element+='<td>Total Cost</td></tr><tr>';
				}
				data_element+='<td>'+data[i].positions[j].name+'</td>';
				data_element+='<td>'+data[i].positions[j].weight+'</td><td></td><td></td>';
				data_element+='<td>'+data[i].positions[j].pos_cost+' Ru</td>';
			} else if(+data[i].positions[j].quantity>1){
				if(j==0){
					data_element+='<td>Order</td>';
					data_element+='<td>Weight</td>';
					data_element+='<td>Qty</td>';
					data_element+='<td>Cost</td>';
					data_element+='<td>Total Cost</td></tr><tr>';
				}
				data_element+='<td>'+data[i].positions[j].name+'</td>';
				data_element+='<td>'+data[i].positions[j].weight+'</td>';
				data_element+='<td>'+data[i].positions[j].quantity+'</td>';
				data_element+='<td>'+data[i].positions[j].pos_cost+' Ru</td>';
				data_element+='<td>'+data[i].positions[j].order_cost+' Ru</td>';
			}
			data_element+='</tr>';
		}
		data_element+='<tr>';
		data_element+='<td><strong>Summary</strong></td><td></td><td></td><td></td><td><strong>'+data[i].total_cost+' Ru</strong></td>';
		data_element+='</tr>';
		data_element+='</table>';
		data_element+='</div>';
		elements_array.push(data_element);
	}
	insertOrders(elements_array,data);
}

function insertOrders(array,data){
	//using the array of tables passed in, we wrap this into a panel view and insert to our page.
	for(var i=0;i<array.length;i++){
		//collapse and heading vars are for ID's
		var collapse="collapse"+i;
		var heading="heading"+i;
		var newElement=$('<div class="panel-heading" role="tab" id='+heading+'><h4 class="panel-title"><a role="button" data-toggle="collapse" data-parent="#accordion" href=#'+collapse+' aria-expanded="false" aria-controls='+collapse+'>Order '+(i+1)+' </a></h4></div><div id='+collapse+' class="panel-collapse collapse" role="tabpanel" aria-labelledby='+heading+'><div class="panel-body">'+array[i]+'</div></div></div>');
	    $("#accordion").append(newElement);
	}
}

function filterDate(date){
	//there are plenty of date filtering libs, bus we don't actually need them for a simple change, this would appear to a user in a familiar format
	var month = new Array();
	month[0] = "January";
	month[1] = "February";
	month[2] = "March";
	month[3] = "April";
	month[4] = "May";
	month[5] = "June";
	month[6] = "July";
	month[7] = "August";
	month[8] = "September";
	month[9] = "October";
	month[10] = "November";
	month[11] = "December";
	var mm = month[date.getMonth()];
	var dateTime=secondaryFilter(date.getDate())+" of "+mm+" "+secondaryFilter(date.getHours())+":"+secondaryFilter(date.getMinutes());
	return dateTime;

	function secondaryFilter(day){
		//just adds a zero to a single number of date: 7=>07, looks better
		if(+day<10){
			day="0"+day;
		}
		return day;
	}
}

function loadJSON(callback) {
	//Well, in this project the task was to read the data from json file inside the project, so i won't be using any workarounds and will try to work straight.
	//To read an external json file we need a server, so i used a chrome extension "Web Server for Chrome".
	var path="http://127.0.0.1:8887/assets/orders.json";
	//NOTE:this is path to a file using web server for chrome, if you using different, change this line

	//request for a json file
	var xobj = new XMLHttpRequest();
	xobj.overrideMimeType("application/json");
	xobj.open('GET', path, true);
	xobj.onreadystatechange = function () {
		if(xobj.status == "0"){
			alert("I believe you didn't setup a server in order to use this project, because reading an external json file requires a server, please use any");
		}
		if (xobj.readyState == 4 && xobj.status == "200") {

			callback(xobj.responseText);

		}
	}
	xobj.send(null);


};

$(document).ready(main);