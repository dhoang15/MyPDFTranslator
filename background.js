chrome.action.onClicked.addListener((tab) => {
  if (tab.url.endsWith(".pdf") || tab.url.includes(".pdf")) {
    const viewerUrl = chrome.runtime.getURL("web/viewer.html");
    const fullUrl = `${viewerUrl}?file=${encodeURIComponent(tab.url)}`;
    chrome.tabs.update(tab.id, { url: fullUrl });
  } else {
    console.log("Đây không phải là file PDF");
  }
});
