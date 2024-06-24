import { Collapse, Typography } from "antd";

const { Panel } = Collapse;

function DayCard({ dayData }) {
  return (
    <>
      {dayData.map((day, index) => (
        <Collapse
          defaultActiveKey={["0"]}
          bordered={false}
          style={{
            margin: "2% 0",
            borderRadius: "8px",
            backgroundColor: "#e3eaef",
            textAlign: "left",
          }}
        >
          <Panel
            header={
              <Typography.Title level={5}>
                Day {index + 1}: {day.day_name}
              </Typography.Title>
            }
            key={index + 1}
          >
            {day.lessons.map((lesson, pos) => {
              const title =
                lesson.vocab_name ||
                lesson.kanji_name ||
                lesson.video_name ||
                lesson.grammar_name;
              return (
                <div
                  key={lesson.id}
                  style={{
                    marginBottom: "10px",
                    backgroundColor: "#fff",
                    padding: "16px",
                  }}
                >
                  <div>
                    Lesson {pos + 1}: <b>{title}</b>
                  </div>
                </div>
              );
            })}
          </Panel>
        </Collapse>
      ))}
    </>
  );
}

export default DayCard;
