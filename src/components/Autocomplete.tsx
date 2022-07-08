import React, { useState, useEffect, useRef, useMemo } from 'react'
import { TiLocation, TiDelete } from 'react-icons/ti'
import { getMatchedOption } from '../API/getMatchedOption'
import { ISuggestion } from '../interface/ISuggestion'

export interface IAutocomplete {
  countries: ISuggestion[]
}

const Autocomplete = ({ countries }: IAutocomplete) => {
  const [searchValue, setSearchValue] = useState<string>('')
  const [matchedContries, setMatchedContries] = useState<ISuggestion[]>([])
  const [isVisible, setVisiblity] = useState(false)
  const autoCompleteRef = useRef<HTMLDivElement>(null)

  const suggestions = useMemo(() => {
    let filteredCountries: ISuggestion[] = []
    if (matchedContries.length !== 0) {
      !searchValue
        ? (filteredCountries = countries)
        : (filteredCountries = matchedContries)
    } else {
      countries.forEach((country) => {
        if (country.option.toLowerCase().includes(searchValue.toLowerCase())) {
          filteredCountries.push({
            option: country.option,
            highlighted: country.highlighted,
          })
        }
      })
    }
    return filteredCountries
  }, [countries, searchValue])

  // Handle On change textbox method
  const handleOnChangeText = (e: any) => {
    let searchText: string = e.target.value
    !searchValue ? setVisiblity(false) : setVisiblity(true)

    setSearchValue(searchText)
    let finalArray: ISuggestion[] = []
    finalArray = getMatchedOption(countries, searchText)
    setMatchedContries(finalArray)
  }

  // Handle onClick of country select and set on input
  const handleSuggestion = (suggestion: string) => {
    setSearchValue(suggestion)
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
    setSearchValue('')
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
        value={searchValue}
        onChange={(e) => handleOnChangeText(e)}
        placeholder="Search Country..."
        autoComplete="off"
      />

      {searchValue !== '' ? (
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
                  onClick={() => handleSuggestion(country.option)}
                  key={country.option}
                >
                  <TiLocation style={{ marginRight: '0.8rem' }} />
                  <span
                    dangerouslySetInnerHTML={{ __html: country.highlighted }}
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
