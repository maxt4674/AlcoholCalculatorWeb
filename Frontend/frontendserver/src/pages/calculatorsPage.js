import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/calculatorsPage.css';

const inputTypes = {
  0: 'text',
  1: 'text',
  2: 'number'
};

const Calculators = ({ slug }) => {
  const [instruction, setInstruction] = useState('');
  const [formData, setFormData] = useState({});
  const [calcResult, setCalcResult] = useState(null);
  const [calcExpr, setCalcExpr] = useState('');
  const [calcLabel, setCalcLabel] = useState('');

  useEffect(() => {
    axios.get(`/api/pages/${slug}`)
      .then(res => {
        console.log("Instruction Data:", res.data.content); // Check here
        setInstruction(res.data.content);
      })
      .catch(err => console.error(err));
  }, [slug]);

  useEffect(() => {
    const tokens = instruction.split(',');
    const calcToken = tokens.find(t => t.startsWith('CALC='));
    if (calcToken) {
      const fullCalc = calcToken.replace('CALC=', '');
      const [expression, label] = fullCalc.split('|');
      setCalcExpr(expression);
      setCalcLabel(label || 'Result:');
    }
  }, [instruction]);

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    try {
      const vars = { ...formData };
      const func = new Function(...Object.keys(vars), `return ${calcExpr}`);
      const result = func(...Object.values(vars));
      setCalcResult(result);
    } catch (err) {
      console.error("Calculation error:", err);
      setCalcResult("Error in calculation");
    }
  };

  const renderElement = (token, index) => {
    if (token.startsWith('CALC=')) return null;

    const type = token[0];
    const content = token.slice(1, -1);
    const inputType = token.slice(-1);

    if (type === '1') {
      return (
        <div key={index} className="formField">
          <label>{content}</label>
          <input
            type={inputTypes[inputType] || 'text'}
            value={formData[content] || ''}
            onChange={e => handleChange(content, e.target.value)}
          />
        </div>
      );
    } else if (type === '2') {
      return (
        <button key={index} onClick={handleSubmit}>
          Calculate
        </button>
      );
    }
    return null;
  };

  return (
    <div className="calcPage">
      <div className='leftP'></div>
      <div className="centerP">
        <h1>{slug.toUpperCase()}</h1>
        {instruction ? (
          <div className="calcContent">
            {instruction.split(',').map(renderElement)}
            {calcResult !== null && (
              <div className="result">
                <strong>{calcLabel}</strong> {calcResult}
              </div>
            )}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div className='rightP'></div>
    </div>
  );
};

export default Calculators;