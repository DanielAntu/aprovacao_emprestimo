import { useState } from "react";

import Form from "./components/Form";
import Result from "./components/Result";

import "./App.css";

function App() {
    const url = "http://127.0.0.1:5000/aprovation";

    const [loading, setLoading] = useState(false);
    const [age, setAge] = useState("");
    const [income, setIncome] = useState("");
    const [experience, setExperience] = useState("");
    const [loanAmount, setLoanAmount] = useState("");
    const [interestRate, setInterestRate] = useState("");
    const [historyDuration, setHistoryDuration] = useState("");
    const [pointCredit, setPointCredit] = useState("");
    const [gender, setGender] = useState("");
    const [educationLevel, setEducationLevel] = useState("");
    const [homeSituation, setHomeSituation] = useState("");
    const [purpose, setPurpose] = useState("");
    const [defaultVal, setDefaultVal] = useState("");
    const [showResult, setShowResult] = useState(false);
    const [result, setResult] = useState("");
    const [err, setErr] = useState("");

    const formateDate = (data) => {
        const [year, month, day] = data.split("-");
        return `${day}/${month}/${year}`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const obj = {
            age: formateDate(age),
            income,
            experience,
            requested_loan: loanAmount,
            interest_rate: interestRate,
            historical_duration: formateDate(historyDuration),
            credit_point: pointCredit,
            gender,
            educational_level: educationLevel,
            home_situation: homeSituation,
            purpose,
            default: defaultVal,
        };

        try {
            setLoading(true);
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(obj),
            });
            const data = await response.json();

            if (data.err) {
                setErr(data.err);
                setLoading(false);
                setTimeout(() => {
                    setErr("");
                }, 2000);
                return;
            }

            setResult(data.status);
            setLoading(false);
            setErr("");
            setShowResult(true);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="app">
            <header>
                <h2>Simulador de aprovação de empréstimo</h2>
            </header>
            <div className="container">
                {err && <div className="err">{err}</div>}
                {!showResult && (
                    <Form
                        setLoading={setLoading}
                        loading={loading}
                        handleSubmit={handleSubmit}
                        age={age}
                        setAge={setAge}
                        income={income}
                        setIncome={setIncome}
                        experience={experience}
                        setExperience={setExperience}
                        loanAmount={loanAmount}
                        setLoanAmount={setLoanAmount}
                        interestRate={interestRate}
                        setInterestRate={setInterestRate}
                        historyDuration={historyDuration}
                        setHistoryDuration={setHistoryDuration}
                        pointCredit={pointCredit}
                        setPointCredit={setPointCredit}
                        gender={gender}
                        setGender={setGender}
                        educationLevel={educationLevel}
                        setEducationLevel={setEducationLevel}
                        homeSituation={homeSituation}
                        setHomeSituation={setHomeSituation}
                        purpose={purpose}
                        setPurpose={setPurpose}
                        defaultVal={defaultVal}
                        setDefaultVal={setDefaultVal}
                    />
                )}

                {showResult && (
                    <Result
                        result={result}
                        setAge={setAge}
                        setIncome={setIncome}
                        setExperience={setExperience}
                        setLoanAmount={setLoanAmount}
                        setInterestRate={setInterestRate}
                        setHistoryDuration={setHistoryDuration}
                        setPointCredit={setPointCredit}
                        setGender={setGender}
                        setEducationLevel={setEducationLevel}
                        setHomeSituation={setHomeSituation}
                        setPurpose={setPurpose}
                        setDefaultVal={setDefaultVal}
                        setShowResult={setShowResult}
                    />
                )}
            </div>
            <footer>
                <p>&copy; Daniel Antunes 2024</p>
            </footer>
        </div>
    );
}

export default App;
