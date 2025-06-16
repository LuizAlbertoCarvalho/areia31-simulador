
import React from 'react';
// InputType é importado no App.jsx e passado como prop 'type'

// Props são passadas diretamente, sem interface explícita aqui para JS simples
const FormField = ({ id, label, value, onChange, type, placeholder, rows, min }) => {
  const commonClasses = "w-full p-3 border border-purple-400 rounded-md shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-150 ease-in-out bg-purple-100/70 text-purple-900 placeholder-purple-600/70";

  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="mb-2 font-semibold text-purple-800">
        {label}
      </label>
      {type === 'textarea' ? ( // Compara com string diretamente
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows || 5}
          className={`${commonClasses} min-h-[120px] resize-y`}
          aria-label={label}
        />
      ) : (
        <input
          id={id}
          type="number" // Assumindo que o outro tipo é 'number'
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          min={min}
          className={`${commonClasses}`}
          aria-label={label}
        />
      )}
    </div>
  );
};

export default FormField;
