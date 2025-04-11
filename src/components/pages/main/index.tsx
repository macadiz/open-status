import { GlobalLayout } from "../../layout/global";
import { useGlobal } from "../../../context/Global";
import { StatusTag } from "../../shared/status-tag";
import { format } from "date-fns";
import { Card } from "../../shared/card";
import { IncidentsScene } from "../../scenes/incidents";

export const MainPage = () => {
  const { generalStatus } = useGlobal();

  return (
    <GlobalLayout>
      <Card spacing="lg">
        <section className="flex flex-col gap-6">
          <div className="flex flex-col">
            <div className="flex">
              <span className="grow flex gap-2">
                <h2 className="text-2xl font-bold">Current status</h2>
              </span>
              <StatusTag level={generalStatus.status} showMessage />
            </div>
            <span className="text-gray-500">
              Last updated:{" "}
              {generalStatus.lastUpdated
                ? format(generalStatus.lastUpdated, "MMM, dd yyyy hh:mm aa")
                : "No updates"}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {generalStatus.uptime.map((detailedStatus) => {
              return (
                <Card
                  key={
                    detailedStatus.alias +
                    detailedStatus.lastEventDate.toISOString
                  }
                >
                  <section className="flex flex-col gap-2">
                    <div className="flex gap-2">
                      <h3 className="font-bold text-lg grow">
                        {detailedStatus.alias}
                      </h3>
                      <StatusTag level={detailedStatus.status} />
                    </div>
                    <div className="flex gap-2">
                      <h3 className="text-gray-500 text-lg grow">Uptime</h3>
                      <span>{detailedStatus.uptime.toFixed(2)}%</span>
                    </div>
                  </section>
                </Card>
              );
            })}
          </div>
        </section>
      </Card>
      <section className="mt-4">
        <Card spacing="lg">
          <IncidentsScene />
        </Card>
      </section>
    </GlobalLayout>
  );
};
