import "./Result.css";

const Result = ({
    result = "",
    setShowResult,
    setAge,
    setIncome,
    setExperience,
    setLoanAmount,
    setInterestRate,
    setHistoryDuration,
    setPointCredit,
    setGender,
    setEducationLevel,
    setHomeSituation,
    setPurpose,
    setDefaultVal,
}) => {
    const handleClickBack = () => {
        setAge("");
        setIncome("");
        setExperience("");
        setLoanAmount("");
        setInterestRate("");
        setHistoryDuration("");
        setPointCredit("");
        setGender("");
        setEducationLevel("");
        setHomeSituation("");
        setPurpose("");
        setDefaultVal("");
        setShowResult(false);
    };

    const handleClickEdit = () => {
        setShowResult(false);
    };

    return (
        <div className="container-result">
            <h3>O empréstimo foi:</h3>
            <h1 className={result === "Aprovado" ? "aproved" : "reproved"}>
                {result}
            </h1>
            <div className="button">
                <button onClick={handleClickBack}>Voltar</button>
                <button onClick={handleClickEdit}>Editar</button>
            </div>
        </div>
    );
};

export default Result;
