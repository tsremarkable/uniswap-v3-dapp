import gql from 'graphql-tag';
import { useAccount } from 'wagmi';
import { useQuery } from 'react-apollo';
import { LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const SWAP_QUERY = gql`
  query swaps($accountAddress: Bytes!) {
    swaps(orderBy: timestamp, orderDirection: desc, where: { recipient: $accountAddress }) {
      pool {
        token0 {
          id
          symbol
        }
        token1 {
          id
          symbol
        }
      }
      sender
      recipient
      amount0
      amount1
    }
  }
`;

const History = () => {
  const { address } = useAccount();
  const {
    loading,
    error: dataerror,
    data: data
  } = useQuery(SWAP_QUERY, {
    variables: {
      accountAddress: address
    }
  });
  let index = 0;

  return (
    <>
      {loading && <LinearProgress />}
      {!loading && data && (
        <div className="p-5">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Token 0 Address</TableCell>
                  <TableCell>Token 0 Symbol</TableCell>
                  <TableCell>Token 0 Amount</TableCell>
                  <TableCell>Token 1 Address</TableCell>
                  <TableCell>Token 1 Symbol</TableCell>
                  <TableCell>Token 1 Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.swaps.map((row: any) => (
                  <TableRow key={index++}>
                    <TableCell>{row.pool.token0.id || ''}</TableCell>
                    <TableCell>{row.pool.token0.symbol || ''}</TableCell>
                    <TableCell>{row.amount0 || 0}</TableCell>
                    <TableCell>{row.pool.token1.id || ''}</TableCell>
                    <TableCell>{row.pool.token1.symbol || ''}</TableCell>
                    <TableCell>{row.amount1 || 0}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </>
  );
};

export default History;
