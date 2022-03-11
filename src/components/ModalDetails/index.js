import React, { Fragment, useEffect, useState } from 'react';
import { encode } from 'base-64';
import { format } from 'date-fns'
import { Modal, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Backdrop, CircularProgress } from '@mui/material'
import axios from 'axios'
import './styles.css'
import { LoaderContainer } from '../TableLogs/styles';
import { TailSpin } from 'react-loader-spinner';

export const ModalDetails = ({ open, closeModal, data }) => {

  const [dataModules, setDataModules] = useState([]);
  const [isFinish, setIsFinish] = useState(false)


  useEffect(() => {
    if (data) {
      getInfosCompanies(data.codreg)
    }
  }, [data])


  const getInfosCompanies = async (e) => {
    try {
      setIsFinish(true)
      let query = `select * from ACESSO_FUNCAO where codreg =${e}`;
      query = encode(query)

      const { data } = await axios.get(`http://10.1.1.16:5952/?command=${query}`);
      setDataModules(data);

      console.log('dados modulos -> ', data);
    } catch (error) {

    }
    finally {
      setIsFinish(false)
    }

  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    maxHeight: '75%',
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    overflowY: 'scroll',
    p: 4,

  };

  return (

    <Fragment>

      {isFinish ?

        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isFinish}
          onClick={null}
        >
          <CircularProgress color="inherit" />
          <h1 style={{ marginLeft: '16px' }}>Pesquisando módulos ...</h1>
        </Backdrop>


        :


        <Modal
          open={open}
          onClose={() => closeModal(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography sx={{ mb: 2, fontWeight: '700', fontSize: 30, textAlign: 'center' }} id="modal-modal-title" variant="h6" component="h2">
              {data && data.codreg} - {data && data.empresa}
            </Typography>


            <Fragment>
              {dataModules.length > 0 ?

                <TableContainer >
                  <Table aria-label="caption table">
                    <TableHead sx={{ background: '#E7EBF0', }}>
                      <TableRow  >

                        <TableCell className='th-modal' >MODULO</TableCell>
                        <TableCell className='th-modal' >DATA ACESSO</TableCell>
                        <TableCell className='th-modal' >HORA ACESSO</TableCell>


                      </TableRow>
                    </TableHead>
                    <TableBody>

                      {dataModules.map((modulo, index) => {
                        return (

                          <TableRow className='teste' key={`${modulo.codreg}-${index}`} >

                            <TableCell  >{modulo.funcao}</TableCell>
                            <TableCell >{format(new Date(modulo.data), 'dd/MM/yyyy')}</TableCell>
                            <TableCell >{modulo.hora.slice(0, 5)}</TableCell>


                          </TableRow>
                        )
                      }
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>

                :

                <Typography sx={{ mb: 2, fontWeight: '700', fontSize: 30, textAlign: 'center' }} id="modal-modal-title" variant="h6" component="h2">
                  Nenhum modulo encontrado para essa empresa
                </Typography>

              }
            </Fragment>

          </Box>
        </Modal>
      }
    </Fragment>

  );
}