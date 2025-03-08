import { PropsWithChildren } from "react";
import { useGlobal } from "../../../context/Global";
import { StatusTag } from "../../shared/status-tag";
import { Switch } from "../../shared/switch";

export const GlobalLayout = (props: PropsWithChildren) => {
  const { generalStatus, isDarkMode, setDarkMode } = useGlobal();
  return (
    <>
      <header className="h-16 border-b border-b-gray-300 p-4 flex items-center w-full">
        <div className="flex gap-4 items-center grow">
          <h1 className="text-3xl font-bold">System status</h1>
          <div className="flex gap-2">
            <StatusTag status={generalStatus} />
          </div>
        </div>
        <Switch label="Dark mode" on={isDarkMode} onChange={setDarkMode} />
      </header>
      <main className="p-4 max-w-[860px] m-auto">{props.children}</main>
    </>
  );
};
