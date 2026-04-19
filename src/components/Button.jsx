import React from 'react';
import { Link } from 'react-router-dom';

export default function Button({ children, variant = 'primary', className = '', icon, to, onClick, fullWidth = false }) {
  const baseClasses = 'kinetic-pill rounded-full font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-transform';
  
  const variants = {
    primary: 'bg-primary text-white shadow-xl hover:scale-105 active:scale-95',
    secondary: 'bg-secondary-container text-on-secondary-container shadow-md hover:scale-105 active:scale-95',
    outline: 'border-2 border-primary text-primary hover:bg-primary/5',
  };

  const buttonClasses = `${baseClasses} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`;

  const renderContent = () => (
    <>
      {icon && <span className="material-symbols-outlined text-sm">{icon}</span>}
      {children}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={buttonClasses}>
        {renderContent()}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={buttonClasses}>
      {renderContent()}
    </button>
  );
}
