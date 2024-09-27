import React from "react";

const Filter = ({ filter, setFilter }) => {
  return (
    <div>
      <button onClick={() => setFilter("all")}>
        {filter === "all" ? <b>All</b> : "All"}
      </button>
      <button onClick={() => setFilter("completed")}>
        {filter === "completed" ? <b>Completed</b> : "Completed"}
      </button>
      <button onClick={() => setFilter("pending")}>
        {filter === "pending" ? <b>Pending</b> : "Pending"}
      </button>
    </div>
  );
};

export default Filter;
