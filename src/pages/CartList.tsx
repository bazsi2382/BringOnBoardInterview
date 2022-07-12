import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useState } from 'react';

type CartListProps = {
  cart: any,
};

export default function CartList(props: CartListProps) {
  const {
    cart,
  } = props;

  const [columns] = useState<GridColDef[]>([
    { field: 'name', headerName: 'Name', width: 150 },
    {
      field: 'price',
      headerName: 'Price',
      width: 150,
      valueGetter: (params: GridValueGetterParams) => `${params.row.weight * 100} $`,
    },
  ]);

  return (
    <div style={{ height: 600, width: '50%', marginTop: 30 }}>
      <DataGrid
        rows={cart}
        columns={columns}
        autoPageSize
        hideFooter
      />
    </div>
  );
}
