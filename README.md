# 從新聞，看個案

這個網站把資安新聞（影片或文字報導）整理成**個案研究**，每個個案包含：

- 新聞導讀：Allan Lo 顧問 × AI 小助手阿拉蕾的對話
- 事件時間軸、技術解析動畫、影響數據、各國與企業因應
- 個案重點整理
- 問題討論：管理、技術、法律、企業因應四大面向，每題附顧問參考答案
- 稽核員視角（ISO/IEC 27001:2022 控制措施與稽核證據對照）
- 互動式行動清單

網站是純靜態 HTML/CSS/JS，沒有任何建置步驟，可以直接用 GitHub Pages 發布。

## 目錄結構

```
index.html                         個案總覽首頁（依 cases.js 自動產生卡片）
assets/css/style.css               共用樣式
assets/js/main.js                  共用互動（捲動動畫、時間軸、攻擊流程動畫、勒索攻防模擬器、分頁、檢核清單、阿拉蕾提示）
assets/js/cases.js                 個案登錄表
assets/img/characters/*.png        角色姿勢與表情（透明背景）
assets/img/characters/sheets/      原始角色設定圖
cases/<slug>/index.html            各個案頁面
```

## 新增一則個案

1. 複製 `cases/2026-10-php2shell/` 為新資料夾，例如 `cases/2026-11-xxxx/`。
2. 修改新資料夾內的 `index.html`：
   - 各章節（`section.block`）可依新聞需要增刪，目錄 `nav.toc` 的連結要對應章節的 `id`。
   - `data-tip` 和 `data-tip-img` 設定阿拉蕾在該章節跳出的提示文字與表情。
   - 攻擊／流程動畫：修改 `.attack-stage` 內的 `.node`，以及下方 `<script type="application/json">` 的步驟（`node` 是節點索引，`evil: true` 會顯示紅色）。
   - 問題討論：每題是一個 `<details class="qa card">`，參考答案放在 `.answer` 內。
   - 行動清單：`data-checklist` 要用新的唯一名稱，避免和其他個案的勾選進度混在一起。
3. 在 `assets/js/cases.js` 的陣列中新增一筆資料（記得填 `created` 建立日期時間），首頁會自動依建立日期由新到舊排序顯示。

## 可用的角色圖

| Allan Lo 顧問 | 阿拉蕾 |
|---|---|
| `allan-full`、`allan-smile`、`allan-laugh`、`allan-think`、`allan-confused`、`allan-surprised`、`allan-point`、`allan-wink`、`allan-worried` | `arale-full`、`arale-wave`、`arale-present`、`arale-holo`、`arale-laugh`、`arale-think`、`arale-surprised`、`arale-confused`、`arale-explain`、`arale-sad`、`arale-thumb`、`arale-fight` |

## 本機預覽

```bash
python3 -m http.server 8000
```

然後開啟 http://localhost:8000/ 。

## 發布到 GitHub Pages

到 repository 的 **Settings → Pages**，Source 選擇要發布的分支與根目錄（`/`）即可。repo 已包含 `.nojekyll`。
