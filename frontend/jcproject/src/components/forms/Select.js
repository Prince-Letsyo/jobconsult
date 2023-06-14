import { ErrorMessage, Field, useField, useFormikContext } from 'formik'
import React, { useEffect, useState } from 'react'
import TextError from './TextError'
import { useGetCitiesQuery } from '@/store/features/choices'
import { skipToken } from '@reduxjs/toolkit/dist/query'

const Select = ({ label, placeholder, name, options, ...rest }) => {
  const [isFetch, setIsFetch] = useState(undefined)
  const [field, ,] = useField(name)
  const [, , helpersCity] = useField('city')
  const [, , helpersCityArray] = useField('cityArr')
  const { setFieldValue } = useFormikContext()

  const { data: cities } = useGetCitiesQuery(isFetch ?? skipToken)

  useEffect(() => {
    if (cities && cities.data) {
      const { data } = cities
      helpersCity.setValue('', true)
      helpersCityArray.setValue(data, true)
    }
    return () => {}
  }, [cities])

  const selectChange = (e) => {
    const selectedValue = e.target.value

    setFieldValue(name, selectedValue)
    if (field.name == 'nationality') {
      setIsFetch(selectedValue)
    }
  }

  return (
    <div className={'input-container'}>
      <label htmlFor={name}>{label}</label>
      <Field
        as="select"
        placeholder={placeholder}
        id={name}
        {...field}
        {...rest}
        onChange={selectChange}
      >
        {options.map(({ key, value }, index) => (
          <option key={index} value={key}>
            {value}
          </option>
        ))}
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </div>
  )
}

export default Select
