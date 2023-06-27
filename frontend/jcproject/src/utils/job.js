import * as Yup from 'yup'
import { tenDaysHeadFromToday } from '.'

export const jobInitials = {
  title: '',
  description: '',
  country: '',
  city: '',
  sector: '',
  type_of_job: '',
  deadline: tenDaysHeadFromToday(),
  minimum_qualification: '',
  type_of_employment: '',
  experience_length: 1,
  number_of_required_applicantion: 1,
  responsibilities: [],
  requirements: [],
  slug: '',
  publisher: 1,
  image: null,
}
const SUPPORTED_FORMATS = ['image/jpg', 'image/png', 'image/jpeg']
export const jobRegisterSchema = Yup.object().shape({
  title: Yup.string().required('Required field'),
  location: Yup.string().required('Required field'),
  description: Yup.string().required('Required field'),
  deadline: Yup.string().required('Required field'),
  image: Yup.mixed()
    .nullable()
    .required('Image is required')
    .test(
      'FILE_SIZE',
      'Uploaded file is too big',
      (value) => !value || (value && value.size <= 1024 * 1024),
    )
    .test(
      'FILE_FORMAT',
      'Uploaded file has unsupported format',
      (value) => !value || (value && SUPPORTED_FORMATS.includes(value?.type)),
    ),
})

export const SUPPORTED_DOC_FORMATS = [
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/pdf',
]

export const jobApplicationSchema = Yup.object().shape({
  documents: Yup.mixed()
    .nullable()
    .required('Document is required')
    .test('FILE_SIZE', 'Uploaded file is too big', (value) => {
      let bigCount = 0
      Object.entries(value).map(([key, file]) => {
        if (!file || (file && file.size <= 5 * 1024 * 1024)) bigCount++
      })
      return value.length === bigCount
    })
    .test('FILE_FORMAT', 'Uploaded file has unsupported format', (value) => {
      let isCorrectFormat = 0
      Object.entries(value).map(([key, file]) => {
        if (!file || (file && SUPPORTED_DOC_FORMATS.includes(file?.type)))
          isCorrectFormat++
      })
      return value.length === isCorrectFormat
    }),
})
