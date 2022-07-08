import React, { useState, useEffect, useRef } from 'react'
import { TiLocation, TiDelete } from 'react-icons/ti'
import { ISuggestion } from '../interface/ISuggestion'

export interface IAutocomplete {
  countries: ISuggestion[]
}

const Autocomplete = ({ countries }: IAutocomplete) => {
  const [searchValue, setSearchValue] = useState<string>('')
  const [newArray, setNewArray] = useState<ISuggestion[]>([])
  const [showSuggestion, setShowSuggestion] = useState(false)

  const autoCompleteRef = useRef<HTMLDivElement>(null)

  let filteredCountries: ISuggestion[] = []
  if (newArray.length !== 0) {
    filteredCountries = newArray
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

  const handleOnChangeText = (e: any) => {
    let searchText: string = e.target.value
    searchText.length <= 0 ? setShowSuggestion(false) : setShowSuggestion(true)

    setSearchValue(searchText)
    let finalArray: ISuggestion[] = []

    countries.forEach((option) => {
      const element: string = option.option
      let matchStartIndex: number = 0
      if (
        (matchStartIndex = element
          .toLowerCase()
          .indexOf(searchText.toLowerCase())) > -1
      ) {
        let matchStart = element.slice(0, matchStartIndex)
        let highlighted = element.substring(
          matchStartIndex,
          matchStartIndex + searchText.length,
        )
        let matchEnd: string = element.substring(
          matchStartIndex + searchText.length,
        )

        if (matchStartIndex >= 0) {
          let matchText = `${matchStart}<strong>${highlighted}</strong>${matchEnd}`

          finalArray.push({
            option: element,
            highlighted: matchText,
          })
        }
      }
    })
    setNewArray(finalArray)
  }

  // handle onClick of list element to country select from the list and set on input
  const handleSuggestion = (suggestion: string) => {
    setSearchValue(suggestion)
    setShowSuggestion(false)
  }

  // To hide the list if mouse click on screen
  const handleOutsideClick = (event: any) => {
    const { current: wrap } = autoCompleteRef
    if (wrap && !wrap.contains(event.target)) {
      setShowSuggestion(false)
    }
  }

  // delete the text from input
  const handleDelete = () => {
    setSearchValue('')
    setShowSuggestion(true)
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
        <TiDelete className="closeButton" onClick={handleDelete} />
      ) : (
        ''
      )}

      {showSuggestion ? (
        filteredCountries.length === 0 ? (
          <ul className="suggestions">
            <li>No Data Found</li>
          </ul>
        ) : (
          <ul className="suggestions">
            {filteredCountries.map((country, index) => {
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
