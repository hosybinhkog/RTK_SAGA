import { Button, FormControl, Grid, InputLabel,  MenuItem, OutlinedInput, Select } from '@material-ui/core'
import { Box } from '@material-ui/core'
import { Search } from '@material-ui/icons'

import { City, ListParams } from 'interface'
import React, { useRef } from 'react'

interface StudentFiltersProps {
  filter: ListParams
  onChange? : (newFilter: ListParams) => void
  onSearchChange : (newFilter: ListParams) => void
  cityList: City[]
}




function StudentFilters({filter,onChange,onSearchChange,cityList}: StudentFiltersProps) {

 const searchRef = useRef<HTMLInputElement>()

  const handleOnChangeInput = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
    if(!onSearchChange) return;
      const newFilter:ListParams = {
        ...filter,
        name_like: e.target.value,
        _page: 1
      }
      onSearchChange(newFilter)
  }

  const handFilterCityChange = (e:React.ChangeEvent<{ name?: string | undefined; value: unknown; }>) =>{
    if (!onChange) return 

    const newFilter:ListParams = {
      ...filter,
      _page:1,
      city: e.target.value || undefined,
    }

    onChange(newFilter)
  }

  const handleSortChange = (e:React.ChangeEvent<{ name?: string | undefined; value: unknown; }>) =>{
    if (!onChange) return 
    const value = e.target.value;
    const [_sort,_order] = (value as string).split('.');
    const newFilter:ListParams = {
      ...filter,
      _sort: _sort || undefined,
      _order: _order as 'asc' | 'desc'  || undefined
      
    }

    onChange(newFilter)
  }

  const handleClearChange = () =>{
    if(!onChange) return 

    const newFilter:ListParams  = {
      ...filter,
      _sort: undefined,
      _order: undefined,
      _page: 1,
      city: undefined,
      name_like: ''
    }
    onChange(newFilter)

    if(searchRef.current) 
      searchRef.current.value = '';
  }

  return (
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <FormControl size='small'
             fullWidth variant="outlined" >
               <InputLabel htmlFor="search">
                Search
               </InputLabel>
               <OutlinedInput
                  id={'search'}
                  label="Search"
                  labelWidth={50}
                  onChange={handleOnChangeInput}
                  endAdornment={<Search />}
                  inputRef ={searchRef}
               />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2} >
            <FormControl variant='outlined'
            fullWidth size='small'>
              <InputLabel id='filter' >
                Filter
              </InputLabel>
              <Select label="AgeFilter"
                labelId='filter'
                value={filter.city || ''}
                onChange={handFilterCityChange}
                fullWidth
              >
                <MenuItem value="">
                  <em>All</em>
                </MenuItem>
                {
                  cityList.map((city) =>(
                    <MenuItem key={city.code}
                    value={city.code}
                    >
                      {city.name}
                    </MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2} >
            <FormControl variant='outlined'
            fullWidth size='small'>
              <InputLabel id='shortby' >
                Sort
              </InputLabel>
              <Select label="Sort"
                labelId='Sort'
                fullWidth
                onChange={handleSortChange}
                value={filter._sort ? `${filter._sort}.${filter._order}` : ""}
              >
                <MenuItem value="">
                  <em>No sort</em>
                </MenuItem>
                <MenuItem value="name.asc">
                  Name ASC
                </MenuItem>
                <MenuItem value="name.desc">
                  Name DESC
                </MenuItem>
                <MenuItem value="mark.asc">
                  Mark ASC
                </MenuItem>
                <MenuItem value="mark.desc">
                 Mark DESC
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={2}>
            <Button variant="outlined"
            color='primary'
            fullWidth
            onClick={handleClearChange}
            >Clear Search</Button>
          </Grid>
        </Grid>
      </Box>
  );
}

export default StudentFilters