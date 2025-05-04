const dogApiUrl = "https://dog.ceo/api/breeds/image/random/10";
const breedApiUrl = "https://dog.ceo/api/breeds/list/all";

async function loadDogImages() {
  const res = await fetch(dogApiUrl);
  const data = await res.json();
  const dogImages = data.message;
  const track = document.querySelector(".carousel-track");

  dogImages.forEach((url, index) => {
    const img = document.createElement("img");
    img.src = url;
    img.alt = "random dog";
    img.classList.add("carousel-item");
    if (index === 0) img.classList.add("active");
    track.appendChild(img);
  });

  track.addEventListener("click", () => {
    const items = document.querySelectorAll(".carousel-item");
    let active = document.querySelector(".carousel-item.active");
    let currentIndex = Array.from(items).indexOf(active);
    active.classList.remove("active");
    const nextIndex = (currentIndex + 1) % items.length;
    items[nextIndex].classList.add("active");
  });
}

async function loadDogBreeds() {
  const res = await fetch(breedApiUrl);
  const data = await res.json();
  const breeds = Object.keys(data.message);
  const container = document.getElementById("breed-buttons");

  breeds.forEach(breed => {
    const button = document.createElement("button");
    button.textContent = breed.toLowerCase();
    button.classList.add("button-89");
    button.setAttribute("data-breed", breed);
    button.addEventListener("click", () => loadBreedInfo(breed));
    container.appendChild(button);
  });
}

async function loadBreedInfo(breed) {
  const res = await fetch(`https://api.thedogapi.com/v1/breeds/search?q=${breed}`);
  const data = await res.json();

  if (data.length > 0) {
    const breedData = data[0];
    document.getElementById("breed-name").textContent = breedData.name.toLowerCase();
    document.getElementById("breed-description").textContent = (breedData.description || "no description").toLowerCase();
    const lifeSpan = (breedData.life_span || "0 - 0").split(" - ");
    document.getElementById("min-life").textContent = lifeSpan[0];
    document.getElementById("max-life").textContent = lifeSpan[1];
    document.getElementById("breed-info-container").style.display = "block";
  }
}

function startVoice() {
  if (annyang) {
    const commands = {
      'load dog breed *breedName': (breedName) => loadBreedInfo(breedName.toLowerCase()),
      'hello': () => alert('hello world'),
      'change the color to *color': (color) => document.body.style.backgroundColor = color,
      'navigate to *page': (page) => {
        const pageMap = {
          home: 'index.html',
          stocks: 'stocks.html',
          dogs: 'dogs.html'
        };
        const target = pageMap[page.toLowerCase()];
        if (target) window.location.href = target;
      }
    };
    annyang.addCommands(commands);
    annyang.start();
  }
}

function stopVoice() {
  if (annyang) {
    annyang.abort();
  }
}

window.onload = () => {
  loadDogImages();
  loadDogBreeds();
};
