export const getNotifications = async () => {
  return [
    {
      id: 1,
      title: "Placement Drive",
      message: "TCS Hiring Drive Tomorrow",
      type: "Placement",
      priority: 10,
    },
    {
      id: 2,
      title: "Results Published",
      message: "Semester Results Released",
      type: "Result",
      priority: 5,
    },
    {
      id: 3,
      title: "Workshop",
      message: "AI Workshop Friday",
      type: "Event",
      priority: 2,
    },
  ];
};
