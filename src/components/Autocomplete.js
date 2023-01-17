import React from 'react'
import '../style.css'

export default function Autocomplete({
  suggestions,
  handleChangeForm,
  categoryName,
}) {
  const [filteredSuggestions, setFilteredSuggestions] = React.useState([])
  const [activeSuggestionIndex, setActiveSuggestionIndex] = React.useState(0)
  const [showSuggestions, setShowSuggestions] = React.useState(false)
  const [input, setInput] = React.useState('')

  React.useEffect(() => {
    setInput(categoryName)
  }, [categoryName])

  function handleChange(event) {
    const userInput = event.target.value
    const unLinked =
      suggestions &&
      suggestions.filter(
        suggestion =>
          suggestion.description
            .toLowerCase()
            .indexOf(userInput.toLowerCase()) > -1
      )

    setInput(userInput)
    setFilteredSuggestions(unLinked)
    setActiveSuggestionIndex(0)
    setShowSuggestions(true)
  }

  function handleClick(event, id) {
    setFilteredSuggestions([])
    setInput(event.target.innerText)
    setActiveSuggestionIndex(0)
    setShowSuggestions(false)
    handleChangeForm(id)
  }

  function handleKeyDown(event) {
    if (event.keyCode === 13) {
      setActiveSuggestionIndex(0)
      setShowSuggestions(false)
      setInput(filteredSuggestions[activeSuggestionIndex])
    } else if (event.keyCode === 38) {
      if (activeSuggestionIndex === 0) {
        return
      }
      setActiveSuggestionIndex(activeSuggestionIndex - 1)
    } else if (event.keyCode === 40) {
      if (activeSuggestionIndex - 1 === filteredSuggestions.length) {
        return
      }
      setActiveSuggestionIndex(activeSuggestionIndex + 1)
    }
  }

  const SuggestionsListComponent = () => {
    return filteredSuggestions.length ? (
      <div className="suggestions">
        <ul>
          {filteredSuggestions.map((suggestion, index) => {
            let className
            if (index === activeSuggestionIndex) {
              className = 'suggestion-active'
            }
            return (
              <li
                className={className}
                key={suggestion.id}
                onClick={ev => handleClick(ev, suggestion.id)}
              >
                {suggestion.description}
              </li>
            )
          })}
        </ul>
      </div>
    ) : (
      <div className="no-suggestions">
        <em>No suggestions!</em>
      </div>
    )
  }

  return (
    <div>
      <input
        type="text"
        className="form-control"
        onChange={handleChange}
        value={input}
        onKeyDown={handleKeyDown}
      />
      {showSuggestions && input && <SuggestionsListComponent />}
    </div>
  )
}
