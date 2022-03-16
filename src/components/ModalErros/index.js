import React from 'react';
import { Modal, Box, Typography } from '@mui/material'
import './styles.css';
import ReactJson from 'react-json-view'

export const ModalErros = ({ open, closeModal, data }) => {


  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxHeight: '75%',
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    overflowY: 'scroll',
    p: 4,

  };

  // const [error, setError] = useState(data.error);



  function replaceJSX(str, find, replace) {
    const parts = str.split(find);
    const result = [];
    for (let i = 0; i < parts.length; i++) {
      result.push(parts[i]);
      if (i < parts.length - 1)
        result.push(replace);
    }
    return result;
  }



  return (
    <Modal
      open={open}
      onClose={() => closeModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>

        <Typography sx={{ mb: 2, fontWeight: '700', fontSize: 30, textAlign: 'center' }} id="modal-modal-title" variant="h6" component="h2">
          Log numero - {data && data.id}
        </Typography>


        <Typography sx={{ mb: 2, fontWeight: '700', fontSize: 22 }} id="modal-modal-title" variant="h6" component="h2">
          {data.error !== undefined &&

            <>
              {data.error[0] === '{' ?
                <ReactJson style={{ justifyContent: 'start' }} src={JSON.parse(data.error)} displayObjectSize={false} groupArraysAfterLength={true} indentWidth={1}
                  collapsed={false} theme={"pop"}
                  enableClipboard={false} displayDataTypes={false} />
                :
                // data.error.replaceAll('\\r\\n',)
                replaceJSX(data.error, '\\r\\n', <br />)
                // data.error.replaceAll('\r', `${`\n`}`)
                // data.error
              }
            </>
          }
        </Typography>




      </Box>
    </Modal>

  );
}