import React from 'react'
import FilterableTag from './FilterableTag'

const FilterableTagSection = ({ todoStore }) => {
  const { filterableTags, todos, changeTodoFilter } = todoStore
  
  return (
    filterableTags.length > 0 && (
      <div className="filterable-tag-section">
        {todos.length > 0 ? (
          <h2>Filterable Tags</h2>
          ) : (	
          <h2>Recent Tags</h2>
        )}
        {filterableTags.map((tag, index) => (
          <FilterableTag 
            key={index} 
            tag={tag} 
            changeTodoFilter={changeTodoFilter} 
          />
        ))}
      </div>
    )  
  )
}

export default FilterableTagSection