import React from 'react'

const MoonIcon = ({
  title = 'moon',
  strokeColor = 'currentColor',
  fillColor = 'none',
  size = '24',
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={fillColor}
    stroke={strokeColor}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-moon"
  >
    <title>{title}</title>
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
)

export default MoonIcon
