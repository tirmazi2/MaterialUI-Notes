import { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import KeyboardArrowRightRounded from '@material-ui/icons/KeyboardArrowRightRounded'
import TextField from '@material-ui/core/TextField'
import { makeStyles, FormControl, FormLabel, FormControlLabel, Radio, RadioGroup } from '@material-ui/core'
import { useHistory } from 'react-router'

// used for custom classes
const useStyles = makeStyles({
  field: {
    marginBottom: 20,
    marginTop: 20,
    display: 'Block'
  },
  // '&hover': {
  //   backgroundColor: 'action',
  //   color: 'action'
  // }
  input: {
    background: '#f4f4f4'
  }
});

export default function Create() {
  const classes = useStyles();
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [detailError, setDetailError] = useState(false);
  const [category, setCategory] = useState('work');
  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault();

    setTitleError(false);
    setDetailError(false);

    if (!title)
      setTitleError(true)

    if (!details)
      setDetailError(true)

    if (title && details) {
      fetch('http://localhost:8000/notes', {
        method: 'POST',
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ title, details, category })
      }).then(() => history.push('/'));
    }
  }

  return (
    <Container className={classes.root}>
      <Typography
        variant='h6'
        component='h2'
        color='textSecondary'
        gutterBottom
      >
        Create page a Note
      </Typography>

      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          onChange={(e) => setTitle(e.target.value)}
          className={`${classes.field} ${classes.input}`}
          label="Note Title"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          error={titleError}
        />
        <TextField
          onChange={(e) => setDetails(e.target.value)}
          className={`${classes.field} ${classes.input}`}
          label="Note Details"
          variant="outlined"
          color="secondary"
          multiline
          minRows={4}
          fullWidth
          required
          error={detailError}
        />

        {/* Creates a field with radio grouped */}
        <FormControl className={classes.field}>
          <FormLabel>Note Category</FormLabel>
          <RadioGroup value={category} onChange={(e) => setCategory(e.target.value)} >
            <FormControlLabel value="money" control={<Radio />} label="Money" />
            <FormControlLabel value="work" control={<Radio />} label="Work" />
            <FormControlLabel value="reminders" control={<Radio />} label="Reminders" />
            <FormControlLabel value="todos" control={<Radio />} label="Todos" />
          </RadioGroup>
        </FormControl>

        <Button
          type="submit"
          color="secondary"
          variant="contained"
          endIcon={<KeyboardArrowRightRounded />}
        >
          Submit
        </Button>
      </form>
    </Container >
  )
}