// Define the data for the nodes and links
data = {
  nodes: [
    { id: 1, label: 'John Smith', x: 100, y: 100, fixed: true },
    { id: 2, label: 'Hiking', x: 400, y: 100, fixed: true },
    { id: 3, label: 'Photography', x: 550, y: 200, fixed: true },
    { id: 4, label: 'Work', x: 250, y: 300, fixed: true },
    { id: 5, label: 'Family', x: 550, y: 400, fixed: true },
    { id: 6, label: 'Dinner party on March 15th', x: 250, y: 200, fixed: true },
    ],
  links: [
  { source: 1, target: 2 },
  { source: 1, target: 3 },
  { source: 1, target: 4 },
  { source: 1, target: 5 },
  { source: 2, target: 6 },
  { source: 3, target: 6 },
  { source: 4, target: 6 },
  { source: 5, target: 6 },
  ],
  };
  
  const svg = d3.select('svg');
  const width = svg.node().getBoundingClientRect().width;
  const height = svg.node().getBoundingClientRect().height;
  
  const simulation = d3.forceSimulation(data.nodes)
  .force('link', d3.forceLink(data.links).id(d => d.id))
  .force('center', d3.forceCenter(width / 2, height / 2))
  .force('collide', d3.forceCollide().radius(80))
  .on('tick', ticked);
  
  const link = svg.selectAll('.link')
  .data(data.links)
  .join('line')
  .classed('link', true);
  
  const node = svg.selectAll('.node')
  .data(data.nodes)
  .join('g')
  .classed('node', true)
  .attr('transform', d => `translate(${d.x},${d.y})`)
  .call(d3.drag()
  .on('start', dragStarted)
  .on('drag', dragged)
  .on('end', dragEnded)
  );
  
  node.append('rect');
  
  node.append('text')
  .classed('title', true)
  .attr('x', 90)
  .attr('y', 25)
  .text(d => d.label);
  
  node.append('text')
  .classed('subtitle1', true)
  .attr('x', 10)
  .attr('y', 50)
  .text('Subtitle 1:');
  
  node.append('text')
  .classed('subtitle2', true)
  .attr('x', 90)
  .attr('y', 50)
  .text('Subtitle 2');
  
  let activeNode = null;
  
  function dragStarted(d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d3.select(this).classed('fixed', d.fixed = true); // set fixed to true
    activeNode = d;
  }
  
  function dragged(d) {
  if (d === activeNode) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
  }
  }
  
  function dragEnded(d) {
    if (!d3.event.active) simulation.alphaTarget(0);
    if (d === activeNode) {
      d3.select(this).classed('fixed', d.fixed = false); // set fixed back to false
      d.fx = null;
      d.fy = null;
      activeNode = null;
    }
  }
  
  function onClick(d) {
  if (d3.event.defaultPrevented) return;
  if (d3.event.shiftKey) {
  d.selected = !d.selected;
  d3.select(this).classed('selected', d.selected);
  } else {
  svg.selectAll('.node, .link').classed('highlight', false);
  svg.selectAll('.node').classed('selected', false);
  svg.selectAll('.link').classed('selected', false);
  d3.select(this).classed('selected', true);
  links.forEach(function(l) {
  if (l.source === d) {
  l.target.highlighted = true;
  d3.select('#node-' + l.target.id).classed('highlight', true);
  d3.select('#link-' + l.source.id + '-' + l.target.id).classed('highlight', true);
  } else if (l.target === d) {
  l.source.highlighted = true;
  d3.select('#node-' + l.source.id).classed('highlight', true);
  d3.select('#link-' + l.source.id + '-' + l.target.id).classed('highlight', true);
  }
  });
  }
  }
  function ticked() {
  link.attr('x1', d => d.source.x)
  .attr('y1', d => d.source.y)
  .attr('x2', d => d.target.x)
  .attr('y2', d => d.target.y);
  
  node.attr('transform', d => `translate(${d.x},${d.y})`);
  }
  
  // Start the simulation
  simulation.on('tick', ticked);
  
  // Add ids to nodes and links for easy selection
  node.attr('id', d => 'node-' + d.id);
  link.attr('id', d => 'link-' + d.source.id + '-' + d.target.id);
  
  Nimble.grab("1").addEventListener("click", function(){
  // Define a new set of nodes and links
  const newNodes = [
  { id: 1, label: 'John Smsith', x: 100, y: 100, fixed: true },
  { id: 2, label: 'Running', x: 400, y: 100, fixed: true },
  { id: 3, label: 'Painting', x: 550, y: 200, fixed: true },
  { id: 4, label: 'Travel', x: 250, y: 300, fixed: true },
  { id: 5, label: 'Friends', x: 550, y: 400, fixed: true },
  { id: 6, label: 'Birthday party on March 15th', x: 250, y: 200, fixed: true },
  ];
  
  const newLinks = [
  { source: 1, target: 2 },
  { source: 1, target: 3 },
  { source: 1, target: 4 },
  { source: 1, target: 5 },
  { source: 2, target: 6 },
  { source: 3, target: 6 },
  { source: 4, target: 6 },
  { source: 5, target: 6 },
  ];
  
  data.nodes = newNodes;
  data.links = newLinks;
  
  // Update the simulation with the new nodes and links
  simulation.nodes(data.nodes);
  simulation.force('link').links(data.links);
  
  // Update the link elements with the new data
  link.data(data.links)
  .attr('x1', d => d.source.x)
  .attr('y1', d => d.source.y)
  .attr('x2', d => d.target.x)
  .attr('y2', d => d.target.y);
  
  // Update the node elements with the new data
  node.data(data.nodes)
  .attr('transform', d => `translate(${d.x},${d.y})`)
  .select('.title')
  .text(d => d.label);
  });
  
  Nimble.grab("0").addEventListener("click", function(){
  // Define a new set of nodes and links
  const node1 = [
  { id: 1, label: 'John Smith', x: 100, y: 100, fixed: true },
  { id: 2, label: 'Hiking', x: 400, y: 100, fixed: true },
  { id: 3, label: 'Photography', x: 550, y: 200, fixed: true },
  { id: 5, label: 'Family', x: 550, y: 400, fixed: true },
  { id: 6, label: 'Dinner party on March 15th', x: 250, y: 200, fixed: true },
  ];
  const links1 = [
  { source: 1, target: 2 },
  { source: 1, target: 3 },
  { source: 1, target: 5 },
  { source: 2, target: 6 },
  { source: 3, target: 6 },
  { source: 5, target: 6 },
  ];
  
  data.nodes = node1;
  data.links = links1;
  
  // Update the simulation with the new nodes and links
  simulation.nodes(data.nodes);
  simulation.force('link').links(data.links);
  
  // Update the link elements with the new data
  link.data(data.links)
  .attr('x1', d => d.source.x)
  .attr('y1', d => d.source.y)
  .attr('x2', d => d.target.x)
  .attr('y2', d => d.target.y);
  
  // Update the node elements with the new data
  node.data(data.nodes)
  .attr('transform', d => `translate(${d.x},${d.y})`)
  .select('.title')
  .text(d => d.label);
  });
  
  // Update the data object with the new nodes and links