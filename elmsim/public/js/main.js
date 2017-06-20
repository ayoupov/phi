var phiNetwork;

var svg = d3.select("body")
    .insert("div", ":first-child")
    .attr("class", "simulation")
    .append("svg");

var svg = d3.select("svg")
    .attr("height", window.innerHeight)
    .attr("width", window.innerWidth);

var simHeight = Number(svg.attr("height"));
var simWidth = Number(svg.attr("width"));


var zoom = d3.zoom()
    .scaleExtent([1, 40])
    .on("zoom", zoomed);

// All the axis goodies!
var xGridScale = d3.scaleLinear()
    .domain([0, 300])
    .range([0, simWidth - 20]);

var yGridScale = d3.scaleLinear()
    .domain([0, 800])
    .range([0, simHeight - 20]);

var xGridlines = d3.axisTop()
    .tickFormat("")
    .tickSize(-simHeight)
    .scale(xGridScale);

var yGridlines = d3.axisLeft()
    .tickFormat("")
    .tickSize(-simWidth)
    .scale(yGridScale);

svg.append("g")
    .attr("class", "gridlines")
    .call(xGridlines);

svg.append("g")
    .attr("class", "gridlines")
    .call(yGridlines);


var container = svg.append("g")
    .attr("class", "container");


// Load SVG Map from file, append to container
// and set container with graph elements
d3.xml("assets/map.svg").get(function (error, documentFragment) {
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


function zoomed() {
    var transform = d3.zoomTransform(this);
    container.attr("transform", transform);
}

function endall(transition, callback) {
    if (typeof callback !== "function") throw new Error("Wrong callback in endall");
    if (transition.size() === 0) { callback() }
    var n = 0;
    transition
        .each(function() { ++n; })
        .on("end", function() { if (!--n) callback.apply(this, arguments); });
}

$(function () {
    var node = document.getElementById('elm-node');
    var app = Elm.Main.embed(node);

    d3.select("svg").call(zoom);

    var eliza = new ElizaBot();
    var initial = eliza.getInitial();

    $('.chat_wrapper').draggable({
        containment: "parent",
        axis: "x",
        cancel: ".chat_window .message, .input_wrapper"
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
            .attr("d", function(d) {
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
            .attr("d", function(d) {
                //return "M0,0";
                return generatorInitialShadow()(d);
            })
            .attr('transform', function (d) {
                return "translate(" + (setX(d)) + "," + (setY(d)) + ")";
            })
            .call(endall, function()
            {
                app.ports.animationFinished.send("consumptionAnimated");
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
            .attr("d", function(d) {
                return (transactionShadow()(d));
            })
            .attr('transform', function (d) {
                return "translate(" + (setX(d)) + "," + (setY(d)) + ")";
            })
            .call(endall, function()
            {
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
                    return "node " + d.label.nodeType;
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
                .attr("d", function(d) {
                    return (!isGenerator(d) ? peerFullOutline()(d) : generatorInitialShadow()(d));
                })
                .attr("class", "peerFullCircle");

            nodeEnter.append("path")
                .attr("d", function(d) {
                    return (generatorInitialShadow()(d));
                })
                .style("opacity", function(d) {
                    return ((isGenerator(d))? "0.7" : "0");
                })
                .attr('transform', function (d) {
                    return "translate(" + (setX(d)) + "," + (setY(d)) + ")";
                })
                .attr("class", "energyIndicator");

            nodes.select('.peer .energyIndicator')
                .transition(t)
                .style("opacity", "0")
                .call(endall, function()
                {
                    app.ports.animationFinished.send("layoutRendered");
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
