import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';
import BackupIcon from '@material-ui/icons/Backup';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import GetAppIcon from '@material-ui/icons/GetApp';
import VisibilityIcon from '@material-ui/icons/Visibility';
import axios from 'axios';
import moment from 'moment';
import { FC, useRef, useState } from 'react';
import config from '../../../config';
import downloadFile from '../../../services/downloadServices';
import rootStore from '../../../store/AppStore';
import BorderLinearProgress from '../BorderLinearProgress';
import { AbstractEmptyInterface } from "../../../types";
import Preview from '../Preview';
import useStyles from './style';

interface UploadFileProps {
  name: string;
  fileDestination: string;
  type: string;
  setData: (e: any, key: string) => void;
  document: any;
  label: string;
}

// interface ContratProps extends AbstractEmptyInterface, UploadFileProps {
//   contratStore: ContratStoreInterface;

// }

const axiosInstance = axios.create({
  baseURL: config.servers.apiUrl,
});

const UploadFile: FC<UploadFileProps > = (props: any) => {
  const { name,
    fileDestination,
    type,
    setData,
    label,
    document, } = props as UploadFileProps;

  const [apiResponse, setApiResponse] = useState<any>(
    document?.[fileDestination] ? document?.[fileDestination] : {}
  );
  const [progress, setProgress] = useState<any>(0);
  const hiddenFileInput = useRef<any>({});
  const [checked, setChecked] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const getExtName = (FileName: string) => {
    const fileName = FileName.split('.');

    const size = fileName.length;

    return fileName[size - 1];
  };

  const onChange = (e: any) => {
    e.preventDefault(); // prevent the form from submitting

    setProgress(0);

    setChecked(!checked);

    if (e.target.files[0]) {
      const imageSizeKO = e.target.files[0].size / 2048;

      if (imageSizeKO > 4096) {
        setChecked(false);
        rootStore.updateSnackBar(true, 'La taille du fichier est trop grand');
        return;
      }

      const formData = new FormData();

      const getTypeFile: string = e.target.files[0].type;

      const extName = getExtName(e.target.files[0].name);

      const fileUploaded = new File([e.target.files[0]], `${type}-${name}.${extName}`, {
        type: getTypeFile,
      });

      formData.append('file', fileUploaded);

      axios
        .post(`${config.servers.apiUrl}uploadFile/upload/${fileDestination}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: data => {
            setProgress(0);
            setProgress(Math.round((100 * data.loaded) / data.total));
          },
        })
        .then((res: any) => {
          const response = {
            label: `${label}`,
            date: moment().format('DD-MM-YYYY'),
            path: res.data.path,
            filename: res.data.filename,
          };
          setData({ ...response }, fileDestination);
          setApiResponse({ ...response });
        })
        .catch((err: any) => {
          rootStore.updateSnackBar(true, "L'upload a échoué , veuillez réessayer");
        })
        .finally(() => {
          setChecked(false);
        });
    }
  };

  const download = (e: any) => {
    downloadFile(
      `${config.servers.apiUrl}uploadFile/file/download/${fileDestination}/${apiResponse?.filename}`
    );
  };

  const deleteFile = (e: any) => {
    e.preventDefault(); // prevent the form from submitting

    axiosInstance
      .post(`/uploadFile/delete`, { path: apiResponse?.path })
      .then((res: any) => {
        const fileUpload = { ...document };
        delete fileUpload[fileDestination];
        setData({ ...fileUpload }, 'deleted');
        setApiResponse({});
      })
      .catch((err: any) => {
        setChecked(false);
        rootStore.updateSnackBar(true, 'une erreur est survenue , veuilliez réessayer plus tard');
      });
  };

  const classes = useStyles();

  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <div className={classes.container}>
      <Preview
        handleClose={toggleModal}
        openModal={openModal}
        link={`${config.servers.apiUrl}uploadFile/file/${fileDestination}/${apiResponse?.filename}`}
        downloadLink={`${config.servers.apiUrl}uploadFile/file/download/${fileDestination}/${apiResponse?.filename}`}
      />
      <Zoom in={checked}>
        <Box display="flex" alignItems="center">
          <Box width="100%" mr={1}>
            <BorderLinearProgress variant="determinate" value={progress} />
          </Box>
          <Box minWidth={35}>
            <Typography variant="body2" color="textSecondary">{`${progress}%`}</Typography>
          </Box>
        </Box>
      </Zoom>
      <Zoom in={!checked} style={{ transitionDelay: checked ? '500ms' : '0ms' }}>
        <Grid container={true}>
          <Grid item={true} md={6} xs={12}>
            {apiResponse?.label ? apiResponse.label : label}
          </Grid>
          <Grid item={true} md={2} xs={12}>
            {apiResponse?.date && apiResponse.date}
          </Grid>
          <Grid item={true} md={2} xs={12}>
            {apiResponse?.label ? 'En ligne' : 'Inexistant'}
          </Grid>
          <Grid item={true} md={2} xs={12}>
            {!apiResponse?.label && (
              <div>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.bgBlackbtn}
                  onClick={handleClick}>
                  <BackupIcon />
                </Button>
                <input
                  type="file"
                  name="fileUpload"
                  onChange={onChange}
                  ref={hiddenFileInput}
                  className={classes.none}
                />
              </div>
            )}

            {apiResponse?.label && (
              <Grid container={true}>
                <Grid item={true} md={4} xs={6}>
                 
                  {
                    (
                      type === "Driver" || type === "Emis" || type === "Préfecture" || type === "customer" ||
                      type === "CG" || type === "CPIP" || type === "ADV" || type === "AP" || type === "CT"
                    ) ?
                      (<Button
                        variant="contained"
                        color="secondary"
                        className={classes.bgBlackbtn}
                      >

                        <GetAppIcon />
                      </Button>) :
                      (
                        <Button
                          variant="contained"
                          color="secondary"
                          className={classes.bgBlackbtn}
                          onClick={download}>
                          <GetAppIcon />
                        </Button>
                      )
                  }
                </Grid>
                <Grid item={true} md={4} xs={6}>
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.bgBlackbtn}
                    onClick={toggleModal} >
                    <VisibilityIcon />
                  </Button>
                </Grid>
                <Grid item={true} md={4} xs={6}>
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.bgBlackbtn}
                    onClick={deleteFile}>
                    <DeleteForeverIcon />
                  </Button>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Zoom>
    </div>
  );
};

export default UploadFile;
