import React from 'react';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  href?: string;
};

const Button: React.FC<Props> = ({ children, className = '', href, ...rest }) => {
  const base = 'inline-flex items-center justify-center font-inter font-semibold py-3 px-6 rounded-lg text-lg shadow-md transition-all duration-300';
  const gradient = 'bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white';

  if (href) {
    return (
      <a href={href} className={`${base} ${gradient} ${className}`} {...(rest as any)}>
        {children}
      </a>
    );
  }

  return (
    <button className={`${base} ${gradient} ${className}`} {...rest}>
      {children}
    </button>
  );
};

export default Button;
