import { dsr, getKeys } from "../dist/index";
// @ts-expect-error
import { test, expect } from "bun:test";

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

test("Check if object keys are deserialzed in JSON Object", () => {
  const keys = getKeys(data);
  const dsrString = dsr(JSON.stringify(data));
  console.log("String: ", dsrString);
  keys.forEach((key) => {
    console.log(key);
    expect(dsrString).toContain(`${key}`);
  });
});

const data2 = [
  {
    id: 1,
    type: "user",
    attributes: {
      name: "Alice",
      email: "alice@example.com",
      preferences: {
        notifications: true,
        theme: "dark",
      },
    },
    posts: [
      {
        postId: 101,
        title: "First Post",
        content: "This is Alice's first post",
        comments: [
          {
            commentId: 1001,
            author: "Bob",
            text: "Great post!",
          },
          {
            commentId: 1002,
            author: "Charlie",
            text: "Thanks for sharing.",
          },
        ],
      },
      {
        postId: 102,
        title: "Second Post",
        content: "Another post by Alice",
        comments: [],
      },
    ],
  },
  {
    id: 2,
    type: "user",
    attributes: {
      name: "Bob",
      email: "bob@example.com",
      preferences: {
        notifications: false,
        theme: "light",
      },
    },
    posts: [
      {
        postId: 201,
        title: "Hello World",
        content: "Bob's first post",
        comments: [
          {
            commentId: 2001,
            author: "Alice",
            text: "Welcome, Bob!",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    type: "user",
    attributes: {
      name: "Charlie",
      email: "charlie@example.com",
      preferences: {
        notifications: true,
        theme: "light",
      },
    },
    posts: [],
  },
];

test("Check if object keys are deserialzed in JSON Array", () => {
  const keys = getKeys(data2);
  const dsrString = dsr(JSON.stringify(data2));
  console.log("String: ", dsrString);
  keys.forEach((key) => {
    console.log(key);
    expect(dsrString).toContain(`${key}`);
  });
});
