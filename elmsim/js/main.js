var phiNetwork;

var svg;

document.addEventListener("DOMContentLoaded", function(event) {
  var app = Elm.Main.fullscreen();

  app.ports.renderPhiNetwork.subscribe(function(model) {

    svg = d3.select("svg");

    phiNetwork = model;
    var phiNodes = model[0];
    var phiEdges = model[1];

    var svgBox = svg.node().getBBox();

    var xScale = d3.scaleLinear()
                         .domain([30.5234 - 0.01, 30.5234 + 0.01])
                         .range([0,window.innerWidth-200]);

    var yScale = d3.scaleLinear()
                         .domain([50.4501 - 0.01, 50.4501 + 0.01])
                         .range([0,window.innerHeight-200]);

    function setX(node) {
      return xScale(node.label.pos.x);
    }

    function setY(node) {
      return yScale(node.label.pos.y);
    }

    function addBaseNode() {
      return d3.symbol()
        .size(500)
        .type(function(d) {
          if (d.label.nodeType == "peer") {
            return d3.symbolCircle;
          } else if (d.label.nodeType == "pvPanel") {
            return d3.symbolSquare;
          } else if (d.label.nodeType == "windTurbine") {
            return d3.symbolTriangle;
          }
        });
    }

    function transactionShadow() {
      return d3.symbol()
        .size(function(d) {
          if (d.label.nodeType == "pvPanel" || d.label.nodeType == "windTurbine") {
            return 500 + 100*d.label.maxGeneration;
          } else {
            return 0;
          }
        })
        .type(function(d) {
          if (d.label.nodeType == "peer") {
            return d3.symbolCircle;
          } else if (d.label.nodeType == "pvPanel") {
            return d3.symbolSquare;
          } else if (d.label.nodeType == "windTurbine") {
            return d3.symbolTriangle;
          }
        });
    }

    function drawNodes(nodes) {
      var nodes = svg.select(".nodes").selectAll(".node")
                       .data(nodes, function(d) { return d.id; });

     var nodeEnter = nodes.enter().append("g")
                          .attr("class", function(d) {
                            return "node " + d.label.nodeType;
                          });

      nodeEnter.append("path")
               .attr("d", addBaseNode())
               .attr('transform',function(d){
                 return "translate("+(setX(d))+","+(setY(d))+")";
               })
               .attr("class", "baseNode");

      nodeEnter.append("path")
               .attr("d", transactionShadow())
               .attr('transform',function(d){
                 return "translate("+(setX(d))+","+(setY(d))+")";
               })
               .attr("class", "energyIndicator");

      //nodes.attr("cx", setX)
      //     .attr("cy", setY);
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

    drawNodes(phiNodes);
    drawLinks(phiEdges);

  });

});
