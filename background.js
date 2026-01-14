chrome.action.onClicked.addListener((tab) => {
  // Kiểm tra nếu là file PDF hoặc đường dẫn có chứa .pdf
  if (tab.url.endsWith(".pdf") || tab.url.includes(".pdf")) {
    
    // Đường dẫn đến file viewer.html trong thư mục web
    const viewerUrl = chrome.runtime.getURL("web/viewer.html");
    
    // Tạo đường dẫn đầy đủ: viewer.html?file=URL_CỦA_PDF_GỐC
    const fullUrl = `${viewerUrl}?file=${encodeURIComponent(tab.url)}`;
    
    // Cập nhật tab hiện tại sang giao diện mới
    chrome.tabs.update(tab.id, { url: fullUrl });
  } else {
    console.log("Đây không phải là file PDF (hoặc URL không kết thúc bằng .pdf)");
  }
});