import svgPaths from "./svg-lbhy0akdu4";

function Div() {
  return (
    <div className="content-stretch flex flex-col gap-[3px] items-start relative shrink-0" data-name="div">
      <div className="bg-[#121212] rounded-[999px] shrink-0 size-[4px]" />
      <div className="bg-[#121212] rounded-[999px] shrink-0 size-[4px]" />
      <div className="bg-[#121212] rounded-[999px] shrink-0 size-[4px]" />
    </div>
  );
}

function Div1() {
  return (
    <div className="content-stretch flex gap-[3px] items-center relative shrink-0" data-name="div">
      {[...Array(3).keys()].map((_, i) => (
        <Div key={i} />
      ))}
    </div>
  );
}

function Div2() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[999px] shrink-0 size-[40px]" data-name="div">
      <Div1 />
    </div>
  );
}

function Div3() {
  return (
    <div className="content-stretch flex h-[68px] items-center justify-center relative shrink-0" data-name="div">
      <Div2 />
    </div>
  );
}

function Wallet() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="wallet-02">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="wallet-02">
          <path d={svgPaths.p158f7a00} fill="var(--fill-0, #121212)" id="Union" />
        </g>
      </svg>
    </div>
  );
}

function Div4() {
  return (
    <div className="backdrop-blur-[17.5px] backdrop-filter bg-[rgba(18,18,18,0.05)] h-[40px] relative rounded-[12px] shrink-0" data-name="div">
      <div className="content-stretch flex gap-[4px] h-full items-center justify-center overflow-clip px-[16px] py-0 relative rounded-[inherit]">
        <Wallet />
        <p className="font-['Sora:SemiBold',sans-serif] font-semibold leading-[1.3] relative shrink-0 text-[#121212] text-[14px] text-nowrap">{` Connect Wallet`}</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(18,18,18,0.5)] border-solid inset-[-0.5px] pointer-events-none rounded-[12.5px]" />
    </div>
  );
}

function Button() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Button">
      <Div4 />
    </div>
  );
}

export default function Frame() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative size-full">
      <Div3 />
      <Button />
    </div>
  );
}