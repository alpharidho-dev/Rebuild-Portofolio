import { BinaryRain } from "@/components/BinaryRain";
import { ScrollStage } from "@/components/ScrollStage";
import { TerminalAbout } from "@/components/about/TerminalAbout";

export function AboutContent() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <BinaryRain variant="light" />
      <ScrollStage
        as="main"
        variant="page"
        className="relative z-10 px-5 pb-28 pt-47 md:pb-16 md:pl-[136px] md:pr-10"
      >
        <TerminalAbout />
      </ScrollStage>
    </div>
  );
}
