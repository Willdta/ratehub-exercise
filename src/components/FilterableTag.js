import React from 'react'

const FilterableTag = ({ tag, changeTodoFilter }) => {
  return (
    <span
    className="button-style"
    onClick={() => changeTodoFilter(tag)}
    >
      {tag}
    </span>
  )
}

export default FilterableTag