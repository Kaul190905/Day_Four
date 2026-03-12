const AUTH_USER = 'admin';
const AUTH_PASS = 'securepass123';

function getAuthHeaders() {
    const base64 = btoa(`${AUTH_USER}:${AUTH_PASS}`);
    return {
        "Authorization": `Basic ${base64}`,
        "Content-Type": "application/json"
    };
}

async function create(){
    const title=document.getElementById("title").value
    const secret=document.getElementById("secret").value
    
    await fetch("/api/create",{
        method:"POST",
        headers: getAuthHeaders(),
        body:JSON.stringify({title,secret})
    })
    
    document.getElementById("title").value = ""
    document.getElementById("secret").value = ""
    load()
}

async function load(){
    const res=await fetch("/api/list", {
        headers: getAuthHeaders()
    })
    const data=await res.json()
    const container=document.getElementById("list")
    container.innerHTML=""
    
    data.forEach(d=>{
        container.innerHTML += `
            <div class="vault-item">
                <span><strong>${d.title}</strong>: ${d.secret}</span>
                <button class="del-btn" onclick="remove('${d.id}')">Delete</button>
            </div>
        `
    })
}

async function remove(id) {
    await fetch(`/api/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders()
    })
    load()
}

load()