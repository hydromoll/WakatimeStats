// const dataGraph = {
//     labels: ["January", "February", "March", "April", "May", "June"],
//     datasets: [
//       {
//         data: [20, 45, 28, 80, 99, 43],
//         color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
//         strokeWidth: 8, // optional
//       },
//     ],
//     legend: ["Week stats"], // optional
//   };

const data = {
  data: {
    created_at: "2023-01-05T00:41:33Z",
    days: [
      {
        categories: [
          {
            name: "Coding",
            total: 11788.457715,
          },
          {
            name: "Building",
            total: 0.0,
          },
        ],
        date: "2023-01-12",
        total: 11788.457715,
      },
      {
        categories: [
          {
            name: "Coding",
            total: 15666.15149,
          },
          {
            name: "Building",
            total: 104.963306,
          },
        ],
        date: "2023-01-13",
        total: 15771.114796,
      },
      {
        categories: [
          {
            name: "Coding",
            total: 10144.317436,
          },
          {
            name: "Building",
            total: 0.0,
          },
        ],
        date: "2023-01-14",
        total: 10144.317436,
      },
      {
        categories: [
          {
            name: "Coding",
            total: 2112.514074,
          },
          {
            name: "Building",
            total: 0.0,
          },
        ],
        date: "2023-01-15",
        total: 2112.514074,
      },
      {
        categories: [
          {
            name: "Coding",
            total: 3681.64265,
          },
          {
            name: "Building",
            total: 0.0,
          },
        ],
        date: "2023-01-16",
        total: 3681.64265,
      },
      {
        categories: [
          {
            name: "Coding",
            total: 9301.770019,
          },
          {
            name: "Building",
            total: 7.341156,
          },
        ],
        date: "2023-01-17",
        total: 9309.111175,
      },
      {
        categories: [
          {
            name: "Coding",
            total: 4087.278213,
          },
          {
            name: "Building",
            total: 0.0,
          },
        ],
        date: "2023-01-18",
        total: 4087.278213,
      },
    ],
    end: "2023-01-18T20:59:59Z",
    human_readable_range: "last week",
    is_already_updating: false,
    is_including_today: false,
    is_stuck: false,
    is_up_to_date: true,
    is_up_to_date_pending_future: false,
    modified_at: "2023-01-19T00:09:41Z",
    percent_calculated: 100,
    range: "last_7_days",
    start: "2023-01-11T21:00:00Z",
    status: "ok",
    timeout: 15,
    timezone: "Europe/Moscow",
    user_id: "fd88ad8d-f8c7-413f-850c-9d4d80b9b6f4",
    writes_only: false,
  },
};

const fd = data.data.days.reduce(
  (acc, day) => {
    const { categories } = day;
    // acc['labels'] = acc['labels'] || []
    categories.forEach((category) => {
      if (category.name === "Coding") {
        acc.dataset.data.push(+category.total.toFixed(0));
      } else {
        return;
      }
      acc.labels.push(day.date);
    });
    return acc;
  },
  {
    labels: [],
    dataset: {
      data: [],
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
      strokeWidth: 8, // optional
    },
  }
);

// const insightsFormatter = (bla)  => {
//     const res = bla.data.days.map(day => ({
//         labels: bla.data.days.map(day => day.date),
//     }))
//     return res;
//     // const res = bla.data.days.map(({ categories }) => ({
//     //   labels: bla.data.days.map(({ date }) => date),
//     //   datasets: bla.data.days.map(({ categories }) => ({
//     //     data: categories.map(({ total }) => total),
//     //     color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
//     //     strokeWidth: 2,
//     //     legend: ["123"],
//     //   })),
//     // }));
//     // return res;
//   };

console.log("====================================");
console.log(fd);
console.log("====================================");
