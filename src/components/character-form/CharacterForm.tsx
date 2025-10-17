import Grid from '@mui/material/Grid';
import { Button, MenuItem, OutlinedInput, Select, TextField, useTheme, Theme, SelectChangeEvent, InputLabel, FormControl } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from "react-toastify";
import { useEffect, useState } from 'react';
import { CharacterProps } from "../../interfaces/character-props.interface";
import { Character } from "../../interfaces/character.interface";
import { useCharacter } from '../../hooks/useCharacter';




const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];


export function CharacterForm({ action, characterId, viewCharacterData, editCharacterData, openCloseModal, getCharactersBackend }: CharacterProps) {

  const { postCharacter, putCharacter } = useCharacter();

  const [nameButton, setNameButton] = useState("");

  useEffect(() => {
    if (action === "edit" && editCharacterData != null) {
      setNameButton("EDITAR");
      formik.setValues({
        id: editCharacterData.id,
        image: editCharacterData.image,
        name: editCharacterData.name,
        status: editCharacterData.status,
        species: editCharacterData.species,
        type: editCharacterData.type,
        gender: editCharacterData.gender,
        origin: editCharacterData.origin,
        location: editCharacterData.location,
        episode: editCharacterData.episode,
      });
    } else if (action === "view" && viewCharacterData != null) {
      formik.setValues({
        id: viewCharacterData.id,
        image: viewCharacterData.image,
        name: viewCharacterData.name,
        status: viewCharacterData.status,
        species: viewCharacterData.species,
        type: viewCharacterData.type,
        gender: viewCharacterData.gender,
        origin: viewCharacterData.origin,
        location: viewCharacterData.location,
        episode: viewCharacterData.episode,
      });
    } else {
      setNameButton("GUARDAR");
      formik.resetForm();
    }
  }, [editCharacterData]);


  const validationSchema = Yup.object({
    image: Yup.string().url('Debe ser una URL').required('Requerido'),
    name: Yup.string().required('Requerido'),
    status: Yup.string().required('Requerido'),
    species: Yup.string().required('Requerido'),
    type: Yup.string().required('Requerido'),
    gender: Yup.string().required('Requerido'),
    origin: Yup.string().required('Requerido'),
    location: Yup.string().required('Requerido'),
    episode: Yup.array()
  });

  const formik = useFormik<Character>({
    initialValues: {
      id: null,
      image: '',
      name: '',
      status: '',
      species: '',
      type: '',
      gender: '',
      origin: '',
      location: '',
      episode: [],
    },
    validationSchema,
    onSubmit: (values) => {
      if (action === "edit") {
        putCharacter(values).then((response) => {
          if (response.estatus === 1) {
            toast.success("Character editado correctamente", { progress: undefined });
            openCloseModal();
            getCharactersBackend();
            window.location.reload();
          } else {
            toast.error("Hubo un error al intentar editar el character", { progress: undefined });
            window.location.reload();
          }
        });
      } else {
        postCharacter(values).then((response) => {
          if (response.estatus === 200) {
            toast.success("Character guardado correctamente", { progress: undefined });
            openCloseModal();
            getCharactersBackend();
            window.location.reload();
          } else {
            toast.error("Hubo un error al intentar guardar el character", { progress: undefined });
            window.location.reload();
          }
        });
      }
    },
  });

  const theme = useTheme();
  const [personName, setPersonName] = useState<string[]>([]);

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 40 * 4.5 + 8,
        width: 250,
      },
    },
  };

  function getStyles(name: string, personName: string[], theme: Theme) {
    return {
      fontWeight: personName.includes(name)
        ? theme.typography.fontWeightMedium
        : theme.typography.fontWeightRegular,
    };
  }

  const handleChangeSelect = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };


  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 8 }}>
          <TextField
            fullWidth
            label="Image"
            name="image"
            disabled={viewCharacterData != null}
            value={formik.values.image}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.image && Boolean(formik.errors.image)}
            helperText={formik.touched.image && formik.errors.image}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            disabled={viewCharacterData != null}
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            fullWidth
            select
            label="Status"
            name="status"
            disabled={viewCharacterData != null}
            value={formik.values.status}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.status && Boolean(formik.errors.status)}
            helperText={formik.touched.status && formik.errors.status}
          >
            <MenuItem value="Alive">Alive</MenuItem>
            <MenuItem value="Dead">Dead</MenuItem>
            <MenuItem value="unknown">Unknown</MenuItem>
          </TextField>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            fullWidth
            select
            label="Species"
            name="species"
            disabled={viewCharacterData != null}
            value={formik.values.species}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.species && Boolean(formik.errors.species)}
            helperText={formik.touched.species && formik.errors.species}
          >
            <MenuItem value="Human">Human</MenuItem>
            <MenuItem value="Alien">Alien</MenuItem>
            <MenuItem value="Robot">Robot</MenuItem>
            <MenuItem value="Animal">Animal</MenuItem>
            <MenuItem value="Mythological">Mythological</MenuItem>
            <MenuItem value="unknown">Unknown</MenuItem>
          </TextField>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            fullWidth
            select
            label="Gender"
            name="gender"
            disabled={viewCharacterData != null}
            value={formik.values.gender}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.gender && Boolean(formik.errors.gender)}
            helperText={formik.touched.gender && formik.errors.gender}
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </TextField>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            fullWidth
            label="Type"
            name="type"
            disabled={viewCharacterData != null}
            value={formik.values.type}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.type && Boolean(formik.errors.type)}
            helperText={formik.touched.type && formik.errors.type}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            fullWidth
            label="Origin"
            name="origin"
            disabled={viewCharacterData != null}
            value={formik.values.origin}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.origin && Boolean(formik.errors.origin)}
            helperText={formik.touched.origin && formik.errors.origin}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            fullWidth
            label="Location"           
            name="location"
            disabled={viewCharacterData != null}
            value={formik.values.location}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.location && Boolean(formik.errors.location)}
            helperText={formik.touched.location && formik.errors.location}
            placeholder="Ej: Earth, Mars, Space Station, etc."
          />
        </Grid>

        <Grid size={{ xs: 12, md: 12 }}>
          <FormControl sx={{ m: 1, width: '100%' }}>
            <InputLabel id="demo-multiple-name-label">Episode</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              multiple
              value={personName}
              onChange={handleChangeSelect}
              input={<OutlinedInput label="Name" />}
              MenuProps={MenuProps}
            >
              {names.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, personName, theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid size={{ xs: 12 }} display="flex" justifyContent="end">
          {
            viewCharacterData == null && (
              <Button type="submit" variant="contained" color="primary" size='large'>
                {nameButton}
              </Button>
            )
          }
        </Grid>
      </Grid>
    </form>
  );
}