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