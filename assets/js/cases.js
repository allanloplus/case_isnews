/* ==========================================================
   個案登錄表：新增個案時，在陣列最前面加一筆即可。
   ----------------------------------------------------------
   id        個案編號（顯示用）
   slug      資料夾名稱：cases/<slug>/index.html
   title     標題
   summary   一兩句摘要
   date      新聞日期（YYYY-MM-DD）
   source    來源名稱
   type      'video' | 'news'
   thumb     縮圖網址（影片可用 YouTube 縮圖）
   severity  '緊急' | '高' | '中' | '低'
   topics    主題標籤（同時作為篩選條件）
   ========================================================== */
window.CASES = [
  {
    id: '#001',
    slug: '2026-10-php2shell',
    title: 'AI 揪出潛藏十多年的 PHP 漏洞：PHP2Shell 與資安雙面刃',
    summary: '全球約七成網站使用的 PHP 爆出免登入 RCE 漏洞，攻擊早於修補、日本與歐洲大量預防性關站。從漏洞管理、事件應變到 AI 攻防速度，一次看懂。',
    date: '2026-10-29',
    source: '非凡商業台《全球新觀點》',
    type: 'video',
    thumb: 'https://i.ytimg.com/vi/QgToNoNc34E/hqdefault.jpg',
    severity: '緊急',
    topics: ['漏洞管理', '事件應變', 'AI 資安', '供應鏈', '個資保護']
  }
];
