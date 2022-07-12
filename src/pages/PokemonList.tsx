import { Button, TextField } from '@material-ui/core';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { debounce, isEmpty, range } from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import { createUseStyles } from 'react-jss';

import pokemonService from '../service/pokemonService';

const useStyles = createUseStyles({
  search: {
    position: 'absolute !important',
  },
});

type PokemonListProps = {
  money: number,
  setMoney: Function,
  setCart: Function,
};

export default function PokemonList(props: PokemonListProps) {
  const {
    money, setMoney, setCart,
  } = props;
  const [pokemons, setPokemons] = useState<any[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const classes = useStyles();

  useEffect(() => {
    let isCancelled = false;
    async function loadPokemonList() {
      const pokemonList = await Promise.all(
        range(1, 11).map((pokemonId) => pokemonService.getPokemon(pokemonId)),
      ).then((resultData) => [...resultData]).catch((error) => { throw error; });

      if (!isCancelled && !isEmpty(pokemonList)) {
        setPokemons(pokemonList);
      }
    }

    if (isEmpty(pokemons)) {
      loadPokemonList();
    }
    return () => {
      isCancelled = true;
    };
  }, [pokemons]);

  async function onChangeList() {
    const pokemon: any = await pokemonService.getPokemon(searchValue);
    if (pokemon) {
      setPokemons([pokemon]);
    }
  }

  const columns = useMemo<GridColDef[]>(() => [
    { field: 'name', headerName: 'Name', width: 150 },
    {
      field: 'price',
      headerName: 'Price',
      width: 150,
      valueGetter: (params: GridValueGetterParams) => `${params.row.weight * 100} $`,
    },
    {
      field: 'action',
      headerName: '',
      sortable: false,
      renderCell: (params) => {
        function onClick() {
          let isEnoughMoney = true;
          setMoney((previousMoney: number) => {
            const currentMoney = previousMoney - params.row.weight * 100;
            if (currentMoney >= 0) {
              return currentMoney;
            }
            isEnoughMoney = false;
            return previousMoney;
          });
          setCart((previousCart: any) => {
            if (isEnoughMoney) {
              return [...previousCart, params.row];
            }
            return previousCart;
          });
        }

        return <Button variant="contained" disabled={money - params.row.weight * 100 < 0} onClick={() => onClick()}>BUY</Button>;
      },
    },
  ], [setCart, setMoney, money]);

  const search = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchValue(value);
    debounce(onChangeList, 300);
  };

  return (
    <>
      <TextField
        id="outlined-search"
        placeholder="Search"
        type="search"
        value={searchValue}
        onChange={search}
        className={classes.search}
      />
      <div style={{ height: 600, width: '50%', marginTop: 30 }}>
        <DataGrid
          loading={isEmpty(pokemons)}
          rows={pokemons}
          columns={columns}
          autoPageSize
          hideFooter
        />
      </div>
    </>
  );
}
