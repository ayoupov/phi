var phiNetwork;

var svg = d3.select(".simulation svg")
    .attr("height", window.innerHeight)
    .attr("width", window.innerWidth);

var xZoomScale = d3.scaleLinear()
    .domain([0, 1920])
    .range([0, 100]);

var zoom = d3.zoom()
    .scaleExtent([0.25, 40])
    .translateExtent([[0, 0], [5760, 3240]])
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
    .attr("class", "container hidden");

drawGridlines(svg, GRIDLINE_SIZE);

//attachZoomLine(svg);

var $zoomCont = $(".zoom-container");

function updateZoomPos() {
    var r = (Math.floor($(window).width() / GRIDLINE_SIZE) - 1 ) * GRIDLINE_SIZE;
    var b = (Math.floor($(window).height() / GRIDLINE_SIZE) ) * GRIDLINE_SIZE - $zoomCont.height();
    var scrollTop = $(".simulation").scrollTop() || 0;
    $zoomCont.css({
        'left': r,
        'top': b - scrollTop,
        'width': GRIDLINE_SIZE + 'px'
    });
}

function updateZoom(scale) {
    // update position
    updateZoomPos();
    var step = 10;
    var meters = Math.max(step, Math.round(250 / (step /*step*/) * (1 / scale)) * step);
    var $zoomScaleCont = $(".zoom-scale", $zoomCont);
    $zoomScaleCont.html(meters + " m");
}


function zoomIn() {
    zoomDelta(true);
}

function zoomOut() {
    zoomDelta(false);
}

function zoomDelta(isZoomingIn) {
    var factor = isZoomingIn ? 1.3 : 1 / 1.3;
    zoom.scaleBy(d3.select('svg'), factor);
}

function zoomInit() {
    updateZoomPos();
    $(window).on('resize', updateZoomPos);
    $(".simulation").on('scroll', updateZoomPos);
    $(".zoom-plus").on('click', zoomIn);
    $(".zoom-minus").on('click', zoomOut);
}

var db;
var sessionKey;
var shouldLogChatMessage = false;

function initFirebase() {
//    firebase.initializeApp(firebaseConfig);
//
//    db = firebase.database();
//
//    firebase.auth().signInAnonymously().catch(function(error) {
//      // Handle Errors here.
//      var errorCode = error.code;
//      var errorMessage = error.message;
//
//      console.log(errorCode + ": " + errorMessage);
//    });
//
//    // setup session event to log
//    var newSessionRef = db.ref('sessions').push();
//    sessionKey = newSessionRef.key;
//
//    var session = {
//        userAgent: navigator.userAgent,
//        windowWidth: window.innerWidth,
//        windowHeight: window.innerHeight,
//        ts: Date.now()
//    }
//
//
//    firebase.auth().onAuthStateChanged(function(user) {
//      if (user) {
//        anon_uid = user.uid;
//
//        session['uid'] = anon_uid;
//        newSessionRef.set(session);
//      }
//    });

}
var currentTransform = {k: 0.25, x: 0, y: 0};

function zoomed() {
    var transform = d3.zoomTransform(this);
    currentTransform = transform;
    container.attr("transform", transform);

    container.selectAll(".node")
        .attr("transform", function (d) {
            //custom scale factor so nodes grow slightly larger as you zoom
            var scaleFactor = 0.75 + 0.25 * d3.event.transform.k;
            var x = d.label.pos.x;
            var y = d.label.pos.y;
            return "translate(" + (x - x / scaleFactor) + ", " + (y - y / scaleFactor) + ") "
                + "scale(" + 1 / scaleFactor + ")";
        });
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

// Load SVG Map from file, append to container
// and set container with graph elements

d3.xml("assets/Barje-map-for-sim-big-river-01.svg").get(function (error, documentFragment) {
    if (error) throw error;
    var svgNode = documentFragment.getElementsByTagName("svg")[0];

    container.node().appendChild(svgNode);

    container.select("svg#Layer1")
        .attr("class", "map");

    container.append("g")
        .attr("class", "links");

    container.append("g")
        .attr("class", "newlinks");

    container.append("g")
        .attr("class", "nodes");

    function initTransform() {
        return d3.zoomIdentity
//            .translate(-1140, -760)
//            .scale(0.75);
// 0.302498522304823, x: -205.92389416352853, y: -135.6175056505412
//              .translate(-205, -135)
//              .scale(0.3)

// k: 0.6094308365585795 x: -1590.068485421783 y: -550.3223522249108
              .translate(-1590, -550)
              .scale(0.6)
    }


    svg.attr("x", 0)
       .attr("y", 0)
       .call(zoom)
       .call(zoom.transform,initTransform)
       .on("dblclick.zoom", null);

    var eliza = new ElizaBot();
    var initial = eliza.getInitial();

    $('.chat_wrapper').draggable({
        containment: "parent",
        axis: "x",
        cancel: ".chat_window .message, .input_wrapper"
    });

    zoomInit();

    initFirebase();

    var node = document.getElementById('elm-node');
    var app = Elm.Main.embed(node);

    app.ports.showMap.subscribe(function() {
        d3.selectAll("svg .container").classed("hidden", false);
        d3.selectAll(".zoom-container").classed("hidden-zoom", false);
    });

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

    app.ports.animateHousingConsumption.subscribe(function (model) {
        var t = d3.transition().duration(1500);

        phiNetwork = model;
        var phiNodes = model[0];

        var nodes = svg.select(".nodes").selectAll(".node")
            .data(phiNodes, function (d) {
                return d.id;
            });

        housingIndicator = nodes.select(".simulation .housing .energyIndicator");

        housingIndicator.select(".fillIndicator")
            .attr("d", function (d) {
                return (peerEnergyFill()(d));
            });

        housingIndicator.select(".outlineIndicator")
            .attr("d", function (d) {
                return (peerEnergyOutline()(d));
            });

        housingIndicator.attr("stroke-opacity", "0")
            .attr("fill-opacity", "0")
            .style("opacity", "0")
            .transition(t)
            .style("opacity", "1")
            .attr("stroke-opacity", "1")
            .attr("fill-opacity", "1")
            .attr('transform', function (d) {
                return "translate(" + (setX(d)) + "," + (setY(d)) + ")";
            });

        nodes.select(".simulation .wps .energyIndicator")
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
        app.ports.requestConvertNode.send({id: d.id, isUpgrade: lastBuildMode == "resilient"});
        var addendum = ".housing";
        var currentSet = potentialHousing;
        switch (lastBuildMode) {
            case "housing":
                potentialHousing = potentialHousing.filter(function (n) {
                    return n.id !== d.id
                });
                currentSet = potentialHousing;
                break;
            case "resilient":
                potentialResilient = potentialResilient.filter(function (n) {
                    return n.id !== d.id
                });
                currentSet = potentialResilient;
                addendum = ".resilient";
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
//        killPotentials();
        drawPotentialNodes(nodes);
    };

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

        // instead of housing/generator
        var addendum ;
        switch (lastBuildMode) {
            case "housing": addendum = ".housing"; break;
            case "resilient": addendum = ".resilient"; break;
            case "generators": addendum = ".wps"; break;
            default: addendum = ".housing"
        }
        var selectClass = (lastBuildMode != "resilient") ? ".potential" + addendum : ".housing:not(.potential)";

        nodes.selectAll(selectClass)
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

        var potentials = d3.selectAll(selectClass);
        potentials
            .on("click", clickOnPotential);

        nodes.exit()
            .remove()
    }


    function killPotentials() {
        d3.selectAll(".potential:not(.resilient)")
            .remove();

        var nodes = svg.select(".nodes").selectAll(".node")
                .data(potentialHousing, function (d) {
                    return (d) ? d.id : null;
                });
        nodes.remove();

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
            case "housing" :
                isInBuildingMode = true;
                lastBuildMode = "housing";
                var nodes = svg.select(".nodes").selectAll(".potential.housing")
                    .data(potentialHousing, function (d) {
                        return d.id;
                    });
                killPotentials();
                drawPotentialNodes(nodes);
                cancelHoverAnimation(svg.selectAll('.baseNode'));
                addHoverAnimation(svg.selectAll('.potential.housing .baseNode'));
//                nodes.attr("class", function(d){
//                    return "node housing potential";
//                });
                break;
            case "resilient" :
                isInBuildingMode = true;
                lastBuildMode = "resilient";
                var nodes = svg.select(".nodes").selectAll(".housing:not(.potential)")
                    .data(potentialResilient, function (d) {
                        return d.id;
                    });
                killPotentials();
                drawPotentialNodes(nodes);
                cancelHoverAnimation(svg.selectAll('.baseNode'));
                addHoverAnimation(svg.selectAll('.housing:not(.potential) .baseNode'));
//                nodes.attr("class", function(d){
//                    return "node potential resilient"
//                });
                break;
            case "generators" :
                isInBuildingMode = true;
                lastBuildMode = "generators";
                var nodes = svg.select(".nodes").selectAll(".potential.wps")
                    .data(potentialGenerators, function (d) {
                        return d.id;
                    });
                killPotentials();
                drawPotentialNodes(nodes);
                cancelHoverAnimation(svg.selectAll('.baseNode'));
                addHoverAnimation(svg.selectAll('.potential.wps .baseNode'));
                break;
            case "lines" :
                isInBuildingMode = true;
                lastBuildMode = "lines";
                cancelHoverAnimation(svg.selectAll('.baseNode'));
                addClickAnimation(svg.selectAll('.baseNode'));
                addHoverAnimation(svg.selectAll('.baseNode'));
                initLineInteraction();
                break;
            case "none" :
            default :
                isInBuildingMode = false;
                lastBuildMode = "none";
                cancelHoverAnimation(svg.selectAll(".baseNode"));
                killPotentials();
        }
        //if (lastBuildMode != "lines") {
        //    if (isInBuildingMode) {
        //        addHoverAnimation(svg.selectAll(".baseNode"));
        //    }
        //    else {
        //        cancelHoverAnimation(svg.selectAll(".baseNode"));
        //    }
        //}
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

        nodes.select(".simulation .wps .energyIndicator")
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
                    if (d.label.nodeType == "wps") {
                        classStr += (" wps");
                    }
                    return classStr;
                });

            //add pulsating to peers
            nodeEnter.filter(function (d) {
                    return d.label.nodeType == "housing" && !d.label.isPotential
                })
                .append("circle")
                .attr('cx', setX)
                .attr('cy', setY)
                .attr('r', 20)
                .attr('style', function(d) {
                  return "transform-origin: " + setX(d) + "px " + setY(d) + "px;";
                })
                .style('animation-delay', -20 * Math.random() + "s")
                .attr("class", "housing_pulse");

            //todo: additional draw to resilient?

            //add pulsating to generators
            nodeEnter.filter(function (d) {
                    return (d.label.nodeType == "wps")
                })
                .append("g")
                .attr("class", function (d) {
//                    if (d.label.generatorType == "resilient") {
//                        return "resilient_pulse";
//                    } else if (d.label.generatorType == "wps") {
                        return "wps_pulse";
//                    }
                })
                .attr('style', function(d) {
                  return "transform-origin: " + setX(d) + "px " + setY(d) + "px;";
                })
                .style('animation-delay', -20 * Math.random() + "s")
                .append("path")
                .attr('transform', function (d) {
                    return "translate(" + (setX(d)) + "," + (setY(d)) + ")";
                })
                .attr("d", addBaseNode(200));

            //draw persistent outlines for peers
            nodeEnter.filter(function (d) {
                    return d.label.nodeType == "housing"
                })
                .append("circle")
                .attr('cx', setX)
                .attr('cy', setY)
                .attr('r', peerSize)
                .attr("class", "housingFullCircle");

            //add energy indicator for peers
            var peerEnergyIndicator = nodeEnter.filter(function (d) {
                    return d.label.nodeType == "housing"
                }).append("g")

            peerEnergyIndicator.append("path").attr("class", "fillIndicator")
            peerEnergyIndicator.append("path").attr("class", "outlineIndicator")
            peerEnergyIndicator.style("opacity", "0")
                .attr('transform', function (d) {
                    return "translate(" + (setX(d)) + "," + (setY(d)) + ")";
                })
                .attr("class", "energyIndicator");

            // add energy indicators for generators
            nodeEnter.filter(function (d) {
                    return d.label.nodeType == "wps"
                }).append("path")
                .attr("d", function (d) {
                    return (generatorInitialShadow()(d));
                })
                .style("opacity", "0.7")
                .attr('transform', function (d) {
                    return "translate(" + (setX(d)) + "," + (setY(d)) + ")";
                })
                .attr("class", "energyIndicator");

            //add baseNode
            nodeEnter.append("path")
                .attr("d", addBaseNode(20))
                .attr('transform', function (d) {
                    return "translate(" + (setX(d)) + "," + (setY(d)) + ")";
                })
                .attr("class", "baseNode")
                .transition()
                .ease(d3.easeElastic)
                .duration(2000)
                .attr("d", addBaseNode(100));


            nodes.select('.simulation .housing .energyIndicator')
                .transition(t)
                .style("opacity", "0");

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

        liveNodes = phiNodes.filter(function (node) {
            return (!node.label.isPotential);
        });

        potentialHousing = phiNodes.filter(function (node) {
            return (node.label.isPotential && node.label.nodeType == 'housing');
        });

        potentialResilient = phiNodes.filter(function (node) {
            return (!node.label.isPotential && node.label.nodeType == 'housing');
        });

        potentialGenerators = phiNodes.filter(function (node) {
            return (node.label.isPotential && node.label.nodeType == 'wps');
        });

        // ugly

        drawNodes(liveNodes);
        drawLinks(phiEdges);
        drawNewLinks();

    });


    app.ports.sendToEliza.subscribe(function (inputString) {
        var reply = eliza.transform(inputString);

        app.ports.elizaReply.send(reply);

    });

    app.ports.logMessage.subscribe(function (message) {

//        if (message.sender == "user") {
//            shouldLogChatMessage = true;
//        }
//
//        if (shouldLogChatMessage) {
//            var newMessageRef = db.ref('messages').push();
//
//            message['ts'] = Date.now();
//            message['sessionKey'] = sessionKey || "";
//
//            newMessageRef.set(message);
//        }

    });

    app.ports.changeFloodLevel.subscribe(function (floodLevel) {
        console.log("fl: " + floodLevel);
        if (prevFloodLevel)
            $(".flood").hide(300);
        if (floodLevel)
            $("#floods"+floodLevel).show(300);
        prevFloodLevel = floodLevel;
    });



});

    for (var i = 1; i < 6; i++)
    {
        d3.xml("assets/floods"+i+"-01.svg").get(function (error, documentFragment) {
            if (error) throw error;
            var svgNode = documentFragment.getElementsByTagName("svg")[0];
            $(svgNode).addClass("flood").hide();
            container.node().appendChild(svgNode);
        });
    }
});

var prevFloodLevel = 0;
var potentialHousing, potentialGenerators, potentialResilient, liveNodes;

