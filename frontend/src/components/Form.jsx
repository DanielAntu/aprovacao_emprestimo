import { useState, useEffect } from "react";
import Select from "./Select";
import Input from "./Input";

import "./Form.css";

const Form = ({
    handleSubmit,
    setLoading,
    loading,
    age,
    setAge,
    income,
    setIncome,
    experience,
    setExperience,
    loanAmount,
    setLoanAmount,
    interestRate,
    setInterestRate,
    historyDuration,
    setHistoryDuration,
    pointCredit,
    setPointCredit,
    gender,
    setGender,
    educationLevel,
    setEducationLevel,
    homeSituation,
    setHomeSituation,
    purpose,
    setPurpose,
    defaultVal,
    setDefaultVal,
}) => {
    const url = "http://127.0.0.1:5000/";

    const [genders, setGenders] = useState([]);
    const [educationLevels, setEducationLevels] = useState([]);
    const [homeSituations, setHomeSituations] = useState([]);
    const [purposes, setPurposes] = useState([]);
    const [confirmations, setConfirmations] = useState([]);

    const get_fetch = async (endpoint, set) => {
        setLoading(true);
        const response = await fetch(url + endpoint);
        const data = await response.json();
        set(data);
        setLoading(false);
    };

    useEffect(() => {
        get_fetch("genders", setGenders);
        get_fetch("schools", setEducationLevels);
        get_fetch("home", setHomeSituations);
        get_fetch("purpose", setPurposes);
        get_fetch("confirmation", setConfirmations);
    }, []);

    return (
        <form onSubmit={handleSubmit}>
            <Input
                type="date"
                name="age"
                label="Data de Nascimento"
                value={age}
                setValue={setAge}
            />
            <Input
                name="income"
                label="Renda Anual"
                placeholder="Ex: 12000.80"
                value={income}
                setValue={setIncome}
            />
            <Input
                type="number"
                name="experience"
                label="Experiência Profissional"
                placeholder="Ex: 12"
                value={experience}
                setValue={setExperience}
            />
            <Input
                name="loan-amount"
                label="Valor do empréstimo"
                placeholder="Ex: 23000.80"
                value={loanAmount}
                setValue={setLoanAmount}
            />
            <Input
                name="interest-rate"
                label="Taxa de Juro"
                placeholder="Ex: 16.08"
                value={interestRate}
                setValue={setInterestRate}
            />
            <Input
                type="date"
                name="history-duration"
                label="Duração do histórico"
                value={historyDuration}
                setValue={setHistoryDuration}
            />
            <Input
                type="number"
                name="point-credit"
                label="Pontuação de Crédito"
                placeholder="Ex: 516"
                value={pointCredit}
                setValue={setPointCredit}
            />
            <Select
                name="gender"
                label="Gênero"
                options={genders}
                value={gender}
                setValue={setGender}
            />
            <Select
                name="education-level"
                label="Nível de Educação"
                options={educationLevels}
                value={educationLevel}
                setValue={setEducationLevel}
            />
            <Select
                name="home-situation"
                label="Situação da Casa"
                options={homeSituations}
                value={homeSituation}
                setValue={setHomeSituation}
            />
            <Select
                name="purpose"
                label="Finalidade do empréstimo"
                options={purposes}
                value={purpose}
                setValue={setPurpose}
            />
            <Select
                name="default"
                label="Inadimplente"
                options={confirmations}
                value={defaultVal}
                setValue={setDefaultVal}
            />
            {loading ? (
                <button type="submit" disabled>
                    Carregando...
                </button>
            ) : (
                <button type="submit">Enviar</button>
            )}
        </form>
    );
};

export default Form;

// 'idade', 'renda', 'experiencia profissional', 'emprestimo solicitado',
//        'taxa de juro', 'val emp ra', 'duracao historico', 'pont credito',
//        'genero_lb', 'nivel educacional_lb', 'situacao casa_lb',
//        'finalidade do emprestimo_lb', 'inadimplencia_lb'
