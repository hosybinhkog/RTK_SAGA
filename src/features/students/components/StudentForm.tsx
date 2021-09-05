import { Box, Button, CircularProgress } from '@material-ui/core'
import { useAppSelector } from 'app/hooks'
import { InputField, RadioGroupField } from 'components/FormField'
import SelectGroupField from 'components/FormField/SelectGroupField'
import { selectCityOptions } from 'features/city/citySlice'
import Student from 'interface/student'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';


export interface StudentFormProps {
  initialValue?: Student
  onSubmit?:  (formValue: Student) => void

}

export default function StudentForm({initialValue,onSubmit}:StudentFormProps) {

  const schema = yup.object().shape({
    name: yup.string().required(),
    age : yup.number().positive().integer().typeError('error type').min(10).max(69).required(),
    mark: yup.number().positive().min(0).max(10).typeError('error type').required(),
    gender: yup.string().oneOf(['male', 'female']).required(),
    city: yup.string().required(),
  })
  
  const cityOptions = useAppSelector(selectCityOptions)

 const {
   control,
   handleSubmit,
   formState: {isSubmitting}
 } = useForm<Student>({
   defaultValues: initialValue,
   resolver: yupResolver(schema)
 })

 const handleSubmitForm = async(formValues: Student) => {
   try {
     await onSubmit?.(formValues)
   } catch (error) {
     console.log(error,'student');
   }
 }

  return (
    <Box maxWidth={400}>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <InputField name="name" control={control}
          label="Full name"
        />
        <InputField name="age" control={control}
          label="Age"
          type="number"
        />
        <SelectGroupField name="city" control={control} 
        label="City" options={cityOptions}
        />

        <InputField name="mark" control={control}
          label="Mark"
          type="number"
        />

        <RadioGroupField name="gender" control={control} options={[{label: 'Male',value: 'male'},{label: 'Female',value: 'female'}]} label="Sex"/>

        <Box mt={3}>
          <Button type="submit" variant='contained' color='primary' disabled={isSubmitting}>
            {isSubmitting && <CircularProgress size={16} /> }Submit
          </Button>
        </Box>
      </form>
    </Box>
  )
}
