
class ProgramList extends HTMLElement {
    constructor() {
      super();
  
      // componentdoo dom shadow uusgene
      const shadowRoot = this.attachShadow({ mode: 'open' });
  
      // 1 buhel item bolon dotorh hutulburuuddee html uusgene
      shadowRoot.innerHTML = `
      <style>
        @media only screen and (max-width: 1000px) {
            #sub-container, #aside{
                padding-top:3%;
            }
        }
        </style>
        <section id="sub-container" style="display: inline-flex; padding-left: 100px; justify-content: center; flex-direction: row; gap: 3%; flex-wrap: wrap; width: 50%; margin: auto; "></section>
        <section id="aside" style="display: flex; padding-right: 130px; width: 30%; flex-direction: column;"></section>
      `;
  
      // 1 buhel item bolon dotorh hutulburuuddee zaalt uusgene
      const itemsContainer = shadowRoot.getElementById('sub-container');
      const programsContainer = shadowRoot.getElementById('aside');
  
      // JSON file aas data gaa fetch hiine, itemiinhaa listuudiig uusgene
      fetch('program.json')
        .then(response => response.json())
        .then(data => {
          let itemsHTML =`<style>
                            .item{border-style: cornered; border-width: 1px; width: 45%; margin-bottom: 5%; box-shadow: 2px 2px 2px #00000040;}
                            img{width: 100%;}
                            h3{font-family: 'Roboto', sans-serif; margin: 0%; font-size: 15px; padding-bottom: 5%;}
                            ul{display: flex; gap:20%; list-style: none; margin: 0%; color: grey; font-family: 'Roboto', sans-serif; font-size:13px}
                          </style>`
          
          data.forEach((item, index) => {
            itemsHTML += `
              <section class="item" data-index="${index}">
                <img src="${item.image}" alt="${item.name}" class="picture">
                <ul>
                    <li><h5>Идэвхтэй:  ${item.activecount}</h5></li>
                    <li><h5>Дууссан:  ${item.expiredcount}</h5></li>
                </ul>
                <h3>${item.name} хөтөлбөр</h3>
              </section>
            `;
          });
          
          // containerluugaa itemaa hiine shuu
          itemsContainer.innerHTML = itemsHTML;
          itemsContainer.addEventListener('click', event => {
            // darsan itemaa olno
            const item = event.target.closest('.item');
            if (!item) return;
  
            // darsan item deerh program list ee olno
            const index = item.dataset.index;
            const programData = data[index].programs;
  
            // programuuddaa html uusgene
            let programsHTML = '';
            programData.forEach(program => {
              programsHTML += `
                <div class="program" style=" padding: 3%; border-bottom-style: dotted; border-bottom-width: 1px; border-bottom-color: #002e60">
                  <h3>${program.name_}</h3>
                  <p style=" font-family: 'Roboto', sans-serif; font-size:10px; color: grey;">Эхлэх: ${program.start}, Дуусах: ${program.end}</p>
                </div>
              `;
            });
  
            // 1 buhel categoriinhoo programuudiig haruulna
            programsContainer.innerHTML = programsHTML;
          });
        });
    }
  }
  
  // custom elementee todorhoilno
  customElements.define('program-list', ProgramList);

  /*<div class="status">
                  <div class="durs"><div class="dugui"><h5>${item.activecount}</h5></div><p>Идэвхтэй</p></div>
                  <div class="durs"><div class="dugui2"><h5>${item.expiredcount}</h5></div><p>Хаагдсан</p></div>
                </div>*/