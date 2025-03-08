import { format } from "date-fns";
import { useGlobal } from "../../../context/Global";
import { Card } from "../../shared/card";
import { StatusTag } from "../../shared/status-tag";
import { INCIDENT_LEVEL_STATUS_TAG } from "./constants";

export const IncidentsScene = () => {
  const { incidents } = useGlobal();

  return (
    <>
      <h2 className="text-2xl font-bold">Incident History</h2>
      <span className="text-gray-500">
        Recent system incidents and their status
      </span>
      <ul className="mt-4 flex flex-col gap-2">
        {incidents.map((incident) => {
          return (
            <Card>
              <div className="flex flex-col">
                <span className="flex gap-2 items-center">
                  <h3 className="text-lg font-bold">{incident.title}</h3>
                  <StatusTag
                    level={INCIDENT_LEVEL_STATUS_TAG[incident.level]}
                  />
                </span>
                <span className="text-gray-500">
                  {format(incident.date, "MMM, dd yyyy hh:mm aa")}
                </span>
              </div>
            </Card>
          );
        })}
      </ul>
    </>
  );
};
