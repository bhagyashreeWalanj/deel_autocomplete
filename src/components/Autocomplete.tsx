import React, { useState, useEffect, useRef, useMemo } from 'react'
import { TiLocation, TiDelete } from 'react-icons/ti'
import { getMatchedOption, highlightText } from '../util/getMatchedOption'

export interface IAutocomplete {
  countries: string[]
}

const Autocomplete = ({ countries }: IAutocomplete) => {
  const [searchInput, setSearchInput] = useState<string>('')
  const [isVisible, setVisiblity] = useState(false)
  const autoCompleteRef = useRef<HTMLDivElement>(null)

  const suggestions = useMemo(() => {
    let filteredCountries: string[] = []
    filteredCountries =
      searchInput.length !== 0
        ? getMatchedOption(countries, searchInput)
        : countries

    return filteredCountries
  }, [countries, searchInput])

  // Handle On change textbox method
  const handleOnChangeText = (e: any) => {
    let searchText: string = e.target.value.replace(/[^a-zA-Z\s]/g, '')
    !searchText ? setVisiblity(false) : setVisiblity(true)

    setSearchInput(searchText)
  }

  // Handle onClick of country select and set on input
  const handleSuggestion = (suggestion: string) => {
    setSearchInput(suggestion)
    setVisiblity(false)
  }

  // To hide the list if mouse click on screen
  const handleOutsideClick = (event: any) => {
    const { current: wrap } = autoCompleteRef
    if (wrap && !wrap.contains(event.target)) {
      setVisiblity(false)
    }
  }

  // Delete the text from input
  const handleDelete = () => {
    setSearchInput('')
    setVisiblity(true)
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [])

  return (
    <div className="autocomplete" ref={autoCompleteRef}>
      <input
        type="text"
        id="autocomplete_input"
        value={searchInput}
        onChange={(e) => handleOnChangeText(e)}
        placeholder="Search Country..."
        autoComplete="off"
      />

      {searchInput !== '' ? (
        <TiDelete
          className="closeButton"
          onClick={handleDelete}
          title={'Delete'}
        />
      ) : (
        ''
      )}

      {isVisible ? (
        suggestions.length === 0 ? (
          <ul className="suggestions">
            <li>No Data Found</li>
          </ul>
        ) : (
          <ul className="suggestions">
            {suggestions.map((country, index) => {
              return (
                <li
                  className="options"
                  id={`#suggest_${index}`}
                  onClick={() => handleSuggestion(country)}
                  key={country}
                >
                  <TiLocation style={{ marginRight: '0.8rem' }} />
                  <span
                    dangerouslySetInnerHTML={{
                      __html: highlightText(country, searchInput),
                    }}
                  ></span>
                </li>
              )
            })}
          </ul>
        )
      ) : (
        ''
      )}
    </div>
  )
}

export default Autocomplete
