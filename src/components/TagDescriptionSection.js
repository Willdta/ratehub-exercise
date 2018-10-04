import React from 'react'
import TagDescription from './TagDescription'

const TagDescriptionSection = ({ tagDescriptions }) => {
  return (
    <div className="tag-description-container">
      {tagDescriptions.map((tag, index) => (
        <TagDescription key={index} tag={tag} />
      ))}
    </div>
  )
}

export default TagDescriptionSection