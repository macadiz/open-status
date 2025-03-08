import { useEffect, useState } from "react";
import { Tab, TabsProps } from "./types";
import classNames from "classnames";
import { Card } from "../card";

export const Tabs = (props: TabsProps) => {
  const [selectedTab, setSelectedTab] = useState<Tab | null>(null);

  useEffect(() => {
    setSelectedTab(props.tabsList[0]);
  }, [props.tabsList]);

  return (
    <article className="mt-4">
      <ul className="flex gap-4 border border-gray-300 rounded-full p-2">
        {props.tabsList.map((tab) => {
          const classes = classNames({
            "border border-gray-300 dark:bg-black rounded-full p-2 grow text-center cursor-pointer":
              true,
            "!bg-gray-200 dark:text-black": tab.title === selectedTab?.title,
          });
          return (
            <li
              className={classes}
              onClick={() => setSelectedTab(tab)}
              key={tab.title}
            >
              {tab.title}
            </li>
          );
        })}
      </ul>
      {selectedTab && (
        <section className="mt-4">
          <Card>{selectedTab.content}</Card>
        </section>
      )}
    </article>
  );
};
