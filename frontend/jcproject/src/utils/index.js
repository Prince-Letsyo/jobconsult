import { add, format, set } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'
const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

export const finalPushArray = (fromDb, checker) =>
  [
    ...new Map(
      [...fromDb, ...checker].map((obj) => [obj.sector, obj]),
    ).values(),
  ].map((a) => a.id)

export const objectToFormData = (
  obj,
  formData = new FormData(),
  parentKey = '',
) => {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key]
      const formKey = parentKey ? `${parentKey}[${key}]` : key

      if (value && typeof value === 'object' && !Array.isArray(value)) {
        if (value instanceof File) {
          formData.append(formKey, value)
        } else if (Object.keys(value).length > 0) {
          objectToFormData(value, formData, formKey)
        } else {
          formData.append(`${formKey}[emptyObj]`, '')
        }
      } else if (Array.isArray(value)) {
        if (value.length > 0) {
          value.forEach((item, index) => {
            const arrayKey = `${formKey}[${index}]`
            if (
              item &&
              typeof item === 'object' &&
              Object.keys(item).length > 0
            ) {
              objectToFormData(item, formData, arrayKey)
            } else {
              formData.append(arrayKey, item || '')
            }
          })
        } else {
          formData.append(`${formKey}[emptyArray]`, '')
        }
      } else {
        formData.append(formKey, value || '')
      }
    }
  }
  return formData
}

export const formDataToObject = (formData) => {
  const obj = {}

  for (let [key, value] of formData.entries()) {
    const keys = key.split('[').map((k) => k.replace(']', ''))
    let tempObj = obj

    for (let i = 0; i < keys.length - 1; i++) {
      const currentKey = keys[i]
      if (!tempObj[currentKey]) {
        const nextKey = keys[i + 1]
        tempObj[currentKey] = isNaN(nextKey) ? {} : []
      }
      tempObj = tempObj[currentKey]
    }

    const lastKey = keys[keys.length - 1]
    if (Array.isArray(tempObj)) {
      tempObj.push(value)
    } else {
      if (value instanceof File) {
        tempObj[lastKey] = value
      } else {
        tempObj[lastKey] = value !== '' ? value : ''
      }
    }
  }

  return recursivelyRemoveEmptyObjectsAndArrays(obj)
}

const recursivelyRemoveEmptyObjectsAndArrays = (obj) => {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key]
      if (typeof value === 'object' && value !== null) {
        recursivelyRemoveEmptyObjectsAndArrays(value)
        if ('emptyArray' in value) {
          obj[key] = []
        } else if ('emptyObj' in value) {
          obj[key] = {}
        }
      } else if (Array.isArray(value)) {
        value.forEach((item, index) => {
          recursivelyRemoveEmptyObjectsAndArrays(item)
          if (Object.keys(item).length === 0) {
            value.splice(index, 1)
          }
        })
        if (
          value.length === 1 &&
          typeof value[0] === 'object' &&
          Object.keys(value[0]).length === 0
        ) {
          obj[key] = []
        }
      }
    }
  }
  return obj
}

export const convertImageUrlToFile = async (url) => {
  const response = await fetch(url)
  const blob = await response.blob()
  const filename = getFilenameFromUrl(url)
  const file = new File([blob], filename, { type: blob.type })
  return file
}

const getFilenameFromUrl = (url) => {
  const parts = url.split('/')
  return parts[parts.length - 1]
}

export const tenDaysHeadFromToday = (date, time) => {
  const currentDate = !date && new Date()
  const futureDate = add(currentDate, { days: 14 })

  const futureDateTime = set(
    futureDate,
    !time && {
      hours: currentDate.getHours(),
      minutes: currentDate.getMinutes(),
    },
  )
  return format(futureDateTime, 'yyyy-MM-dd HH:mm', { timeZone })
}

export const timeZoneToUTC=(targetDate)=>{

  const zoneDate=utcToZonedTime(targetDate,timeZone)
  
  return format(zoneDate, 'yyyy-MM-dd HH:mm', { timeZone:"UTC" })
}