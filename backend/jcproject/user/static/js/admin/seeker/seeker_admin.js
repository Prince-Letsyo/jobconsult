document.addEventListener('DOMContentLoaded', function () {
    var nationality = document.getElementsByName('job_seeker-0-nationality')[0];
    var city = document.getElementsByName('job_seeker-0-city')[0];
     // Replace with the actual dependent field ID

    // Function to update the dependent field options based on the selected category
    function updateDependentFieldOptions() {
        var selectedNationality = nationality.value;

        if (selectedNationality) {
            fetch('/api/v1/choices/admin/cities/?country_code=' + selectedNationality)
                .then(function (response) {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Error retrieving dependent options');
                    }
                })
                .then(function (data) {
                    city.innerHTML = '';
                        for (var key in data) {
                            if (data.hasOwnProperty(key)) {
                                var option = document.createElement('option');
                                option.text = data[key];
                                option.value = key;
                                city.appendChild(option);
                            }
                        }
                    city.disabled = false;
                })
                .catch(function (error) {
                    console.error(error);
                    city.innerHTML = '';
                    city.disabled = true;
                });
        } else {
            city.innerHTML = '';
            city.disabled = true;
        }
    }

    // Attach an event listener to the category field
    nationality.addEventListener('change', updateDependentFieldOptions);

    // Update the dependent field options on page load
    updateDependentFieldOptions();
});