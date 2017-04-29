var dataUrl = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/meteorite-strike-data.json";

d3.json(dataUrl, function(json) {
	var dataSet = json;

	console.log(dataSet);

	var height = 700;
	var width = 1200;

	d3.select(".mapdata-title").text("Map of Global Meteorite Landings");

	var tooltip = d3.select(".mapdata-title")
		.append("div")
		.attr("class", "tooltip")
		.style("opacity", 0);

	var projection = d3.geoMercator()
		.scale(130)
		.translate([width/2, height/2 + 30])
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
			.attr("fill", "mediumseagreen");

		svg.append("g")
			.selectAll(".meteorite")
			.data(dataSet.features)
			.enter()
			.append("path")
			.attr("d", path.pointRadius(2))
			.attr("fill", "yellow")
			.on("mouseover", function(d) {
				tooltip.transition()
					.duration(200)
					.style("opacity", 1);

				tooltip.html("HELLO" + "<br/>"
					+ "WORLD!")
					.style("left", (d3.event.pageX) + "px")
					.style("top", (d3.event.pageY) + "px");
			})
			.on("mouseout", function(d) {
				tooltip.transition()
					.duration(200)
					.style("opacity", 0);
			});
	});

})