const proxies = [
    { name: "Proxy 1", host: "proxy1.example.com", port: 8080 },
    { name: "Proxy 2", host: "proxy2.example.com", port: 8080 },
    { name: "Proxy 3", host: "proxy3.example.com", port: 8080 },
    { name: "Proxy 4", host: "proxy4.example.com", port: 8080 }
  ];
  
  chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ proxies });
  });
  
  chrome.proxy.onProxyError.addListener((details) => {
    console.error("Proxy error:", details);
  });
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "setProxy") {
      const selectedProxy = proxies[request.proxyIndex];
      chrome.proxy.settings.set(
        { value: { mode: "fixed_servers", rules: { singleProxy: { scheme: "http", host: selectedProxy.host, port: selectedProxy.port } } }, scope: "regular" },
        () => sendResponse({ status: "success" })
      );
      return true; // Indicates we will send a response asynchronously
    }
  });
  