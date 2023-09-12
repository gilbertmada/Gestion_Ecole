import { makeStyles } from '@material-ui/core/styles';

export const contentCommonStyle = {
  background: '#F3F3F3',
  padding: '5px 0px 5px 0px',
  borderRadius: '5px 5px 5px 5px',
  boxShadow: '2px 2px #DADADA',
};

const Style = makeStyles({
  container: {
    width: '100%',
    margin: '0 auto',
  },
  gridBox: {
    ...contentCommonStyle,
    margin: '0',
    marginBottom: '10px',
    padding: '10px',
    boxShadow: 'none',
    border: '2px solid #dadada',
    background: 'white',
  },
  table: {
    minWidth: 650,
  },
  spacingCustomGrid: {
    padding: '2vh',
  },
  resizeTextField: {
    fontSize: '15px',
    color: 'black',
    width:"100%"
  },
  menuTitle: {
    height: 'auto',
    fontSize: '1.5em',
    alignContent: 'center',
    margin: '-10px 0 0 -10px',
    paddingLeft: '10px',
    backgroundColor: '#0AB1E1',
    color: '#fff',
    width: 'calc(100% + 20px)',
  },
  fieldWidth: {
    width: '100%',
  },
});

export default Style;
