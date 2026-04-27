import svgPaths from "./svg-x5lmebmdfn";
import imgRoundedRectangle from "figma:asset/d6cd2ee0417af18455720dd9e3bfd55889c23b3a.png";
import imgRoundedRectangle1 from "figma:asset/d5bfdbb3822d009d1a88f63c61be254bb18401c8.png";
import imgRoundedRectangle2 from "figma:asset/982a23103c80741acd7667d1a04b011f35c87c8b.png";
import imgRoundedRectangle3 from "figma:asset/173ec134c875bbe425802e7883ac16208718ddcf.png";
import imgRoundedRectangle4 from "figma:asset/599ea2d5a162ac0f644866ac22874ad61e62358d.png";
import imgRoundedRectangle5 from "figma:asset/8b449a4a9a3e1198e4d64fb6ef959c9504ae9a85.png";
import imgRoundedRectangle6 from "figma:asset/07f4ded5c607a699ee5c3b965fe3b0385d108ad3.png";
import imgRoundedRectangle7 from "figma:asset/663cc707821b72cb890ba02fb443e1f573fb7584.png";

function Div() {
  return (
    <div className="content-stretch flex items-center overflow-clip relative rounded-[12px] shrink-0" data-name="div">
      <div className="relative shrink-0 size-[36px]" data-name="Rounded rectangle">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgRoundedRectangle} />
      </div>
    </div>
  );
}

function ServiceName() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="service name">
      <p className="font-['Sora:Regular',sans-serif] font-normal leading-[1.3] overflow-ellipsis overflow-hidden relative shrink-0 text-[#121212] text-[14px] text-nowrap">Gametoken (CROSS)</p>
    </div>
  );
}

function Div1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="div">
      <ServiceName />
    </div>
  );
}

function Div2() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="div">
      <Div />
      <Div1 />
    </div>
  );
}

function Div3() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0" data-name="div">
      <Div2 />
    </div>
  );
}

function AppLauncherItem() {
  return (
    <div className="relative rounded-[12px] shrink-0 w-full" data-name="AppLauncher.Item">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center pl-[8px] pr-[12px] py-[8px] relative w-full">
          <Div3 />
        </div>
      </div>
    </div>
  );
}

function Div4() {
  return (
    <div className="content-stretch flex items-center overflow-clip relative rounded-[12px] shrink-0" data-name="div">
      <div className="relative shrink-0 size-[36px]" data-name="Rounded rectangle">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgRoundedRectangle1} />
      </div>
    </div>
  );
}

function ServiceName1() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="service name">
      <p className="font-['Sora:Regular',sans-serif] font-normal leading-[1.3] overflow-ellipsis overflow-hidden relative shrink-0 text-[#121212] text-[14px] text-nowrap">Gametoken (USDT)</p>
    </div>
  );
}

function Div5() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="div">
      <ServiceName1 />
    </div>
  );
}

function Div6() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="div">
      <Div4 />
      <Div5 />
    </div>
  );
}

function Div7() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0" data-name="div">
      <Div6 />
    </div>
  );
}

function AppLauncherItem1() {
  return (
    <div className="relative rounded-[12px] shrink-0 w-full" data-name="AppLauncher.Item">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center pl-[8px] pr-[12px] py-[8px] relative w-full">
          <Div7 />
        </div>
      </div>
    </div>
  );
}

function Div8() {
  return (
    <div className="content-stretch flex items-center overflow-clip relative rounded-[12px] shrink-0" data-name="div">
      <div className="relative shrink-0 size-[36px]" data-name="Rounded rectangle">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgRoundedRectangle1} />
      </div>
      <div className="absolute pointer-events-none right-0 rounded-bl-[8px] size-[16px] top-0" data-name="Rounded rectangle">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover rounded-bl-[8px] size-full" src={imgRoundedRectangle2} />
        <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-[-2px] rounded-bl-[10px]" />
      </div>
    </div>
  );
}

function ServiceName2() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="service name">
      <p className="font-['Sora:Regular',sans-serif] font-normal leading-[1.3] overflow-ellipsis overflow-hidden relative shrink-0 text-[#121212] text-[14px] text-nowrap">Gametoken - Verse8 (USDT)</p>
    </div>
  );
}

function Div9() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="div">
      <ServiceName2 />
    </div>
  );
}

function Div10() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="div">
      <Div8 />
      <Div9 />
    </div>
  );
}

function Div11() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0" data-name="div">
      <Div10 />
    </div>
  );
}

function AppLauncherItem2() {
  return (
    <div className="relative rounded-[12px] shrink-0 w-full" data-name="AppLauncher.Item">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center pl-[8px] pr-[12px] py-[8px] relative w-full">
          <Div11 />
        </div>
      </div>
    </div>
  );
}

function Group() {
  return (
    <div className="h-[36px] relative shrink-0 w-[30.858px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30.8571 36">
        <g id="Group 1597894084">
          <path d={svgPaths.p2fb11080} fill="var(--fill-0, #3AAA63)" id="Rectangle 161124041" />
          <path d={svgPaths.pea66000} fill="var(--fill-0, #56C880)" id="Rectangle 161124042" />
          <path d={svgPaths.p96c4db0} fill="var(--fill-0, #56C880)" id="Rectangle 161124043" />
          <path d={svgPaths.p38925340} fill="var(--fill-0, #56C880)" id="Rectangle 161124044" />
          <path d={svgPaths.p2ef6f000} fill="var(--fill-0, #56C880)" id="Rectangle 161124092" />
          <path d={svgPaths.p27a76640} fill="var(--fill-0, #56C880)" id="Rectangle 161124095" />
          <path d={svgPaths.p3978a9d2} fill="var(--fill-0, #3AAA63)" id="Rectangle 161124045" />
          <path d={svgPaths.p217bc300} fill="var(--fill-0, #56C880)" id="Rectangle 161124047" />
          <path d={svgPaths.p14ea7bc0} fill="var(--fill-0, #56C880)" id="Rectangle 161124048" />
          <path d={svgPaths.p1f7ecc80} fill="var(--fill-0, #3AAA63)" id="Rectangle 161124049" />
          <path d={svgPaths.p21d37f00} fill="var(--fill-0, #3AAA63)" id="Rectangle 161124051" />
          <path d={svgPaths.p2f04e1c0} fill="var(--fill-0, #56C880)" id="Rectangle 161124052" />
          <path d={svgPaths.p13dd3a00} fill="var(--fill-0, #56C880)" id="Rectangle 161124053" />
          <path d={svgPaths.pbe7d00} fill="var(--fill-0, #3AAA63)" id="Rectangle 161124054" />
          <path d={svgPaths.p209b8f00} fill="var(--fill-0, #3AAA63)" id="Rectangle 161124055" />
          <path d={svgPaths.p365b6700} fill="var(--fill-0, #56C880)" id="Rectangle 161124094" />
          <path d={svgPaths.pb3e7a00} fill="var(--fill-0, #56C880)" id="Rectangle 161124056" />
          <path d={svgPaths.p2d86ca00} fill="var(--fill-0, #56C880)" id="Rectangle 161124057" />
          <path d={svgPaths.pbace7e0} fill="var(--fill-0, #56C880)" id="Rectangle 161124058" />
          <path d={svgPaths.p2fa46f80} fill="var(--fill-0, #56C880)" id="Rectangle 161124090" />
          <path d={svgPaths.p15df3500} fill="var(--fill-0, #3AAA63)" id="Rectangle 161124062" />
          <path d={svgPaths.p22a1d900} fill="var(--fill-0, #56C880)" id="Rectangle 161124064" />
          <path d={svgPaths.p1f58eb00} fill="var(--fill-0, #56C880)" id="Rectangle 161124065" />
          <path d={svgPaths.p11451c80} fill="var(--fill-0, #56C880)" id="Rectangle 161124066" />
          <path d={svgPaths.pb8b5000} fill="var(--fill-0, #56C880)" id="Rectangle 161124067" />
          <path d={svgPaths.p3e6c5480} fill="var(--fill-0, #3AAA63)" id="Rectangle 161124068" />
          <path d={svgPaths.p1f8a600} fill="var(--fill-0, #56C880)" id="Rectangle 161124069" />
          <path d={svgPaths.p33d98600} fill="var(--fill-0, #3AAA63)" id="Rectangle 161124070" />
          <path d={svgPaths.p1669ba00} fill="var(--fill-0, #56C880)" id="Rectangle 161124071" />
          <path d={svgPaths.p33685000} fill="var(--fill-0, #3AAA63)" id="Rectangle 161124072" />
          <path d={svgPaths.p15b532f0} fill="var(--fill-0, #56C880)" id="Rectangle 161124091" />
          <path d={svgPaths.p33035180} fill="var(--fill-0, #56C880)" id="Rectangle 161124075" />
          <path d={svgPaths.pf046d80} fill="var(--fill-0, #3AAA63)" id="Rectangle 161124076" />
          <path d={svgPaths.p39f29bf0} fill="var(--fill-0, #56C880)" id="Rectangle 161124077" />
          <path d={svgPaths.p17f85000} fill="var(--fill-0, #56C880)" id="Rectangle 161124093" />
          <path d={svgPaths.p1517e3c0} fill="var(--fill-0, #56C880)" id="Rectangle 161124096" />
          <path d={svgPaths.pfba1c00} fill="var(--fill-0, #56C880)" id="Rectangle 161124078" />
          <path d={svgPaths.p20083400} fill="var(--fill-0, #3AAA63)" id="Rectangle 161124079" />
          <path d={svgPaths.p163c6e80} fill="var(--fill-0, #56C880)" id="Rectangle 161124080" />
          <path d={svgPaths.p37f5a280} fill="var(--fill-0, #56C880)" id="Rectangle 161124082" />
          <path d={svgPaths.p525ee00} fill="var(--fill-0, #56C880)" id="Rectangle 161124083" />
          <path d={svgPaths.p12ae8280} fill="var(--fill-0, #56C880)" id="Rectangle 161124085" />
          <path d={svgPaths.p1c097800} fill="var(--fill-0, #56C880)" id="Rectangle 161124087" />
          <rect fill="var(--fill-0, #15161A)" height="2.13729" id="Rectangle 161124100" width="2.13729" x="18.4341" y="4.141" />
          <rect fill="var(--fill-0, #15161A)" height="2.13729" id="Rectangle 161124101" width="2.13729" x="23.5102" y="4.141" />
        </g>
      </svg>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-[36px]">
      <Group />
    </div>
  );
}

function ServiceName3() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="service name">
      <p className="font-['Sora:Regular',sans-serif] font-normal leading-[1.3] overflow-ellipsis overflow-hidden relative shrink-0 text-[#121212] text-[14px] text-nowrap">Forge</p>
    </div>
  );
}

function New() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="new">
      <div className="absolute inset-0" style={{ "--fill-0": "rgba(231, 0, 119, 1)" } as React.CSSProperties}>
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
          <g id="new">
            <rect fill="var(--fill-0, #E70077)" height="16" rx="8" width="16" />
            <path d={svgPaths.p354aa5b0} fill="var(--fill-0, white)" id="N" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Div12() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="div">
      <ServiceName3 />
      <New />
    </div>
  );
}

function Div13() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="div">
      <Frame />
      <Div12 />
    </div>
  );
}

function Div14() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0" data-name="div">
      <Div13 />
    </div>
  );
}

function AppLauncherItem3() {
  return (
    <div className="relative rounded-[12px] shrink-0 w-full" data-name="AppLauncher.Item">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center pl-[8px] pr-[12px] py-[8px] relative w-full">
          <Div14 />
        </div>
      </div>
    </div>
  );
}

function Div15() {
  return (
    <div className="content-stretch flex items-center overflow-clip relative rounded-[12px] shrink-0" data-name="div">
      <div className="relative shrink-0 size-[36px]" data-name="Rounded rectangle">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgRoundedRectangle3} />
      </div>
    </div>
  );
}

function ServiceName4() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="service name">
      <p className="font-['Sora:Regular',sans-serif] font-normal leading-[1.3] overflow-ellipsis overflow-hidden relative shrink-0 text-[#121212] text-[14px] text-nowrap">Game Reward</p>
    </div>
  );
}

function Div16() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="div">
      <ServiceName4 />
    </div>
  );
}

function Div17() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="div">
      <Div15 />
      <Div16 />
    </div>
  );
}

function Div18() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0" data-name="div">
      <Div17 />
    </div>
  );
}

function AppLauncherItem4() {
  return (
    <div className="relative rounded-[12px] shrink-0 w-full" data-name="AppLauncher.Item">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center pl-[8px] pr-[12px] py-[8px] relative w-full">
          <Div18 />
        </div>
      </div>
    </div>
  );
}

function Div19() {
  return (
    <div className="content-stretch flex items-center overflow-clip relative rounded-[12px] shrink-0" data-name="div">
      <div className="relative shrink-0 size-[36px]" data-name="Rounded rectangle">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgRoundedRectangle4} />
      </div>
    </div>
  );
}

function ServiceName5() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="service name">
      <p className="font-['Sora:Regular',sans-serif] font-normal leading-[1.3] overflow-ellipsis overflow-hidden relative shrink-0 text-[#121212] text-[14px] text-nowrap">CROSS Wave</p>
    </div>
  );
}

function Div20() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="div">
      <ServiceName5 />
    </div>
  );
}

function Div21() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="div">
      <Div19 />
      <Div20 />
    </div>
  );
}

function Div22() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0" data-name="div">
      <Div21 />
    </div>
  );
}

function AppLauncherItem5() {
  return (
    <div className="relative rounded-[12px] shrink-0 w-full" data-name="AppLauncher.Item">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center pl-[8px] pr-[12px] py-[8px] relative w-full">
          <Div22 />
        </div>
      </div>
    </div>
  );
}

function Div23() {
  return (
    <div className="content-stretch flex items-center overflow-clip relative rounded-[12px] shrink-0" data-name="div">
      <div className="relative shrink-0 size-[36px]" data-name="Rounded rectangle">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgRoundedRectangle5} />
      </div>
    </div>
  );
}

function ServiceName6() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="service name">
      <p className="font-['Sora:Regular',sans-serif] font-normal leading-[1.3] overflow-ellipsis overflow-hidden relative shrink-0 text-[#121212] text-[14px] text-nowrap">NFT Market</p>
    </div>
  );
}

function Div24() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="div">
      <ServiceName6 />
    </div>
  );
}

function Div25() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="div">
      <Div23 />
      <Div24 />
    </div>
  );
}

function Div26() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0" data-name="div">
      <Div25 />
    </div>
  );
}

function AppLauncherItem6() {
  return (
    <div className="relative rounded-[12px] shrink-0 w-full" data-name="AppLauncher.Item">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center pl-[8px] pr-[12px] py-[8px] relative w-full">
          <Div26 />
        </div>
      </div>
    </div>
  );
}

function Div27() {
  return (
    <div className="content-stretch flex items-center overflow-clip relative rounded-[12px] shrink-0" data-name="div">
      <div className="relative shrink-0 size-[36px]" data-name="Rounded rectangle">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgRoundedRectangle6} />
      </div>
    </div>
  );
}

function ServiceName7() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="service name">
      <p className="font-['Sora:Regular',sans-serif] font-normal leading-[1.3] overflow-ellipsis overflow-hidden relative shrink-0 text-[#121212] text-[14px] text-nowrap">Bridge</p>
    </div>
  );
}

function Div28() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="div">
      <ServiceName7 />
    </div>
  );
}

function Div29() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="div">
      <Div27 />
      <Div28 />
    </div>
  );
}

function Div30() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0" data-name="div">
      <Div29 />
    </div>
  );
}

function AppLauncherItem7() {
  return (
    <div className="relative rounded-[12px] shrink-0 w-full" data-name="AppLauncher.Item">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center pl-[8px] pr-[12px] py-[8px] relative w-full">
          <Div30 />
        </div>
      </div>
    </div>
  );
}

function Div31() {
  return (
    <div className="content-stretch flex items-center overflow-clip relative rounded-[12px] shrink-0" data-name="div">
      <div className="relative shrink-0 size-[36px]" data-name="Rounded rectangle">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgRoundedRectangle7} />
      </div>
    </div>
  );
}

function ServiceName8() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="service name">
      <p className="font-['Sora:Regular',sans-serif] font-normal leading-[1.3] overflow-ellipsis overflow-hidden relative shrink-0 text-[#121212] text-[14px] text-nowrap">CROSS Explorer</p>
    </div>
  );
}

function Div32() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="div">
      <ServiceName8 />
    </div>
  );
}

function Div33() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="div">
      <Div31 />
      <Div32 />
    </div>
  );
}

function Div34() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0" data-name="div">
      <Div33 />
    </div>
  );
}

function AppLauncherItem8() {
  return (
    <div className="relative rounded-[12px] shrink-0 w-full" data-name="AppLauncher.Item">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center pl-[8px] pr-[12px] py-[8px] relative w-full">
          <Div34 />
        </div>
      </div>
    </div>
  );
}

function Div35() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center p-[16px] relative shrink-0" data-name="div">
      <AppLauncherItem />
      <AppLauncherItem1 />
      <AppLauncherItem2 />
      <AppLauncherItem3 />
      <AppLauncherItem4 />
      <AppLauncherItem5 />
      <AppLauncherItem6 />
      <AppLauncherItem7 />
      <AppLauncherItem8 />
    </div>
  );
}

export default function Div36() {
  return (
    <div className="bg-white relative rounded-[20px] size-full" data-name="div">
      <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[inherit] size-full">
        <Div35 />
      </div>
      <div aria-hidden="true" className="absolute border-[6px] border-[rgba(18,18,18,0.15)] border-solid inset-0 pointer-events-none rounded-[20px]" />
    </div>
  );
}