//TODO:
//1. fix highlighting
//2. sort dict by value list to most
//3. replace words with icons
//4. colors

var global = {
	city: 0,
	data: null
}
var symbolDictionary = {
	"child":"child.png",
	"human":"man.png",
	"tree":"tree.png",
	"cafe":"cafe.png",
	"companies registered":"museum.png",
	"park":"park.png",
	"car":"car.png",
	"bike commuter":"bike.png",
	"car commuter":"driver.png",
	"intersection":"intersection.png",
	"school":"school.png",
	"museum":"museum.png",
	"public transportation":"bus.png",
	"traffic signal":"trafficSignal.png"
}

function dataDidLoad(error, data) {
	var data = data
	var city = global.city
	global.data = data
	console.log(data)
	//console.log(calculateRatios(data,base,city))
	var base = "human"
	var comparator1 = "tree"
	var peopleDictionary = calculateRatios(data,city, "human",["tree","companies registered","cafe"])
	displayRatios(".people",peopleDictionary,base,"tree")
	displayRatios(".people",peopleDictionary,base,"companies registered")
	displayRatios(".people",peopleDictionary,base,"cafe")
	
	var childDictionary = calculateRatios(data,city, "child",["school","park","museum","tree"])
	displayRatios(".child",childDictionary,"child","tree")
	displayRatios(".child",childDictionary,"child","park")
	displayRatios(".child",childDictionary,"child","school")
	displayRatios(".child",childDictionary,"child","museum")

	var commuterDictionary = calculateRatios(data,city, "human",["public transportation","car commuter","bike commuter"])
	displayRatios(".commute",commuterDictionary,"human","public transportation")
	displayRatios(".commute",commuterDictionary,"human","car commuter")
	displayRatios(".commute",commuterDictionary,"human","bike commuter")
	var bikeDictionary = calculateRatios(data,city, "public transportation",["bike commuter","car commuter"])
	displayRatios(".commute",bikeDictionary,"public transportation","car commuter")
	displayRatios(".commute",bikeDictionary,"public transportation","bike commuter")
	
	var infrastructureDictionary = calculateRatios(data,city, "car",["intersection","tree","traffic signal"])
	displayRatios(".street",infrastructureDictionary,"car","tree")
	displayRatios(".street",infrastructureDictionary,"car","intersection")
	displayRatios(".street",infrastructureDictionary,"car","traffic signal")
	
}


function calculateRatios(data,city, base, comparators){
	//var currentBase = base
	//console.log(data[0])
	var cityIndex = city
	var base = parseInt(data[cityIndex][base])
	var dictionary = {}
	for(var comparator in comparators){
		dictionary[comparators[comparator]] = base/parseInt(data[cityIndex][comparators[comparator]])
	}
	console.log(dictionary)
	return dictionary
}

//var childrenDictionary = {
//	"park": child/parseInt(data[cityIndex]["park"]),
//	"school": child/parseInt(data[cityIndex]["school"]),
//	"museum": child/parseInt(data[cityIndex]["museum"])
//}


function compare(a,b) {
  if (a[1] < b[1])
     return -1;
  if (a[1] > b[1])
    return 1;
  return 0;
}
function displayRatios(div, data, base, comparator){
	var ratio = data[comparator]
	var iconsize = 12
//	console.log(ratio)
//	console.log(symbolDictionary[base])
console.log("ratio: "+parseInt(ratio))
console.log("number of rows: "+ Math.ceil(ratio/100))
var height = parseInt((ratio/100))*iconsize+20
console.log("height: "+height)
//console.log(height)
	var svg = d3.select(div).append("svg").attr("height",height).attr("width",iconsize*102).append("g")
	//append base first
	svg.append("svg:image")
		.attr("xlink:href", symbolDictionary[comparator])
		.attr("x",0)
		.attr("y",0)
		.attr("width",iconsize)
		.attr("height",iconsize)
		.attr("fill","#aaaaaa")
		.attr("class", comparator)
		.on("mouseover", function(){
				console.log(base)
				d3.select("#tab-detail").html("In New York City, for every "+comparator+", there are " + parseInt(ratio+1)+ " " + pluralDictionary[base]+".")
			})
	//append colon
	//append comparator
	var j = 0

	for(var i = 0; i < ratio; i++){
		if((i)%100 == 0){
			j = j+1
		}
		svg.append("svg:image")
		.attr("class", comparator)
		
			.attr("xlink:href", symbolDictionary[base])
			.attr("x",(i%100)*iconsize+iconsize)
			.attr("y",j*iconsize-iconsize)
			.attr("width",iconsize)
			.attr("height",iconsize)
			.attr("fill","#aaaaaa")
			.on("mouseover", function(){
					console.log(base)
					d3.select("#tab-detail").html("In New York City, for every "+comparator+", there are " + parseInt(ratio+1)+ " " + pluralDictionary[base]+".")
					
					//d3.select("#tab-detail").html("1 "+comparator+" : " + parseInt(ratio)+ " " + pluralDictionary[base])
				})
	}
//	d3.select("."+comparator).on("mouseover", function(){
//		console.log(base)
//		d3.select("#tab-detail").html("1 "+comparator+" : " + parseInt(ratio)+ " " + pluralDictionary[base])
//	})
}

var pluralDictionary={
	"human":"people",
	"tree":"trees",
	"child":"children",
	"car":"cars",
	"public transportation":"public commuters"
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
