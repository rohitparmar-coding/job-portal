import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const questions = [
  {
    question: "1. What is React?",
    answer:
      "React is a JavaScript library developed by Facebook for building user interfaces, especially single-page applications using reusable components."
  },
  {
    question: "2. What is the Virtual DOM?",
    answer:
      "Virtual DOM is a lightweight copy of the real DOM. React updates the Virtual DOM first and then efficiently updates only the changed parts in the real DOM."
  },
  {
    question: "3. What is a Component in React?",
    answer:
      "Components are reusable pieces of UI. They can be functional components or class components and help break UI into smaller manageable parts."
  },
  {
    question: "4. What are React Hooks?",
    answer:
      "Hooks are functions that allow you to use state and lifecycle features in functional components. Example: useState, useEffect."
  },
  {
    question: "5. What is useState?",
    answer:
      "useState is a React hook that allows you to add state to functional components."
  },
  {
    question: "6. What is useEffect?",
    answer:
      "useEffect is a hook used to perform side effects such as API calls, DOM updates, or subscriptions in React components."
  },
  {
    question: "7. What is Redux?",
    answer:
      "Redux is a state management library used to manage global application state in large applications."
  },
  {
    question: "8. What is Node.js?",
    answer:
      "Node.js is a runtime environment that allows JavaScript to run on the server side."
  },
  {
    question: "9. What is MongoDB?",
    answer:
      "MongoDB is a NoSQL database that stores data in JSON-like documents instead of tables."
  },
  {
    question: "10. What is REST API?",
    answer:
      "REST API is an architectural style used for building web services that communicate using HTTP methods like GET, POST, PUT, DELETE."
  }
];

const InterviewFAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      
      <h2 className="text-3xl font-bold text-center mb-10">
        Top 10 Interview Questions
      </h2>

      <div className="space-y-4">
        {questions.map((item, index) => (
          <div
            key={index}
            className="border rounded-xl shadow-sm bg-white overflow-hidden"
          >
            
            {/* Question */}
            <button
              onClick={() => toggle(index)}
              className="flex justify-between items-center w-full p-5 text-left font-medium"
            >
              {item.question}
              <ChevronDown
                className={`transition-transform ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Answer */}
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-5 pb-5 text-gray-600"
                >
                  {item.answer}
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        ))}
      </div>
    </div>
  );
};

export default InterviewFAQ;