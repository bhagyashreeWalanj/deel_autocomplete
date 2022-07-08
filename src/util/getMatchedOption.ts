
export const getMatchedOption= (countries: string[], searchText: string): string[] => {
  let result: string[] =[];

  countries.forEach((country: any) => {
    const element: string = country
    if (element.toLowerCase().indexOf(searchText.toLowerCase()) > -1) {
        result.push(element);
    }
  })    
    return result;
  }

  // Handle the matching text method and return with highlighted text
  export const highlightText = (country: string, searchText: string) => {
    let matchStartIndex = country.toLowerCase().indexOf(searchText.toLowerCase());
    let matchStart = country.slice(0, matchStartIndex)
      let highlighted = country.substring(
        matchStartIndex,
        matchStartIndex + searchText.length,
      )
      let matchEnd: string = country.substring(
        matchStartIndex + searchText.length,
      )
      return `${matchStart}<strong>${highlighted}</strong>${matchEnd}`
  }