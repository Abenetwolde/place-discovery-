"use client";

import Tab from "./tab-component";



interface TabsSectionProps {
  selectedTab: string;
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
  tabs: string[];
}

export default function TabsSection({ selectedTab, setSelectedTab, tabs }: TabsSectionProps) {
  return (
    <div className="flex flex-row space-x-2 bg-gray-200 rounded-md p-2">
      {tabs.map((tab) => (
        <Tab key={tab} text={tab} selected={selectedTab === tab} setSelected={setSelectedTab} />
      ))}
    </div>
  );
}