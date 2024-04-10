const allUsers = document.getElementById("allUsers");
const container = document.getElementById("container");
allUsers.addEventListener("click", async () => {
  getData();
});
 const backendURL = "http://localhost:8080/"
async function getData() {
  try {
    container.innerHTML = "";
    let res = await fetch(`${backendURL}users/`);
    let data = await res.json();
    
    data.forEach((element) => {
      let cards = createCard(element);
      container.append(cards);
    });
  } catch (error) {
    console.log(error);
  }
}


function createCard(item) {
  let card = document.createElement("div");
  card.className = "card";

  let id = document.createElement("h2");
  id.innerText = `ID: ${item.id}`;
  id.setAttribute("class", "id");

  let name = document.createElement("p");
  name.innerText = `Name: ${item.name}`;
  

  let email = document.createElement("p");
  email.innerText = `Email: ${item.email}`;

  let city = document.createElement("p");
  city.innerText = `City: ${item.address.city}`;

  let phone = document.createElement("p");
  phone.innerText = `Phone: ${item.phone}`;

  let website = document.createElement("p");
  website.innerText = `Website: ${item.website}`;

  let company = document.createElement("p");
  company.innerText = `Company Name: ${item.company.name}`;

  let addBtn = document.createElement("button");
  addBtn.className = "add";
  addBtn.innerText = "ADD";
  addBtn.addEventListener("click", async() => {
    await addData(item);
    card.removeChild(addBtn);
    card.append(openBtn);
    
  });
  let openBtn = document.createElement("button");
  openBtn.className = "open";
  openBtn.innerText = "OPEN";
  openBtn.addEventListener("click",()=>{
    localStorage.setItem("userId",item.id);
    localStorage.setItem("username",item.name)
    localStorage.setItem("company", item.company.name)

    window.location.href = "./post.html";
  })
  card.append(id, name, email, city, phone, website, company);
  if (item.inDB) {
    card.append(openBtn);
  } else {
    card.append(addBtn);
  }

  return card;
}

async function addData(item) {
  try {
    let res = await fetch(`${backendURL}users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: item.id,
        name: item.name,
        email: item.email,
        city: item.address.city,
        phone: item.phone,
        website: item.website,
        company: item.company.name,
      }),
    });
    let data = await res.json();
    
  } catch (error) {
    console.log(error);
  }
}
