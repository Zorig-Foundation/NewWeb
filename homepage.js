//Document click хийх үед eventhandler
document.addEventListener("click", function (event) {
  console.log(event.target);
  // biy daasan element shuu
  event.preventDefault();
  // id n target dotor baidag
  if (event.target.id == "btnSingleTrack") {
    let searchInput = document.getElementById("searchInput");
    // одоо байгаа утгын авна
    let inputValue = searchInput.value;
    console.log(inputValue);
    check_user(inputValue);
  }
});

async function check_user(id) {
  console.log(id);

  const statusContainer = document.getElementById("status");
  statusContainer.innerHTML = "";
  let datacontainer = document.createElement("div");
  datacontainer.className = "datacontainer";
  let loadingElement = document.createElement("div");

  loadingElement.className = "loading";
  // dotor n aguuldag bolgohin tuld
  datacontainer.appendChild(loadingElement);
  statusContainer.appendChild(datacontainer);
  // get hiij id-tai tentsuu id-tai json avna
  let url = "http://localhost:3000/applicationStatus?userid=" + id;
  try {
    // irsnihna daraa
    const response = await fetch(url);
    if (response.status == 200) {
      const data = await response.json();
      console.log(data);
      displayStatus(
        data["firstName"],
        data["lastName"],
        data["personalid"],
        data["status"]
      );
    } else {
      let statusContainer = document.getElementById("status");
      statusContainer.innerHTML = "";

      let statusElement = document.createElement("div");
      statusElement.className = "graded-status";

      let nameElement = document.createElement("p");
      nameElement.textContent = "Үр дүн олдсонгүй";
      statusElement.appendChild(nameElement);

      statusContainer.appendChild(statusElement);
    }
  } catch (error) {
    console.error("Error: " + error.message);
  }
}

function displayStatus(fname, lname, personalid, status) {
  let statusContainer = document.getElementById("status");
  statusContainer.innerHTML = "";

  let statusElement = document.createElement("div");
  statusElement.className = "graded-status";
  statusElement.textContent = "Status: " + status;

  let nameElement = document.createElement("p");
  nameElement.textContent = "Name: " + fname + " " + lname;

  let idElement = document.createElement("p");
  idElement.textContent = "Personal ID: " + personalid;

  statusElement.appendChild(nameElement);
  statusElement.appendChild(idElement);
  statusContainer.appendChild(statusElement);
}
