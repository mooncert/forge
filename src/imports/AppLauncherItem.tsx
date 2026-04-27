import imgRoundedRectangle from "figma:asset/d6cd2ee0417af18455720dd9e3bfd55889c23b3a.png";

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

export default function AppLauncherItem() {
  return (
    <div className="relative rounded-[12px] size-full" data-name="AppLauncher.Item">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center overflow-clip pl-[8px] pr-[12px] py-[8px] relative size-full">
          <Div3 />
        </div>
      </div>
    </div>
  );
}