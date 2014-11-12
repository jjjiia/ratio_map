//TODO:
//1. fix highlighting
//2. sort dict by value list to most
//3. replace words with icons
//4. colors

var global = {
	city: 0,
	data: null
}
var tree = "tree"
var human = "human"
var car = "car"
var child = "child"
var bikeCommuter = "bike commuter"
var publicCommuter = "public transportation"
var carCommuter = "car commuter"
var restaurant = "restaurant"
var cafe = "cafe"
var park = "park"
var intersection = "intersection"
var trafficSignal = "traffic signal"
var accident = "accident"
var walk = "walk to work"

function dataDidLoad(error, data) {
	var data = data
	var base = "human"
	var city = global.city
	global.data = data
	//console.log(calculateRatios(data,base,city))
	displayRatios(calculateRatios(data,base,city),base)
}

function resetBase(base, data){
	var city = global.city
	var data = global.data
	displayRatios(calculateRatios(data,base,city),base)
	d3.selectAll(".activetab").style("color","#666")
	d3.select("."+base).attr("class","activetab")
}

function calculateRatios(data,base,city){
	//var currentBase = base
	//console.log(data[0])
	var cityIndex = 0
 	var currentBase = base
	var currentBaseValue = data[cityIndex][currentBase]
	var ratioDictionary = {}
	for(var item in data[cityIndex]){
		if(item != currentBase && item !="city"){
			var field = item
			var value = currentBaseValue/data[cityIndex][item]
			ratioDictionary[field] = value
		}
	}
	//ratioDictionary.sort(compare)
	return ratioDictionary
}
function compare(a,b) {
  if (a[1] < b[1])
     return -1;
  if (a[1] > b[1])
    return 1;
  return 0;
}

var symbolDictionary = {
	"bike commuter":"<i class=\"fa fa-bicycle\"></i>",
	"tree":"<i class=\"fa fa-tree\"></i>",
	//"tree":"t",
	//"bike commuter":"b",
	"human":"h",
	//"driver":"driver",
	//"car": "<i class=\"fa fa-car\"></i>",
	"car": "c",
	"child":"c",
	"public transportation":"p",
	//"public transportation": "<i class=\"fa fa-bus\"></i>",
	"driver":"d",
	"car commuter":"c",
	"walk to work":"w",
	"traffic signal":"t",
	"intersection":"i",
	//"restaurant": "<i class=\"fa fa-cutlery\"></i>",
	"restaurant": "r",
	"cafe":"c",
	"park":"p",
	"companies registered":"c",
	"accident":"a",
	"museum":"m"
	//"museum":"<i class=\"fa fa-university\"></i>"
}
function displayRatios(ratioData,base){
	//console.log(ratioData)
	var outputData = "<table>"
//	var outputString = ""
	var base = base
	//console.log(base)
	for (var item in ratioData){
		//console.log(item)
		outputData = outputData+"<tr>"
		//console.log(ratioData[item])
		//check ratio, alwayse use smaller number as base
		if(ratioData[item]<1){
			//console.log(base + " is smaller than "+ item)
			var one = symbolDictionary[base]
			var multiple = symbolDictionary[item]
			var newRatio = 1/ratioData[item]
		}
		else{
			//console.log(base + " is larger than "+ item)
			var one =  symbolDictionary[item]
			var multiple = symbolDictionary[base]
			var newRatio = ratioData[item]
		}
		
		
		outputData = outputData+"<td>"+one+"</td><td>"
		for(var times = 0; times < newRatio; times+=1){
			outputData = outputData+" "+multiple
		}
		outputData = outputData+"</td></tr>"
	//	console.log(item)
	}
	outputData = outputData+"</table>"
	
	//console.log(outputData)
	
	
	d3.select("#ratio-content").html(outputData)
}

$(function() {
	// Window has loaded
	queue()
		.defer(d3.csv, csv)
		.await(dataDidLoad);
})


//ESSAY BOX DO NOT CHANGE
var essayBoxShown = false;
 $('#showMore').click(function(e){
     e.preventDefault();
     essayBoxShown = !essayBoxShown;
     if (essayBoxShown) {
         $('#essayBox').css('display', 'block');
         $('#essayBox').animate({'opacity':1.0}, 500);
         $(this).text(' ... view map ');
     } else {
         closeEssayBox();
         $(this).text(' ... more ');
     }
   })
   $('#essayBox-close').click(function(){
//	   console.log("close")
     closeEssayBox();
     $('#showMore').text(' ... more ');
   });


  function closeEssayBox(){
   $('#essayBox').animate({'opacity':0.0}, 500, function () {
     $('#essayBox').css('display', 'none');
   })
   essayBoxShown = false;
 }
