export const problemTabs = [
  {
    id: 1,
    title: "Easy",
    count: 25,
    value: "easy",
  },
  {
    id: 2,
    title: "Medium",
    count: 18,
    value: "medium",
  },
  {
    id: 3,
    title: "Hard",
    count: 7,
    value: "hard",
  },
];

export const problemsData = {
  python: [
    {
      id: 1,
      title: "Two Sum",
      slug: "two-sum",
      topic: "Array",
      difficulty: "Easy",
      acceptance: "47.6%",
      estTime: "10 min",
      solved: true,

      statement:
        "Given an array of integers nums and an integer target, return the indices of the two numbers such that they add up to the target. You may assume that each input has exactly one solution, and you may not use the same element twice.",

      examples: [
        {
          id: 1,
          input: "nums = [2,7,11,15], target = 9",
          output: "[0,1]",
          explanation:
            "nums[0] + nums[1] = 2 + 7 = 9, so return [0,1].",
        },
        {
          id: 2,
          input: "nums = [3,2,4], target = 6",
          output: "[1,2]",
          explanation:
            "nums[1] + nums[2] = 2 + 4 = 6.",
        },
      ],

      constraints: [
        "2 <= nums.length <= 10⁴",
        "-10⁹ <= nums[i] <= 10⁹",
        "-10⁹ <= target <= 10⁹",
        "Exactly one valid answer exists.",
      ],

      hints: [
        "Can you solve it in O(n) time?",
        "Use a Hash Map to store visited numbers.",
      ],

      starterCode: `def two_sum(nums, target):
    # Write your solution here
    pass`,

      testCases: [
        {
          id: 1,
          name: "Example 1",
          input: "[2,7,11,15], 9",
          expectedOutput: "[0,1]",
        },
        {
          id: 2,
          name: "Example 2",
          input: "[3,2,4], 6",
          expectedOutput: "[1,2]",
        },
      ],

      hiddenTestCases: [
        {
          input: "[3,3], 6",
          expectedOutput: "[0,1]",
        },
        {
          input: "[1,5,8,9], 14",
          expectedOutput: "[1,3]",
        },
      ],
    },

    {
      id: 2,
      title: "Valid Parentheses",
      slug: "valid-parentheses",
      topic: "Stack",
      difficulty: "Easy",
      acceptance: "48.7%",
      estTime: "15 min",
      solved: false,

      statement:
        "Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if brackets are closed in the correct order.",

      examples: [
        {
          id: 1,
          input: 's = "()"',
          output: "true",
          explanation: "The brackets are correctly matched.",
        },
        {
          id: 2,
          input: 's = "(]"',
          output: "false",
          explanation: "Opening and closing brackets do not match.",
        },
      ],

      constraints: [
        "1 <= s.length <= 10⁴",
        "s consists only of ()[]{}",
      ],

      hints: [
        "Use a Stack.",
        "Push opening brackets and pop when closing brackets appear.",
      ],

      starterCode: `def is_valid(s):
    # Write your solution here
    pass`,

      testCases: [
        {
          id: 1,
          name: "Example 1",
          input: '"()"',
          expectedOutput: "true",
        },
        {
          id: 2,
          name: "Example 2",
          input: '"(]"',
          expectedOutput: "false",
        },
      ],

      hiddenTestCases: [
        {
          input: '"()[]{}"',
          expectedOutput: "true",
        },
        {
          input: '"([)]"',
          expectedOutput: "false",
        },
      ],
    },
  ],

  c: [
    {
      id: 1,
      title: "Hello World",
      slug: "hello-world",
      topic: "Basics",
      difficulty: "Easy",
      acceptance: "98.4%",
      estTime: "5 min",
    },
    {
      id: 2,
      title: "Factorial",
      slug: "factorial",
      topic: "Loops",
      difficulty: "Easy",
      acceptance: "82.7%",
      estTime: "10 min",
    },
    {
      id: 3,
      title: "Prime Number",
      slug: "prime-number",
      topic: "Math",
      difficulty: "Easy",
      acceptance: "74.8%",
      estTime: "10 min",
    },
    {
      id: 4,
      title: "Palindrome Number",
      slug: "palindrome-number",
      topic: "Math",
      difficulty: "Easy",
      acceptance: "70.3%",
      estTime: "15 min",
    },
    {
      id: 5,
      title: "Fibonacci Series",
      slug: "fibonacci-series",
      topic: "Loops",
      difficulty: "Easy",
      acceptance: "69.2%",
      estTime: "10 min",
    },
    {
      id: 6,
      title: "Array Sum",
      slug: "array-sum",
      topic: "Array",
      difficulty: "Easy",
      acceptance: "78.1%",
      estTime: "10 min",
    },
    {
      id: 7,
      title: "Matrix Addition",
      slug: "matrix-addition",
      topic: "Matrix",
      difficulty: "Medium",
      acceptance: "49.5%",
      estTime: "20 min",
    },
    {
      id: 8,
      title: "Pointer Basics",
      slug: "pointer-basics",
      topic: "Pointers",
      difficulty: "Medium",
      acceptance: "45.2%",
      estTime: "20 min",
    },
    {
      id: 9,
      title: "Linked List Implementation",
      slug: "linked-list-implementation",
      topic: "Linked List",
      difficulty: "Hard",
      acceptance: "30.8%",
      estTime: "35 min",
    },
    {
      id: 10,
      title: "Binary Search",
      slug: "binary-search",
      topic: "Searching",
      difficulty: "Medium",
      acceptance: "58.4%",
      estTime: "20 min",
    },
  ],

  cpp: [
    {
      id: 1,
      title: "Classes and Objects",
      slug: "classes-and-objects",
      topic: "OOP",
      difficulty: "Easy",
      acceptance: "76.3%",
      estTime: "15 min",
      solved: false,

      statement:
        "Create a class named Student with two data members: name and age. Implement methods to input student details and display them.",

      examples: [
        {
          id: 1,
          input:
            `John
20`,
          output:
            `Name: John
Age: 20`,
          explanation:
            "The student's details are displayed correctly.",
        },
        {
          id: 2,
          input:
            `Alice
19`,
          output:
            `Name: Alice
Age: 19`,
          explanation:
            "The object's data members are initialized and printed.",
        },
      ],

      constraints: [
        "1 <= name.length <= 50",
        "15 <= age <= 100",
      ],

      hints: [
        "Use a class with public members.",
        "Create methods input() and display().",
      ],

      starterCode: `#include <iostream>
using namespace std;

class Student{
public:
    string name;
    int age;

    void input(){

    }

    void display(){

    }
};

int main(){

    Student s;

    s.input();

    s.display();

}`,

      testCases: [
        {
          id: 1,
          name: "Example 1",
          input:
            `John
20`,
          expectedOutput:
            `Name: John
Age: 20`,
        },
        {
          id: 2,
          name: "Example 2",
          input:
            `Alice
19`,
          expectedOutput:
            `Name: Alice
Age: 19`,
        },
      ],

      hiddenTestCases: [
        {
          input:
            `Rahul
21`,
          expectedOutput:
            `Name: Rahul
Age: 21`,
        },
        {
          input:
            `Sonu
18`,
          expectedOutput:
            `Name: Sonu
Age: 18`,
        },
      ],
    },

    {
      id: 2,
      title: "Dijkstra Algorithm",
      slug: "dijkstra-algorithm",
      topic: "Graph",
      difficulty: "Hard",
      acceptance: "29.4%",
      estTime: "40 min",
      solved: false,

      statement:
        "Given a weighted graph with V vertices and E edges, find the shortest distance from the source vertex to every other vertex using Dijkstra's Algorithm.",

      examples: [
        {
          id: 1,
          input:
            `V = 5
Edges = [[0,1,2],[0,3,6],[1,2,3],[1,3,8],[1,4,5],[2,4,7],[3,4,9]]
Source = 0`,
          output:
            `0 2 5 6 7`,
          explanation:
            "The shortest distance from source 0 is calculated for every vertex.",
        },
        {
          id: 2,
          input:
            `V = 3
Edges = [[0,1,4],[1,2,2],[0,2,7]]
Source = 0`,
          output:
            `0 4 6`,
          explanation:
            "Shortest path to vertex 2 is through vertex 1.",
        },
      ],

      constraints: [
        "1 <= V <= 1000",
        "0 <= E <= 10000",
        "Edge weights are non-negative.",
      ],

      hints: [
        "Use a Priority Queue (Min Heap).",
        "Store graph using an adjacency list.",
      ],

      starterCode: `#include <bits/stdc++.h>
using namespace std;

vector<int> dijkstra(int V, vector<vector<pair<int,int>>>& graph, int source){

    // Write your code here

}

int main(){

}`,
      testCases: [
        {
          id: 1,
          name: "Example 1",
          input:
            `5
0 1 2
0 3 6
1 2 3
1 3 8
1 4 5
2 4 7
3 4 9
0`,
          expectedOutput:
            `0 2 5 6 7`,
        },
        {
          id: 2,
          name: "Example 2",
          input:
            `3
0 1 4
1 2 2
0 2 7
0`,
          expectedOutput:
            `0 4 6`,
        },
      ],

      hiddenTestCases: [
        {
          input:
            `4
0 1 1
1 2 2
2 3 3
0`,
          expectedOutput:
            `0 1 3 6`,
        },
        {
          input:
            `5
0 1 10
0 2 5
2 1 3
1 3 1
2 4 2
4 3 9
0`,
          expectedOutput:
            `0 8 5 9 7`,
        },
      ],
    },
  ],
};