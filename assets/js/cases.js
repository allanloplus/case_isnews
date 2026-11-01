/* ==========================================================
   個案登錄表：新增個案時，在陣列最前面加一筆即可。
   ----------------------------------------------------------
   id        個案編號（顯示用）
   slug      資料夾名稱：cases/<slug>/index.html
   title     標題
   summary   一兩句摘要
   created   個案建立日期時間（YYYY-MM-DDTHH:mm）——首頁依此由新到舊排序
   date      新聞日期（YYYY-MM-DD）
   source    來源名稱
   type      'video' | 'news'
   thumb     縮圖網址（影片可用 YouTube 縮圖）
   severity  '緊急' | '重大' | '高' | '中' | '低'
   topics    主題標籤（同時作為篩選條件）
   ========================================================== */
window.CASES = [
  {
    id: '#003',
    slug: '2026-10-synology-c3rb3r',
    title: '群暉 NAS 遭 C3RB3R 勒索軟體攻擊：被遺忘的更新與備份',
    summary: '攻擊者鎖定未更新的群暉 NAS，將檔案加密為 .L0CK3D 並勒索比特幣。入侵途徑各方說法不一，但「沒更新、對外曝露、備份放同一台」是共同破口。附互動式勒索攻防模擬器。',
    created: '2026-11-01T10:00',
    date: '2026-10-30',
    source: 'iThome 新聞',
    type: 'news',
    thumb: 'assets/img/cases/003-synology-c3rb3r.svg',
    severity: '重大',
    topics: ['勒索軟體', '漏洞管理', '備份與復原', '事件應變', '供應鏈']
  },
  {
    id: '#002',
    slug: '2026-10-91app-breach',
    title: '91APP 資料庫遭 AI 代理攻擊：一個未更新的內部工具，波及 1,329 個品牌',
    summary: '電商 SaaS 平台 91APP 因內部工具 Appsmith 未更新，被 AI 自主滲透工具 ARTEX 打入，攻擊者再從 GitLab 取得資料庫金鑰，最多 479 萬名消費者訂單個資受影響。「先查明再通知」的取捨、SaaS 供應鏈與個資責任一次看。',
    created: '2026-11-01T08:30',
    date: '2026-10-30',
    source: '今周刊',
    type: 'news',
    thumb: 'assets/img/cases/002-91app-breach.svg',
    severity: '重大',
    topics: ['個資保護', '供應鏈', 'AI 資安', '事件應變', '漏洞管理']
  },
  {
    id: '#001',
    slug: '2026-10-php2shell',
    title: 'AI 揪出潛藏十多年的 PHP 漏洞：PHP2Shell 與資安雙面刃',
    summary: '全球約七成網站使用的 PHP 爆出免登入 RCE 漏洞，攻擊早於修補、日本與歐洲大量預防性關站。從漏洞管理、事件應變到 AI 攻防速度，一次看懂。',
    created: '2026-11-01T06:30',
    date: '2026-10-29',
    source: '非凡商業台《全球新觀點》',
    type: 'video',
    thumb: 'https://i.ytimg.com/vi/QgToNoNc34E/hqdefault.jpg',
    severity: '緊急',
    topics: ['漏洞管理', '事件應變', 'AI 資安', '供應鏈', '個資保護']
  }
];
