import { Button, Flex, Tabs } from "antd";
import WeekCard from "../Card/WeekCard";
import { useEffect } from "react";

const StepTwo = ({
  week,
  handleNextStep,
  handlePreviousStep,
  setWeekData,
  weekData,
}) => {
  const onChange = (key) => {
    console.log(key);
  };

  useEffect(() => {
    setWeekData(
      Array.from({ length: week }, (_, index) => ({
        week_name: `Week ${index + 1}`,
        week_topic: `Title For Week ${index + 1}`,
        course_id: null,
        week_status_id: 1,
        days: [],
      }))
    );
  }, [week]);

  return (
    <>
      <div>
        <Tabs
          onChange={onChange}
          type="card"
          items={new Array(week).fill(null).map((_, i) => {
            const id = String(i + 1);
            return {
              label: `Week ${id}`,
              key: id,
              children: (
                <WeekCard
                  weekIndex={i}
                  weekData={weekData}
                  setWeekData={setWeekData}
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
            Previous
          </Button>
          <Button
            onClick={handleNextStep}
            type="primary"
            style={{ width: "30%" }}
          >
            Next
          </Button>
        </Flex>
      </div>
    </>
  );
};

export default StepTwo;
