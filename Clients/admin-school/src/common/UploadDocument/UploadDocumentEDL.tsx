import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { FC } from 'react';
import Style from './style';
import UploadFile from './UploadFile';
import { StudentStoreInterface } from "../../store/StudentStore";
import { inject, observer } from "mobx-react";
import { AbstractEmptyInterface } from "../../types";


interface DocumentsProps {
    titre: string;
    category: string;
    setData: (e: any, key: any) => void;
    document: any;
    documentList: any[];
    isNotOther?: boolean;
}

interface ContratProps extends AbstractEmptyInterface, DocumentsProps {
    // contratStore: ContratStoreInterface;
    // contratMRCStore: ContratMRCInterface;
    studentStore: StudentStoreInterface;
}

const DocumentEDL: FC<DocumentsProps & AbstractEmptyInterface> = (props: any) => {

    const {   studentStore,  titre, category, setData, document, documentList, isNotOther } = props as ContratProps;

    const classes = Style();

    return (
        <div className={classes.container}>
            <div className={classes.gridBox}>

                <form method="post" encType="multipart/form-data">

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

                    {/* {!isNotOther && <UploadFileOtherProps  category={category} setData={setData} document={document} />} */}
                </form>
            </div>
        </div>
    );
};

export default inject("studentStore")(observer(DocumentEDL));
