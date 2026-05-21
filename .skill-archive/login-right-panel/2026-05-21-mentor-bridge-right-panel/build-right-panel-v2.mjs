import fs from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire("/Users/hybuzhy/Workspace/mentor-student-bridge/frontend/package.json");
const sharp = require("sharp");

const outDir = process.cwd();
const sourceScreenshot =
  "/Users/hybuzhy/Library/Application Support/PixPin/Temp/PixPin_2026-05-21_21-51-14.png";

async function screenshotDataUri() {
  const target = path.join(outDir, "student-dashboard-crop.png");
  await sharp(sourceScreenshot)
    .extract({ left: 610, top: 70, width: 2860, height: 1540 })
    .resize({ width: 1120, height: 604, fit: "cover", position: "top" })
    .sharpen({ sigma: 0.7, m1: 0.8, m2: 1.2 })
    .png()
    .toFile(target);
  const data = await fs.readFile(target);
  return `data:image/png;base64,${data.toString("base64")}`;
}

function svg(dashboardData) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1500" height="1080" viewBox="0 0 1500 1080">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#4f67e9"/>
      <stop offset="0.5" stop-color="#2f85ee"/>
      <stop offset="1" stop-color="#0b6f8f"/>
    </linearGradient>
    <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.22"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity="0.08"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="145%">
      <feDropShadow dx="0" dy="28" stdDeviation="32" flood-color="#063747" flood-opacity="0.26"/>
    </filter>
    <filter id="cardShadow" x="-25%" y="-25%" width="150%" height="150%">
      <feDropShadow dx="0" dy="14" stdDeviation="16" flood-color="#063747" flood-opacity="0.18"/>
    </filter>
    <clipPath id="screenClip">
      <rect x="500" y="230" width="792" height="468" rx="24"/>
    </clipPath>
    <style>
      .cn { font-family: "Hiragino Sans GB", "PingFang SC", "Microsoft YaHei", Arial, sans-serif; }
      .ink { fill: #18323f; }
      .muted { fill: #607384; }
      .blue { fill: #0b6f8f; }
      .white { fill: #ffffff; }
      .softWhite { fill: #dfeaff; }
    </style>
  </defs>

  <rect width="1500" height="1080" rx="34" fill="url(#bg)"/>

  <g opacity="0.18">
    <rect x="-90" y="96" width="330" height="74" rx="37" fill="#ffffff"/>
    <rect x="1084" y="102" width="360" height="88" rx="44" fill="#ffffff"/>
    <rect x="1000" y="852" width="316" height="78" rx="39" fill="#ffffff"/>
    <circle cx="1324" cy="820" r="44" fill="none" stroke="#082e88" stroke-width="18" opacity="0.36"/>
    <circle cx="290" cy="860" r="44" fill="none" stroke="#082e88" stroke-width="18" opacity="0.24"/>
    <circle cx="530" cy="122" r="42" fill="none" stroke="#082e88" stroke-width="18" opacity="0.22"/>
  </g>

  <g class="cn">
    <text x="92" y="116" class="white" font-size="34" font-weight="800">导师双选系统</text>
    <text x="92" y="158" class="softWhite" font-size="22">Mentor · Student Bridge</text>

    <g transform="translate(82 210)" filter="url(#cardShadow)">
      <rect width="320" height="116" rx="22" fill="#ffffff"/>
      <rect x="24" y="25" width="54" height="54" rx="16" fill="#eaf3ff"/>
      <path d="M39 45h25M39 58h25M39 70h15" stroke="#2f85ee" stroke-width="5" stroke-linecap="round"/>
      <circle cx="67" cy="70" r="7" fill="#0b6f8f"/>
      <text x="96" y="46" class="ink" font-size="24" font-weight="800">志愿填报</text>
      <text x="96" y="78" class="muted" font-size="17">按研究方向选择导师</text>
    </g>

    <g transform="translate(82 354)" filter="url(#cardShadow)">
      <rect width="320" height="116" rx="22" fill="#ffffff"/>
      <rect x="24" y="25" width="54" height="54" rx="16" fill="#eaf7f6"/>
      <path d="M39 41h24v24H39z" fill="#f7fbfd" stroke="#0b6f8f" stroke-width="4"/>
      <path d="M39 73l9 8 18-22" fill="none" stroke="#16a06a" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
      <text x="96" y="46" class="ink" font-size="24" font-weight="800">导师审核</text>
      <text x="96" y="78" class="muted" font-size="17">申请材料集中处理</text>
    </g>

    <g transform="translate(82 498)" filter="url(#cardShadow)">
      <rect width="320" height="116" rx="22" fill="#ffffff"/>
      <rect x="24" y="25" width="54" height="54" rx="16" fill="#fff6e4"/>
      <path d="M51 34v35M38 53h26" stroke="#b6a04b" stroke-width="5" stroke-linecap="round"/>
      <circle cx="40" cy="53" r="7" fill="#ffffff" stroke="#b6a04b" stroke-width="4"/>
      <circle cx="64" cy="53" r="7" fill="#ffffff" stroke="#b6a04b" stroke-width="4"/>
      <text x="96" y="46" class="ink" font-size="24" font-weight="800">进度追踪</text>
      <text x="96" y="78" class="muted" font-size="17">待办、消息与录取状态</text>
    </g>

    <g transform="translate(82 708)">
      <text class="white" font-size="48" font-weight="850">研究生导师</text>
      <text y="58" class="white" font-size="48" font-weight="850">双选系统</text>
      <text y="104" class="softWhite" font-size="22">学生工作台 · 志愿填报</text>
      <text y="138" class="softWhite" font-size="22">导师审核 · 录取确认</text>
      <rect y="176" width="246" height="8" rx="4" fill="#ffffff" opacity="0.86"/>
      <rect x="262" y="176" width="78" height="8" rx="4" fill="#ef3f3f" opacity="0.95"/>
    </g>
  </g>

  <g filter="url(#shadow)">
    <rect x="460" y="142" width="900" height="590" rx="34" fill="#ffffff" opacity="0.98"/>
    <rect x="460" y="142" width="900" height="74" rx="34" fill="#f7fbfd"/>
    <rect x="460" y="188" width="900" height="30" fill="#f7fbfd"/>
    <circle cx="504" cy="178" r="8" fill="#ef3f3f"/>
    <circle cx="532" cy="178" r="8" fill="#f1bd4a"/>
    <circle cx="560" cy="178" r="8" fill="#45b981"/>
    <rect x="610" y="162" width="236" height="32" rx="16" fill="#e9f1f6"/>
    <text class="cn muted" x="658" y="184" font-size="18">学生工作台实时预览</text>

    <image href="${dashboardData}" x="500" y="230" width="792" height="468" preserveAspectRatio="xMidYMid slice" clip-path="url(#screenClip)"/>
    <rect x="500" y="230" width="792" height="468" rx="24" fill="none" stroke="#d9e6ec" stroke-width="3"/>
  </g>

  <g class="cn" filter="url(#cardShadow)">
    <rect x="1052" y="706" width="258" height="118" rx="24" fill="#ffffff"/>
    <text x="1080" y="748" class="muted" font-size="18">资料完成度</text>
    <text x="1080" y="794" class="ink" font-size="42" font-weight="850">80%</text>
    <rect x="1160" y="776" width="112" height="16" rx="8" fill="#e8eef4"/>
    <rect x="1160" y="776" width="90" height="16" rx="8" fill="#2f85ee"/>

    <rect x="708" y="748" width="288" height="104" rx="24" fill="#ffffff"/>
    <rect x="736" y="778" width="48" height="48" rx="14" fill="#eef6ff"/>
    <path d="M750 804h22M750 794h22M750 814h12" stroke="#2f85ee" stroke-width="4" stroke-linecap="round"/>
    <text x="804" y="791" class="ink" font-size="23" font-weight="800">第一轮志愿填报中</text>
    <text x="804" y="822" class="muted" font-size="17">截止：2026-06-10 18:00</text>

    <rect x="430" y="748" width="226" height="104" rx="24" fill="#ffffff"/>
    <text x="458" y="790" class="muted" font-size="18">未读消息</text>
    <text x="458" y="828" class="ink" font-size="36" font-weight="850">3</text>
    <circle cx="594" cy="802" r="25" fill="#eef6ff"/>
    <path d="M580 794h28v18h-15l-10 9v-9h-3z" fill="none" stroke="#0b6f8f" stroke-width="4" stroke-linejoin="round"/>
  </g>

  <g class="cn">
    <rect x="1068" y="246" width="242" height="58" rx="29" fill="#ffffff" opacity="0.94"/>
    <circle cx="1100" cy="275" r="13" fill="#16a06a"/>
    <text x="1124" y="284" class="ink" font-size="20" font-weight="800">业务驾驶舱实时同步</text>
  </g>
</svg>`;
}

async function main() {
  const dashboardData = await screenshotDataUri();
  const content = svg(dashboardData);
  await fs.writeFile(path.join(outDir, "login-right-panel-v2.svg"), content, "utf8");
  await sharp(Buffer.from(content)).png().toFile(path.join(outDir, "login-right-panel-v2.png"));
  await sharp(Buffer.from(content))
    .resize({ width: 1000 })
    .png()
    .toFile(path.join(outDir, "login-right-panel-v2-preview.png"));
  console.log("created login-right-panel-v2.svg");
  console.log("created login-right-panel-v2.png");
  console.log("created login-right-panel-v2-preview.png");
  console.log("created student-dashboard-crop.png");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
