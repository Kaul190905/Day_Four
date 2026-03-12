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
    const title=document.getElementById("title").value.trim();
    const secret=document.getElementById("secret").value.trim();
    if(!title || !secret) return alert("Title and Secret are required");

    try {
        await fetch("/api/create",{
            method:"POST",
            headers: getAuthHeaders(),
            body:JSON.stringify({title,secret})
        });
        document.getElementById("title").value = "";
        document.getElementById("secret").value = "";
        load();
    } catch (err) {
        console.error("Create failed:", err);
    }
}

async function load(){
    try {
        const res=await fetch("/api/list", {
            headers: getAuthHeaders()
        });
        if (!res.ok) throw new Error("Failed to load");
        const data=await res.json();
        const container=document.getElementById("list");
        container.innerHTML="";
        
        data.forEach(d=>{
            const div = document.createElement("div");
            div.className = "vault-item";
            div.innerHTML = `
                <div class="item-info">
                    <strong>${d.title}</strong>
                    <code>${d.secret}</code>
                </div>
                <button class="del-btn" onclick="remove('${d.id}')">Delete</button>
            `;
            container.appendChild(div);
        });
    } catch (err) {
        console.error("Load failed:", err);
    }
}

async function remove(id) {
    if(!confirm("Delete this secret?")) return;
    try {
        await fetch(`/api/${id}`, {
            method: "DELETE",
            headers: getAuthHeaders()
        });
        load();
    } catch (err) {
        console.error("Delete failed:", err);
    }
}

load();