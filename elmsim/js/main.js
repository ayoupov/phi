var simModel;
var edges;

var svg;

document.addEventListener("DOMContentLoaded", function(event) {
  var app = Elm.Main.fullscreen();

  app.ports.renderPhiNetwork.subscribe(function(model) {

    svg = d3.select("svg");

    simModel = model[0];
    edges = model[1];

    var svgBox = svg.node().getBBox();

    var xScale = d3.scaleLinear()
                         .domain([30.5234 - 0.01, 30.5234 + 0.01])
                         .range([0,600]);

    var yScale = d3.scaleLinear()
                         .domain([50.4501 - 0.01, 50.4501 + 0.01])
                         .range([0,400]);

    function setX(node) {
      return xScale(node.label.pos.x);
    }

    function setY(node) {
      return yScale(node.label.pos.y);
    }

    function drawCircles(nodes) {
      var nodes = svg.select(".nodes").selectAll(".node")
                       .data(nodes, function(d) { return d.id; });

      nodes.enter()
           .append("circle")
           .attr("cx", setX)
           .attr("cy", setY)
           .attr("r", 10)
           .attr("class", function(d) {
             return "node " + d.label.nodeType;
           });

      nodes.attr("cx", setX)
           .attr("cy", setY);
    }

    function drawLinks(links) {
      var dataLinks = links.map(function(link) {
        return { source: link.transmissionLine.from
               , target: link.transmissionLine.to
               };
      });

      var link = svg.select(".links").selectAll(".link")
                    .data(links);

      link.enter()
           .append("line")
           .attr("class", "link")
           .attr("x1", function(d) { return xScale(d.pos.from.x) })
           .attr("y1", function(d) { return yScale(d.pos.from.y) })
           .attr("x2", function(d) { return xScale(d.pos.to.x) })
           .attr("y2", function(d) { return yScale(d.pos.to.y) });

      link.attr("x1", function(d) { return xScale(d.pos.from.x) })
          .attr("y1", function(d) { return yScale(d.pos.from.y) })
          .attr("x2", function(d) { return xScale(d.pos.to.x) })
          .attr("y2", function(d) { return yScale(d.pos.to.y) });

    }

    drawCircles(simModel);
    drawLinks(edges);

  });

});
