
class hutulbur{
    constructor(program){
        this.name = program.name;
        this.category = program.category;
        this.number = program.number;
        this.hemjee = program.hemjee;
    }
    render(){
        return `
        <div class="detail">
            <h1>${this.name}</h1>
            <p>#${this.category}</p>
            <section>
                <p>Тэтгэлэгийн хэмжээ: ${this.number}</p>
                <p>Дүн: ${this.hemjee}</p>
            </section>
        </div>
        `
    }
    

}
fetch('https://api.jsonbin.io/v3/b/645641e3b89b1e22999831bf/latest')
  .then(response => response.json())
  .then(data => {
    let itemsHTML = `<style>
    .side div{
        border-style: cornered; 
        border-width: 2px;
        margin-bottom: 5%; 
        box-shadow: 2px 2px 2px #00000040;
        border-top-style: solid;
        border-top-color: #c39a00;
        text-align: center;
    }
    </style>`
    console.log(data.record);
    const container = document.getElementById('side');
    data.record.programs.forEach(
        
    item => {
      const h = new hutulbur(item);
      container.innerHTML += h.render();
    });
  });
