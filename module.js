class Hutulbur {
    constructor(program) {
      this.name = program.name;
      this.category = program.category;
      this.number = program.number;
      this.hemjee = program.hemjee;
    }
    render() {
      return `
        <div class="detail">
          <h1>${this.name}</h1>
          <p>#${this.category}</p>
          <section>
            <p>Тэтгэлэгийн хэмжээ: ${this.number}</p>
            <p>Дүн: ${this.hemjee}</p>
          </section>
        </div>
      `;
    }
  }
  
  // Get the category buttons
  const hutulburBtn = document.getElementById('hutulbur');
  const tetgelegBtn = document.getElementById('tetgeleg');
  const allBtn = document.getElementById('all');
  
  // Initialize selected category as null to show all items by default
  let selectedCategory = null;
  
  // Add event listeners to the category buttons
  hutulburBtn.addEventListener('click', () => {
    selectedCategory = 'hutulbur';
    updateItems();
  });
  
  tetgelegBtn.addEventListener('click', () => {
    selectedCategory = 'tetgeleg';
    updateItems();
  });
  
  allBtn.addEventListener('click', () => {
    selectedCategory = null;
    updateItems();
  });
  
  // Function to update the displayed items based on the selected category
  function updateItems() {
    const container = document.getElementById('side');
    container.innerHTML = '';
  
    // Get the current URL and split it into parts
    const currentUrl = window.location.href;
    const urlParts = currentUrl.split('?');
  
    // Construct the new URL with the selected category parameter
    let newUrl;
    if (selectedCategory) {
      newUrl = `${urlParts[0]}?category=${selectedCategory}`;
    } else {
      newUrl = urlParts[0];
    }
  
    // Update the URL without reloading the page
    window.history.pushState({ path: newUrl }, '', newUrl);
  
    // Fetch data from the API and render the items
    fetch('https://api.jsonbin.io/v3/b/645641e3b89b1e22999831bf/latest')
      .then(response => response.json())
      .then(data => {
        data.record.programs.forEach(item => {
          const h = new Hutulbur(item);
          if (!selectedCategory || h.category === selectedCategory) {
            container.innerHTML += h.render();
          }
        });
      });
  }
  
  // Add event listeners to all links on the page
  const links = document.getElementsByTagName('a');
  for (let i = 0; i < links.length; i++) {
    links[i].addEventListener('click', (event) => {
      // Prevent the default behavior of the link
      event.preventDefault();
  
      // Get the category from the link's href attribute
      const linkCategory = links[i].getAttribute('href').split('=')[1];
  
      // Update the selected category and re-render the items
      selectedCategory = linkCategory;
      updateItems();
    });
  }
  
  // Render the initial items
  updateItems();
  