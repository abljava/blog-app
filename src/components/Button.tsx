import styles from './Button.module.scss';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export default function Button({ 
  children, 
  variant = 'primary',
  onClick,
  type = 'button'
}: ButtonProps) {
  const buttonClass = variant === 'primary' 
    ? styles.primary 
    : styles.secondary;

  return (
    <button 
      type={type}
      className={`${styles.button} ${buttonClass}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

