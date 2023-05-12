import { getProgramList } from './module.js';

const programList = document.querySelector('#program-list');
const hutulburButton = document.querySelector('#hutulbur-button');
const tetgelegButton = document.querySelector('#tetgeleg-button');

async function showProgramList(category) {
  programList.innerHTML = '';

  try {
    const programs = await getProgramList(category);

    if (!Array.isArray(programs)) {
      throw new Error(`Program data for category '${category}' is not an array`);
    }

    programs.forEach(program => {
        const li = document.createElement('li');
        li.textContent = `(${category})`;
        programList.appendChild(li);
    });
  } catch (error) {
    console.error(error);
    const errorMessage = document.createElement('li');
    errorMessage.textContent = error.message;
    programList.appendChild(errorMessage);
  }
}

hutulburButton.addEventListener('click', () => {
  showProgramList('hutulbur');
});

tetgelegButton.addEventListener('click', () => {
  showProgramList('tetgeleg');
});

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const category = urlParams.get('category');
if (category) {
  showProgramList(category);
}
