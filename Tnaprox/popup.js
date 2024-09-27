document.addEventListener("DOMContentLoaded", () => {
    chrome.storage.local.get("proxies", (data) => {
        const proxyList = document.getElementById("proxy-list");
        data.proxies.forEach((proxy, index) => {
            const button = document.createElement("button");
            button.textContent = proxy.name;
            button.onclick = () => setProxy(index);
            proxyList.appendChild(button);
        });
    });
});

function setProxy(index) {
    chrome.runtime.sendMessage({ action: "setProxy", proxyIndex: index }, (response) => {
        alert(response.status);
    });
}
