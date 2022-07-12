import { Chip } from '@material-ui/core';
import { useState } from 'react';
import { createUseStyles } from 'react-jss';

import AddMoney from './AddMoney';
import CartList from './CartList';
import PokemonList from './PokemonList';

const useStyles = createUseStyles({
  header: {
    display: 'flex',
    alignItems: 'center',
  },
  lowMoney: {
    color: 'red',
  },
  listContainer: {
    display: 'flex',
  },
});

export default function MainPage() {
  const [money, setMoney] = useState<number>(15000);
  const [cart, setCart] = useState<any[]>([]);
  const classes = useStyles();

  return (
    <div>
      <div className={classes.header}>
        <Chip label={`${money} $`} />
        {money < 2000 && <span className={classes.lowMoney}>LOW MONEY</span>}
        <AddMoney
          setMoney={setMoney}
        />
      </div>
      <div className={classes.listContainer}>
        <PokemonList
          money={money}
          setMoney={setMoney}
          setCart={setCart}
        />
        <CartList
          cart={cart}
        />
      </div>
    </div>
  );
}
