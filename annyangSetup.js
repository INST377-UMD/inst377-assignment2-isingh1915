if (annyang) {
  function handleVoiceStock(stock) {
    const input = document.getElementById('stock-input');
    const select = document.getElementById('day-select');

    if (input && select) {
      input.value = stock.toUpperCase();
      select.value = '30';
      handleStockLookup();
    }
  }

  const commands = {
    'hello': () => alert('hello world'),
    'change the color to *color': (color) => {
      document.body.style.backgroundColor = color;
    },
    'navigate to *page': (page) => {
      const pageMap = {
        home: 'index.html',
        stocks: 'stocks.html',
        dogs: 'dogs.html'
      };
      const target = pageMap[page.toLowerCase()];
      if (target) window.location.href = target;
    },
    'lookup *stock': handleVoiceStock,
    'look up *stock': handleVoiceStock,
    'load dog breed *breed': (breed) => {
      const buttons = document.querySelectorAll('#breed-buttons button');
      buttons.forEach(btn => {
        if (btn.innerText.toLowerCase() === breed.toLowerCase()) {
          btn.click();
        }
      });
    }
  };

  annyang.addCommands(commands);

  // Log what the user says (for debugging)
  annyang.addCallback('result', function(phrases) {
    console.log('user said: ', phrases);
  });
}
if (annyang) {
  const commands = {
    'hello': () => alert('hello world'),
    'change the color to *color': (color) => {
      document.body.style.backgroundColor = color;
    },
    'navigate to *page': (page) => {
      const pages = {
        home: 'index.html',
        stocks: 'stocks.html',
        dogs: 'dogs.html'
      };
      const target = pages[page.toLowerCase()];
      if (target) window.location.href = target;
    },
    'load dog breed *breed': (breedName) => {
      const buttons = document.querySelectorAll('#breed-buttons button');
      buttons.forEach(btn => {
        if (btn.innerText.toLowerCase() === breedName.toLowerCase()) {
          btn.click();
        }
      });
    }
  };

  annyang.addCommands(commands);
  annyang.addCallback('result', phrases => console.log('user said:', phrases));
}
