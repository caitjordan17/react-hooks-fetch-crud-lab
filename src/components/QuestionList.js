import React, {useState, useEffect} from "react";
import QuestionItem from "./QuestionItem"

function QuestionList() {
  const [questions, setQuestions] = useState([])
  
  useEffect(() => {
    fetch('http://localhost:4000/questions')
      .then((r) => r.json())
      .then((data) => setQuestions(data))
  }, []);

  function handleDeleteClick(id){
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => {
        const updatedQuestions = questions.filter((q) => q.id !== id);
        setQuestions(updatedQuestions);
      });
  }

  function handleAnswerChange(id, correctIndex){
    fetch(`http://localhost:4000/questions/${id}`,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    })
    .then((r) => r.json())
    .then((updatedQuestion) => {
      const updatedQuestions = questions.map((q) => {
        if (q.id === updatedQuestion.id) return updatedQuestion;
        return q;
      });
      setQuestions(updatedQuestions)
    });
  }
  
  const questionData = questions.map((question) => (
    <QuestionItem key={question.id} 
    question={question} 
    onDeleteClick={handleDeleteClick}
    onAnswerChange={handleAnswerChange}/>));

  console.log("QL:", questionData)
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionData}</ul>
    </section>
  );
}

export default QuestionList;
//id={question.id} prompt={question.prompt} answers={question.answers} correctIndex={question.correctIndex}