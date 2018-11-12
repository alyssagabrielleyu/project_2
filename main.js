//var groups = ["NYUAD's Room of Requirement", "NYU Abu Dhabi Class of 2019", "NYUAD Student Life", "NYUAD Opportunities", "Hungry @ NYUAD", "NYUAD Forum", "NYUAD Free & For Sale", "NYUAD Juniors in AD Spring 2018", "A for Asian Mafia~", "WORD COUNT/3ADDAAD ALKALIMAAT (Charlotte's Capstone)", "NYU Palladium Residence Hall (2017-2018)", "NYUAD Film and New Media Series", "NYUAD Summer 2017", "SIS Spring 2016"]

var groups = [ "Cyber#","Cinemates Club", "NYU Abu Dhabi Social Sciences", "NYUSH -- All Classes and Study Away", "NYUAD Astronomy Club",  "View Photography at NYUAD", "GRE @ NYUAD", "hackAD","Product Managers",  "NYUAD Transport Sharing", "A5C-6th Floor <3", "NYUAD Juniors in AD Spring 2018", "NYU Palladium Residence Hall (2017-2018)", "MCG Boot Camp- Find a Casing Partner", "Fall 2017 Study Away in New York", "Free Food Events @ NYU", "NYU International Students", "NYUAD in NYC | Fall 2017", "NYUAD Summer 2017", "Team Pinoy at NYUAD", "Paris Study Abroad Spring 2017", "Florence J-Term 2017 NYUAD", "NYU Paris Spring 2017", "Intermediate Film Fall 2016", "Beyond Borders Consulting @ NYUAD", "NYUAD Free & For Sale", "WORD COUNT/3ADDAAD ALKALIMAAT (Charlotte's Capstone)", "The Coffee Collective", "NYUAD Opportunities", "The Film Collective", "NYUAD Pre-Health Advisory Board (PHAB)", "NYUAD International Affairs Society", "SIS Spring 2016", "ASEAN at NYUAD", "British School Manila Alumni Association", "Georgia Jan 22-26 2016", "Tower of Babel @ NYUAD", "Hungry @ NYUAD", "PHTT 2015 Participants", "NYUAD UN Climate Task Force 2015", "NYUAD Student Life", "NYUAD Film and New Media Series", "NYUAD Forum", "Foundations of Science - NYUAD Class of 2019", "CAMP Alum", "NYUAD's Room of Requirement",  "BSM, it's time to ROAR!", "NYU Abu Dhabi Class of 2019",  "NYUAD Candidate Weekend (Dec 4-7, 2014)", "Pol Sc 11", "Egg Sheeran Parent Board", "Premed Exhibit 2014", "How To Draw A Politician (Comm 3)", "Visayas Prefects", "SAVE THE DATE! 18th Birthday", "UP Diliman Batch 2014 (Official)", "Mystery Food", "18 Shots", "NYUAD Class of 2019 Applicants", "Prankday 2014", "NYUAD Candidate Weekend (Mar 13-16, 2014)", "b o r a c a y", "Business Table", "Ladespa 2013", "The Barcelona Babes + Benny", "PROM 2013", "Kythe Foundation", "BSM Unplugged 2013", "One Million Lights BSM", "CamTrad Psycho's <3", "Magazine Editors", "flow YOGA", "SAVE THE DATE! 16th Birthday Party", "Pot luck day!",  "Perks of being a Wallpaper?", "12-13 IT", "BSM Peer Mentors", "PROM COMMITTEE", "BSM PREFECTS", "A for Asian Mafia~", "Class of 2014", "Cambridge Tradition 2012", "BSM Student Council", "UNESCO Education", "MOCK Celebratory Lunch", "11VB", "BSM Green Team", "Business for Open Evening", "BLCU Summer 2011", "Degree of Separation", "Guyu Fan Club", "Government & Religion", "Pinoys @ NYU", "Centennial PolSci Majors", "CAMP Mentees 2015", "Prom 2014", "BSM Student Leadership '13-'14", "BSM Green Team"]

var width = 950,
      height = 1000,
      start = 0,
      end = 3.25,
      numSpirals = 3
      margin = {top:50,bottom:50,left:50,right:50};

    var theta = function(r) {
      return numSpirals * Math.PI * r;
    };

    // used to assign nodes color by group
    var color = d3.scaleOrdinal(d3.schemeCategory20);

    var r = d3.min([width, height]) / 2 - 40;

    var radius = d3.scaleLinear()
      .domain([start, end])
      .range([40, r]);

    var svg = d3.select("#chart").append("svg")
      .attr("width", width + margin.right + margin.left)
      .attr("height", height + margin.left + margin.right)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    


    var points = d3.range(start, end + 0.001, (end - start) / 1000);

    var spiral = d3.radialLine()
      .curve(d3.curveCardinal)
      .angle(theta)
      .radius(radius);

    var path = svg.append("path")
      .datum(points)
      .attr("id", "spiral")
      .attr("d", spiral)
      .style("fill", "none")
      .style("stroke", "none");

    var spiralLength = path.node().getTotalLength(),
        N = 380,
        barWidth = (spiralLength / N) - 11;


    var someData = [];   
    for (var i=0; i < my_data.length; i++){
        var currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + i);
        var node = my_data[i];
        if (node.data[0].comment){
            if (node.data[0].comment){
                someData.push({
                  date: new Date(node.timestamp * 1000),
                  comment: node.data[0].comment.comment,
                  value: 0.2,
                  group: node.data[0].comment.group,
              });
            }
          }
        }

    var timeScale = d3.scaleTime()
      .domain(d3.extent(someData, function(d){
        return d.date;
      }))
      .range([0, spiralLength]);
    
    // yScale for the bar height
    var yScale = d3.scaleLinear()
      .domain([0, d3.max(someData, function(d){
        return d.value;
      })])
      .range([0, (r / numSpirals) - 95]);

    svg.selectAll("rect")
      .data(someData)
      .enter()
      .append("rect")
      .attr("x", function(d,i){
        
        var linePer = timeScale(d.date),
            posOnLine = path.node().getPointAtLength(linePer),
            angleOnLine = path.node().getPointAtLength(linePer - barWidth);
      
        d.linePer = linePer; // % distance are on the spiral
        d.x = posOnLine.x; // x postion on the spiral
        d.y = posOnLine.y; // y position on the spiral
        
        d.a = (Math.atan2(angleOnLine.y, angleOnLine.x) * 180 / Math.PI) - 90; //angle at the spiral position

        return d.x;
      })
      .attr("y", function(d){
        return d.y;
      })
      .attr("width", function(d){
        return barWidth;
      })
      .attr("height", function(d){
        return yScale(d.value);
      })
      .style("fill", function(d){return color(groups.indexOf(d.group));})
      .style("stroke", "none")
      .attr("transform", function(d){
        return "rotate(" + d.a + "," + d.x  + "," + d.y + ")"; // rotate the bar
      });
    
    // add date labels
    var tF = d3.timeFormat("%b %Y"),
        firstInMonth = {};

    svg.selectAll("text")
      .data(someData)
      .enter()
      .append("text")
      .attr("dy", 10)
      .style("text-anchor", "start")
      .style("font", "10px arial")
      .append("textPath")
      // only add for the first of each month
      .filter(function(d){
        var sd = tF(d.date);
        if (!firstInMonth[sd]){
          firstInMonth[sd] = 1;
          return true;
        }
        return false;
      })
      .text(function(d){
        return tF(d.date);
      })
      // place text along spiral
      .attr("xlink:href", "#spiral")
      .style("fill", "grey")
      .attr("startOffset", function(d){
        return ((d.linePer / spiralLength) * 100) + "%";
      })


    var tooltip = d3.select("#chart")
    .append('div')
    .attr('class', 'tooltip');

    tooltip.append('div')
    .attr('class', 'date');
    tooltip.append('div')
    .attr('class', 'group');
    tooltip.append('div')
    .attr('class', 'value');


    svg.selectAll("rect")
    .on('mouseover', function(d) {

        tooltip.select('.date').html("Date: <b>" + d.date.toDateString() + "</b>");
        tooltip.select('.group').html("Group: <b>" + d.group+ "<b>");
        tooltip.select('.value').html("Comment: <b>" + d.comment + "<b>");


        d3.select(this)
        .style("fill","EEC81E")
        .style("stroke","EE931E")
        .style("stroke-width","2px");

        tooltip.style('display', 'block');
        tooltip.style('opacity',2);

    })
    .on('mousemove', function(d) {
        tooltip.style('top', (d3.event.layerY + 30) + 'px')
        .style('left', (d3.event.layerX - 25) + 'px');
    })
    .on('mouseout', function(d) {
        d3.selectAll("rect")
        .style("fill", function(d){return color(groups.indexOf(d.group));})
        .style("stroke", "none")

        tooltip.style('display', 'none');
        tooltip.style('opacity',0);
    });
