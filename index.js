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
var museum = "museum"
function displayBaseDetail(base){
	var baseDataDetailDict = {
		"tree":"tree = street trees found in NYC's tree census",
		"bike commuter":"bike commuter = based on American Community Survey",
		"human":"human = population of new york city",
		"driver":"driver = based on number of drivers licencses currently on file at new york city dmv",
		"car": "car = based on number of cars currently registered in new york city ",
		"child":"child = popultation of new york city under the age of 18",
		"public transportation":"public commuter = based on American Community Survey",
		"car commuter":"car commuter = based on American Community Survey",
		"walk to work":"walk to work = based on American Community Survey",
		"traffic signal":"traffic signal = based on department of transportation data",
		"intersection":"intersection = based on department of transportation data via new york times article",
		"restaurant": "restaurant = based on restaurant inspections by department of health and hyginene ",
		"cafe":"cafe = based on restaurant inspection sub-categorization by department of health and hyginene ",
		"park":"park = based on number reported by new york city",
		"companies registered":"companies = base on subset of statewide corporate registrations",
		"accident":"accident = base on police reports",
		"museum":"museum = based on number reported by new york city"
	}
	d3.select("#tab-detail").html(baseDataDetailDict[base])
}
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
	displayBaseDetail(base)
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
	//"bike commuter":"<i class=\"fa fa-bicycle\"></i>",
	//"tree":"<i class=\"fa fa-tree\"></i>",
	"tree":"tree",
	"bike commuter":"bike commuter",
	"human":"human",
	"driver":"driver",
	//"car": "<i class=\"fa fa-car\"></i>",
	"car": "car",
	"child":"child",
	"public transportation":"public commuter",
	//"public transportation": "<i class=\"fa fa-bus\"></i>",
	
	"car commuter":"car commuter",
	"walk to work":"walk to work",
	"traffic signal":"traffic signal",
	"intersection":"intersection",
	//"restaurant": "<i class=\"fa fa-cutlery\"></i>",
	"restaurant": "restaurant",
	"cafe":"cafe",
	"park":"park",
	"companies registered":"companies",
	"accident":"accident",
	"museum":"museum"
	//"museum":"<i class=\"fa fa-university\"></i>"
}
function displayRatios(ratioData,base){
	//console.log(ratioData)
	var outputData = "<table> <col width=\"30\"><col width=\"900\">"
//	var outputString = ""
	var base = base
	
	//console.log(base)
	for (var item in ratioData){
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
			if((times+1)%10 == 0){
				outputData=outputData+"</br>"
			}
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
