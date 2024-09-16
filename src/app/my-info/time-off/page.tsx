import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Clock, Cross, FileClockIcon, MountainSnow } from "lucide-react";
import Image from "next/image";

const CARDS: {
  line1: string;
  line2: {
    icon: React.ReactNode;
    data: string;
  };
  line3: string;
  line4?: string;
  line5: string;
}[] = [
  {
    line1: "Sick",
    line2: {
      icon: <Cross className="size-[30px]" />,
      data: "3",
    },
    line3: "Days available",
    line4: "1 day scheduled",
    line5: "Sick Full-Time",
  },
  {
    line1: "Annual Leave ",
    line2: {
      icon: <MountainSnow />,
      data: "10.3",
    },
    line3: "Days available",
    line5: "Holiday Full-Time",
  },
  {
    line1: "Comp/in Lieu Time",
    line2: {
      icon: <FileClockIcon />,
      data: "0",
    },
    line3: "Human Used(YTD)",
    line5: "Comp/in Lieu Time Flexible Policy",
  },
];

export default function TimeOff() {
  return (
    <Card className="w-full rounded-t-none">
      <CardHeader className="py-[13px] flex flex-row justify-between items-end m-4 border-slate-400 border-b-2">
        <h3 className="text-xl mb-[3px]">
          <FileClockIcon className="inline-block size-4 mr-3" />
          <span className="text-cyan-900">Time Off</span>
        </h3>
        <div className="flex items-end gap-4">
          <div className="text-sm mb-[3px]">
            <span>Accrual Level Start Date </span>
            <span className="text-blue-800">03/09-2020</span>
          </div>
          <Button variant="outline" className="border border-black">
            Add Time Off Policy
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mx-auto flex justify-center gap-12 py-6">
          {CARDS.map((card) => (
            <div
              key={card.line1}
              className="max-w-[264px] w-full flex flex-col items-stretch text-center font-semibold"
            >
              <Card className="p-4 bg-slate-100">
                <h4 className="text-xl">{card.line1}</h4>
                <div className="flex justify-center items-center gap-2.5 text-3xl">
                  {card.line2.icon}
                  <span>{card.line2.data}</span>
                </div>
                <div className="text-sm">{card.line3}</div>
                <div className="h-5 text-sm text-slate-400">{card.line4}</div>
              </Card>
              <div className="mt-2 text-sm text-slate-400 font-medium">
                {card.line5}
              </div>
            </div>
          ))}
        </div>

        <div className="w-full pb-[13px] pt-0 border-slate-400 border-b-2">
          <div className="flex items-center">
            <Clock className="size-4 mr-2" />
            <span className="text-cyan-900">Upcoming Time Off</span>
          </div>
        </div>

        <div className="w-full py-[13px] border-slate-400 border-b-2">
          <div className="flex items-center">
            <Cross className="size-[30px] mr-3.5" />
            <div className="flex flex-col">
              <span>Jan 27</span>
              <ul className="list-disc list-inside">
                <li>1 day of Sick</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="w-full py-[13px] border-slate-400 border-b-2">
          <div className="flex items-center">
            <Image
              src="/icons/Icon Big.svg"
              alt="piggy bank"
              width={30}
              height={30}
              className="mr-3.5"
            />
            <div className="flex flex-col">
              <span>Jul 4</span>
              <span>Independence Day</span>
            </div>
          </div>
        </div>

        <div className="pt-6">
          <h4 className="flex items-center">
            <Image
              src="/icons/Group 9.svg"
              alt="square clock"
              width={16}
              height={16}
              className="mr-2"
            />
            <span className="text-sm text-cyan-900">History</span>
          </h4>
        </div>
      </CardContent>
    </Card>
  );
}
