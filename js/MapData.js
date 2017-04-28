var dataUrl = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/meteorite-strike-data.json";

d3.json(dataUrl, function(json) {
	var dataSet = json;

	console.log(dataSet);

	var height = 600;
	var width = 800;

	d3.select(".mapdata-title").text("Map of Global Meteorite Landings");

	var projection = d3.geoMercator()
		.scale(100)
		.translate([width/2, height/2])
		.center([0, 0]);

	var svg = d3.select(".mapdata")
		.append("svg")
		.attr("width", width)
		.attr("height", height)
		.append("g");

	var path = d3.geoPath().projection(projection);

	d3.json("https://raw.githubusercontent.com/enjalot/intro-d3/master/maptime/data/world110.json", function(error, topology) {
		svg.append("g")
			.selectAll("path")
			.data(topojson.feature(topology, topology.objects.countries).features)
			.enter()
			.append("path")
			.attr("d", path)
	});

})