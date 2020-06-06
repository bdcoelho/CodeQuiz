//Questions are set up in an array
//Questions sourced from W3 Schools "https://www.w3schools.com/js/js_quiz.asp"

var questions = [
  {
    title: "Inside which HTML element do we put the JavaScript?",
    choices: ["<js>", "<javascript>", "<scripting>", "<script>"],
    answer: "<script>",
  },

  {
    title:
      "What is the correct syntax for referring to an external script called 'xxx.js'?",
    choices: [
      "<script href='xxx.js'>",
      "<script src='xxx.js'>",
      "<script name='xxx.js'>",
      "xxx.js",
    ],
    answer: "<script src='xxx.js'>",
  },
  {
    title: "The external JavaScript file must contain the <script> tag.",
    choices: ["FALSE", "TRUE", "Sometimes", "Trick question!"],
    answer: "FALSE",
  },
  {
    title: "How do you write 'Hello World' in an alert box?",
    choices: [
      "msg('Hello World');",
      "alert('Hello World');",
      "alertBox('Hello World');",
      "toWorld('Hello World');",
    ],
    answer: "alert('Hello World');",
  },
  {
    title: "How do you create a function in JavaScript?",
    choices: [
      "function myFunction()",
      "function = myFunction()",
      "function:myFunction()",
      "function-myFunction()",
    ],
    answer: "function myFunction()",
  },
  {
    title: "How do you call a function named 'myFunction'?",
    choices: [
      "call function myFunction()",
      "call myFunction()",
      "myFunction()",
      "comeAtMe(myFunction)",
    ],
    answer: "myFunction()",
  },
  {
    title: "How to write an IF statement in JavaScript?",
    choices: ["if i = 5 then", "if (i == 5)", "if i == 5 then", "if i = 5"],
    answer: "if (i == 5)",
  },
  {
    title:
      "How to write an IF statement for executing some code if 'i' is NOT equal to 5?",
    choices: ["if i <> 5", "if (i != 5)", "if (i <> 5)", "if i =! 5 then"],
    answer: "if (i != 5)",
  },
  {
    title: "How does a WHILE loop start?",
    choices: [
      "while (i <= 10; i++)",
      "while (i <= 10)",
      "while i = 1 to 10",
      "while I <= wait;",
    ],
    answer: "while (i <= 10)",
  },
  {
    title: "How does a FOR loop start?",
    choices: [
      "for (i <= 5; i++)",
      "for (i = 0; i <= 5)",
      "for (i = 0; i <= 5; i++)",
      "for i = 1 to 5",
    ],
    answer: "for (i = 0; i <= 5; i++)",
  },
  {
    title: "How can you add a comment in a JavaScript?",
    choices: [
      "//This is a comment",
      "<!--This is a comment-->",
      "'This is a comment",
      "This is a comment -->",
    ],
    answer: "//This is a comment",
  },

  {
    title: "How do you round the number 7.25, to the nearest integer?",
    choices: ["Math.rnd(7.25)", "round(7.25)", "rnd(7.25)", "Math.round(7.25)"],
    answer: "Math.round(7.25)",
  },
  {
    title: "How do you find the number with the highest value of x and y?",
    choices: ["top(x, y)", "ceil(x, y)", "Math.max(x, y)", "Math.ceil(x, y)"],
    answer: "Math.max(x, y)",
  },
  {
    title: "The syntax in programming refers to",
    choices: ["Structure", "Spelling", "Logic", "Opinion"],
    answer: "Structure",
  },

  {
    title: "JavaScript is the same as Java.",
    choices: [
      "FALSE",
      "TRUE",
      "The difference is trivial",
      "Java is shorthand for javascript",
    ],
    answer: "FALSE",
  },
  {
    title: "How can you detect the client's browser name?",
    choices: [
      "client.navName",
      "browser.name",
      "navigator.appName",
      "client.whatIsBrowserName?",
    ],
    answer: "navigator.appName",
  },
  {
    title: "Which event occurs when the user clicks on an HTML element?",
    choices: ["onclick", "onmouseclick", "onchange", "onmouseover"],
    answer: "onclick",
  },
  {
    title: "How do you declare a JavaScript variable?",
    choices: ["var carName;", "variable carName;", "v carName;", "carName==''"],
    answer: "var carName;",
  },
  {
    title: "Which operator is used to assign a value to a variable?",
    choices: ["*", "=", "x", "-"],
    answer: "=",
  },
  {
    title: "What will the following code return: Boolean(10 > 9)",
    choices: ["TRUE", "FALSE", "NaN", "undefined"],
    answer: "TRUE",
  },
  {
    title: "Is JavaScript case-sensitive?",
    choices: [
      "No",
      "Yes",
      "Depends on the context",
      "Depends on user preference",
    ],
    answer: "Yes",
  },
];
