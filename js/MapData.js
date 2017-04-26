var dataUrl = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/meteorite-strike-data.json";

d3.json(dataUrl, function(json) {
	var dataSet = json;

	console.log(dataSet);

	var height = 600;
	var width = 600;

	d3.select(".mapdata-title").text("Map of Global Meteorite Landings");

	var projection = d3.geoMercator()
		.scale(100)
		.translate([width/2, height/2]);

	var svg = d3.select(".mapdata")
		.append("svg")
		.attr("width", width)
		.attr("height", height)
		.append("g")
		.attr("class", "map");

	var path = d3.geoPath().projection(projection);

})