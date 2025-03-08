import React from "react";

export type Tab = {
  title: string;
  content: React.JSX.Element;
};

export type TabsProps = {
  tabsList: Tab[];
};
