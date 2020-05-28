import React, { useState, useEffect } from 'react';
import './global/globalStyle.css';
import { Container, Card, CardContent, CardHeader, CardList, CardFooter, CardListItem, ModalBody, DivInfo, TextArea } from './style';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ListIcon from '@material-ui/icons/List';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Modal from '@material-ui/core/Modal';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import 'date-fns';

import { firebaseDatabase } from './service/firebase';

function App() {

  const [value, setValue] = useState(0);
  const [itens, setItens] = useState([{}]);
  const [assignment, setAssignment] = useState('');
  const [itensAll, setItensAll] = useState([{}]);
  const [open, setOpen] = useState(false);
  const [updateTail, setUpdateTail] = useState('');
  const [description, setDescription] = useState('');
  const [key, setKey] = useState('');

  const ref = '/tails';

  useEffect(() => {
    getAlltail();
  }, [ ]);

  function getAlltail(){
    firebaseDatabase.ref(ref).on('value', (snap) => {
      let items = [];
      snap.forEach((data) => {
        let item = {};
        item['key'] = data.key;
        item['name'] = data.toJSON().nome;
        item['check'] = data.toJSON().check;
        item['horarioCriado'] = data.toJSON().horarioCriado;
        item['description'] = data.toJSON().description;
        items.push(item);
      });
      setItens(items);
      setItensAll(items);
    });
  }

  function handlechangeTail(event){
    setAssignment(event.target.value);
  }

  function handlechangeUpdateTail(event){
    setUpdateTail(event.target.value);
  }

  /*function handleChangeDate(date){
    setDate(date);
  }*/

  function handleChangeDescription(event){
    setDescription(event.target.value);
  }

  function createTail(event){
    event.preventDefault();

    const date = new Date();
    var minute;
    if(date.getMinutes() < 10)
      minute = '0' + date.getMinutes();
    else 
      minute = date.getMinutes();

    const hora = date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + minute;

    const body = {
      nome: assignment, 
      check: false, 
      horarioCriado: hora, 
      atualizado: false, 
      horarioAtualizado: null
    };

    firebaseDatabase.ref(ref).push(body, (err) => {
      if(err)
        console.log(err);
    });

    setAssignment('');
  }

  function handleCheck(key, check){
    firebaseDatabase.ref(ref + '/' + key).update({check: !check}, (err) => {
      if(err)
        console.log(err);
    });
  }

  function deleteTail(key){
    firebaseDatabase.ref(ref + '/' + key).remove((err) => {
      if(err)
        console.log(err);
    });
  }

  function deleteTailAll(){
    firebaseDatabase.ref(ref).remove((err) => {
      if(err)
        console.log(err);
    });
  }

  function changeTail(event){
    event.preventDefault();
    console.log(key);
    firebaseDatabase.ref(ref + '/' + key).update(
      {
        nome: updateTail, description: description
      }, (err) => {
      if(err)
        console.log(err);
    });
    setUpdateTail('');
    setDescription('');
    setOpen(false);
  }

  function listCompleted(){
    const completed = itensAll.filter(data => data.check);
    setItens(completed);
  }

  function listNoCompleted(){
    const completed = itensAll.filter(data => !data.check);
    setItens(completed);
  }

  function listAll(){
    setItens(itensAll);
  }

  function openChengeModal(data){
    setOpen(true); 
    setUpdateTail(data.name); 
    setDescription(data.description);
    setKey(data.key);
  }

  return (

    <Container>
      <Card>
       <CardContent>

        <CardHeader>
          <form onSubmit={event => createTail(event)}>
            <TextField id="outlined-basic" label="Assignment" variant="outlined" style={{width: '70%', marginRight: '5px'}}
              onChange={event => handlechangeTail(event)} required value={assignment}/>
            <Button variant="contained" color="primary" style={{width: '30%'}} type="submit">
              Create
            </Button>
          </form>
        </CardHeader>

        <CardList>
          {itens.map((data, index) => (
              <CardListItem key={index}>
                <div className="top">
                  <button id="btn-check" onClick={() => handleCheck(data.key, data.check)}>
                    {data.check ? 
                      <RadioButtonCheckedIcon color="secondary"/>
                    : <RadioButtonUncheckedIcon color="primary"/>}
                  </button>
                  <div id="div-info">
                    <label> {data.name} </label> <br />
                  </div>
                  <IconButton color="primary" aria-label="add an alarm" onClick={() => openChengeModal(data)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="secondary" aria-label="add an alarm" onClick={() => deleteTail(data.key)}>
                    <DeleteIcon />
                  </IconButton>
                </div>
                <div className="medium">
                    <label id="item-info"> {!data.description ? 'No description' : data.description} </label> <br />
                    <label id="item-info"> Tarefa Criada em: {data.horarioCriado} </label>
                    <label id="item-info"> {data.date} </label>
                </div>
                <Modal
                  open={open}
                  onClose={() => setOpen(false)}
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                >
                  <ModalBody>
                    <form onSubmit={event => changeTail(event)}>
                      <TextField id="outlined-basic" label="Assignment" variant="outlined" style={{width: '100%', marginBottom: '20px'}}
                        required onChange={event => handlechangeUpdateTail(event)} value={updateTail} /> <br />
                      <label> Description </label>
                      <TextArea onChange={event => handleChangeDescription(event)} value={description}/>
                      <Button variant="contained" color="primary" type="submit" style={{width: '100%'}}>
                        Update Tail
                      </Button>
                    </form>
                  </ModalBody>
                </Modal>
              </CardListItem>
            ))
          }
        </CardList>

        <DivInfo>
          <div className="div-left">
            <label>Total amount: {itensAll.length}</label>
            <label>Total Amount Checked: {itensAll.filter(data => data.check).length}</label>
            <label>Total Amount unchecked: {itensAll.filter(data => !data.check).length}</label>
          </div>
          <div className="div-right">
          Delete All 
          <IconButton color="secondary" aria-label="add an alarm" onClick={() => deleteTailAll()}
            disabled={itens.length === 0}>
            <DeleteSweepIcon /> 
          </IconButton>
          </div>
        </DivInfo>

        <CardFooter>
          <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            showLabels
          >
            <BottomNavigationAction label="All" icon={<ListIcon />} onClick={() => listAll()}/>
            <BottomNavigationAction label="Completed" icon={<RadioButtonCheckedIcon/>} onClick={() => listCompleted()}/>
            <BottomNavigationAction label="no completed" icon={<RadioButtonUncheckedIcon/>} onClick={() => listNoCompleted()}/>
          </BottomNavigation>
        </CardFooter>

       </CardContent>
      </Card>
    </Container>

  );
}

export default App;

/**
 *  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="Date picker dialog"
                        format="MM/dd/yyyy"
                        value={date}
                        onChange={handleChangeDate}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                      />
                      </MuiPickersUtilsProvider>
 */