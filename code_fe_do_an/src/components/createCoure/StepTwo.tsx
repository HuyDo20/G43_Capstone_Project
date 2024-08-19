import { Button, Flex, Tabs } from "antd";
import WeekCard from "../Card/WeekCard";
import { useEffect } from "react";
import axios from "axios";

const StepTwo = ({
  week,
  handleNextStep,
  handlePreviousStep,
  setWeekData,
  weekData,
  id,
  setReload,
  reload,
  mode,
  navigate
}) => {
  const onChange = (key) => {
    console.log(key);
  };

useEffect(() => {
  if (id) { 
    const currentWeekCount = weekData.length;
    if (week > currentWeekCount) {
      // Add additional weeks if the new week count is greater
      const additionalWeeks = Array.from(
        { length: week - currentWeekCount },
        (_, index) => ({
          week_name: `Tuần ${currentWeekCount + index + 1}`,
          week_topic: `Tiêu đề tuần  ${currentWeekCount + index + 1}`,
          course_id: id, 
          week_status_id: 1,
          days: [],
          exam_id: null,
        })
      );
      setWeekData([...weekData, ...additionalWeeks]);
    } else if (week < currentWeekCount) {
      // Trim the weekData array if the new week count is less
      setWeekData(weekData.slice(0, week));
    }
  } else {
    // Handle the creation case
    const currentWeekCount = weekData.length;
    if (week > currentWeekCount) {
      const additionalWeeks = Array.from(
        { length: week - currentWeekCount },
        (_, index) => ({
          week_name: `Tuần ${currentWeekCount + index + 1}`,
          week_topic: `Tiêu đề tuần  ${currentWeekCount + index + 1}`,
          course_id: null,
          week_status_id: 1,
          days: [],
          exam_id: null,
        })
      );
      setWeekData([...weekData, ...additionalWeeks]);
    }
  }
}, [week, weekData, id, setWeekData]);

  const weekCardData = id ? weekData : new Array(week).fill(null);

  return (
    <>
      <div>
        <Tabs
          onChange={onChange}
          type="card"
          items={weekCardData.map((_, i) => {
            const weekId = String(i + 1);
            return {
              label: `Tuần ${weekId}`,
              key: weekId,
              children: (
                <WeekCard
                  weekIndex={i}
                  weekData={weekData}
                  setWeekData={setWeekData}
                  id={id}
                  setReload={setReload}
                  reload={reload}
                  mode={mode}
                />
              ),
            };
          })}
        />
        <Flex
          align="center"
          justify="space-between"
          style={{ marginTop: "2%" }}
        >
          <Button onClick={handlePreviousStep} style={{ width: "30%" }}>
            Quay lại
          </Button>
          {mode !== "view" && (
            <Button
              onClick={handleNextStep}
              type="primary"
              style={{ width: "30%" }}
            >
              Tiếp theo
            </Button>
          )}
        </Flex>
      </div>
    </>
  );
};

export default StepTwo;
