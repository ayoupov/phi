
document.addEventListener("DOMContentLoaded", function(event) {
  var simModel = null;
  var app = Elm.Main.fullscreen();

  app.ports.renderNetwork.subscribe(function(model) {
    var svg = d3.select("svg");

    simModel = model;

    var svgBox = svg.node().getBBox();

    var xScale = d3.scaleLinear()
                         .domain([30.5234 - 0.01, 30.5234 + 0.01])
                         .range([0,600]);

    var yScale = d3.scaleLinear()
                         .domain([50.4501 - 0.01, 50.4501 + 0.01])
                         .range([0,400]);

    function setX(node) {
      return xScale(node.x);
    }

    function setY(node) {
      return yScale(node.y);
    }

    function drawCircles(nodes, nodeClass) {
      var circles = svg.selectAll("circle")
                       .data(nodes, function(d) { return d.uid; });

      circles.enter()
             .append("circle")
             .attr("cx", setX)
             .attr("cy", setY)
             .attr("r", 5)
             .attr("class", nodeClass);

      circles.attr("cx", setX)
             .attr("cy", setY);
    }

    drawCircles(model.pvPanels, "pvPanel");
    drawCircles(model.windTurbines, "windTurbine");
    drawCircles(model.residences, "residence");

  });

});
