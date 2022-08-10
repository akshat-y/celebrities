import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import DeleteForeverIcon from '@mui/icons-material/DeleteForeverOutlined';
import EditIcon from '@mui/icons-material/EditOutlined';
import SearchIcon from '@mui/icons-material/Search';
import './App.css';
import celebritiesData from "./static/celebrities.json";
import IconButton from '@mui/material/IconButton';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';

type Celebrity = {
  id: number,
  first: string,
  last: string,
  dob: string,
  gender: string,
  email: string,
  picture: string,
  country: string,
  description: string
}

export default function App() {
  const [data, setData] = React.useState<Celebrity[]>(celebritiesData);
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const [edit, setEdit] = React.useState<number | false>(false);
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [saveDisabled, setSaveDisabled] = React.useState<boolean>(true);

  const [genderValue, setGenderValue] = React.useState<string>('');
  const [nameValue, setNameValue] = React.useState<string>('');
  const [dobValue, setDobValue] = React.useState<string>('');
  const [descriptionValue, setDescriptionValue] = React.useState<string>('');
  const [countryValue, setCountryValue] = React.useState<string>('');

  const [nameErrorMsg, setNameErrorMsg] = React.useState<string>('');
  const [dobErrorMsg, setDobErrorMsg] = React.useState<string>('');
  const [descriptionErrorMsg, setDescriptionErrorMsg] = React.useState<string>('');
  const [countryErrorMsg, setCountryErrorMsg] = React.useState<string>('');

  const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);
  const [deleteId, setDeleteId] = React.useState<number>();

  React.useEffect(() => {
    for (var i = 0; i < data.length; i++) {
      if (data[i].id === edit) {
        if ((data[i].first + ' ' + data[i].last) != nameValue)
          setSaveDisabled(false)
        else if (data[i].gender != genderValue)
          setSaveDisabled(false)
        else if (data[i].country != countryValue)
          setSaveDisabled(false)
        else if (data[i].dob != dobValue)
          setSaveDisabled(false)
        else if (data[i].description != descriptionValue)
          setSaveDisabled(false)
        else
          setSaveDisabled(true)
        break;
      }
    }
  }, [genderValue, nameValue, dobValue, descriptionValue, countryValue])

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      if (edit === false)
        setExpanded(isExpanded ? panel : false);
    };

  function handleEditChange(id: number | false) {
    for (var i = 0; i < data.length; i++) {
      if (data[i].id === id) {
        setNameValue(data[i].first + ' ' + data[i].last)
        setGenderValue(data[i].gender)
        setCountryValue(data[i].country)
        setDescriptionValue(data[i].description)
        setDobValue(data[i].dob)
        break;
      }
    }
    setEdit(id);
  }

  function validateChangesFailed(){
    let nameError ='', countryError = '', dobError = '', descriptionError = ''
    nameValue === '' ? nameError = 'name required' : nameValue.split(' ').length < 2 ? nameError = 'last name required' : nameError = ''
    countryValue === '' ? countryError = 'country required' : countryError = ''
    dobValue === '' ? dobError = 'dob required' : dobError = ''
    descriptionValue === '' ? descriptionError = 'description required' : descriptionError = ''
    setNameErrorMsg(nameError)
    setCountryErrorMsg(countryError)
    setDobErrorMsg(dobError)
    setDescriptionErrorMsg(descriptionError)
    if((nameError.length + countryError.length + dobError.length + descriptionError.length) > 0 )
      return true
    else return false
  }

  function saveChanges(id: number) {
    if(validateChangesFailed()){
      console.log('Validation failed')
    }      
    else{
      console.log('Validation Passed')
      setNameErrorMsg('')
      setCountryErrorMsg('')
      setDescriptionErrorMsg('')
      setDobErrorMsg('')
      
      const items = data.slice();
      for (var i = 0; i < items.length; i++) {
        if (items[i].id === id) {
          items[i].first = nameValue.split(' ')[0]
          items[i].last = nameValue.split(' ')[1]
          items[i].country = countryValue
          items[i].dob = dobValue
          items[i].description = descriptionValue        
          break;
        }
      }
      setEdit(false)
      setData(items)
    }
  }

  function getAge(dob: string) {
    let dateOfBirth = new Date(dob)
    let today = new Date();
    return today.getFullYear() - dateOfBirth.getFullYear();
  }

  const handleSearchValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleDobValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDobValue(event.target.value.replace(/[^0-9\-]+/g, ''));
  };
  const handleNameValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameValue(event.target.value.replace(/[0-9]/g, ''));
  };
  const handleCountryValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCountryValue(event.target.value.replace(/[0-9]/g, ''));
  };
  const handleDescriptionValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescriptionValue(event.target.value);
  };

  function getAccordian(celebrity: any, index: number) {
    return (
      <Accordion elevation={0}
        sx={{
          mt: 3, border: 'solid 1px #c0c0c0', borderRadius: '10px', '&:before': {
            display: 'none',
          }
        }}
        key={celebrity.id}
        expanded={expanded === `panel${celebrity.id}`}
        onChange={handleChange(`panel${celebrity.id}`)}>
        <AccordionSummary
          className='AccordionSummary'
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Avatar alt="Remy Sharp" src={celebrity['picture']} />
          <Typography variant="h6" sx={{ ml: 2 }}>
            {celebrity['first']} {celebrity['last']}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            <Grid item xs>
              <Stack direction="column" >
                <Typography variant='caption'>Age</Typography>
                <Typography variant='body1'>{getAge(celebrity['dob'])} Years</Typography>
              </Stack>
            </Grid>
            <Grid item xs>
              <Stack direction="column" >
                <Typography variant='caption'>Gender</Typography>
                <Typography variant='body1' sx={{ textTransform: 'capitalize' }}>{celebrity['gender']}</Typography>
              </Stack>
            </Grid>
            <Grid item xs>
              <Stack direction="column" >
                <Typography variant='caption'>Country</Typography>
                <Typography variant='body1'>{celebrity['country']}</Typography>
              </Stack>
            </Grid>
          </Grid>
          <Stack direction="column" sx={{ mt: 4 }}>
            <Typography variant='caption'>Description</Typography>
            <Typography variant='body1'>{celebrity['description']}</Typography>
          </Stack>
          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            sx={{ mt: 2 }}
          >
            <IconButton aria-label="edit" component="label" onClick={() => confirmDeleteCelebrity(celebrity['id'])}>
              <DeleteForeverIcon sx={{ color: '#f26161' }} />
            </IconButton>
            <IconButton aria-label="edit" component="button" disabled={getAge(celebrity['dob']) < 18} onClick={() => handleEditChange(celebrity['id'])}>
              <EditIcon sx={{ color: '#0ca3fa' }} />
            </IconButton>
          </Stack>
        </AccordionDetails>
      </Accordion>
    )
  }

  function getAccordianEditMode(celebrity: any, index: number) {
    return (
      <Accordion elevation={0}
        sx={{
          mt: 3, border: 'solid 1px #c0c0c0', borderRadius: '10px', '&:before': {
            display: 'none',
          }
        }}
        key={celebrity.id}
        expanded={expanded === `panel${celebrity.id}`}
        onChange={handleChange(`panel${celebrity.id}`)}>
        <AccordionSummary
          className='AccordionSummary'
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Avatar alt="Remy Sharp" src={celebrity['picture']} />
          <TextField error={nameErrorMsg.length > 0} helperText={nameErrorMsg} onChange={handleNameValueChange} sx={{ ml: 2 }} id="name" value={nameValue} placeholder='Full Name' size="small" />
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            <Grid item xs>
              <Stack direction="column" >
                <Typography variant='caption'>Age</Typography>
                <TextField error={dobErrorMsg.length > 0} helperText={dobErrorMsg} onChange={handleDobValueChange} id="dob" value={dobValue} placeholder='YYYY-MM-DD' size="small" />
              </Stack>
            </Grid>
            <Grid item xs>
              <Stack direction="column" >
                <Typography variant='caption'>Gender</Typography>
                <Select
                  id="filled-select-currency"
                  value={genderValue}
                  onChange={(event) => setGenderValue(event.target.value)}
                  size="small"
                >
                  <MenuItem key={`${index}1`} value='male'>Male</MenuItem>
                  <MenuItem key={`${index}2`} value='female'>Female</MenuItem>
                  <MenuItem key={`${index}3`} value='transgender'>Transgender</MenuItem>
                  <MenuItem key={`${index}4`} value='rather not say'>Rather Not Say</MenuItem>
                  <MenuItem key={`${index}5`} value='other'>Other</MenuItem>
                </Select>
              </Stack>
            </Grid>
            <Grid item xs>
              <Stack direction="column" >
                <Typography variant='caption'>Country</Typography>
                <TextField error={countryErrorMsg.length > 0} helperText={countryErrorMsg} onChange={handleCountryValueChange} id="country" placeholder='Country' value={countryValue} size="small" />
              </Stack>
            </Grid>
          </Grid>

          <Stack direction="column" sx={{ mt: 4 }}>
            <Typography variant='caption'>Description</Typography>
            <TextField
              value={descriptionValue}
              multiline
              error={descriptionErrorMsg.length > 0} 
              helperText={descriptionErrorMsg}
              onChange={handleDescriptionValueChange}
              rows={4}              
            />
          </Stack>
          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            sx={{ mt: 2 }}
          >
            <IconButton aria-label="cancel" component="label" onClick={() => handleEditChange(false)}>
              <HighlightOffIcon sx={{ color: '#f26161' }} />
            </IconButton>
            <IconButton aria-label="save" disabled={saveDisabled} component="button" onClick={() => saveChanges(celebrity['id'])}>
              <CheckCircleOutlineIcon sx={{ color: '#29a32b' }} />
            </IconButton>
          </Stack>
        </AccordionDetails>
      </Accordion>
    )
  }

  function confirmDeleteCelebrity(id: number) {
    setDeleteId(id)
    setDialogOpen(true)    
  }

  function deleteCelebrity(){
    const items = data.slice();    
    const j = items.findIndex(item => item.id === deleteId);
    console.log(deleteId, j)

    items.splice(j, 1);
    console.log(items)
    setExpanded(false)
    setData(items)
    setDialogOpen(false) 
  }

  return (
    <div className='App'>
      <div className='container'>
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to delete?
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} variant="outlined">Cancel</Button>
          <Button onClick={() => deleteCelebrity()} variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

        <Typography variant='h4'>Celebrity List</Typography>
        <TextField
          size="small"
          placeholder='Search Here...'
          value={searchValue}
          onChange={handleSearchValueChange}
          sx={{
            mt: 3, width: '100%', [`& fieldset`]: {
              borderRadius: '10px',
            },
          }}
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1 }} />
          }}
        />
        {
          data.filter((val) => {
            return `${val.first} ${val.last}`.toLowerCase().includes(searchValue.toLowerCase()) ||
              val.country.toLowerCase().includes(searchValue.toLowerCase()) ||
              val.gender.toLowerCase().includes(searchValue.toLowerCase()) ||
              val.description.toLowerCase().includes(searchValue.toLowerCase()) ||
              val.dob.toLowerCase().includes(searchValue.toLowerCase())
          }).map((item, index) => {
            return (
              edit === item.id ? getAccordianEditMode(item, index) : getAccordian(item, index)
            )
          })
        }
      </div>
    </div>
  );
}
