import React from 'react';

const FontSizeSelector = ({ selectedFontSize, handleFontSizeChange }) => {
  return (
    <div className="mb-3">
      <label htmlFor="fontSize" className="form-label">Select Font Size:</label>
      <select id="fontSize" className="form-select" value={selectedFontSize} onChange={handleFontSizeChange}>
        <option value="12px">12px</option>
        <option value="14px">14px</option>
        <option value="16px">16px</option>
        <option value="18px">18px</option>
        <option value="20px">20px</option>
        <option value="24px">24px</option>
      </select>
      <i></i>
    </div>
  );
};

export default FontSizeSelector;
