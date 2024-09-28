const proxies = [
    { name: "CyberGhost Proxy", host: "1.94.31.35", port: 8080 },
    { name: "Hide.me", host: "134.174.149.59", port: 8080 },
    { name: "PlainProxies", host: "13.80.134.180", port: 8080 },
    { name: "CroxyProxy", host: "134.174.149.59", port: 8080 }
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
  
