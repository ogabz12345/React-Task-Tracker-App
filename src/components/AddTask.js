import { useState } from "react";

const AddTask = ({ onAdd, onCancel }) => {
  const [text, setText] = useState("");
  const [day, setDay] = useState("");
  const [reminder, setReminder] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!text) {
      alert("Please add a tack");
      return;
    }

    onAdd({ text, day, reminder });

    setText("");
    setDay("");
    setReminder(false);
  };

  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label>Task</label>
        <input
          type="text"
          placeholder="Add"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></input>
      </div>
      <div className="form-control">
        <label>Date & Time</label>
        <input
          type="text"
          placeholder="Add Day & Time"
          value={day}
          onChange={(e) => setDay(e.target.value)}
        ></input>
      </div>
      <div className="form-control form-control-check">
        <label>Set Reminder</label>
        <input
          checked={reminder}
          value={reminder}
          onChange={(e) => setReminder(e.currentTarget.checked)}
          type="checkbox"
        ></input>
      </div>
      <input type="submit" className="btn btn-block" value="Save Task"></input>
      <input
        type="button"
        onClick={onCancel}
        className="btn btn-block"
        value="Cancel"
      ></input>
    </form>
  );
};

export default AddTask;
