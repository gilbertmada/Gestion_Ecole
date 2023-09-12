import {
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/DeleteOutline";
import ListIcon from "@material-ui/icons/ListAlt";
import SaveListIcon from "@material-ui/icons/Save";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { inject, observer } from "mobx-react";
import { FC, useEffect, useState } from "react";
import AvatarUploader from "react-avatar-uploader";
import { useHistory } from "react-router-dom";
import photo from "../../../Assets/images/person.png";
import BodyTitle from "../../../common/BodyTitle";
import EditFooter from "../../../common/EditFooter";
import FormSelect from "../../../common/FormSelect/FormSelect";
import HeaderPath from "../../../common/HeaderPath";
import { FooterIcon } from "../../../common/interface";
import { ConfirmModal,ConfirmQuitModal, DeleteTotalModal } from "../../../common/Modal";
import { usersRoles } from "../../../common/utils/data";
import config from "../../../config/index";
import { SchoolStoreInterface } from "../../../store/SchoolStore";
import { AbstractEmptyInterface } from "../../../types";
import { toJS } from "mobx";
import rootStore from '../../../store/AppStore';
import useStyles from "./style";

interface CreateUserProps extends AbstractEmptyInterface {
  schoolStore: SchoolStoreInterface;

}


const CreateSchool: FC<AbstractEmptyInterface> = (props: any) => {

  const { schoolStore } = props as CreateUserProps;

  const classes = useStyles();
  const history = useHistory();
  const [isStorage, setIsStorage] = useState(false);
  const [school, setSchool] = useState<any>({});
  const [user, setUser] = useState<any>({});
  const [openModal, setOpenModal] = useState(false);
  const [openQuitModal, setOpenQuitModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [isErrorText, setIsErrorText] = useState(false);
  const [isAssigned, setIsAssigned] = useState(false);
  const [pathRedirect, setPathRedirect] = useState("");



  useEffect(() => {

    if (schoolStore.selectedSchool) {
      setIsStorage(true);
    } else {
      setIsStorage(false);
    }
  }, [schoolStore.selectedSchool]);


  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setSchool({ ...school, [name]: value });
  };

  const handleChangeUser = (e: any) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  // const handleChangeRole = (newValue: any) => {
  //   const { code, label } = newValue;
  //   const data = code as string;
  //   const nom = label as string;

  //   setRole(newValue);
  //   setUser({ ...user, role: data, nomRole: nom });

  // };

  const onSubmit = (e: any) => {
    e.preventDefault();

    if (!schoolStore.selectedSchool) {
      // if (user.password !== user.confirmPassword) {
      //   setIsErrorText(true);
      //   setErrorText("Ne correspond pas au mot de passe");
      // } else {
      //   setIsErrorText(false);
      //   setErrorText("");
        props.schoolStore.createSchool(school).then((addUser: any) => {
          if (addUser) {
            history.push("/school/list");
            schoolStore.getAllSchool();
          }
        });
      // }
    } else {
      props.schoolStore.updateSchool(school).then((editSchool: any) => {

        if (editSchool?.status === 200 ) {

          history.push("/school/list");
          schoolStore.getAllSchool();
        }

      });
    }
  };



  const handleOpenConfirmModal = (path: string) => (e: any) => {
    e.preventDefault();

    setPathRedirect(path);

    if (!isStorage) {
      setOpenQuitModal(true);
    } else {
      setOpenModal(true)
    }
    // setOpenModal(true);
  };

  const handleCloseConfirmModal = () => {
    setOpenModal(false);
  };

  const handleCloseConfirmQuitModal = () => {
    setOpenQuitModal(false);
  };

  const handleOpenDeleteModal = () => {

    setOpenDeleteModal(true);
  };


  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };


  const deleteTotalSchool = () => {

    if (schoolStore.selectedSchool) {
      props.schoolStore
        .deleteTotalSchool(schoolStore.selectedSchool)
        .then((editSchool: any) => {
          if (editSchool.status === 200) {
            setOpenDeleteModal(false);
            history.push("/user/list");
          }
        });
    } else {
      setOpenDeleteModal(false);
    }
  };

  const handleAddNew = () => {
    history.push("/user/new-user");
  };

  const footerIcons: FooterIcon[] = [
    {
      id: 0,
      ItemIcon: SaveListIcon,
      label: "Ajouter",
      type: "submit",
      title: schoolStore.selectedSchool ? "Sauvegarder  " : "Créer",
    },
    {
      id: 1,
      ItemIcon: ListIcon,
      label: "Liste",
      onClick: handleOpenConfirmModal("/school/list"),
      title: "Liste",
    },
    {
      id: 2,
      ItemIcon: DeleteIcon,
      label: "Supprimer",
      onClick: handleOpenDeleteModal,
      title: "Supprimer"
    },
    // {
    //   id: 4,
    //   ItemIcon: AddIcon,
    //   label: "Nouveau",
    //   onClick: handleAddNew,
    //   title: "Créer",
    // },

  ];




  return (
    <div className={classes.root}>
      <div>
        <ConfirmModal
          isOpen={openModal}
          handleCloseConfirmModal={handleCloseConfirmModal}
          path={pathRedirect}
        />
        <ConfirmQuitModal
          isOpen={openQuitModal}
          handleCloseConfirmQuitModal={handleCloseConfirmQuitModal}
          path={pathRedirect}
        />
        <DeleteTotalModal
          isOpen={openDeleteModal}
          handleCloseDeleteModal={handleCloseDeleteModal}
          deleteData={deleteTotalSchool}
        />
      </div>

      <HeaderPath
        paths={[
          {
            label: "Dashboard",
            path: "/",
            clickHandler: handleOpenConfirmModal,
          },
          {
            label: "Ecole",
            path: "/school/list",
            clickHandler: handleOpenConfirmModal,
          },
          {
            label: `${!isStorage ? "Création Ecole" : "Fiche Ecole"
              }`,
            path: "/school/new-school",
          },
        ]}
      />

      <form onSubmit={onSubmit}>
        <div className={classes.content}>
          <BodyTitle title="Ecole" />
          <div className={classes.fields}>
            <div className={classes.firstSection}>
              <Grid container={true}>
               
                <Grid
                  container={true}
                  direction="row"
                  spacing={2}
                  xs={12}
                  md={8}
                >
                  
                  <Grid container={true} spacing={2}>
                    <Grid item={true} md={6}>
                      <TextField
                        label="Nom d'ecole"
                        required={true}
                        name="schoolName"
                        fullWidth={true}
                        value={school.schoolName || ""}
                        onChange={handleChange}
                      />
                    </Grid>

                    <Grid item={true} xs={12} md={6}>
                      <TextField
                        label="Prénom"
                        name="firstName"
                        fullWidth={true}
                        value={user.firstName || ""}
                        onChange={handleChangeUser}
                      />
                    </Grid>
                  </Grid>

                  <Grid container={true} spacing={2}>
                    <Grid item={true} xs={12} md={6}>
                      <TextField
                        label="Nom d'utilisateur"
                        required={true}
                        name="username"
                        fullWidth={true}
                        value={user.username || ""}
                        onChange={handleChange}
                      />
                    </Grid>

                    <Grid item={true} xs={12} md={6}>
                      <TextField
                        label="E-mail"
                        name="email"
                        value={user.email || ""}
                        required={true}
                        type="email"
                        fullWidth={true}
                        onChange={handleChange}
                      />
                    </Grid>
                  </Grid>
                  
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
        <EditFooter icons={footerIcons} />
      </form>
    </div>
  );
};

export default inject("schoolStore")(observer(CreateSchool));
