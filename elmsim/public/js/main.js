var phiNetwork;

var svg = d3.select("body")
            .insert("div", ":first-child")
            .attr("class", "simulation")
            .append("svg");

var svg = d3.select("svg")
            .attr("height", window.innerHeight)
            .attr("width", window.innerWidth);

var xZoomScale = d3.scaleLinear()
    .domain([0,1920])
    .range([0, 100]);

var zoom = d3.zoom()
             //.extent([[0,0],[1920,1080]])
             .scaleExtent([0.75, 40])
             .translateExtent([[0,0],[1920,1080]])
             .on("zoom", zoomed);

var GRIDLINE_SIZE = 100;

//function attachZoomLine(svgElt) {
//    var simHeight = Number(svgElt.attr("height"));
//    var simWidth = Number(svgElt.attr("width"));
//
//    var line = svgElt.append("g")
//        .attr("class", "zoom-line")
//        .attr("transform", "translate(" + (simWidth - 100) + ", " + (simHeight - 100) + ")")
//        .call(zoomLine);
//
//    line.enter().append('path')
//        .attr('class', 'line');
//
//}

function drawGridlines(svgElt, size) {
    var cornerSize = size/20;
    var simHeight = Number(svgElt.attr("height"));
    var simWidth = Number(svgElt.attr("width"));

    var xTickValues = d3.range(0, simWidth*2, size);
    var yTickValues = d3.range(0, simHeight*2, size);

    var xGridScale = d3.scaleLinear()
                       .domain([0, simWidth])
                       .range([0, simWidth]);

    var yGridScale = d3.scaleLinear()
                       .domain([0, simHeight])
                       .range([0, simHeight]);

    var xGridlines = d3.axisTop(xGridScale)
                       .tickFormat("")
                       .tickValues(xTickValues)
                       .tickSize(-simHeight*2)
                       .tickSizeOuter(0);

    var yGridlines = d3.axisLeft(yGridScale)
                       .tickFormat("")
                       .tickValues(yTickValues)
                       .tickSize(-simWidth*2)
                       .tickSizeOuter(0);


    svgElt.append("g")
          .attr("class", "gridlines")
          .call(xGridlines);

    svgElt.append("g")
          .attr("class", "gridlines")
          .call(yGridlines);

    svgElt.append("g")
          .attr("class", "corner_gridlines")
          .call(xGridlines);

    svgElt.append("g")
          .attr("class", "corner_gridlines")
          .call(yGridlines);

    var cornerLength = size/10;
    svgElt.selectAll(".corner_gridlines .tick line")
          .attr("stroke-dasharray", cornerLength + "," + (size-cornerLength))
          .attr("stroke-dashoffset", cornerLength/2);
}


var container = svg.append("g")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", 1920)
    .attr("height", 1080)
    .attr("class", "container");

drawGridlines(svg,GRIDLINE_SIZE);

//attachZoomLine(svg);

// Load SVG Map from file, append to container
// and set container with graph elements
d3.xml("assets/map_v3.svg").get(function (error, documentFragment) {
    if (error) throw error;
    var svgNode = documentFragment.getElementsByTagName("svg")[0];

    container.node().appendChild(svgNode);

    container.select("svg")
        .attr("class", "map");

    container.append("g")
        .attr("class", "links");

    container.append("g")
        .attr("class", "nodes");
});


function updateZoomPos()
{
    var $zoomCont = $(".zoom-container");
    var r = (Math.floor($(window).width() / GRIDLINE_SIZE) - 1 ) * GRIDLINE_SIZE;
    var b = (Math.floor($(window).height() / GRIDLINE_SIZE) ) * GRIDLINE_SIZE - $zoomCont.height();
    $zoomCont.css({
        'left': r,
        'top': b
    });
    console.log(r,b);
}

function updateZoom(scale)
{
    // update position
    var $zoomCont = $(".zoom-container");
    updateZoomPos();
    var step = 10;
    var meters = Math.max(step, Math.round(250 / (step /*step*/) * (1/scale)) * step);
    $zoomCont.html(meters + " m");
}

function zoomInit()
{
    updateZoomPos();
    $(window).on('resize', updateZoomPos);
}


function zoomed() {
    var transform = d3.zoomTransform(this);
    container.attr("transform", transform);
    //container.select('.zoom-line').call(zoomLine);
    updateZoom(transform.k);
}

function endall(transition, callback) {
    if (typeof callback !== "function") throw new Error("Wrong callback in endall");
    if (transition.size() === 0) {
        callback()
    }
    var n = 0;
    transition
        .each(function () {
            ++n;
        })
        .on("end", function () {
            if (!--n) callback.apply(this, arguments);
        });
}

$(function () {
    var node = document.getElementById('elm-node');
    var app = Elm.Main.embed(node);

    d3.select("svg")
      .attr("x", 0)
      .attr("y", 0)
      .call(zoom);

    var eliza = new ElizaBot();
    var initial = eliza.getInitial();

    $('.chat_wrapper').draggable({
        containment: "parent",
        axis: "x",
        cancel: ".chat_window .message, .input_wrapper"
    });

    zoomInit();

    app.ports.animateTrade.subscribe(function (model) {
        var t = d3.transition().duration(1500);

        phiNetwork = model;
        var phiNodes = model[0];

        var nodes = svg.select(".nodes").selectAll(".node")
            .data(phiNodes, function (d) {
                return d.id;
            });

        app.ports.animationFinished.send("tradeAnimated");

    });

    app.ports.animatePeerConsumption.subscribe(function (model) {
        var t = d3.transition().duration(1500);

        phiNetwork = model;
        var phiNodes = model[0];

        var nodes = svg.select(".nodes").selectAll(".node")
            .data(phiNodes, function (d) {
                return d.id;
            });

        nodes.select(".peer .energyIndicator")
            .attr("d", function (d) {
                return (peerOutline()(d));
            })
            .attr("stroke-opacity", "0")
            .attr("fill-opacity", "0")
            .style("opacity", "0")
            .transition(t)
            .style("opacity", "1")
            .attr("stroke-opacity", "1")
            .attr("fill-opacity", "1")
            .attr('transform', function (d) {
                return "translate(" + (setX(d)) + "," + (setY(d)) + ")";
            });

        nodes.select(".generator .energyIndicator")
            .transition(t)
            .attr("d", function (d) {
                //return "M0,0";
                return generatorInitialShadow()(d);
            })
            .attr('transform', function (d) {
                return "translate(" + (setX(d)) + "," + (setY(d)) + ")";
            })
            .call(endall, function () {
                app.ports.animationFinished.send("consumptionAnimated");
            });

    });

    app.ports.toggleBuildMode.subscribe(function (isEnteringBuildMode) {
        var t = d3.transition().duration(1000);

        //phiNetwork = model;
        //var phiPotentialNodes = potentials;
        //
        //var nodes = svg.select(".nodes").selectAll(".potential")
        //    .data(phiPotentialNodes, function (d) {
        //        return d.id;
        //    });

        if (isEnteringBuildMode)
            d3.select(".potential")
                .attr("d", function (d) {
                    return (peerOutline()(d));
                })
                .attr("stroke-opacity", "0")
                .attr("fill-opacity", "0")
                .style("opacity", "0")
                .transition(t)
                .style("opacity", "1")
                .attr("stroke-opacity", "1")
                .attr("fill-opacity", "1")
                .attr('transform', function (d) {
                    return "translate(" + (setX(d)) + "," + (setY(d)) + ")";
                })
                .call(endall, function () {
                    app.ports.animationFinished.send("enterBuildModeAnimated");
                });
        else
            d3.select(".potential")
                .attr("d", function (d) {
                    return (peerOutline()(d));
                })
                .transition(t)
                .style("opacity", "0")
                .attr("stroke-opacity", "0")
                .attr("fill-opacity", "0")
                .attr('transform', function (d) {
                    return "translate(" + (setX(d)) + "," + (setY(d)) + ")";
                })
                .call(endall, function () {
                    app.ports.animationFinished.send("exitBuildModeAnimated");
                });

    });

    app.ports.animateGeneration.subscribe(function (model) {
        var t = d3.transition().duration(1500);
        phiNetwork = model;
        var phiNodes = model[0];

        var nodes = svg.select(".nodes").selectAll(".node")
            .data(phiNodes, function (d) {
                return d.id;
            });

        nodes.select(".generator .energyIndicator")
            .transition(t)
            .attr("d", function (d) {
                return (transactionShadow()(d));
            })
            .attr('transform', function (d) {
                return "translate(" + (setX(d)) + "," + (setY(d)) + ")";
            })
            .call(endall, function () {
                app.ports.animationFinished.send("generatorsAnimated");
            });
    });

    app.ports.renderPhiNetwork.subscribe(function (model) {

        phiNetwork = model;
        var phiNodes = model[0];
        var phiEdges = model[1];

        function drawNodes(nodes) {
            var t = d3.transition().duration(1500);

            var nodes = svg.select(".nodes").selectAll(".node")
                .data(nodes, function (d) {
                    return d.id;
                });

            var nodeEnter = nodes.enter().append("g")
                .attr("class", function (d) {
                    var classStr = "node " + d.label.nodeType;
                    if (d.label.nodeType == "generator") {
                        classStr += (" " + d.label.generatorType);
                    }
                    return classStr;
                });

            nodeEnter.append("path")
                .attr("d", addBaseNode())
                .attr('transform', function (d) {
                    return "translate(" + (setX(d)) + "," + (setY(d)) + ")";
                })
                .attr("class", "baseNode");

            nodeEnter.append("path")
                .attr('transform', function (d) {
                    return "translate(" + (setX(d)) + "," + (setY(d)) + ")";
                })
                .attr("d", function (d) {
                    return (!isGenerator(d) ? peerFullOutline()(d) : generatorInitialShadow()(d));
                })
                .attr("class", "peerFullCircle");

            nodeEnter.append("path")
                .attr("d", function (d) {
                    return (generatorInitialShadow()(d));
                })
                .style("opacity", function (d) {
                    return ((isGenerator(d)) ? "0.7" : "0");
                })
                .attr('transform', function (d) {
                    return "translate(" + (setX(d)) + "," + (setY(d)) + ")";
                })
                .attr("class", "energyIndicator");

            nodes.select('.peer .energyIndicator')
                .transition(t)
                .style("opacity", "0")
                .call(endall, function () {
                    // todo: fix ugly hack
                    var signalSent = false;
                    d3.select('.peer')
                        .each(
                            function (d) {
                                if (!signalSent && d.label && d.label.actualConsumption && d.label.actualConsumption.length > 1) {
                                    signalSent = true;
                                    app.ports.animationFinished.send("layoutRendered");
                                }
                            });
                });


        }

        function drawLinks(links) {
            var dataLinks = links.map(function (link) {
                return {
                    source: link.transmissionLine.from
                    , target: link.transmissionLine.to
                };
            });

            var link = svg.select(".links").selectAll(".link")
                .data(links, function (d) {
                    return d.transmissionLine.label;
                });

            link.enter()
                .append("line")
                .attr("class", "link")
                .attr("x1", function (d) {
                    return xScale(d.pos.from.x)
                })
                .attr("y1", function (d) {
                    return yScale(d.pos.from.y)
                })
                .attr("x2", function (d) {
                    return xScale(d.pos.to.x)
                })
                .attr("y2", function (d) {
                    return yScale(d.pos.to.y)
                });

            link.attr("x1", function (d) {
                    return xScale(d.pos.from.x)
                })
                .attr("y1", function (d) {
                    return yScale(d.pos.from.y)
                })
                .attr("x2", function (d) {
                    return xScale(d.pos.to.x)
                })
                .attr("y2", function (d) {
                    return yScale(d.pos.to.y)
                });

        }

        drawNodes(phiNodes);
        drawLinks(phiEdges);

    });


    app.ports.sendToEliza.subscribe(function (inputString) {
        var reply = eliza.transform(inputString);

        app.ports.elizaReply.send(reply);

    });

});
