
let userId = localStorage.getItem("userId");
let company = localStorage.getItem("company");
let username = localStorage.getItem("username");
console.log(userId,company,username);
let u_name = document.getElementById("user");
u_name.innerText=username
let c_name = document.getElementById("company");
c_name.innerText=company
const backendURL = "http://localhost:8080/"
let container = document.getElementById("container");
async function getData(){
    try {
        let response = await fetch(`${backendURL}/posts?userId=${userId}`)
        let data = await response.json();
        let posts = data.data;
        console.log(data.data);
        let status_info = data.status
        container.innerHTML = "";
        let bulkBtn = document.createElement("button")
        bulkBtn.setAttribute("id","bulkadd")
        bulkBtn.innerText="Bulk Add"
        bulkBtn.addEventListener("click",async()=>{
            await bulkAdd(posts)
            getData()
        })
        let downloadBtn = document.createElement("button")
        downloadBtn.setAttribute("id","excel")
        downloadBtn.innerText="Download in excel"
        downloadBtn.addEventListener("click",async ()=>{
            try {
                const response = await fetch(`${backendURL}/posts/download/${userId}`);
                const blob = await response.blob();
                const blobUrl = window.URL.createObjectURL(blob);
            
                const link = document.createElement('a');
                link.href = blobUrl;
                link.setAttribute('download', `posts_${userId}.xlsx`);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              } catch (error) {
                console.error('Error downloading file:', error);
              }
        })
        if(status_info == "not added"){
        container.append(bulkBtn)
        }
        else{
        container.append(downloadBtn)
        }
        
        posts.forEach(item =>{
            let cards = createCard(item)
            container.append(cards)
        })

    } catch (error) {
        console.log(error);
    }
}
getData();
function createCard(item){
    let card = document.createElement("div")
    card.className="card"

    let title = document.createElement("h3")
    title.innerText=`Title: ${item.title}`

    let body = document.createElement("p")
    body.innerText=`Body: ${item.body}`

    card.append(title,body)
    return card;

}

async function bulkAdd(posts){
    try {
        let res = await fetch(`${backendURL}/posts`,{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(posts)
        })
        let data = await res.json();
        console.log(data);

    } catch (error) {
        console.log(error)
    }
}