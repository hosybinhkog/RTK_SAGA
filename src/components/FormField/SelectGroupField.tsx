import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@material-ui/core'
import React from 'react'
import { Control, useController } from 'react-hook-form'


export interface SelectOptions {
  label?: string,
  value: string | number
}

interface SelectGroupFieldProps {
  name: string
  options: SelectOptions[]
  label?: string
  disabled?: boolean
  control: Control<any>
}

function SelectGroupField(props: SelectGroupFieldProps) {
  const {name, options, label, disabled,control} = props


  const {
    field: {value, onChange, onBlur},
    fieldState: {invalid,error}
  } = useController({
    name,
    control
  })

  return (
    <FormControl disabled={disabled} error={invalid} margin='normal' 
    variant='outlined'
    size='small'
    fullWidth
    >
      <InputLabel id={`${name}_label`}>{label}</InputLabel>
      <Select
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        label={label}
        labelId={`${name}_label`}
      >
      {options.map(value =>(
        <MenuItem key={value.value}
        value={value.value}
        >{value.label}</MenuItem>
      ))}
      </Select>
      <FormHelperText >{error?.message}</FormHelperText>
    </FormControl>
  )
}

export default SelectGroupField
