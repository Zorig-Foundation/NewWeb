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
          <section>
            <p class="p1">Тэтгэлэгийн хэмжээ: ${this.number}</p>
            <p class="p2">Дүн: ${this.hemjee}</p>
          </section>
        </div>
      `;
    }
  }
  
  // category buttongoo awna
  const hutulburBtn = document.getElementById('hutulbur');
  const tetgelegBtn = document.getElementById('tetgeleg');
  const allBtn = document.getElementById('all');
  
  // selected category ni daragdaagui null utgatai baihad buh hutulburuud gardag bhr ehluulne
  let selectedCategory = null;
  
  // tuhain neg button deer darah
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
  selectedCategory = new URLSearchParams(window.location.search).get('category');
  // songogdson categoroosoo shaltgaalan filter hiigdeh
  function updateItems() {
    const container = document.getElementById('side');
    container.innerHTML = '';
  
    // odoo bgaa URL-iig awah, hesguuded zadlah
    const currentUrl = window.location.href;
    const urlParts = currentUrl.split('?');
  
    // selected category parametertai shine URL uusgeh
    let newUrl;
    if (selectedCategory) {
      newUrl = `${urlParts[0]}?category=${selectedCategory}`;
    } else {
      newUrl = urlParts[0];
    }
  
    // huudsaa dahin achaallahguigeer URL-aa shinechleh 
    window.history.pushState({ path: newUrl }, '', newUrl);
  
    // API-aas data-gaa fetch hiigeed, itemuudaa renderleh
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

  
  
  
  // anhnii itemuudiig renderlene
  updateItems();
  const link = document.getElementById('back');
  link.addEventListener('click', () =>{
    window.location.href = 'collaborate.html';
  })