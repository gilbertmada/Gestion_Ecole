import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import GetAppIcon from '@material-ui/icons/GetApp';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { FC, useState } from 'react';
import config from '../../config';
import downloadFile from '../../services/downloadServices';
import Preview from '../UploadDocument/Preview';
import useStyles from './styles';

interface PreviewDocumentProps {
  fileName: string;
  filePath: string;
  label: string;
  date: string;
}

const PreviewDocument: FC<PreviewDocumentProps> = ({ fileName, filePath, label, date }) => {

  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);

  const download = (e: any) => {
    downloadFile(`${config.servers.apiUrl}uploadFile/file/download/${filePath}/${fileName}`);
  };

  const toggleModal = () => {
    setOpenModal(!openModal);
  };


  return (
    <div className={classes.container}>
      <Preview
        handleClose={toggleModal}
        openModal={openModal}
        link={`${config.servers.apiUrl}uploadFile/file/${filePath}/${fileName}`}
        downloadLink={`${config.servers.apiUrl}uploadFile/file/download/${filePath}/${fileName}`}
      />
      <Grid container={true}>
        <Grid item={true} md={7} xs={12}>
          {label}
        </Grid>
        <Grid item={true} md={2} xs={12}>
          {date}
        </Grid>
        <Grid item={true} md={2} xs={12}>
          {label ? 'En ligne' : 'Inexistant'}
        </Grid>
        <Grid item={true} md={1} xs={12}>
          {label !== "Signature" &&
            (<Grid container={true}>
              <Grid item={true} md={4}>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.bgBlackbtn}
                  onClick={download}>
                  <GetAppIcon />
                </Button>
              </Grid>
              <Grid item={true} md={4}>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.bgBlackbtn}
                  onClick={toggleModal}>
                  <VisibilityIcon />
                </Button>
              </Grid>
            </Grid>
            )
          }
        </Grid>
      </Grid>
    </div>
  );
};

export default PreviewDocument;
