import { GlobalLayout } from "../../layout/global";
import { useGlobal } from "../../../context/Global";
import { StatusTag } from "../../shared/status-tag";
import { format } from "date-fns";
import { Card } from "../../shared/card";
import { Tabs } from "../../shared/tabs";
import { IncidentsScene } from "../../scenes/incidents";

export const MainPage = () => {
  const { generalStatus, detailedStatuses } = useGlobal();

  return (
    <GlobalLayout>
      <Card spacing="lg">
        <section className="flex flex-col gap-6">
          <div className="flex flex-col">
            <div className="flex">
              <span className="grow flex gap-2">
                <h2 className="text-2xl font-bold">Current status</h2>
              </span>
              <StatusTag status={generalStatus} showMessage />
            </div>
            <span className="text-gray-500">
              Last updated:{" "}
              {format(generalStatus.lastUpdated, "MMM, dd yyyy hh:mm aa")}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {detailedStatuses.map((detailedStatus) => {
              return (
                <Card
                  key={
                    detailedStatus.name + detailedStatus.lastUpdated.toISOString
                  }
                >
                  <section className="flex flex-col gap-2">
                    <div className="flex gap-2">
                      <h3 className="font-bold text-lg grow">
                        {detailedStatus.name}
                      </h3>
                      <StatusTag status={detailedStatus} />
                    </div>
                    <div className="flex gap-2">
                      <h3 className="text-gray-500 text-lg grow">Uptime</h3>
                      <span>{detailedStatus.uptime}%</span>
                    </div>
                  </section>
                </Card>
              );
            })}
          </div>
        </section>
      </Card>
      <Tabs
        tabsList={[
          {
            title: "Incidents",
            content: <IncidentsScene />,
          },
          {
            title: "Uptime",
            content: <>Chao mundo</>,
          },
          {
            title: "Subscribe",
            content: <>12345</>,
          },
        ]}
      ></Tabs>
    </GlobalLayout>
  );
};
