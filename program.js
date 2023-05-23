
class ProgramList extends HTMLElement {
    constructor() {
      super();
  
      // componentdoo dom shadow uusgene
      const shadowRoot = this.attachShadow({ mode: 'open' });
  
      // 1 buhel item bolon dotorh hutulburuuddee html uusgene
      shadowRoot.innerHTML = `
      <style>
@media only screen and (max-width: 1000px) {
  #sub-container {
    flex-direction: column;
  }
  @media only screen and (max-width: 450px) {
    #aside{
      margin:0;
      padding-right: 5%;
      height:600px;
      margin-bottom: 10%;
    }
    #sub-container {
      padding-left: 0;
    }
  }
  *{
    font-family: 'Mulish', sans-serif;
  }
</style>
<section id="sub-container" style="font-family: 'Mulish', sans-serif;display: flex; padding-left: 10%; justify-content: center; gap: 3%; flex-wrap: wrap; width: 50%; margin: auto; margin: 0 0 auto 0"></section>
<section id="aside" style="font-family: 'Mulish', sans-serif;display: flex; gap: 1%;width: 30%; flex-direction: column; "></section>

      `;
  
      // 1 buhel item bolon dotorh hutulburuuddee zaalt uusgene
      const itemsContainer = shadowRoot.getElementById('sub-container');
      const programsContainer = shadowRoot.getElementById('aside');
  
      // JSON file aas data gaa fetch hiine, itemiinhaa listuudiig uusgene
      fetch('program.json')
        .then(response => response.json())
        .then(data => {
          let itemsHTML =`
          <style>
            @media only screen and (max-width: 1000px) {
              .item{
                width: 90%;
              }
            }
            @media only screen and (min-width: 1000px) {
              .item{
                width: 45%;
              }
            }
            *{
              font-family: 'Mulish', sans-serif;
            }
            .item{border-style: cornered; border-width: 1px;margin-bottom: 5%; box-shadow: 2px 2px 2px #00000040;}
            img{width: 100%;}
            h3{font-family: 'Mulish', sans-serif; margin: 0%; font-size: 15px; padding-bottom: 5%; text-align: center;}
            ul{display: flex; gap:20%; list-style: none; margin: 0%; color: grey; font-family: 'Mulish', sans-serif; font-size:13px}
          </style>`
          
          data.forEach((item, index) => {
            itemsHTML += `
              <section class="item" data-index="${index}" style="font-family: 'Mulish', sans-serif;">
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
          let programsHTML = '';
    data.forEach(item => {
      item.programs.forEach(program => {
        programsHTML += `
          <div class="program" style=" font-family: 'Mulish', sans-serif;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            padding: 3%; 
            margin-bottom: 5%; 
            heigth: 600px;
            border-radius: 8px">
            <h3>${program.name_}</h3>
            <p style="font-family: 'Mulish', sans-serif;font-size: 10px; color: grey; text-align: center;">Эхлэх: ${program.start}, Дуусах: ${program.end}</p>
          </div>
        `;
      });
    });

    programsContainer.innerHTML = programsHTML;
          itemsContainer.addEventListener('click', event => {
            // darsan itemaa olno
            const items = itemsContainer.getElementsByClassName('item');
            Array.from(items).forEach(item => {
              item.classList.remove('selected');
              item.style.borderBottom = ''; // Remove border style from all items
            });
          
            // Add the 'selected' class and update border style of the clicked item
            const clickedItem = event.target.closest('.item');
            if (clickedItem) {
              clickedItem.classList.add('selected');
              clickedItem.style.borderBottom = '2px solid #002e60'; // Add a red border to the clicked item
            }
            window.scrollTo(0, 0);
            const item = event.target.closest('.item');
            if (!item) return;
  
            // darsan item deerh program list ee olno
            const index = item.dataset.index;
            const programData = data[index].programs;
  
            // programuuddaa html uusgene
            let programsHTML = '';
            programData.forEach(program => {
              programsHTML += `
                  <div class="program" style="font-family: 'Mulish', sans-serif;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            padding: 3%; 
            margin-bottom: 5%; 
            heigth: 600px;
            border-radius: 8px">
                    <h3>${program.name_}</h3>
                    <p style=" font-size:10px; color: grey; text-align: center;">Эхлэх: ${program.start}, Дуусах: ${program.end}</p>
                  </div>
               
              `;
            });                   
  
            // 1 buhel categoriinhoo programuudiig haruulna
            programsContainer.innerHTML = programsHTML;
            programsContainer.addEventListener('click', event => {
              // darsan programiinhaa elementiig awna
              const programElement = event.target.closest('.program');
              if (!programElement) return;
            
              // programin indexiig awna
              const programIndex = programElement.dataset.index;
              window.location.href = `program1.html`;
            });
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