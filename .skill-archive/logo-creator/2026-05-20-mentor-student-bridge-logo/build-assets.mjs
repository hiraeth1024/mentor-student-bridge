import fs from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire("/Users/hybuzhy/Workspace/mentor-student-bridge/frontend/package.json");
const sharp = require("sharp");

const outDir = process.cwd();
const schoolLogo = "/Users/hybuzhy/Desktop/OIP.webp";
const collegeLogo = "/Users/hybuzhy/Downloads/微信图片_20260520191155_18_35.jpg";

const colors = {
  navy: "#073f57",
  teal: "#0b6f8f",
  blue: "#2f85ee",
  blueDark: "#1767c7",
  red: "#ef3f3f",
  gold: "#b6a04b",
  olive: "#799850",
  ink: "#18323f",
  muted: "#667985",
  bg: "#ffffff",
  line: "#d7e5ec",
};

function esc(text) {
  return text.replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&apos;",
  })[c]);
}

async function toDataUri(file) {
  const ext = path.extname(file).slice(1).toLowerCase().replace("jpg", "jpeg");
  const data = await fs.readFile(file);
  return `data:image/${ext};base64,${data.toString("base64")}`;
}

async function prepReferenceImages() {
  await sharp(schoolLogo)
    .trim({ background: "#ffffff", threshold: 18 })
    .resize({ width: 1180, height: 1180, fit: "contain", background: "#ffffff", kernel: sharp.kernel.lanczos3 })
    .sharpen({ sigma: 1.2, m1: 1.1, m2: 1.8 })
    .png()
    .toFile(path.join(outDir, "school-logo-upscaled.png"));

  await sharp(collegeLogo)
    .trim({ background: "#ffffff", threshold: 18 })
    .resize({ width: 1180, height: 1180, fit: "contain", background: "#ffffff", kernel: sharp.kernel.lanczos3 })
    .sharpen({ sigma: 1.1, m1: 1.05, m2: 1.7 })
    .png()
    .toFile(path.join(outDir, "college-logo-upscaled.png"));
}

function combinedLogoSvg(schoolData, collegeData) {
  const zh = "浙江工商大学信息与电子工程学院";
  const en1 = "School of Information and Electronic Engineering";
  const en2 = "Zhejiang Gongshang University";
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="3200" height="1200" viewBox="0 0 3200 1200">
  <rect width="3200" height="1200" fill="${colors.bg}"/>
  <rect x="115" y="120" width="2970" height="830" rx="42" fill="#ffffff" stroke="${colors.line}" stroke-width="3"/>
  <g transform="translate(190 185)">
    <circle cx="330" cy="330" r="330" fill="#fff" stroke="${colors.line}" stroke-width="2"/>
    <image href="${schoolData}" x="58" y="58" width="544" height="544" preserveAspectRatio="xMidYMid meet"/>
  </g>
  <line x1="900" y1="225" x2="900" y2="875" stroke="${colors.line}" stroke-width="4"/>
  <g transform="translate(1010 215)">
    <rect x="0" y="0" width="650" height="650" rx="48" fill="#ffffff"/>
    <image href="${collegeData}" x="80" y="80" width="490" height="490" preserveAspectRatio="xMidYMid meet"/>
  </g>
  <g font-family="Hiragino Sans GB, STHeiti, PingFang SC, Microsoft YaHei, Arial, sans-serif">
    <text x="1710" y="384" fill="${colors.ink}" font-size="76" font-weight="700" letter-spacing="1">${esc(zh)}</text>
    <text x="1710" y="488" fill="${colors.teal}" font-size="44" font-weight="600" letter-spacing="0.5">${esc(en1)}</text>
    <text x="1710" y="558" fill="${colors.muted}" font-size="36" font-weight="500" letter-spacing="2.4">${esc(en2.toUpperCase())}</text>
    <rect x="1710" y="615" width="520" height="8" rx="4" fill="${colors.blue}"/>
    <rect x="2246" y="615" width="90" height="8" rx="4" fill="${colors.red}"/>
    <text x="1710" y="705" fill="${colors.muted}" font-size="30" font-weight="400" letter-spacing="1.2">${esc("Mentor-Student Bridge · Graduate Admission Matching System")}</text>
  </g>
</svg>`;
}

function projectLogoSvg() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1600" viewBox="0 0 1600 1600">
  <rect width="1600" height="1600" rx="260" fill="#ffffff"/>
  <rect x="90" y="90" width="1420" height="1420" rx="230" fill="#f6fbfd" stroke="${colors.line}" stroke-width="18"/>
  <g transform="translate(255 250)">
    <path d="M180 790 C310 610 455 535 545 535 C635 535 780 610 910 790" fill="none" stroke="${colors.navy}" stroke-width="82" stroke-linecap="round"/>
    <path d="M222 790 C345 650 463 595 545 595 C627 595 745 650 868 790" fill="none" stroke="${colors.blue}" stroke-width="44" stroke-linecap="round"/>
    <circle cx="175" cy="790" r="92" fill="#ffffff" stroke="${colors.navy}" stroke-width="46"/>
    <circle cx="915" cy="790" r="92" fill="#ffffff" stroke="${colors.navy}" stroke-width="46"/>
    <circle cx="545" cy="535" r="92" fill="#ffffff" stroke="${colors.blue}" stroke-width="46"/>
    <path d="M545 210 L760 325 L760 570 L545 690 L330 570 L330 325 Z" fill="#ffffff" stroke="${colors.teal}" stroke-width="42" stroke-linejoin="round"/>
    <path d="M545 288 L690 365 L690 532 L545 612 L400 532 L400 365 Z" fill="#e9f5fa" stroke="${colors.blue}" stroke-width="24" stroke-linejoin="round"/>
    <path d="M545 300 V600 M405 380 L685 380 M405 510 L685 510" stroke="${colors.teal}" stroke-width="26" stroke-linecap="round"/>
    <path d="M303 325 H195 Q150 325 150 370 V515" fill="none" stroke="${colors.gold}" stroke-width="30" stroke-linecap="round"/>
    <path d="M787 325 H895 Q940 325 940 370 V515" fill="none" stroke="${colors.gold}" stroke-width="30" stroke-linecap="round"/>
    <circle cx="150" cy="565" r="30" fill="${colors.gold}"/>
    <circle cx="940" cy="565" r="30" fill="${colors.gold}"/>
    <rect x="96" y="105" width="112" height="112" rx="28" fill="${colors.red}"/>
  </g>
  <g font-family="Hiragino Sans GB, STHeiti, PingFang SC, Microsoft YaHei, Arial, sans-serif" text-anchor="middle">
    <text x="800" y="1265" fill="${colors.ink}" font-size="136" font-weight="800">导师双选系统</text>
    <text x="800" y="1365" fill="${colors.teal}" font-size="54" font-weight="600" letter-spacing="4">MENTOR-STUDENT BRIDGE</text>
  </g>
</svg>`;
}

function projectMarkSvg() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">
  <rect width="1024" height="1024" rx="190" fill="#f6fbfd"/>
  <path d="M214 706 C326 552 438 496 512 496 C586 496 698 552 810 706" fill="none" stroke="${colors.navy}" stroke-width="58" stroke-linecap="round"/>
  <path d="M255 704 C354 590 451 544 512 544 C573 544 670 590 769 704" fill="none" stroke="${colors.blue}" stroke-width="30" stroke-linecap="round"/>
  <circle cx="208" cy="706" r="66" fill="#fff" stroke="${colors.navy}" stroke-width="34"/>
  <circle cx="816" cy="706" r="66" fill="#fff" stroke="${colors.navy}" stroke-width="34"/>
  <circle cx="512" cy="496" r="66" fill="#fff" stroke="${colors.blue}" stroke-width="34"/>
  <path d="M512 180 L685 273 L685 470 L512 568 L339 470 L339 273 Z" fill="#ffffff" stroke="${colors.teal}" stroke-width="34" stroke-linejoin="round"/>
  <path d="M512 240 L625 300 L625 430 L512 492 L399 430 L399 300 Z" fill="#e9f5fa" stroke="${colors.blue}" stroke-width="20" stroke-linejoin="round"/>
  <path d="M512 250 V482 M405 314 L619 314 M405 415 L619 415" stroke="${colors.teal}" stroke-width="20" stroke-linecap="round"/>
  <rect x="160" y="138" width="82" height="82" rx="22" fill="${colors.red}"/>
</svg>`;
}

function wordmarkSvg() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="2400" height="900" viewBox="0 0 2400 900">
  <rect width="2400" height="900" fill="#ffffff"/>
  <g transform="translate(150 110) scale(0.66)">
    ${projectMarkSvg().replace(/<\?xml.*?\?>/, "").replace(/<svg[^>]*>/, "").replace("</svg>", "")}
  </g>
  <g font-family="Hiragino Sans GB, STHeiti, PingFang SC, Microsoft YaHei, Arial, sans-serif">
    <text x="870" y="360" fill="${colors.ink}" font-size="156" font-weight="800">导师双选系统</text>
    <text x="875" y="480" fill="${colors.teal}" font-size="58" font-weight="650" letter-spacing="4">MENTOR-STUDENT BRIDGE</text>
    <text x="875" y="575" fill="${colors.muted}" font-size="42" font-weight="450">浙江工商大学信息与电子工程学院</text>
    <text x="875" y="642" fill="${colors.muted}" font-size="31" font-weight="400" letter-spacing="1">School of Information and Electronic Engineering</text>
    <text x="875" y="695" fill="${colors.muted}" font-size="29" font-weight="400" letter-spacing="1.4">Zhejiang Gongshang University</text>
  </g>
</svg>`;
}

function previewHtml() {
  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Mentor Student Bridge Logo Preview</title>
  <style>
    body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, "Hiragino Sans GB", "PingFang SC", sans-serif; background: #f4f7f9; color: #18323f; }
    main { max-width: 1160px; margin: 0 auto; padding: 48px 24px; }
    h1 { font-size: 28px; margin: 0 0 8px; }
    p { color: #667985; margin: 0 0 28px; }
    section { margin: 28px 0 44px; }
    h2 { font-size: 18px; margin: 0 0 16px; }
    .panel { background: white; border: 1px solid #d7e5ec; border-radius: 8px; padding: 22px; }
    img { display: block; max-width: 100%; height: auto; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; align-items: start; }
    @media (max-width: 760px) { .grid { grid-template-columns: 1fr; } }
  </style>
</head>
<body>
  <main>
    <h1>导师双选系统 LOGO 预览</h1>
    <p>包含校院合并署名版、项目独立标识和横向项目字标。</p>
    <section>
      <h2>校院合并署名版</h2>
      <div class="panel"><img src="zjgsu-siee-combined.png" alt="浙江工商大学信息与电子工程学院合并署名 LOGO"></div>
    </section>
    <section class="grid">
      <div>
        <h2>项目方形 LOGO</h2>
        <div class="panel"><img src="mentor-student-bridge-logo.png" alt="导师双选系统项目 LOGO"></div>
      </div>
      <div>
        <h2>项目图标</h2>
        <div class="panel"><img src="mentor-student-bridge-mark.png" alt="导师双选系统图标"></div>
      </div>
    </section>
    <section>
      <h2>项目横向字标</h2>
      <div class="panel"><img src="mentor-student-bridge-wordmark.png" alt="导师双选系统横向字标"></div>
    </section>
  </main>
</body>
</html>`;
}

async function renderSvg(name, svg, width) {
  await fs.writeFile(path.join(outDir, `${name}.svg`), svg, "utf8");
  await sharp(Buffer.from(svg)).resize({ width }).png().toFile(path.join(outDir, `${name}.png`));
}

async function main() {
  await prepReferenceImages();
  const schoolData = await toDataUri(path.join(outDir, "school-logo-upscaled.png"));
  const collegeData = await toDataUri(path.join(outDir, "college-logo-upscaled.png"));

  await renderSvg("zjgsu-siee-combined", combinedLogoSvg(schoolData, collegeData), 3200);
  await renderSvg("mentor-student-bridge-logo", projectLogoSvg(), 1600);
  await renderSvg("mentor-student-bridge-mark", projectMarkSvg(), 1024);
  await renderSvg("mentor-student-bridge-wordmark", wordmarkSvg(), 2400);
  await fs.writeFile(path.join(outDir, "preview.html"), previewHtml(), "utf8");

  const files = await fs.readdir(outDir);
  console.log(files.sort().join("\n"));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
