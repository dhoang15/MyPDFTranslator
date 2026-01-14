{
  "manifest_version": 3,
  "name": "PDF & Web Translator",
  "version": "2.0",
  "description": "Dịch PDF và mọi trang web bằng cách bôi đen",
  "permissions": ["activeTab", "scripting"],
  "host_permissions": ["<all_urls>"],
  
  "action": {
    "default_title": "Mở trình dịch"
  },

  "background": {
    "service_worker": "background.js"
  },

  "content_scripts": [
    {
      "matches": ["<all_urls>"],
      "css": ["web/styles.css"],
      "js": ["web/content.js"],
      "run_at": "document_end"
    }
  ],

  "web_accessible_resources": [
    {
      "resources": ["web/*"],
      "matches": ["<all_urls>"]
    }
  ]
}
