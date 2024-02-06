import React from 'react'

const MinusIcon = ({
  title = 'trash',
  strokeColor = 'white',
  fillColor = 'none',
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={fillColor}
    stroke={strokeColor}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-minus"
  >
    <title>{title}</title>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
)

export default MinusIcon
