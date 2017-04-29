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
		var colorLegend = ["pink", "yellow", "orange", "red", "black"];

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
			.attr("fill", function(d) {
				console.log(d.properties.mass);
				if(d.properties.mass <= 1500)
					return colorLegend[0];
				else if(d.properties.mass <= 5000)
					return colorLegend[1];
				else if(d.properties.mass <= 12500)
					return colorLegend[2];
				else if(d.properties.mass <= 25000)
					return colorLegend[3];
				else
					return colorLegend[4];
			})
			.on("mouseover", function(d) {
				tooltip.transition()
					.duration(200)
					.style("opacity", 1);

				tooltip.html("Name: " + d.properties.name + "<br/>"
					+ "Mass: " + d.properties.mass + " kg" + "<br/>"
					+ "Year: " + (new Date(d.properties.year)).getFullYear())
					.style("left", (d3.event.pageX) + "px")
					.style("top", (d3.event.pageY) + "px");
			})
			.on("mouseout", function(d) {
				tooltip.transition()
					.duration(200)
					.style("opacity", 0);
			});

		// Legend for Meteor Data Point Colors
		for(var i = 0; i < colorLegend.length; i++) {
			svg.append("circle")
				.attr("r", 5)
				.attr("cx", 50)
				.attr("cy", 300 + (20*i))
				.style("fill", colorLegend[i])
		}

		svg.append("text").attr("x", 50).attr("y", 285).text("Meteorite Colors");
		svg.append("text").attr("x", 60).attr("y", 305).text("< 1500 kg");
		svg.append("text").attr("x", 60).attr("y", 325).text("< 5000 kg");
		svg.append("text").attr("x", 60).attr("y", 345).text("< 12500 kg");
		svg.append("text").attr("x", 60).attr("y", 365).text("< 25000 kg");
		svg.append("text").attr("x", 60).attr("y", 385).text("> 25000 kg");
	});

})