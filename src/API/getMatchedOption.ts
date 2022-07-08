import { ISuggestion } from "../interface/ISuggestion";

// Hnadle the matching text method and return with highlighted text
export const getMatchedOption= (countries: ISuggestion[], searchText: string): ISuggestion[] => {
  let result: ISuggestion[] =[];

  countries.forEach((country: any) => {
    const element: string = country.option
    let matchText: string ='';
   
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
        matchText = `${matchStart}<strong>${highlighted}</strong>${matchEnd}`
        result.push({
          option: element,
          highlighted: matchText,
        })
      }
    
    }
  })

   // const element: string = option.option
    
    return result;
  }