const countryDB = {
  _prevCity: '',
  _previousCountry: '',
  setCity: (prevCity, previousCountry) => {
    if (
      prevCity !== countryDB._prevCity &&
      prevCity !== '' &&
      previousCountry !== countryDB._previousCountry
    ) {
      countryDB._prevCity = prevCity
      countryDB._previousCountry = previousCountry
    }
  },
}

document.addEventListener('DOMContentLoaded', function () {
  var country = document.getElementsByName('country')[0]
  var city = document.getElementsByName('city')[0]
  // Replace with the actual dependent field ID
  countryDB.setCity(city.value, country.value)

  function appendSelectChild(text, value) {
    var option = document.createElement('option')
    option.text = text
    option.value = value
    return option
  }
  // Function to update the dependent field options based on the selected category
  function updateDependentFieldOptions() {
    var selectedCountry = country.value

    if (selectedCountry) {
      fetch('/api/v1/choices/admin/cities/?country_code=' + selectedCountry)
        .then(function (response) {
          if (response.ok) {
            return response.json()
          } else {
            throw new Error('Error retrieving dependent options')
          }
        })
        .then(function (data) {
          city.innerHTML = ''
          for (var key in data) {
            if (data.hasOwnProperty(key)) {
              city.appendChild(appendSelectChild(data[key], key))
            }
          }
          city.disabled = false
          if (countryDB._previousCountry === selectedCountry)
            city.value = countryDB._prevCity
          else {
            city.value = ''
          }
        })
        .catch(function (error) {
          if (!city.value) {
            city.innerHTML = ''
            city.appendChild(
              appendSelectChild('---------select a country---------', ''),
            )
            city.disabled = true
          }
          selectedCountry == ''
            ? (country.value = '')
            : (country.value = selectedCountry)
        })
    } else {
      city.innerHTML = ''
      city.appendChild(
        appendSelectChild('---------select a country---------', ''),
      )
      city.disabled = true
    }
  }
  if (country) {
    // Attach an event listener to the category field
    country.addEventListener('change', updateDependentFieldOptions)

    // Update the dependent field options on page load
    updateDependentFieldOptions()
  }
})
