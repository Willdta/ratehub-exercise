import React from 'react'

const FilterableTag = ({ tag, changeTodoFilter }) => (
  <span
  className="button-style"
  onClick={() => changeTodoFilter(tag)}
  >
    {tag}
  </span>
)

export default FilterableTag