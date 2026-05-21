import fs from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire("/Users/hybuzhy/Workspace/mentor-student-bridge/frontend/package.json");
const sharp = require("sharp");

const outDir = process.cwd();

function svg() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1500" height="1080" viewBox="0 0 1500 1080">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#4f67e9"/>
      <stop offset="0.46" stop-color="#376fd9"/>
      <stop offset="1" stop-color="#0b6f8f"/>
    </linearGradient>
    <linearGradient id="panel" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.98"/>
      <stop offset="1" stop-color="#eef8fb" stop-opacity="0.96"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="24" stdDeviation="28" flood-color="#063747" flood-opacity="0.22"/>
    </filter>
    <filter id="soft" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="12" stdDeviation="18" flood-color="#063747" flood-opacity="0.18"/>
    </filter>
    <clipPath id="roundCard">
      <rect x="645" y="215" width="700" height="590" rx="28"/>
    </clipPath>
    <style>
      .cn { font-family: "Hiragino Sans GB", "PingFang SC", "Microsoft YaHei", Arial, sans-serif; }
      .small { font-size: 22px; }
      .body { font-size: 28px; }
      .title { font-size: 42px; font-weight: 700; }
      .heavy { font-weight: 700; }
      .muted { fill: #6c7d8b; }
      .ink { fill: #18323f; }
      .whiteSoft { fill: rgba(255,255,255,0.74); }
    </style>
  </defs>

  <rect width="1500" height="1080" rx="34" fill="url(#bg)"/>

  <g opacity="0.18">
    <rect x="-80" y="88" width="360" height="74" rx="37" fill="#ffffff"/>
    <rect x="1060" y="126" width="360" height="88" rx="44" fill="#ffffff"/>
    <rect x="105" y="470" width="350" height="78" rx="39" fill="#ffffff"/>
    <rect x="905" y="880" width="320" height="78" rx="39" fill="#ffffff"/>
    <circle cx="1328" cy="82" r="42" fill="none" stroke="#122f87" stroke-width="18" opacity="0.38"/>
    <circle cx="318" cy="885" r="44" fill="none" stroke="#122f87" stroke-width="18" opacity="0.26"/>
    <circle cx="524" cy="178" r="42" fill="none" stroke="#122f87" stroke-width="18" opacity="0.3"/>
  </g>

  <g class="cn" transform="translate(126 138)">
    <g filter="url(#soft)">
      <rect x="0" y="0" width="70" height="70" rx="16" fill="#ffffff"/>
      <path d="M35 14 51 23v19L35 52 19 42V23Z" fill="#eaf6fb" stroke="#0b6f8f" stroke-width="4" stroke-linejoin="round"/>
      <path d="M35 21v24M24 28h22M24 39h22" stroke="#0b6f8f" stroke-width="3" stroke-linecap="round"/>
      <circle cx="17" cy="55" r="6" fill="#fff" stroke="#073f57" stroke-width="4"/>
      <circle cx="53" cy="55" r="6" fill="#fff" stroke="#073f57" stroke-width="4"/>
    </g>
    <text x="0" y="132" fill="#ffffff" font-size="44" font-weight="800">研究生导师双选系统</text>
    <text x="0" y="178" fill="#dcecff" font-size="24">一站式完成学生志愿、导师审核、面试安排与录取确认</text>

    <g transform="translate(0 238)">
      <line x1="35" y1="42" x2="35" y2="438" stroke="#dcecff" stroke-opacity="0.34" stroke-width="4"/>
      <g transform="translate(0 0)">
        <rect x="0" y="0" width="74" height="74" rx="18" fill="#ffffff"/>
        <path d="M22 24h30M22 38h30M22 52h18" stroke="#4f67e9" stroke-width="5" stroke-linecap="round"/>
        <circle cx="56" cy="51" r="9" fill="#0b6f8f"/>
        <text x="104" y="29" fill="#ffffff" font-size="31" font-weight="700">志愿填报</text>
        <text x="104" y="66" fill="#dcecff" font-size="22">学生按研究方向选择导师并排序提交</text>
      </g>
      <g transform="translate(0 164)">
        <rect x="0" y="0" width="74" height="74" rx="18" fill="#ffffff"/>
        <path d="M24 25h26v24H24z" fill="#eaf3ff" stroke="#4f67e9" stroke-width="4"/>
        <path d="M28 55l8 7 15-17" fill="none" stroke="#0b6f8f" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
        <text x="104" y="29" fill="#ffffff" font-size="31" font-weight="700">导师审核</text>
        <text x="104" y="66" fill="#dcecff" font-size="22">集中查看申请材料、沟通记录与候选学生</text>
      </g>
      <g transform="translate(0 328)">
        <rect x="0" y="0" width="74" height="74" rx="18" fill="#ffffff"/>
        <path d="M22 50c12-18 22-24 30-24s18 6 30 24" transform="scale(.78) translate(3 5)" fill="none" stroke="#073f57" stroke-width="6" stroke-linecap="round"/>
        <circle cx="25" cy="52" r="7" fill="#fff" stroke="#073f57" stroke-width="4"/>
        <circle cx="49" cy="52" r="7" fill="#fff" stroke="#073f57" stroke-width="4"/>
        <path d="M37 16 50 24v16L37 48 24 40V24Z" fill="#eaf6fb" stroke="#0b6f8f" stroke-width="4" stroke-linejoin="round"/>
        <text x="104" y="29" fill="#ffffff" font-size="31" font-weight="700">进度追踪</text>
        <text x="104" y="66" fill="#dcecff" font-size="22">实时掌握审核、面试、录取确认节点</text>
      </g>
    </g>
  </g>

  <g filter="url(#shadow)">
    <rect x="645" y="215" width="700" height="590" rx="28" fill="url(#panel)"/>
    <g clip-path="url(#roundCard)">
      <rect x="645" y="215" width="700" height="72" fill="#f8fbfd"/>
      <line x1="645" y1="287" x2="1345" y2="287" stroke="#d8e7ee" stroke-width="2"/>
      <circle cx="684" cy="251" r="7" fill="#ef3f3f"/>
      <circle cx="710" cy="251" r="7" fill="#f1bd4a"/>
      <circle cx="736" cy="251" r="7" fill="#45b981"/>
      <rect x="792" y="237" width="188" height="28" rx="14" fill="#e9f1f6"/>
      <text class="cn" x="820" y="257" fill="#667985" font-size="17">导师双选工作台</text>
    </g>

    <g class="cn">
      <text x="682" y="344" class="title ink">双选进度总览</text>
      <text x="682" y="384" class="small muted">2026 级研究生导师双选 · 信息与电子工程学院</text>

      <g transform="translate(682 420)">
        <rect x="0" y="0" width="150" height="104" rx="18" fill="#eef6ff" stroke="#d6e7fb"/>
        <text x="22" y="36" fill="#5d7180" font-size="18">已填报志愿</text>
        <text x="22" y="78" fill="#18323f" font-size="38" font-weight="800">128</text>
        <rect x="172" y="0" width="150" height="104" rx="18" fill="#effaf7" stroke="#d8efe7"/>
        <text x="194" y="36" fill="#5d7180" font-size="18">待审核申请</text>
        <text x="194" y="78" fill="#18323f" font-size="38" font-weight="800">36</text>
        <rect x="344" y="0" width="150" height="104" rx="18" fill="#fff7e8" stroke="#f3e4c0"/>
        <text x="366" y="36" fill="#5d7180" font-size="18">面试安排</text>
        <text x="366" y="78" fill="#18323f" font-size="38" font-weight="800">18</text>
        <rect x="516" y="0" width="112" height="104" rx="18" fill="#fef0f0" stroke="#f6d2d2"/>
        <text x="538" y="36" fill="#5d7180" font-size="18">已录取</text>
        <text x="538" y="78" fill="#18323f" font-size="38" font-weight="800">42</text>
      </g>

      <g transform="translate(682 560)">
        <rect x="0" y="0" width="292" height="188" rx="22" fill="#ffffff" stroke="#d8e7ee"/>
        <text x="24" y="38" fill="#18323f" font-size="24" font-weight="700">导师申请队列</text>
        <g transform="translate(24 62)">
          <rect width="244" height="36" rx="10" fill="#f6f9fb"/>
          <circle cx="20" cy="18" r="10" fill="#4f67e9"/>
          <text x="42" y="23" fill="#18323f" font-size="17" font-weight="700">王同学 · 智能感知</text>
          <rect x="170" y="9" width="58" height="18" rx="9" fill="#e7f7ef"/>
          <text x="184" y="23" fill="#16a06a" font-size="12">通过</text>
        </g>
        <g transform="translate(24 106)">
          <rect width="244" height="36" rx="10" fill="#f6f9fb"/>
          <circle cx="20" cy="18" r="10" fill="#0b6f8f"/>
          <text x="42" y="23" fill="#18323f" font-size="17" font-weight="700">李同学 · 电子信息</text>
          <rect x="170" y="9" width="58" height="18" rx="9" fill="#fff4dd"/>
          <text x="182" y="23" fill="#b7791f" font-size="12">待审</text>
        </g>
        <g transform="translate(24 150)">
          <rect width="244" height="28" rx="10" fill="#f6f9fb"/>
          <circle cx="20" cy="14" r="8" fill="#b6a04b"/>
          <text x="42" y="19" fill="#667985" font-size="15">陈同学 · 数据系统</text>
        </g>
      </g>

      <g transform="translate(1000 560)">
        <rect x="0" y="0" width="306" height="188" rx="22" fill="#ffffff" stroke="#d8e7ee"/>
        <text x="24" y="38" fill="#18323f" font-size="24" font-weight="700">流程状态</text>
        <line x1="44" y1="76" x2="252" y2="76" stroke="#d8e7ee" stroke-width="5" stroke-linecap="round"/>
        <line x1="44" y1="76" x2="178" y2="76" stroke="#0b6f8f" stroke-width="5" stroke-linecap="round"/>
        <g>
          <circle cx="44" cy="76" r="14" fill="#0b6f8f"/>
          <circle cx="112" cy="76" r="14" fill="#0b6f8f"/>
          <circle cx="180" cy="76" r="14" fill="#2f85ee"/>
          <circle cx="252" cy="76" r="14" fill="#e7eef3"/>
        </g>
        <text x="24" y="126" fill="#18323f" font-size="18" font-weight="700">志愿提交</text>
        <text x="116" y="126" fill="#18323f" font-size="18" font-weight="700">导师审核</text>
        <text x="216" y="126" fill="#6c7d8b" font-size="18" font-weight="700">录取确认</text>
        <rect x="24" y="148" width="258" height="20" rx="10" fill="#eef6ff"/>
        <rect x="24" y="148" width="176" height="20" rx="10" fill="#2f85ee"/>
      </g>
    </g>
  </g>

  <g class="cn" filter="url(#soft)">
    <rect x="1112" y="140" width="210" height="82" rx="20" fill="#ffffff" opacity="0.96"/>
    <text x="1140" y="174" fill="#6c7d8b" font-size="17">本轮匹配率</text>
    <text x="1140" y="205" fill="#18323f" font-size="30" font-weight="800">82.4%</text>
    <path d="M1255 198l19-20 13 12 20-30" fill="none" stroke="#16a06a" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>

    <rect x="575" y="730" width="270" height="96" rx="22" fill="#ffffff" opacity="0.96"/>
    <text x="604" y="766" fill="#18323f" font-size="22" font-weight="800">AI 辅助完善材料</text>
    <text x="604" y="799" fill="#6c7d8b" font-size="17">简历、志愿说明、导师主页编辑</text>
  </g>
</svg>`;
}

async function main() {
  const content = svg();
  await fs.writeFile(path.join(outDir, "login-right-panel.svg"), content, "utf8");
  await sharp(Buffer.from(content)).png().toFile(path.join(outDir, "login-right-panel.png"));
  await sharp(Buffer.from(content)).resize({ width: 1000 }).png().toFile(path.join(outDir, "login-right-panel-preview.png"));
  console.log("created login-right-panel.svg");
  console.log("created login-right-panel.png");
  console.log("created login-right-panel-preview.png");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
