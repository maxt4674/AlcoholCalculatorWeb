import React, { useState } from 'react';
import axios from 'axios'; // Importing axios
import '../css/editCalculatorsPage.css';

const CalcPage = () => {
  const [elements, setElements] = useState([]);
  const [expression, setExpression] = useState('');
  const [label, setLabel] = useState('');
  const [preview, setPreview] = useState('');
  const [inputCount, setInputCount] = useState(1);
  const [multiInputs, setMultiInputs] = useState([{ label: '', type: '1' }]);
  const [buttonLabel, setButtonLabel] = useState('');
  const [slug, setSlug] = useState('');

  const isValidFieldName = (name) => /^[^,|]+$/.test(name);
  const isDuplicateField = (name) => elements.some(el => el.startsWith(`1${name}`));

  const addInput = (fieldName, inputType) => {
    setElements(prev => [...prev, `1${fieldName}${inputType}`]);
  };

  const addButton = (label) => {
    setElements(prev => [...prev, `2${label}`]);
  };

  const handleInputCountChange = (count) => {
    const num = parseInt(count) || 1;
    setInputCount(num);
    setMultiInputs(
      Array.from({ length: num }, (_, i) => multiInputs[i] || { label: '', type: '1' })
    );
  };

  const handleMultiInputChange = (index, key, value) => {
    const updated = [...multiInputs];
    updated[index][key] = value;
    setMultiInputs(updated);
  };

  const handleAddMultipleInputs = () => {
    for (const { label, type } of multiInputs) {
      if (!label || !isValidFieldName(label)) {
        alert("All field names must be non-empty and contain only letters, numbers, or underscores.");
        return;
      }
      if (isDuplicateField(label)) {
        alert(`Duplicate field name detected: "${label}"`);
        return;
      }
    }

    multiInputs.forEach(({ label, type }) => {
      addInput(label, type);
    });
    setMultiInputs([{ label: '', type: '1' }]);
    setInputCount(1);
  };

  const handleAddButton = () => {
    if (!buttonLabel.trim()) {
      alert("Button label cannot be empty.");
      return;
    }
    addButton(buttonLabel);
    setButtonLabel('');
  };

  const generateInstruction = () => {
    const calc = `CALC=${expression}|${label}`;
    const instruction = [...elements, calc].join(',');
    setPreview(instruction);
  };

  const submitToBackend = async () => {
    if (!slug || !preview) {
      alert("Slug and instruction must be filled out before submission.");
      return;
    }

    try {
      // Check if the slug already exists in the backend
      const checkResponse = await axios.get(`http://localhost:8080/api/pages/check/${slug}`);
      if (checkResponse.status != 200) {
        alert("Slug already exists. Please choose another one.");
        return;
      }

      // If slug is unique, proceed to create the page
      const response = await axios.post('http://localhost:8080/api/pages', {
        slug: slug,
        title: preview,
      });

      alert(`Success: Page saved as "${response.data.slug}"`);
    } catch (error) {
      console.error(error);
      alert("Failed to submit the page.");
    }
  };

  return (
    <div className="calcSetupPage">
      <h2>Create Your Page</h2>

      <div className="inputSection">
        <h3>Add Input Fields</h3>
        <label>
          Number of Fields:
          <input
            type="number"
            min="1"
            value={inputCount}
            onChange={(e) => handleInputCountChange(e.target.value)}
          />
        </label>

        {multiInputs.map((input, idx) => (
          <div key={idx} style={{ display: 'flex', gap: '8px', marginBottom: '4px', justifyContent: 'center', marginTop: '4px' }}>
            <input
              type="text"
              placeholder={`Label ${idx + 1}`}
              value={input.label}
              onChange={e => handleMultiInputChange(idx, 'label', e.target.value)}
            />
            <select
              value={input.type}
              onChange={e => handleMultiInputChange(idx, 'type', e.target.value)}
            >
              <option value="1">Text</option>
              <option value="2">Number</option>
            </select>
          </div>
        ))}

        <button onClick={handleAddMultipleInputs}>Add Inputs</button>
      </div>

      <div className="buttonSection">
        <h3>Add Submit Button</h3>
        <input
          type="text"
          placeholder="Button Label"
          value={buttonLabel}
          onChange={e => setButtonLabel(e.target.value)}
        />
        <button onClick={handleAddButton}>Add Button</button>
      </div>

      <div className="calcSection">
        <h3>Calculation</h3>
        <input
          type="text"
          placeholder="Expression (e.g. AlchVol * 3)"
          value={expression}
          onChange={e => setExpression(e.target.value)}
        />
        <input
          type="text"
          placeholder="Result Label (e.g. Your alch volume is:)"
          value={label}
          onChange={e => setLabel(e.target.value)}
        />
        <button onClick={generateInstruction}>Generate Instruction</button>
      </div>

      <div className="previewSection">
        <h3>Instruction Preview</h3>
        <textarea value={preview} readOnly rows={4} />
      </div>

      <div className="slugSection">
        <h3>Save Page</h3>
        <input
          type="text"
          placeholder="Enter slug name (e.g. alch-volume)"
          value={slug}
          onChange={e => setSlug(e.target.value)}
        />
        <button onClick={submitToBackend}>Submit to Backend</button>
      </div>

      <div className="previewList">
        <h4>Elements Added</h4>
        <ul>
          {elements.map((el, idx) => <li key={idx}>{el}</li>)}
        </ul>
      </div>
    </div>
  );
};

export default CalcPage;