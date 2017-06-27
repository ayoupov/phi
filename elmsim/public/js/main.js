var phiNetwork;

var svg = d3.select(".simulation")
    .append("svg");

var svg = d3.select("svg")
    .attr("height", window.innerHeight)
    .attr("width", window.innerWidth);

var xZoomScale = d3.scaleLinear()
    .domain([0, 1920])
    .range([0, 100]);

var zoom = d3.zoom()
    //.extent([[0,0],[1920,1080]])
    .scaleExtent([1, 40])
    .translateExtent([[0, 0], [1920, 1080]])
    .on("zoom", zoomed);

var GRIDLINE_SIZE = 95;

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
    var cornerSize = size / 20;
    var simHeight = Number(svgElt.attr("height"));
    var simWidth = Number(svgElt.attr("width"));

    var xTickValues = d3.range(0, simWidth * 2, size);
    var yTickValues = d3.range(0, simHeight * 2, size);

    var xGridScale = d3.scaleLinear()
        .domain([0, simWidth])
        .range([0, simWidth]);

    var yGridScale = d3.scaleLinear()
        .domain([0, simHeight])
        .range([0, simHeight]);

    var xGridlines = d3.axisTop(xGridScale)
        .tickFormat("")
        .tickValues(xTickValues)
        .tickSize(-simHeight * 2)
        .tickSizeOuter(0);

    var yGridlines = d3.axisLeft(yGridScale)
        .tickFormat("")
        .tickValues(yTickValues)
        .tickSize(-simWidth * 2)
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

    var cornerLength = size / 10;
    svgElt.selectAll(".corner_gridlines .tick line")
        .attr("stroke-dasharray", cornerLength + "," + (size - cornerLength))
        .attr("stroke-dashoffset", cornerLength / 2);
}


var container = svg.append("g")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", 1920)
    .attr("height", 1080)
    .attr("class", "container");

drawGridlines(svg, GRIDLINE_SIZE);

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
        .attr("class", "newlinks");

    container.append("g")
        .attr("class", "nodes");
});


function updateZoomPos() {
    var $zoomCont = $(".zoom-container");
    var r = (Math.floor($(window).width() / GRIDLINE_SIZE) - 1 ) * GRIDLINE_SIZE;
    var b = (Math.floor($(window).height() / GRIDLINE_SIZE) - 1 ) * GRIDLINE_SIZE - $zoomCont.height();
    $zoomCont.css({
        'left': r,
        'top': b,
        'width': GRIDLINE_SIZE + 'px'
    });
}

function updateZoom(scale) {
    // update position
    var $zoomCont = $(".zoom-container");
    updateZoomPos();
    var step = 10;
    var meters = Math.max(step, Math.round(250 / (step /*step*/) * (1 / scale)) * step);
    $zoomCont.html(meters + " m");
}

function zoomInit() {
    updateZoomPos();
    $(window).on('resize', updateZoomPos);
}

var currentTransform = {k: 1.0, x: 0, y: 0};

function zoomed() {
    var transform = d3.zoomTransform(this);
    currentTransform = transform;
    container.attr("transform", transform);
    //var $simulation = $(".simulation");
    //var scrollTop = $simulation.scrollTop() || 0;
    //var scrollLeft = $simulation.scrollLeft() || 0;
    //var q = (1.0 / currentTransform.k);
    //var trXk = currentTransform.x * q + scrollLeft;
    //var trYk = currentTransform.y * q + scrollTop;
    //var diffX = trXk - currentTransform.x;
    //var diffY = trYk - currentTransform.y;
    //console.log(diffX, diffY);
    //container
    //    .selectAll(".node")
    //    .attr("transform", function (d) {
    //        var x = d.label.pos.x;
    //        var y = d.label.pos.y;
            //console.log(x,y,this);
    //});
        //container
        //    .selectAll(".node")
        //.attr("transform", function (d) {
        //    var x = d.label.pos.x;
        //    var y = d.label.pos.y;
        //    var x1 = x * q - trXk;
        //    var y1 = y * q - trYk;
        //    console.log(x, y, trXk, trYk, x1, y1);
        //    return "translate(" + x1 + "," + y1 + ")" + " scale(" + q + ")";
        //});
    //    .attr("transform", function (d) {
    //        //var x = d.label.pos.x;
    //        //var y = d.label.pos.y;
    //        //var nodeTransform = currentTransform.translate(x, y);
    //        //var xTrans = nodeTransform.x;
    //        //var yTrans = nodeTransform.y;
    //        var kscale = 1/ nodeTransform.k;
    //        //console.log(q, x, y, trXk, trYk, nodeTransform);
    //        ////return "translate(" + (x + newX) + "," + (y + newY) + ")" + " scale(" + 1/d3.event.transform.k + ")";
    //        //return "translate(" + ((xTrans * kscale + trXk) * q) + "," + ((yTrans * kscale + trYk) * q) + ")" + " scale(" + kscale + ")";
    //        return " scale(" + kscale + ")";
    //    });

    //container.selectAll(".node")
    //        .attr("transform", function(d) {
    //          return " scale(" + 1/d3.event.transform.k + ")";
    //        });
    //container.select('.zoom-line').call(zoomLine);
    updateZoom(currentTransform.k);
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

    var node = document.getElementById('elm-node');
    var app = Elm.Main.embed(node);

    app.ports.animateTrade.subscribe(function (model) {
        //d3.select(".simulationBackground").classed("dayCycle", true);
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

        nodes.select(".simulation .peer .energyIndicator")
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

        nodes.select(".simulation .generator .energyIndicator")
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

    var clickOnPotential = function (d) {
        app.ports.requestConvertNode.send(d.id);
        var addendum = ".peer";
        var currentSet = potentialPeers;
        switch (lastBuildMode) {
            case "peers":
                potentialPeers = potentialPeers.filter(function (n) {
                    return n.id !== d.id
                });
                currentSet = potentialPeers;
                break;
            case "generators" :
                potentialGenerators = potentialGenerators.filter(function (n) {
                    return n.id !== d.id
                });
                currentSet = potentialGenerators;
                addendum = ".generator";
        }
        //killPotentials();
        var nodes = svg.select(".nodes").selectAll(".potential" + addendum)
            .data(currentSet, function (d) {
                return d.id;
            });
        //killPotentials();
        drawPotentialNodes(nodes);
    };

    var potentialPeers, potentialGenerators;

    function drawPotentialNodes(nodes) {

        var t = d3.transition().duration(1000);

        var nodeEnter = nodes.enter().append("g")
            .attr("class", function (d) {
                var classStr = "node potential " + d.label.nodeType;
                return classStr;
            });

        var baseNode = nodeEnter.append("path")
            .attr("d", addBaseNode(100))
            .attr('transform', function (d) {
                return "translate(" + (setX(d)) + "," + (setY(d)) + ")";
            })
            .attr("class", "baseNode");

        var addendum = lastBuildMode == "peers" ? ".peer" : ".generator";

        nodes.selectAll(".potential" + addendum)
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

        var potentials = d3.selectAll(".potential" + addendum);
        potentials
            .on("click", clickOnPotential);

        nodes.exit()
            .remove()
    }


    function killPotentials() {
        d3.selectAll(".potential")
            .remove();

        app.ports.animationFinished.send("exitBuildModeAnimated");
    }

    var $temporalLink;

    var emptyLinkData = {
        pos: {
            x: 0,
            y: 0
        }
    };

    function initNewLink($link, d) {
        $link
            .attr("x1", xScale(d.pos.x))
            .attr("y1", yScale(d.pos.y))
            .attr("x2", xScale(d.pos.x))
            .attr("y2", yScale(d.pos.y));
    }

    function cancelDrawing() {
        $(window).off('mousemove.newlink');
        $('.simulation').off('click.newlink');
        $temporalLink = d3.select('.newlink');
        initNewLink($temporalLink, emptyLinkData);
    }

    function initLineInteraction() {
        killPotentials();
        d3.selectAll('.node:not(.potential)')
            .on('click', function (node) {
                if (isInBuildingMode) {
                    var dNode = d3.select(this);
                    var thisNodeSelected = dNode.classed("selected");
                    if (thisNodeSelected)
                    // two cases:
                    // 1. it is already selected, cancel the drawing
                    {
                        dNode.classed('selected', false);
                        cancelDrawing();
                    }
                    else
                    // 2. it has no selection :
                    {
                        var otherSelectedNode = d3.select('.selected');
                        var areThereAnyOthers = !otherSelectedNode.empty();
                        // 2.1. if there is one selected, fix the line
                        if (areThereAnyOthers) {
                            otherSelectedNode.classed('selected', false);
                            cancelDrawing();
                            app.ports.requestNewLine.send([otherSelectedNode.data()[0].id, node.id]);
                        } else
                        // 2.2. if there is none, fix the starting node
                        {
                            dNode.classed('selected', true);
                            $temporalLink = d3.select('.newlink');
                            var d = dNode.data()[0].label;
                            initNewLink($temporalLink, d);
                            $(window).on('mousemove.newlink', function (e) {
                                var $simulation = $(".simulation");
                                var scrollTop = $simulation.scrollTop() || 0;
                                var scrollLeft = $simulation.scrollLeft() || 0;
                                var q = (1.0 / currentTransform.k);
                                var trXk = currentTransform.x * q;
                                var trYk = currentTransform.y * q;
                                var newX = e.clientX * q + scrollLeft - trXk;
                                var newY = e.clientY * q + scrollTop - trYk;
                                $temporalLink
                                    .attr("x2", newX)
                                    .attr("y2", newY)
                            });
                            $('.simulation').on('click.newlink', function (e) {
                                var $target = $(e.target), $parent = $target.parent();
                                var ok = $target.is(".node") || $parent.is(".node");
                                if (!ok) {
                                    dNode.classed('selected', false);
                                    cancelDrawing();
                                }
                            });
                        }
                    }
                }
            });
    }

    function killLineInteraction() {
        d3.selectAll('.node:not(.potential)').on('click', null);
    }

    var isInBuildingMode = false, lastBuildMode = "none";

    var changeBuildModeFunction = function (buildModeType) {

        switch (buildModeType) {
            case "peers" :
                isInBuildingMode = true;
                lastBuildMode = "peers";
                var nodes = svg.select(".nodes").selectAll(".potential.peer")
                    .data(potentialPeers, function (d) {
                        return d.id;
                    });
                killPotentials();
                drawPotentialNodes(nodes);
                break;
            case "generators" :
                isInBuildingMode = true;
                lastBuildMode = "generators";
                var nodes = svg.select(".nodes").selectAll(".potential.generator")
                    .data(potentialGenerators, function (d) {
                        return d.id;
                    });
                killPotentials();
                drawPotentialNodes(nodes);
                break;
            case "lines" :
                isInBuildingMode = true;
                lastBuildMode = "lines";
                initLineInteraction();
                break;
            case "none" :
            default :
                isInBuildingMode = false;
                lastBuildMode = "none";
                cancelHoverAnimation(svg.selectAll(".baseNode"));
                killPotentials();
        }
        if (lastBuildMode != "lines") {
            if (isInBuildingMode) {
                addHoverAnimation(svg.selectAll(".baseNode"));
            }
            else {
                cancelHoverAnimation(svg.selectAll(".baseNode"));
            }
        }
    };

    app.ports.changeBuildMode.subscribe(changeBuildModeFunction);

    app.ports.animateGeneration.subscribe(function (model) {
        var t = d3.transition().duration(1500);
        phiNetwork = model;
        var phiNodes = model[0];

        var nodes = svg.select(".nodes").selectAll(".node")
            .data(phiNodes, function (d) {
                return d.id;
            });

        nodes.select(".simulation .generator .energyIndicator")
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

            //add pulsating to peers
            nodeEnter.filter(function (d) {
                    return d.label.nodeType == "peer"
                })
                .append("circle")
                .attr('cx', setX)
                .attr('cy', setY)
                .attr('r', 10)
                .style('animation-delay', -20 * Math.random() + "s")
                .attr("class", "peer_pulse");

            //add pulsating to generators
            nodeEnter.filter(function (d) {
                    return (d.label.nodeType == "generator")
                })
                .append("g")
                .attr("class", function (d) {
                    if (d.label.generatorType == "windTurbine") {
                        return "wt_pulse";
                    } else if (d.label.generatorType == "solarPanel") {
                        return "sp_pulse";
                    }
                })
                .style('animation-delay', -20 * Math.random() + "s")
                .append("path")
                .attr('transform', function (d) {
                    return "translate(" + (setX(d)) + "," + (setY(d)) + ")";
                })
                .attr("d", addBaseNode(200));

            //draw dotted outlines for peers
            nodeEnter.filter(function (d) {
                    return d.label.nodeType == "peer"
                })
                .append("circle")
                .attr('cx', setX)
                .attr('cy', setY)
                .attr('r', peerSize)
                .attr("class", "peerFullCircle");


            //add baseNode
            nodeEnter.append("path")
                .attr("d", addBaseNode(250))
                .attr('transform', function (d) {
                    return "translate(" + (setX(d)) + "," + (setY(d)) + ")";
                })
                .attr("class", "baseNode")
                .transition()
                .ease(d3.easeElastic)
                .duration(2000)
                .attr("d", addBaseNode(150));

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

            nodes.select('.simulation .peer .energyIndicator')
                .transition(t)
                .style("opacity", "0");
            //.call(endall, function () {
            //});
            if (isInBuildingMode)
                changeBuildModeFunction(lastBuildMode);

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


            link.exit()
                .remove();

        }

        function drawNewLinks() {
            var newlink = d3.select(".newlinks").selectAll('.newlink').data([emptyLinkData]);

            newlink.enter().append("line")
                .attr("class", "newlink link");
            newlink.exit().remove();

        }

        var liveNodes = phiNodes.filter(function (node) {
            return (!node.label.isPotential);
        });

        potentialPeers = phiNodes.filter(function (node) {
            return (node.label.isPotential && node.label.nodeType != 'generator');
        });

        potentialGenerators = phiNodes.filter(function (node) {
            return (node.label.isPotential && node.label.nodeType == 'generator');
        });

        drawNodes(liveNodes);
        drawLinks(phiEdges);
        drawNewLinks();

    });


    app.ports.sendToEliza.subscribe(function (inputString) {
        var reply = eliza.transform(inputString);

        app.ports.elizaReply.send(reply);

    });

});
