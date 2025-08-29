import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";



const STORAGE_KEY = "quizState_preserve_classnames_v1";

const MainQuiz = ({handlesend}) => {
  const[cheat,setCheat]=useState(0)
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState([]); 
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const navigate=useNavigate();
  const [answeredQuestions, setAnsweredQuestions] = useState(new Set());
  const [markedForReview, setMarkedForReview] = useState(new Set());
  const [visitedQuestions, setVisitedQuestions] = useState(new Set());
  const [notAnswered, setNotAnswered] = useState(new Set());
  const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [categoryScores, setCategoryScores] = useState({});
   const userName = localStorage.getItem("userName");
  const userEmail = localStorage.getItem("userEmail");
 const [timeLeft, setTimeLeft] = useState(3600);



 const enterFullScreen = () => {
  console.log(cheat)
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
  };

  // useEffect(() => {
  //   const handleExit = () => {
  //     if (!document.fullscreenElement) {
  //       toast.warn("⚠️ You exited fullscreen. Please return to the test!");
  //       setTimeout(() => {
  //         if (!document.fullscreenElement) {
  //           enterFullScreen();
  //         }
  //       }, 500);
  //     }
  //   };
  //   document.addEventListener("fullscreenchange", handleExit);
  //   return () => document.removeEventListener("fullscreenchange", handleExit);
  // }, []);


 useEffect(() => {
    if (submitted) return; // stop timer after submit
    if (timeLeft <= 0) {
      handleSubmit(); // auto-submit when time is up
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, submitted]);

  // ⏱️ NEW - format timer mm:ss
  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

   // ✅ Detect exit from fullscreen
  useEffect(() => {
    const handleExit = () => {
      if (!document.fullscreenElement) {
        toast.warn("⚠️ You exited fullscreen. Returning you back to the test!");
        enterFullScreen();
      }
    };

    document.addEventListener("fullscreenchange", handleExit);
    return () => document.removeEventListener("fullscreenchange", handleExit);
  }, []);

  useEffect(() => {
    const disableShortcuts = (e) => {
      if (
        (e.ctrlKey && ["c", "v", "x", "u"].includes(e.key.toLowerCase())) || // copy/paste/source
        e.key === "F12"
      ) {
        e.preventDefault();
        toast.warn("🚫 Shortcuts are disabled during the test!");
      }
    };

    const disableRightClick = (e) => e.preventDefault();

    document.addEventListener("keydown", disableShortcuts);
    document.addEventListener("contextmenu", disableRightClick);

    return () => {
      document.removeEventListener("keydown", disableShortcuts);
      document.removeEventListener("contextmenu", disableRightClick);
    };
  }, []);

  // ✅ Detect tab switch (warning only)
  useEffect(() => {
    let warningShown = false;

    const handleBlur = () => {
      if (warningShown) return; // prevent spam
      warningShown = true;

      setCheat((prev) => {
        const newCount = prev + 1;
        if (newCount >= 3) {
          toast.warn("🚨 You switched tabs 3 times. Submitting quiz.");
          handleSubmit();
        } else {
          toast.warn(`⚠️ Tab switch detected! (${newCount}/3 warnings)`);
        }
        return newCount;
      });

      setTimeout(() => {
        warningShown = false;
      }, 2000);
    };

    window.addEventListener("blur", handleBlur);
    return () => window.removeEventListener("blur", handleBlur);
  }, []);

  
  const totalQuestions = 40;
  const getOptionEntries = (q) => {
    if (!q) return [];
    const opts = q.options;
    if (Array.isArray(opts)) {
      return opts.map((v, i) => [String.fromCharCode(65 + i), String(v)]);
    } else if (opts && typeof opts === "object") {
      return Object.entries(opts).map(([k, v]) => [String(k), String(v)]);
    }
    return [];
  };

  
  useEffect(() => {
    console.log(selectedAnswer)
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const p = JSON.parse(saved);
        setQuestions(p.questions || []);
        setCurrentQuestion(p.currentQuestion || 0);
        setResponses(p.responses || new Array((p.questions || []).length).fill(null));
        setSelectedAnswer((p.responses && p.responses[p.currentQuestion]) ?? null);
        setAnsweredQuestions(new Set(p.answeredQuestions || []));
        setMarkedForReview(new Set(p.markedForReview || []));
        setVisitedQuestions(new Set(p.visitedQuestions || []));
        setNotAnswered(new Set(p.notAnswered || []));
        setScore(p.score || 0);
        setSubmitted(!!p.submitted);
        setCategoryScores(p.categoryScores || {});
        // do not return here if you want to still fetch fresh data; but we assume saved is good
        return;
      } catch (err) {
        // if parse fails, fall back to fetch
        console.warn("Failed to parse saved quiz state, fetching fresh:", err);
      }
    }

    const fetchData = async () => {
  try {
    const response = await axios.get("https://final-quiz-portal.onrender.com/api/mcqs/getques");
    const qs = response.data || [];
    setQuestions(qs);
    setResponses(new Array(qs.length).fill(null));
  } catch (error) {
    console.error("Error fetching questions:", error);
  }
};

    fetchData();
  }, []);

  // ---------- persist to localStorage ----------
  useEffect(() => {
  if (!questions || questions.length === 0) return;

  // 🚀 Do not persist if quiz is already submitted
  if (submitted) return;

  const payload = {
    questions,
    currentQuestion,
    responses,
    answeredQuestions: Array.from(answeredQuestions),
    markedForReview: Array.from(markedForReview),
    visitedQuestions: Array.from(visitedQuestions),
    notAnswered: Array.from(notAnswered),
    score,
    submitted,
    categoryScores,
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch (err) {
    console.warn("Could not save quiz state:", err);
  }
}, [
  questions,
  currentQuestion,
  responses,
  answeredQuestions,
  markedForReview,
  visitedQuestions,
  notAnswered,
  score,
  submitted,
  categoryScores,
]);
  // keep selectedAnswer in sync when currentQuestion/responses change
  useEffect(() => {
    setSelectedAnswer(responses[currentQuestion] ?? null);
    // mark visited as soon as we land
    setVisitedQuestions((prev) => {
      const ns = new Set(prev);
      ns.add(currentQuestion);
      return ns;
    });
  }, [currentQuestion, responses]);

  // ---------- user clicks an option ----------
  const handleSelectOption = (optionKey) => {
    // save selection locally for the current question
    setSelectedAnswer(optionKey);
    setResponses((prev) => {
      const copy = [...prev];
      // ensure array long enough
      if (copy.length < questions.length) {
        copy.length = questions.length;
      }
      copy[currentQuestion] = optionKey;
      return copy;
    });
    // do not immediately mark as answered; keep same behavior as your original:
    // answeredQuestions is added on Save & Next
  };

  // ---------- Save & Next ----------
  const handleSaveAndNext = () => {
    // mark visited
    setVisitedQuestions((prev) => {
      const ns = new Set(prev);
      ns.add(currentQuestion);
      return ns;
    });

    // if a selection exists for this question -> set answered; else mark notAnswered
    const resp = responses[currentQuestion];
    if (resp !== null && resp !== undefined) {
      setAnsweredQuestions((prev) => {
        const ns = new Set(prev);
        ns.add(currentQuestion);
        return ns;
      });
      setNotAnswered((prev) => {
        const ns = new Set(prev);
        ns.delete(currentQuestion);
        return ns;
      });
    } else {
      setNotAnswered((prev) => {
        const ns = new Set(prev);
        ns.add(currentQuestion);
        return ns;
      });
      setAnsweredQuestions((prev) => {
        const ns = new Set(prev);
        ns.delete(currentQuestion);
        return ns;
      });
    }

    // move next
    setSelectedAnswer(null);
    setCurrentQuestion((prev) => (questions.length ? (prev + 1) % questions.length : prev));
  };

  // ---------- Mark for Review & Next ----------
  const handleMarkForReview = () => {
    setMarkedForReview((prev) => {
      const ns = new Set(prev);
      ns.add(currentQuestion);
      return ns;
    });
    // call save & next behavior (visited/notAnswered logic)
    handleSaveAndNext();
  };

  // ---------- Clear Response ----------
  const handleClearResponse = () => {
    setResponses((prev) => {
      const copy = [...prev];
      copy[currentQuestion] = null;
      return copy;
    });
    setSelectedAnswer(null);

    setVisitedQuestions((prev) => {
      const ns = new Set(prev);
      ns.add(currentQuestion);
      return ns;
    });

    setAnsweredQuestions((prev) => {
      const ns = new Set(prev);
      ns.delete(currentQuestion);
      return ns;
    });

    setNotAnswered((prev) => {
      const ns = new Set(prev);
      ns.add(currentQuestion);
      return ns;
    });
  };

  // ---------- Submit (compute total + category-wise) ----------
 // ---------- Submit (compute total + category-wise) ----------
const handleSubmit = async () => {
  handlesend(answeredQuestions.size, markedForReview.size, visitedQuestions.size, notAnswered.size);

  let total = 0;
  const catMap = {};
  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    const respKey = responses[i];
    if (respKey == null) continue;

    const entries = getOptionEntries(q);
    const found = entries.find(([k]) => String(k) === String(respKey));
    const respValue = found ? found[1] : respKey;

    if (q && q.answer != null) {
      if (String(q.answer) === String(respKey) || String(q.answer) === String(respValue)) {
        total++;
        const cat = q.category || q.domain || "Uncategorized";
        catMap[cat] = (catMap[cat] || 0) + 1;
      }
    }
  }

  setScore(total);
  setCategoryScores(catMap);
  setSubmitted(true);

  // ✅ Prepare payload for backend
  const payload = {
    name: userName,
    email: userEmail,
    score: total,
    codingScore: catMap["Programming"] || 0,
    aptScore: catMap["Aptitude"] || 0,
    webScore: catMap["Web Development"] || 0,
    mathsScore: catMap["Maths"] || 0,
  };

  try {
    // ✅ Save result to backend
    await axios.post("https://final-quiz-portal.onrender.com/api/results/results", payload);

    // ✅ Clear quiz state from localStorage
    localStorage.removeItem(STORAGE_KEY);
    toast.success("Quiz submitted successfully")
    // ✅ Navigate
    navigate("/preresult");
  } catch (err) {
    console.error("Error saving result:", err);
  }
};

  // ---------- guard while fetching ----------
  if (questions.length === 0) {
    return <h3>Loading questions...</h3>;
  }

  // current question data
  const currentQ = questions[currentQuestion] || {};
  const optionEntries = getOptionEntries(currentQ);

  return (
    <div className="quiz-container">
      <div className="main-content">
        <div className="header3">
          <h2>Turing Test Quiz</h2>
          <div className="timer">Time Left: {formatTime(timeLeft)}</div>
        </div>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${(answeredQuestions.size / totalQuestions) * 100}%`,
            }}
          ></div>
        </div>

        <h3 className="questions">
          Question {currentQuestion + 1} of {totalQuestions} / {questions[currentQuestion].domain}
        </h3>
        <p className="question-text">{currentQ.question}</p>

        <div className="options-list">
          {optionEntries.length > 0 ? (
            optionEntries.map(([key, value]) => (
              <div
                key={key}
                className={`option ${responses[currentQuestion] === key ? "selected" : ""}`}
                onClick={() => handleSelectOption(key)}
              >
                <span className="option-label">{key}</span>
                {value}
              </div>
            ))
          ) : (
            <div className="option">
              <span className="option-label">-</span>
              No options available
            </div>
          )}
        </div>

        <div className="action-buttons">
          <button className="save-next-btn" onClick={handleSaveAndNext}>
            Save & Next
          </button>
          <button className="clear-btn" onClick={handleClearResponse}>
            Clear Response
          </button>
          <button className="mark-review-btn" onClick={handleMarkForReview}>
            Mark for Review & Next
          </button>
          <button
  className="submit-btn1"
  onClick={handleSubmit}
  disabled={visitedQuestions.size !== totalQuestions && timeLeft > 0}
>
  {visitedQuestions.size !== totalQuestions && timeLeft > 0
    ? "Attempt All Questions to Submit"
    : "Submit Quiz"}
</button>
        </div>

        {/* results after submit */}
        {/* {submitted && (
          <div className="results" style={{ marginTop: 12 }}>
            <h3>Quiz Results</h3>
            <p>
              Total Score: {score} / {questions.length}
            </p>
            <h4>Category-wise Score:</h4>
           <ul>
              {Object.keys(categoryScores).length === 0 ? (
                <li>No category scores (no correct answers)</li>
              ) : (
                Object.entries(categoryScores).map(([cat, val]) => (
                  <li key={cat}>
                    {cat}: {val}
                  </li>
                ))
              )}
            </ul> 
          </div>
        )} */}
      </div>

      <div className="sidebar">
        <div className="palette">
          <h4>Question Palette</h4>
          <div className="question-grid">
            {Array.from({ length: totalQuestions }, (_, i) => (
              <div
                key={i}
                className={`question-number ${answeredQuestions.has(i) ? "answered" : ""} ${
                  markedForReview.has(i) ? "marked" : ""
                } ${notAnswered.has(i) ? "not-answered" : ""}`}
                onClick={() => {
                  setVisitedQuestions((prev) => {
                    const ns = new Set(prev);
                    ns.add(i);
                    return ns;
                  });
                  // only set index if it's within available questions; otherwise it will show blank
                  setCurrentQuestion(i);
                }}
                title={
                  answeredQuestions.has(i)
                    ? "Answered"
                    : markedForReview.has(i)
                    ? "Marked for Review"
                    : notAnswered.has(i)
                    ? "Not Answered"
                    : "Not Visited"
                }
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>

        <div className="summary">
          <h4>Summary</h4>
          <div className="summary-grid">
            <div className="summary-item answered-summary">
              <strong>Answered</strong>
              <span>{answeredQuestions.size}</span>
            </div>
            <div className="summary-item not-answered-summary">
              <strong>Not Answered</strong>
              <span>{notAnswered.size}</span>
            </div>
            <div className="summary-item marked-summary">
              <strong>Marked</strong>
              <span>{markedForReview.size}</span>
            </div>
            <div className="summary-item not-visited-summary">
              <strong>Not Visited</strong>
              <span>{totalQuestions - visitedQuestions.size}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainQuiz;
