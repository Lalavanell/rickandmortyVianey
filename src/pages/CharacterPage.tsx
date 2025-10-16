import Grid from '@mui/material/Grid'
import { useEffect, useState } from 'react';
import { flex, Stack } from '@mui/system';
import styled from '@emotion/styled';
import { AppBar, Avatar, Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, IconButton, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Toolbar, Typography } from "@mui/material";
import { Add, CloudDownload, Delete, Edit, Female, FileDownload, InfoOutlineRounded, Male, ManageAccounts, Visibility } from '@mui/icons-material';
import { ColumnsInterface } from '../interfaces/columns.interface';
import { toast } from "react-toastify";
import { Loader } from '../components/loader/Loader';
import { ModalBasic } from '../components/modal-basic/ModalBasic';
import { useCharacter } from '../hooks/useCharacter';
import { Character } from '../interfaces/character.interface';
import { CharacterForm } from '../components/character-form/CharacterForm';
import { DataMassive } from '../interfaces/data-massive.interface';



const columns: ColumnsInterface[] = [
  { dataKey: 1, label: 'Image', width: "5%" },
  { dataKey: 2, label: 'Name', width: "15%" }, 
  { dataKey: 3, label: 'Status', width: "10%" }, 
  { dataKey: 4, label: 'Specie', width: "10%" },
  { dataKey: 5, label: 'Gender', width: "10%" },
  { dataKey: 6, label: 'Type', width: "10%" },
  { dataKey: 7, label: 'Origin', width: "15%" },
  { dataKey: 8, label: 'Location', width: "15%" },
  { dataKey: 9, label: 'Actions', width: "10%" }
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: 'black',
  },
  color: 'white',
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export function CharacterPage() {

  const {fetchDataCharacters, fetchDataLocation, fetchDataEpisode, insertDataFromRam, getCharacters, deleteCharacter } = useCharacter();


  const [loading, setLoading] = useState(false);

  const [characterId, setCharacterId] = useState<string | null>(null);
  const [characterName, setCharacterName] = useState<string | null>(null);
  const [characters, setCharacters] = useState<Character[]>([]);

  const [action, setAction] = useState("");
  const [viewCharacterData, setViewCharacterData] = useState<Character | null>(null);
  const [editCharacterData, setEditCharacterData] = useState<Character | null>(null);

  const [open, setOpen] = useState(false);
  const onClose = () => setOpen((prev) => !prev);
  const [showModalView, setShowModalView] = useState(false);
  const openCloseModalView = () => setShowModalView((prev) => !prev);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const openCloseModalAdd = () => setShowModalAdd((prev) => !prev);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const openCloseModalEdit = () => setShowModalEdit((prev) => !prev);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const openCloseModalDelete = () => setShowModalDelete((prev) => !prev);
  

  useEffect(() => {
    getCharactersServerApi();
    getCharactersBackend();
  }, []);

  const massDownload = async () => {
  try {
    setLoading(true);

    const [charactersResp, locationsResp, episodesResp] = await Promise.all([
      fetchDataCharacters(),
      fetchDataLocation(),
      fetchDataEpisode(),
    ]);

    const dataMassive: DataMassive = {
      characters: charactersResp.results,
      locations: locationsResp.results,
      episodes: episodesResp.results,
    };

    insertDataFromRam(dataMassive).then((resp: any) => {
      console.log(resp);
    });
  } catch (error) {
    throw (error);
  } finally {
    setLoading(false);
  }
};

  const getCharactersServerApi = () => {
    setLoading(true);
    getCharacters().then((response) => {
      setCharacters(response.results);
    });
    console.log('antes de timeout')
    setTimeout(() => {
      setLoading(false);
    }, 3000);
    console.log('despues de timeout')
  };

  const getCharactersBackend = () => {
    setLoading(true);
    getCharacters().then((response) => {
      setCharacters(response.results);
      setLoading(false);
    });
  }

  const openViewCharacter = (char: any) => {
    setAction("view");
    setViewCharacterData(char);
    openCloseModalView();
  }

  const openEditCharacter = (char: any) => {
    setAction("edit");
    setEditCharacterData(char);
    openCloseModalEdit();
  }

  const openDeleteCharacter = (char: any) => {
    setAction("delete");
    setCharacterId(char.id);
    setCharacterName(char.name);
    openCloseModalDelete();
  }

  const confirmDeleteUser = () => {
    deleteCharacter(characterId!).then((response) => {
      if (response.estatus === 200) {
        toast.success("Character eliminado correctamente", { progress: undefined });
        openCloseModalDelete();
        getCharactersBackend();
      } else {
        toast.error("Hubo un error al intentar eliminar el character", { progress: undefined });
      }
    });
  };


  return (
    <Grid container>
      { loading ? ( <Loader /> ) : 
        (
          <Grid container width="100%" spacing={5} bgcolor={ "rgb(34, 34, 34)" }>
            <Grid size={12}>
              <AppBar position="static" style={{ background: "#263238" }}>
                <Toolbar color="primary">
                  <Typography variant="h6" color="info" sx={{ flexGrow: 1 }}>
                    LOOP CONEXIÓN EMPRESARIAL
                  </Typography>
                  <Typography variant="h6" color="warning" sx={{ flexGrow: 1.5 }}>
                    Test Full Stack Developer
                  </Typography>
                  <Button variant="outlined" startIcon={<InfoOutlineRounded />} onClick={onClose}>
                    INSTRUCTIONS
                  </Button>
                </Toolbar>
              </AppBar>
            </Grid>
      
            <Grid container size={12} marginInline={20}>
              <Grid size={10} color="white">
                <Card style={{ color: 'white', background: "#263238" }}>
                    <CardContent>
                      <Stack direction="row" marginInline={2}>
                        <ManageAccounts fontSize='large' />
                        <Typography variant="h5" sx={{ flexGrow: 1 }} style={{ marginLeft: '10px', marginTop: '4px' }}>
                          API Rick And Morty
                        </Typography>
                        <Button variant='contained' color='success' onClick={openCloseModalAdd}>
                          <Add />
                        </Button>
                      </Stack>
                    </CardContent>
                </Card>
              </Grid>
      
              <Grid size={2} color="white" sx={{ display: 'flex', justifyContent: 'center', padding: '10px 0px' }}>
                  <Button variant="outlined" startIcon={<FileDownload />} onClick={massDownload} sx={{ fontSize: '25px' }}>
                    MASS DOWNLOAD
                  </Button>
              </Grid>
            </Grid>
      
            <Grid size={12} marginInline={20} marginBottom={20}>
              <TableContainer component={Paper} sx={{ bgcolor: '#263238', color: 'white' }}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      {columns.map((row) => (
                        <StyledTableCell align='left' style={{ width: row.width }} key={row.dataKey}>{row.label}</StyledTableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                      {characters.map((c) => (
                      <StyledTableRow key={c.id}>
                        <StyledTableCell align="left">
                          <Avatar alt={c.name + " " + c.type} src={c.image}
                            sx={{ width: 60, height: 60 }} 
                          />
                        </StyledTableCell>
                        <StyledTableCell align="left">{c.name}</StyledTableCell>
                        <StyledTableCell align="left">{c.status}</StyledTableCell>
                        <StyledTableCell align="left">{c.species}</StyledTableCell>
                        <StyledTableCell align="left">{c.gender}</StyledTableCell>
                        <StyledTableCell align="left">{c.type}</StyledTableCell>
                        <StyledTableCell align="left">{c.type}</StyledTableCell>
                        <StyledTableCell align="left">{c.type}</StyledTableCell>
                        {/* <StyledTableCell align="left">{c.origin}</StyledTableCell> */}
                        {/* <StyledTableCell align="left">{c.location}</StyledTableCell> */}
                        <StyledTableCell align="left">
                          <Stack direction="row" spacing={3}>
                            <IconButton><Visibility color='info' onClick={() => openViewCharacter(c)} /></IconButton>
                            <IconButton onClick={() => openEditCharacter(c)}><Edit color='warning' /></IconButton>
                            <IconButton onClick={() => openDeleteCharacter(c)}><Delete color="error" /></IconButton>
                          </Stack>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        )
      }

      <ModalBasic
        showModal={showModalView}
        openCloseModal={openCloseModalView}
        title={"User"}
        body={
          <CharacterForm
            action={action}
            characterId={null}
            viewCharacterData={viewCharacterData}
            editCharacterData={null} 
            openCloseModal={openCloseModalView} 
            getCharactersBackend={getCharactersBackend} 
          />
        }
      />

      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Test Full Stack Developer</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Durante este test, las tecnologias / herramientas a ocupar para el desarrollo de un backend desde cero seran:
            <ul>
              <li><a href="https://rickandmortyapi.com" target='_blank'>Rick and Morty API</a></li>
              <li><a href="https://mui.com/material-ui/react-select" target='_blank'>Material UI Multiple Select</a></li>
            </ul>
            Todo esto debe ser desarrollado durante el día de hoy y el codigo que implementaran debera subirse a un repositorio
            de GitHub y establecerlo como publico proporcionandome por privado el link para aceder a el y conectarlo con este 
            frontal de prueba.
            <br /><br />
            <strong>PD:</strong> La creacion del backend desde cero la pueden hacer desde la pagina 
            de <a href="https://start.spring.io/" target="_blank">Spring Initializr</a> añadiendo el lenguaje, version y modulos 
            a ocupar los cuales ya deben ser capaces de saber que es lo que necesitaran y como lo deben implementar.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} autoFocus>
            De acuerdo
          </Button>
        </DialogActions>
      </Dialog>

      <ModalBasic
        showModal={showModalAdd}
        openCloseModal={openCloseModalAdd}
        title={"Create new user"}
        body={
          <CharacterForm 
            action={action} 
            characterId={null}
            viewCharacterData={null}
            editCharacterData={null} 
            openCloseModal={openCloseModalAdd} 
            getCharactersBackend={getCharactersBackend} 
          />
        }
      />

      <ModalBasic
        showModal={showModalEdit}
        openCloseModal={openCloseModalEdit}
        title={"Edit user"}
        body={
          <CharacterForm 
            action={action} 
            characterId={characterId} 
            viewCharacterData={null}
            editCharacterData={editCharacterData} 
            openCloseModal={openCloseModalEdit} 
            getCharactersBackend={getCharactersBackend} 
          />
        }
      />

      <Dialog
        open={showModalDelete}
        onClose={openCloseModalDelete}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle className="text-center">
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }} width="100%" flex="display" justifyContent="center" textAlign='center'>
            <Delete color='error' style={{ marginTop: 3 }} />
            <span style={{ marginLeft: 10 }}>ELIMINAR</span>
          </Stack>
        </DialogTitle>
        <DialogContent className="text-center">
          <DialogContentText className="my-3">Esta seguro que desea eliminar al character ?</DialogContentText>
          <DialogContentText>{<strong>{characterName}</strong>}</DialogContentText>
        </DialogContent>
        <DialogActions className="mx-3 mb-3 d-flex justify-content-between">
          <Button
            autoFocus
            onClick={openCloseModalDelete}
            variant="contained"
            color="error"
          >
            Cancelar
          </Button>
          <Button
            autoFocus
            onClick={confirmDeleteUser}
            variant="contained"
            color="success"
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};


