var phiNetwork;

var svg;

document.addEventListener("DOMContentLoaded", function(event) {
  var app = Elm.Main.fullscreen();

  app.ports.renderPhiNetwork.subscribe(function(model) {
    var t = d3.transition().duration(1500);

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

    function nodeShape(d) {
      switch(d.label.nodeType) {
        case "peer":
          return d3.symbolCircle;
        case "pvPanel":
          return d3.symbolSquare;
        case "windTurbine":
          return d3.symbolTriangle;
        default:
          return d3.symbolCircle;
      }
    }

    function addBaseNode() {
      return d3.symbol()
        .size(500)
        .type(nodeShape);
    }

    function transactionShadow() {
      return d3.symbol()
        .size(function(d) {
          if (["pvPanel", "windTurbine"].includes(d.label.nodeType)) {
            return 500 + 500*(d.label.dailyGeneration[0] || 0);
          } else {
            return 0;
          }
        })
        .type(nodeShape);
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

      nodes.select(".energyIndicator")
           .transition(t)
           .attr("d", transactionShadow())
           .attr('transform',function(d){
             return "translate("+(setX(d))+","+(setY(d))+")";
           })
    }

    function drawLinks(links) {
      var dataLinks = links.map(function(link) {
        return { source: link.transmissionLine.from
               , target: link.transmissionLine.to
               };
      });

      var link = svg.select(".links").selectAll(".link")
                    .data(links, function(d) { return d.transmissionLine.label; });

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
