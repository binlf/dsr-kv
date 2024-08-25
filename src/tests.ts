// todo: write tests
import { dsr } from ".";

const data = {
  company: {
    name: "Tech Innovators Ltd.",
    departments: [
      {
        id: 1,
        name: "Engineering",
        manager: {
          id: 101,
          name: "Alice Johnson",
          email: "alice.johnson@techinnovators.com",
        },
        employees: [
          {
            id: 102,
            name: "Bob Smith",
            role: "Senior Engineer",
            projects: [
              {
                projectId: 301,
                name: "AI Platform",
                status: "Active",
                deadline: "2025-06-30",
              },
              {
                projectId: 302,
                name: "Mobile App",
                status: "In Development",
                deadline: "2024-12-15",
              },
            ],
          },
          {
            id: 103,
            name: "Clara Zhang",
            role: "Junior Engineer",
            projects: [
              {
                projectId: 302,
                name: "Mobile App",
                status: "In Development",
                deadline: "2024-12-15",
              },
            ],
          },
        ],
      },
      {
        id: 2,
        name: "Marketing",
        manager: {
          id: 104,
          name: "David Green",
          email: "david.green@techinnovators.com",
        },
        employees: [
          {
            id: 105,
            name: "Emily Davis",
            role: "Marketing Specialist",
            clients: [
              {
                clientId: 401,
                name: "Big Corp",
                project: {
                  projectId: 303,
                  name: "Marketing Campaign",
                  status: "Planning",
                },
              },
              {
                clientId: 402,
                name: "StartUp X",
                project: {
                  projectId: 304,
                  name: "Brand Awareness",
                  status: "Completed",
                },
              },
            ],
          },
          {
            id: 106,
            name: "Frank Lee",
            role: "Content Creator",
            clients: [
              {
                clientId: 403,
                name: "Global Ventures",
                project: {
                  projectId: 305,
                  name: "Content Strategy",
                  status: "Active",
                },
              },
            ],
          },
        ],
      },
    ],
  },
  settings: {
    timezone: "UTC",
    notifications: {
      email: true,
      sms: false,
      push: true,
    },
    themes: ["dark", "light"],
    language: "en-US",
  },
};

console.log("Output: \n", dsr(JSON.stringify(data)));
