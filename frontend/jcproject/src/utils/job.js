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
