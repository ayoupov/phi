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


    app.ports.renderPhiNetwork.subscribe(function (model) {
        var t = d3.transition().duration(1500);


        phiNetwork = model;
        var phiNodes = model[0];
        var phiEdges = model[1];

        var xScale = d3.scaleLinear()
            .domain([30.5234 - 0.01, 30.5234 + 0.01])
            .range([100, window.innerWidth - 100]);

        var yScale = d3.scaleLinear()
            .domain([50.4501 - 0.01, 50.4501 + 0.01])
            .range([100, window.innerHeight - 100]);

        function setX(node) {
            return xScale(node.label.pos.x);
        }

        function setY(node) {
            return yScale(node.label.pos.y);
        }

        function nodeShape(d) {
            var defaultSymbol = d3.symbolCircle;
            switch (d.label.nodeType) {
                case "peer":
                    return d3.symbolCircle;

                case "generator" :
                    switch (d.label.generatorType) {
                        case "solarPanel":
                            return d3.symbolSquare;
                        case "windTurbine":
                            return d3.symbolTriangle;
                        default:
                            return defaultSymbol;
                    }

                default:
                    return defaultSymbol;
            }
        }

        function addBaseNode() {
            return d3.symbol()
                .size(70)
                .type(nodeShape);
        }


        function isGenerator(d) {
            return d.label.nodeType == "generator" && ["solarPanel", "windTurbine"].indexOf(d.label.generatorType > -1);
        }

        function transactionShadow() {
            return d3.symbol()
                .size(function (d) {
                    if (isGenerator(d)) {
                        return 70 + 500 * (d.label.dailyGeneration[0] || 0);
                    } else {
                        return 0;
                    }
                })
                .type(nodeShape);
        }

        function peerSize(d) {
            if (d.label.nodeType == "peer") {
                return 20 + 2 * (d.label.desiredConsumption || 0);
            }
        }

        function peerSizeOuter(d) {
            if (d.label.nodeType == "peer") {
                return 20 + 2 * (d.label.desiredConsumption || 0);
            }
        }

        function peerOutline() {
            return d3.arc()
                .innerRadius(peerSize)
                .outerRadius(peerSizeOuter)
                .startAngle(0)
                .endAngle(function(d){
                    return d.label.actualConsumption && d.label.actualConsumption.length
                        ? Math.min(2 * Math.PI, 2 * Math.PI * d.label.actualConsumption[0]/ d.label.desiredConsumption)
                        : 0
                } );
        }

        function peerFullOutline() {
            return d3.arc()
                .innerRadius(peerSize)
                .outerRadius(peerSize)
                .startAngle(0)
                .endAngle(2 * Math.PI);
        }

        function drawNodes(nodes) {
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
                .attr("d", function(d) {
                    return ((isGenerator(d))? "" : peerFullOutline()(d));
                })
                .attr('transform', function (d) {
                    return "translate(" + (setX(d)) + "," + (setY(d)) + ")";
                })
                .attr("class", "peerFullCircle");

            nodeEnter.append("path")
                .attr("d", function(d) {
                    return ((isGenerator(d))? transactionShadow()(d) : peerOutline()(d));
                })
                .attr('transform', function (d) {
                    return "translate(" + (setX(d)) + "," + (setY(d)) + ")";
                })
                .attr("class", "energyIndicator");


            nodes.select(".energyIndicator")
                .transition(t)
                .attr("d", function(d) {
                    return ((isGenerator(d))? transactionShadow()(d) : peerOutline()(d));
                })
                .attr('transform', function (d) {
                    return "translate(" + (setX(d)) + "," + (setY(d)) + ")";
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
