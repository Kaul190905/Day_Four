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
    if (!title || !secret) return alert("Please enter both title and secret");
    
    try {
        const res = await fetch("/api/create",{
            method:"POST",
            headers: getAuthHeaders(),
            body:JSON.stringify({title,secret})
        })
        if (res.ok) {
            alert("Secret Protected Successfully!");
            document.getElementById("title").value = ""
            document.getElementById("secret").value = ""
        } else {
            alert("Failed to protect secret. Check console.");
        }
    } catch (err) {
        console.error("Create failed:", err);
    }
}