import React, { useEffect, useState } from "react";
import { differenceInDays } from 'date-fns';

const Task = ({ taskObj, onComplete }) => {
  const [daysLeft, setDaysLeft] = useState(0);
  const [deadlineMessage, setDeadlineMessage] = useState("");

  useEffect(() => {
    const deadlineDate = new Date(taskObj.deadline);
    const diffDays = differenceInDays(deadlineDate, new Date());
    
    setDaysLeft(diffDays);
    if (diffDays < 0) {
      setDeadlineMessage(`${Math.abs(diffDays)} gün önce`);
    } else if (diffDays === 0) {
      setDeadlineMessage("Bugün");
    } else if (diffDays === 1) {
      setDeadlineMessage("Yarın");
    } else {
      setDeadlineMessage(Math.abs(diffDays) + " gün sonra");
    }
  }, [taskObj.deadline]);

  return (
    <div className="task">
      <h3>{taskObj.title}</h3>
      <div className="deadline">
        son teslim:{" "}
        <span
          style={{
            padding: "0.2rem 0.4rem",
            borderRadius: "0.25rem",
          }}
          className={daysLeft < 0 ? "bg-red-300" : "bg-violet-300"}
        >
          {deadlineMessage}
        </span>
      </div>

      <p>{taskObj.description}</p>
      <div>
        {taskObj.people.map((p) => (
          <span className="pill" key={p}>
            {p}
          </span>
        ))}
      </div>
      {onComplete && (
        <button onClick={() => onComplete(taskObj.id)}>Tamamlandı</button>
      )}
    </div>
  );
};

export default Task;
