document.addEventListener('DOMContentLoaded', function () {
  var nationality = document.getElementsByName('job_seeker-0-nationality')[0]
  var city = document.getElementsByName('job_seeker-0-city')[0]
  const previousNationality = nationality.value

  // Replace with the actual dependent field ID
  function appendSelectChild(text, value) {
    var option = document.createElement('option')
    option.text = text
    option.value = value
    return option
  }

  // Function to update the dependent field options based on the selected category
  function updateDependentFieldOptions() {
    var selectedNationality = nationality.value
    var prevCity = city.value

    if (selectedNationality) {
      fetch('/api/v1/choices/admin/cities/?country_code=' + selectedNationality)
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
          // prevCity == '' ? (city.value = '') : (city.value = prevCity)
          if (previousNationality === selectedNationality) city.value = prevCity
        })
        .catch(function (error) {
          if (!city.value) {
            city.innerHTML = ''
            city.appendChild(
              appendSelectChild('---------select a nationality---------', ''),
            )
            city.disabled = true
          }
          selectedNationality == ''
            ? (nationality.value = '')
            : (nationality.value = selectedNationality)
        })
    } else {
      city.innerHTML = ''
      city.appendChild(
        appendSelectChild('---------select a nationality---------', ''),
      )
      city.disabled = true
    }
  }

  // Attach an event listener to the category field
  nationality.addEventListener('change', updateDependentFieldOptions)

  // Update the dependent field options on page load
  updateDependentFieldOptions()
})
