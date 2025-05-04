fetch('https://api.quotable.io/random')
  .then(res => res.json())
  .then(data => {
    document.getElementById('quote').innerText = `"${data.content}" — ${data.author}`;
  });
