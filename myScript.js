/* !Date:03.09.2018 Copyright ©2018 JavaScript & React code by Cătălin Anghel-Ursu @Madness2aMaze (https://codepen.io/Madness2aMaze)
- All Rights Reserved!

MIT License

Copyright (c) 2018 Cătălin Anghel-Ursu (https://github.com/Madness2aMaze/D3-Bar-Chart)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE. */

window.onload = () => {
  let url ="https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";
  req = new XMLHttpRequest();
  req.open("GET", url, true);
  req.send();
  req.onload = () => {
    json = JSON.parse(req.responseText);
    const dataset = json.data;
    console.log(json);
    console.log(dataset);
    //document.getElementById('json').innerHTML=JSON.stringify(json);
    const w = 950;
    const h = 600;
    const padding = 70;

    d3
      .select(".container-fluid")
      .append("div")
      .attr("id", "title")
      .append("div")
      .attr("id", "logo")
      .append("h1")
      .attr("id", "dee")
      .text("D");  
    
    d3
      .select("#logo")
      .append("h1")
      .attr("id", "three")
      .text("3");
    
    d3
      .select("#title")
      .append("h3")
      .attr("id", "sub")
      .text("BAR CHART"); 
      

    d3
      .select(".container-fluid")
      .append("div")
      .attr("id", "chart")
      .append("h2")
      .attr("id", "chart-title")
      .text("United States GDP");
    
    d3
      .select(".container-fluid")
      .append("div")
      .attr("id", "nfo");
    
    
    
    const xScale = d3.scaleLinear()
                     .domain([1947, d3.max(dataset, (d) => new Date(d[0]).getFullYear())])
                     .range([padding, w - padding]);
    
    const yScale = d3.scaleLinear()
                     .domain([0, d3.max(dataset, (d) => d[1])])
                     .range([h - padding, padding - 40]);    

    const svg = d3.select("#chart")
                  .append("svg")
                  .attr("width", w)
                  .attr("height", h);

    svg
      .selectAll("rect")
      .data(dataset)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d, i) => i * 3)
      .attr("y", (d, i) => h - d[1]/33)
      //.attr("x", (d) => xScale(d[0]))
      //.attr("y", (d) => yScale(d[1]))
      .attr("width", 2)
      .attr("height", (d, i) => d[1])
      .attr("fill", "#75aaaa")
      .append("title")
      .attr("id", "tooltip")
      .text((d) => d[0] + " $"+ d[1] + " Billion");
    
    svg
      .selectAll("text")
      .data(dataset)
      .enter()
      .append("text")
      .attr("class", "tick");
    
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);
        
    svg
      .append("g")
      .attr("id", "x-axis")
      .attr("transform", "translate(0," + (h - padding) + ")")
      .call(xAxis);
    
    svg
      .append("g")
      .attr("id", "y-axis")
      .attr("transform", "translate(" + padding + ", 0)")
      .call(yAxis);
  };
};
