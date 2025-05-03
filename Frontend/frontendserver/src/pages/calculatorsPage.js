import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/calculatorsPage.css';

const inputTypes = {
  1: 'text',
  2: 'number'
};

const Calculators = ({ slug }) => {
  const [instruction, setInstruction] = useState('');
  const [formData, setFormData] = useState({});
  const [calcResult, setCalcResult] = useState(null);
  const [calcExpr, setCalcExpr] = useState('');
  const [calcLabel, setCalcLabel] = useState('');
  const [calcTitle, setCalcTitle] = useState('');
  const [calcDesc, setCalcDesc] = useState('');

  useEffect(() => {
    axios.get(`/pages/${slug}`)
      .then(res => {
        console.log("Instruction Data:", res.data.content); 
        setInstruction(res.data.content);
      })
      .catch(err => console.error(err));
  }, [slug]);

  useEffect(() => {
    if (!instruction) return;
  
    const parts = instruction.split('|');
  
    if (parts.length < 4) {
      console.warn("Instruction format is incomplete:", parts);
      return;
    }
  
    const [title, desc, inputs, label] = parts;
    setCalcTitle(title);
    setCalcDesc(desc);
    setCalcLabel(label);
  
    const tokens = inputs.split(',');
    const calcToken = tokens.find(t => t.startsWith('CALC='));
    if (calcToken) {
      const fullCalc = calcToken.replace('CALC=', '');
      setCalcExpr(fullCalc);
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
    if (!token || token.startsWith('CALC=')) return null;

    console.log(token);
  
    const type = token[0];
    const inputType = token.slice(-1);
    const content = token.substring(1, token.length - 1);
  
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
          {'Calculate'}
        </button>
      );
    }
  
    return null;
  };

  return (
    <div className="calcPage">
      <div className='leftP'></div>
      <div className="centerP2">
        {instruction ? (
          <div className="calcContent">
            <h1>{calcTitle}</h1>
            <p>{calcDesc}</p>
            {instruction.split('|')[2].split(',').map(renderElement)}
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