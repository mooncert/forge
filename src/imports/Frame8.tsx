export default function Frame() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[169px] items-start justify-end px-[40px] py-[20px] relative size-full">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[24px] text-black text-nowrap">Forge Logo</p>
      <div className="content-stretch flex flex-col gap-[12px] items-start justify-center relative shrink-0 w-[315px]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[24px] text-black w-full">Total PnL</p>
        <div className="content-stretch flex flex-col gap-[12px] items-start leading-[normal] not-italic relative shrink-0 text-black w-full">
          <p className="font-['Inter:Bold',sans-serif] font-bold relative shrink-0 text-[48px] w-full">+12,345.12</p>
          <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[20px] w-full">$12.12</p>
        </div>
      </div>
      <div className="content-stretch flex gap-[20px] h-[140px] items-start justify-center relative shrink-0 w-full">
        <div className="basis-0 content-stretch flex flex-col gap-[20px] grow h-full items-end min-h-px min-w-px relative shrink-0">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[20px] text-black w-full">Total Value</p>
          <div className="content-stretch flex flex-col gap-[12px] items-start leading-[normal] not-italic relative shrink-0 text-black w-full">
            <p className="font-['Inter:Bold',sans-serif] font-bold relative shrink-0 text-[32px] w-full">12.12</p>
            <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[20px] w-full">$12.12</p>
          </div>
        </div>
        <div className="basis-0 content-stretch flex flex-col gap-[20px] grow h-full items-end leading-[normal] min-h-px min-w-px not-italic relative shrink-0 text-black">
          <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[20px] w-full">Launched</p>
          <p className="font-['Inter:Bold',sans-serif] font-bold relative shrink-0 text-[32px] w-full">3 Tokens</p>
        </div>
        <div className="basis-0 content-stretch flex flex-col gap-[20px] grow h-full items-end min-h-px min-w-px relative shrink-0">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[20px] text-black w-full">Top Gain</p>
          <div className="content-stretch flex flex-col gap-[12px] items-start leading-[normal] not-italic relative shrink-0 w-full">
            <p className="font-['Inter:Bold',sans-serif] font-bold relative shrink-0 text-[32px] text-black w-full">GPL</p>
            <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#0f9b40] text-[20px] w-full">+12.12%</p>
          </div>
        </div>
        <div className="basis-0 content-stretch flex flex-col gap-[20px] grow h-full items-end min-h-px min-w-px relative shrink-0">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[20px] text-black w-full">Top Loss</p>
          <div className="content-stretch flex flex-col gap-[12px] items-start leading-[normal] not-italic relative shrink-0 w-full">
            <p className="font-['Inter:Bold',sans-serif] font-bold relative shrink-0 text-[32px] text-black w-full">ADR</p>
            <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[20px] text-[red] w-full">-12.12%</p>
          </div>
        </div>
      </div>
    </div>
  );
}