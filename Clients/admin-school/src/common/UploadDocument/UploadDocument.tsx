import { Grid, TextField, Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { FC, useEffect, useState } from 'react';
import Style from './style';
import UploadFile from './UploadFile';
import { StudentStoreInterface } from "../../store/StudentStore";
import UploadFileOtherProps from './UploadFileOther';
import { inject, observer } from "mobx-react";
import { AbstractEmptyInterface } from "../../types";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { toJS } from "mobx";
import moment from "moment";


interface DocumentsProps {
  titre: string;
  category: string;
  setData: (e: any, key: any) => void;
  document: any;
  documentList: any[];
  isNotOther?: boolean;
}

interface ContratProps extends AbstractEmptyInterface, DocumentsProps {
  studentStore: StudentStoreInterface;

}

const Documents: FC<DocumentsProps & AbstractEmptyInterface> = (props: any) => {

  const { studentStore, titre, category, setData, document, documentList, isNotOther } = props as ContratProps;

  const classes = Style();

  const [vehicle, setVehicle] = useState<any>({});

 


  // const handleChangeVehicleDepart = (e: any) => {
  //   const { name, value } = e.target;
  //   setVehicle({ ...vehicle, [name]: value });
  //   contratStore.setVehicle({ ...vehicle, [name]: value });
  // };

  // const handleDateChange = (e: any) => {
  //   const { name, value } = e.target;
  //   setVehicle({ ...vehicle, [name]: value });
  //   contratStore.setVehicle({ ...vehicle, [name]: value });

  //   if(titre === "ETATS DE LIEU DEPART MRC" ){
  //     contratStore.setEDLStart({
  //       [name]: value
  //     })

  //   }
  //   else {
  //     contratStore.setEDLEnd({
  //       [name]: value
  //     })
  //   }

  // };

  // const handleDebutChange = (e: any) => {
  //   const { name, value } = e.target;
  //   setVehicle({ ...vehicle, [name]: value });
  //   contratStore.setVehicle({ ...vehicle, [name]: value });
  //   // contratStore.setModified("Driver", true);
  // };

  return (
    <div className={classes.container}>
      <div className={classes.gridBox}>

        <h1 className={classes.menuTitle}>DOCUMENTS DU {titre}</h1>

        <form method="post" encType="multipart/form-data">
          <Grid container={true} direction="row" spacing={1} className={classes.gridBox}>
              <>
                {/* <Grid container={true} direction="row">
                  <Grid item={true} sm={3} xs={12}>
                    <TextField
                      label="conditionDate"
                      type="date"
                      name= {titre === "ETATS DE LIEU DEPART MRC" ? "KmDepart" : "KmArrive"}
                      required={true}
                      InputLabelProps={{ shrink: true }}
                      // value={contratStore?.vehicle?.options?.dateStartKm || null}
                      value={dateKmDepart}
                      onChange={handleDateChange}
                      // disabled={!!contratStore.contrat?.numberContrat}
                      // disabled={true}
                      InputProps={{
                        classes: {
                          input: classes.resizeTextField,
                        },
                      }}
                    />
                  </Grid>

                  <Grid item={true} sm={3} xs={12}>
                    <TextField
                      label="Km départ"
                      name="km"
                      type="number"
                      // disabled={!!contratStore.contrat?.numberContrat}
                      value={(contratStore?.contrat?.conditionAtStart as ICondition)?.km}
                      required={true}
                      onChange={handleChangeVehicleDepart}
                      InputProps={{
                        classes: {
                          input: classes.resizeTextField,
                        },
                      }}
                    />
                  </Grid>

                  <Grid item={true} sm={3} xs={12}>
                    <TextField
                      label="carburant de départ"
                      name="fuelQuantity"
                      value={(contratStore?.contrat?.conditionAtStart as ICondition)?.fuelQuantity} 
                      required={true}
                      type="number"
                      onChange={handleDateChange}
                    />
                  </Grid>

                  <Grid item={true} sm={3} xs={12} >
                    <TextareaAutosize
                      className={classes.fieldWidth}
                      aria-label="minimum height"
                      minRows={5}
                      placeholder="commentaires"
                      name = "comment"
                      value={(contratStore?.contrat?.conditionAtStart as ICondition)?.comment}
                      onChange={handleDateChange}
                    />
                  </Grid>
                </Grid> */}

                <Grid container={true} spacing = {2} direction="column">
                  <Grid item={true} sm={3} xs={12}>
                    <div> Fissure : </div>
                  </Grid>
                    
                  <Grid item={true} sm={3} xs={12}>
                    <div> Cassé : </div>
                  </Grid>
                  
                  <Grid item={true} sm={3} xs={12}>
                    <div> Manque : </div>
                  </Grid>

                  <Grid item={true} sm={3} xs={12}>
                    <div> Choc : </div>
                  </Grid>
                </Grid>
              </>
         

            


          </Grid>
          <Grid container={true} className={classes.spacingCustomGrid}>
            <Grid item={true} md={6} xs={12}>
              Type de document
            </Grid>
            <Grid item={true} md={2} xs={12}>
              Date
            </Grid>
            <Grid item={true} md={2} xs={12}>
              Statut
            </Grid>
            <Grid item={true} md={2} xs={12}>
              Action
            </Grid>
          </Grid>
          {documentList.map((items: any) => {
            return (
              <div key={JSON.stringify(items)}>
                <UploadFile
                  type={items?.type}
                  name={items?.name}
                  label={items?.label}
                  fileDestination={items?.fileDestination}
                  setData={setData}
                  document={document}

                />
              </div>

            );
          })}

          {!isNotOther && <UploadFileOtherProps category={category} setData={setData} document={document} />}
        </form>
      </div>
      <Typography variant="button" display="block">
        *Les documents ne peuvent pas dépasser 8 MO/doc
      </Typography>
    </div>
  );
};

export default inject("contratStore")(observer(Documents));
