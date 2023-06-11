document.addEventListener('DOMContentLoaded', function () {
  var country = document.getElementsByName('country')[0]
  var city = document.getElementsByName('city')[0]
  // Replace with the actual dependent field ID

  function appendSelectChild(text, value) {
    var option = document.createElement('option')
    option.text = text
    option.value = value
    return option
  }
  // Function to update the dependent field options based on the selected category
  function updateDependentFieldOptions() {
    var selectedCountryy = country.value

    if (selectedCountryy) {
      fetch('/api/v1/choices/admin/cities/?country_code=' + selectedCountryy)
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
        })
        .catch(function (error) {
          console.error(error)
          city.innerHTML = ''
          city.appendChild(
            appendSelectChild('---------select a country---------', ''),
          )
          city.disabled = true
        })
    } else {
      city.innerHTML = ''
      city.appendChild(
        appendSelectChild('---------select a country---------', ''),
      )
      city.disabled = true
    }
  }

  // Attach an event listener to the category field
  country.addEventListener('change', updateDependentFieldOptions)

  // Update the dependent field options on page load
  updateDependentFieldOptions()
})
