import styled from '@emotion/styled'

const Button = styled.button`
  --primary-color: #007bff;
  --hover-color: #0056b3;
  --active-color: #004494;
  --focus-outline: #ffcc00;
  --disabled-bg: #d6d6d6;
  --disabled-text: #7a7a7a;
  --text-color: #ffffff;
  --border-radius: 8px;
  --transition-speed: 0.2s ease-in-out;

  display: inline-block;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  color: var(--text-color);
  background-color: var(--primary-color);
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition:
    background-color var(--transition-speed),
    transform var(--transition-speed);
  outline: none;

  /* Hover effect */
  &:hover {
    background-color: var(--hover-color);
  }

  /* Active effect */
  &:active {
    background-color: var(--active-color);
    transform: scale(0.98);
  }

  /* Focus state for accessibility */
  &:focus {
    outline: 3px solid var(--focus-outline);
    outline-offset: 2px;
  }

  /* Disabled state */
  &:disabled {
    background-color: var(--disabled-bg);
    color: var(--disabled-text);
    cursor: not-allowed;
    opacity: 0.6;
  }
`

export default Button
