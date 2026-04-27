import svgPaths from "./svg-1mnqj2bjha";
import crossIcon from "figma:asset/310adedabfd22f48a397c51de763ba1bc687b3ca.png";
import { useTheme } from "../app/App";

function Frame() {
  const { effectiveTheme } = useTheme();
  return (
    <div className="content-stretch flex h-[19px] items-center relative shrink-0 w-full">
      <p className={`font-['Sora:SemiBold',sans-serif] font-semibold leading-[1.4] relative shrink-0 text-[13px] text-nowrap ${
        effectiveTheme === 'dark' ? 'text-gray-100' : 'text-[#192023]'
      }`}>Swap Info</p>
    </div>
  );
}

function TokenWithNetwork() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Token_with_Network">
      <img src={crossIcon} alt="CROSS" className="w-full h-full object-cover rounded-full" />
    </div>
  );
}

function Arrow02Right() {
  return (
    <div className="h-[8px] relative shrink-0 w-[5px]" data-name="arrow-02-right">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 8">
        <g id="arrow-02-right">
          <path d={svgPaths.p3430c300} fill="var(--fill-0, #88939D)" id="Vector 6403 (Stroke)" />
        </g>
      </svg>
    </div>
  );
}

function Group4() {
  return (
    <div className="[grid-area:1_/_1] h-[11.691px] ml-0 mt-0 relative w-[7.474px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.47414 11.6906">
        <g id="Group 201">
          <path d={svgPaths.p28d16100} fill="var(--fill-0, #00D5AA)" id="Subtract" />
          <rect fill="var(--fill-0, #00D5AA)" height="11.2585" id="Rectangle 97" width="1.37507" x="3.23625" y="0.432054" />
        </g>
      </svg>
    </div>
  );
}

function Group() {
  return (
    <div className="[grid-area:1_/_1] grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[6.26px] mt-[4.15px] place-items-start relative">
      <Group4 />
    </div>
  );
}

function Group8() {
  return (
    <div className="[grid-area:1_/_1] grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative">
      <div className="[grid-area:1_/_1] ml-0 mt-0 relative size-[20px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
          <path d={svgPaths.p25566600} fill="var(--fill-0, #00D5AA)" id="Vector" />
        </svg>
      </div>
      <div className="[grid-area:1_/_1] h-[17.238px] ml-[1.38px] mt-[1.38px] relative w-[16.102px]" data-name="Subtract">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.1023 17.2383">
          <path d={svgPaths.p24daba70} fill="var(--fill-0, #00D5AA)" id="Subtract" />
        </svg>
      </div>
      <Group />
    </div>
  );
}

function Group5() {
  return (
    <div className="[grid-area:1_/_1] h-[10.827px] ml-0 mt-0 relative w-[6.922px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.92195 10.8266">
        <g id="Group 201">
          <path d={svgPaths.p1d8aed00} fill="var(--fill-0, #00D5AA)" id="Subtract" />
        </g>
      </svg>
    </div>
  );
}

function Group1() {
  return (
    <div className="[grid-area:1_/_1] grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[6.54px] mt-[4.59px] place-items-start relative">
      <Group5 />
    </div>
  );
}

function Group9() {
  return (
    <div className="[grid-area:1_/_1] grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative">
      <div className="[grid-area:1_/_1] ml-0 mt-0 relative size-[20px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
          <path d={svgPaths.p25566600} fill="var(--fill-0, black)" id="Vector" />
        </svg>
      </div>
      <div className="[grid-area:1_/_1] ml-[1.65px] mt-[1.65px] relative size-[16.701px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.7012 16.7012">
          <path d={svgPaths.p2c6e100} id="Vector" stroke="var(--stroke-0, #00D5AA)" strokeWidth="1.6" />
        </svg>
      </div>
      <Group1 />
    </div>
  );
}

function Group12() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <Group8 />
      <Group9 />
      <div className="[grid-area:1_/_1] h-[7.161px] ml-[14.68px] mt-[6.42px] relative w-[3.858px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.85816 7.16064">
          <path d={svgPaths.p253bb700} fill="var(--fill-0, black)" id="Rectangle 111" />
        </svg>
      </div>
    </div>
  );
}

function Div() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-center justify-end min-h-px min-w-px relative shrink-0" data-name="div">
      <TokenWithNetwork />
      <Arrow02Right />
      <Group12 />
    </div>
  );
}

function OrderType() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0 w-full" data-name="Order Type">
      <p className="font-['Sora:Regular',sans-serif] font-normal leading-[1.4] relative shrink-0 text-[#4c5863] text-[13px] text-nowrap">Route</p>
      <Div />
    </div>
  );
}

function Div1() {
  return (
    <div className="basis-0 content-stretch flex gap-[24px] items-center relative shrink-0 w-full" data-name="Order Type">
      <p className="font-['Sora:Regular',sans-serif] font-normal leading-[1.4] relative shrink-0 text-[#4c5863] text-[13px] text-nowrap">Slippage (0.5%)</p>
      <div className="basis-0 content-stretch flex gap-[8px] grow items-center justify-end min-h-px min-w-px relative shrink-0">
        <TokenWithNetwork />
        <p className="font-['Sora:Regular',sans-serif] font-normal leading-[1.4] relative shrink-0 text-[#4c5863] text-[13px] text-nowrap text-right">0.00500000</p>
      </div>
    </div>
  );
}

function OrderType1() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0 w-full" data-name="Order Type">
      <p className="[text-underline-offset:25%] decoration-dotted font-['Sora:Regular',sans-serif] font-normal leading-[1.4] relative shrink-0 text-[#4c5863] text-[13px] text-nowrap underline">Price Impact</p>
      <Div1 />
    </div>
  );
}

function Div2() {
  const { effectiveTheme } = useTheme();
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-center justify-end min-h-px min-w-px relative shrink-0" data-name="div">
      <TokenWithNetwork />
      <p className={`font-['Sora:Regular',sans-serif] font-normal leading-[1.4] relative shrink-0 text-[13px] text-nowrap text-right ${
        effectiveTheme === 'dark' ? 'text-white' : 'text-gray-900'
      }`}>10.00000000</p>
    </div>
  );
}

function OrderType2() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0 w-full" data-name="Order Type">
      <p className="font-['Sora:Regular',sans-serif] font-normal leading-[1.4] relative shrink-0 text-[#4c5863] text-[13px] text-nowrap">In Amount</p>
      <Div2 />
    </div>
  );
}

function Div3() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-center justify-end min-h-px min-w-px relative shrink-0" data-name="div">
      <TokenWithNetwork />
      <p className="font-['Sora:Regular',sans-serif] font-normal leading-[1.4] relative shrink-0 text-[#4c5863] text-[13px] text-nowrap text-right">0.0100</p>
    </div>
  );
}

function OrderType3() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0 w-full" data-name="Order Type">
      <p className="font-['Sora:Regular',sans-serif] font-normal leading-[1.4] relative shrink-0 text-[#4c5863] text-[13px] text-nowrap">Protocol Fee (1.0%)</p>
      <Div3 />
    </div>
  );
}

function Div3_1() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-center justify-end min-h-px min-w-px relative shrink-0" data-name="div">
      <TokenWithNetwork />
      <p className="font-['Sora:Regular',sans-serif] font-normal leading-[1.4] relative shrink-0 text-[#4c5863] text-[13px] text-nowrap text-right">0.0050</p>
    </div>
  );
}

function OrderType3_1() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0 w-full" data-name="Order Type">
      <p className="font-['Sora:Regular',sans-serif] font-normal leading-[1.4] relative shrink-0 text-[#4c5863] text-[13px] text-nowrap">Creator Fee (0.3%)</p>
      <Div3_1 />
    </div>
  );
}

function Group6() {
  return (
    <div className="[grid-area:1_/_1] h-[11.691px] ml-0 mt-0 relative w-[7.474px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.47414 11.6906">
        <g id="Group 201">
          <path d={svgPaths.p28d16100} fill="var(--fill-0, #00D5AA)" id="Subtract" />
          <rect fill="var(--fill-0, #00D5AA)" height="11.2585" id="Rectangle 97" width="1.37507" x="3.23625" y="0.432054" />
        </g>
      </svg>
    </div>
  );
}

function Group2() {
  return (
    <div className="[grid-area:1_/_1] grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[6.26px] mt-[4.15px] place-items-start relative">
      <Group6 />
    </div>
  );
}

function Group10() {
  return (
    <div className="[grid-area:1_/_1] grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative">
      <div className="[grid-area:1_/_1] ml-0 mt-0 relative size-[20px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
          <path d={svgPaths.p25566600} fill="var(--fill-0, #00D5AA)" id="Vector" />
        </svg>
      </div>
      <div className="[grid-area:1_/_1] h-[17.238px] ml-[1.38px] mt-[1.38px] relative w-[16.102px]" data-name="Subtract">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.1023 17.2383">
          <path d={svgPaths.p24daba70} fill="var(--fill-0, #00D5AA)" id="Subtract" />
        </svg>
      </div>
      <Group2 />
    </div>
  );
}

function Group7() {
  return (
    <div className="[grid-area:1_/_1] h-[10.827px] ml-0 mt-0 relative w-[6.922px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.92195 10.8266">
        <g id="Group 201">
          <path d={svgPaths.p1d8aed00} fill="var(--fill-0, #00D5AA)" id="Subtract" />
        </g>
      </svg>
    </div>
  );
}

function Group3() {
  return (
    <div className="[grid-area:1_/_1] grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[6.54px] mt-[4.59px] place-items-start relative">
      <Group7 />
    </div>
  );
}

function Group11() {
  return (
    <div className="[grid-area:1_/_1] grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative">
      <div className="[grid-area:1_/_1] ml-0 mt-0 relative size-[20px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
          <path d={svgPaths.p25566600} fill="var(--fill-0, black)" id="Vector" />
        </svg>
      </div>
      <div className="[grid-area:1_/_1] ml-[1.65px] mt-[1.65px] relative size-[16.701px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.7012 16.7012">
          <path d={svgPaths.p2c6e100} id="Vector" stroke="var(--stroke-0, #00D5AA)" strokeWidth="1.6" />
        </svg>
      </div>
      <Group3 />
    </div>
  );
}

function Group13() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <Group10 />
      <Group11 />
      <div className="[grid-area:1_/_1] h-[7.161px] ml-[14.68px] mt-[6.42px] relative w-[3.858px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.85816 7.16064">
          <path d={svgPaths.p253bb700} fill="var(--fill-0, black)" id="Rectangle 111" />
        </svg>
      </div>
    </div>
  );
}

function Div4() {
  const { effectiveTheme } = useTheme();
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-center justify-end min-h-px min-w-px relative shrink-0" data-name="div">
      <Group13 />
      <p className={`font-['Sora:Regular',sans-serif] font-normal leading-[1.4] relative shrink-0 text-[13px] text-nowrap text-right ${
        effectiveTheme === 'dark' ? 'text-white' : 'text-gray-900'
      }`}>9.99000000</p>
    </div>
  );
}

function OrderType4() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0 w-full" data-name="Order Type">
      <p className="font-['Sora:Regular',sans-serif] font-normal leading-[1.4] relative shrink-0 text-[#4c5863] text-[13px] text-nowrap">Out Amount</p>
      <Div4 />
    </div>
  );
}

export default function OrderGroup() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative size-full" data-name="Order Group">
      <Frame />
      <Div1 />
      <OrderType2 />
      <OrderType4 />
    </div>
  );
}