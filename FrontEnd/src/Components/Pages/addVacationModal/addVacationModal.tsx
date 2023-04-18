import './addVacationModal.css'

import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { Input, Textarea } from '@mui/joy'
import { InputLabel } from '@mui/material'

export default function AddVacationModal() {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Add Vacation
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Vacation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a vacation to this website, please fill up all the fields
            below.
          </DialogContentText>
          <br /> <br />
          <Input placeholder="Destination " id="destination" />
          <br />
          <Textarea
            minRows={2}
            id="description"
            variant="outlined"
            placeholder="Description"
          />
          <br />
          <InputLabel htmlFor="startDate">Start date:</InputLabel>
          <Input type="date" id="startDate" />
          <br />
          <InputLabel htmlFor="startDate">Finish date:</InputLabel>
          <Input type="date" id="date" />
          <br />
          <Input placeholder="Price " id="price" startDecorator="$" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
