// Define the data for the nodes and links
const data = {
    nodes: [
      { id: 1, label: 'Node 1', x: 100, y: 100, fixed: true },
      { id: 2, label: 'Node 2', x: 400, y: 100, fixed: true },
      { id: 3, label: 'Node 3', x: 250, y: 300, fixed: true },
      { id: 4, label: 'Node 4', x: 550, y: 300, fixed: true },
    ],
    links: [
      { source: 1, target: 2 },
      { source: 1, target: 3 },
      { source: 2, target: 3 },
      { source: 3, target: 4 },
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
    d3.select(this).classed('fixed', d.fixed = true);
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
      d3.select(this).classed('fixed', d.fixed = false);
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
  
  const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  function generateMonthLabels() {
    const monthsContainer = d3.select('.timeline-months');
  
    for (let i = 0; i < MONTH_NAMES.length; i++) {
      const monthLabel = document.createElement('div');
      monthLabel.classList.add('timeline-month');
      monthLabel.innerText = MONTH_NAMES[i];
      monthsContainer.node().appendChild(monthLabel);
    }
  }
  
  const timelineMonths = document.querySelector('.timeline-months');
  
  function updateTimeline(month) {
    const progress = month / MONTH_NAMES.length;
    const progressBar = d3.select('.timeline-progress');
    progressBar.style('width', `${progress * 100}%`);
  }
  
  function generateCards() {
    const cardContainer = Nimble.grab("right-card-container");
    for (let i = 0; i < 8; i++) {
      const card = document.createElement('div');
      card.classList.add('card');
      card.innerHTML = `
        <h2>User ${i + 1}</h2>
        <div class="line"></div>
        <p>Dis do be the user</p>
      `;
      cardContainer.appendChild(card);
    }
  
    const addMoreButton = document.createElement('div');

    addMoreButton.classList.add('add-more');
    addMoreButton.innerText = 'Add More';
    cardContainer.node().appendChild(addMoreButton);
  }
  
  generateCards();