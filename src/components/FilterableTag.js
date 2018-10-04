import React from 'react'

const FilterableTag = ({ tag, changeTodoFilter }) => {
  return (
    <span
    className="button-style"
    onClick={() => changeTodoFilter(tag)}
    style={{
      'position': 'relative',
      'bottom': '-300px',
      'padding': '0 10px'
    }}>
      {tag}
    </span>
  )
}

export default FilterableTag