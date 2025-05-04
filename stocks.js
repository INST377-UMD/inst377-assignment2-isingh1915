const apiKey = 'x440rAXwSuI3v0nloESeOrMZbg9vGyo3';

async function handleStockLookup() {
  const ticker = document.getElementById('stock-input').value.toUpperCase();
  const days = parseInt(document.getElementById('day-select').value);

  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - days);

  const formatDate = date => date.toISOString().split('T')[0];

  const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${formatDate(startDate)}/${formatDate(endDate)}?adjusted=true&sort=asc&limit=${days}&apiKey=${apiKey}`;

  const res = await fetch(url);
  const data = await res.json();

  if (data.results) {
    const labels = data.results.map(entry => {
      const date = new Date(entry.t);
      return `${date.getMonth() + 1}/${date.getDate()}`;
    });

    const values = data.results.map(entry => entry.c);

    const ctx = document.getElementById('stock-chart').getContext('2d');
    if (window.stockChart) {
      window.stockChart.destroy();
    }
    window.stockChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: `${ticker} closing prices`,
          data: values,
          borderColor: '#6d4c41',
          borderWidth: 2,
          fill: false
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: false
          }
        }
      }
    });
  }
}

async function loadRedditStocks() {
  const res = await fetch('https://tradestie.com/api/v1/apps/reddit?date=2022-04-03');
  const data = await res.json();
  const table = document.querySelector('#reddit-table tbody');
  table.innerHTML = '';

  data.slice(0, 5).forEach(stock => {
    const row = document.createElement('tr');

    const tickerCell = document.createElement('td');
    const link = document.createElement('a');
    link.href = `https://finance.yahoo.com/quote/${stock.ticker}`;
    link.textContent = stock.ticker;
    link.target = '_blank';
    tickerCell.appendChild(link);

    const commentCell = document.createElement('td');
    commentCell.textContent = stock.no_of_comments;

    const sentimentCell = document.createElement('td');
    sentimentCell.textContent = stock.sentiment;

    row.appendChild(tickerCell);
    row.appendChild(commentCell);
    row.appendChild(sentimentCell);
    table.appendChild(row);
  });
}

window.onload = () => {
  loadRedditStocks();
};
