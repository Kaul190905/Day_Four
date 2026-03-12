const AUTH_USER = 'admin';
const AUTH_PASS = 'securepass123';

function getAuthHeaders() {
    const base64 = btoa(`${AUTH_USER}:${AUTH_PASS}`);
    return {
        "Authorization": `Basic ${base64}`,
        "Content-Type": "application/json"
    };
}

async function load(){
    try {
        const res=await fetch("/api/list", {
            headers: getAuthHeaders()
        })
        if (!res.ok) throw new Error("Failed to fetch list");
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
    } catch (err) {
        console.error("Load failed:", err);
        document.getElementById("list").innerHTML = "<p style='color:red'>Error loading vault. Please check authentication.</p>";
    }
}

async function remove(id) {
    if (!confirm("Are you sure you want to delete this secret?")) return;
    try {
        await fetch(`/api/${id}`, {
            method: "DELETE",
            headers: getAuthHeaders()
        })
        load()
    } catch (err) {
        console.error("Delete failed:", err);
    }
}

load();
