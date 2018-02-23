import * as React from 'react';
import {withStyles} from 'material-ui/styles';

import ExpansionPanel, {
  ExpansionPanelSummary
} from 'material-ui/ExpansionPanel';
import List, {ListItem, ListItemText} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import Icon from 'material-ui/Icon';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Button from 'material-ui/Button';

const styles = theme => ({
  addOnList: {
    width: '100%'
  },
  textField: {
    width: '80%',
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  numberOfSelectedFood: {
    margin: theme.spacing.unit * 2
  },
  leftIcon: {
    marginLeft: theme.spacing.unit
  }
});

type Props = {
  classes: {
    addOnList: {},
    textField: {},
    numberOfSelectedFood: {},
    leftIcon: {}
  },
  name: string,
  addOns: Array<{name: string, price: number}>,
  numberOfMeals: number,
  totalPrice: number,
  selectedAddOns: Array<boolean>,
  specialInstructionsText: string,
  handleAddOnToggle: any,
  handleAddToCartClick: any,
  handleIncreaseMealNumber: any,
  handleDecreaseMealNumber: any
};

class Meal extends React.Component<Props, State> {
  render() {
    const {classes} = this.props;

    const NumberOfMealsSelector = (props: {numberOfMeals: number}) => {
      return (
        <div className={classes.numberOfSelectedFood}>
          <Grid container direction="row" justify="center" alignItems="center">
            <Paper>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={8}
              >
                <Grid item>
                  <IconButton onClick={this.props.handleDecreaseMealNumber}>
                    <Icon>remove</Icon>
                  </IconButton>
                </Grid>
                <Grid item>
                  <Typography>{props.numberOfMeals}</Typography>
                </Grid>
                <Grid item>
                  <IconButton onClick={this.props.handleIncreaseMealNumber}>
                    <Icon>add</Icon>
                  </IconButton>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </div>
      );
    };

    const AddOnList = (props: {
      addOns: Array<{name: string, price: number}>,
      selectedAddOns: Array<boolean>
    }) => (
      <div className={classes.addOnList}>
        <Typography variant="body2">FOOD ADD-ONS</Typography>
        <List>
          {props.addOns.map(
            (addOn: {name: string, price: number}, index: number) => (
              <ListItem
                key={addOn.name}
                dense
                button
                onClick={props.handleAddOnToggle.bind(this, index)}
              >
                <Checkbox checked={props.selectedAddOns[index]} disableRipple />
                <ListItemText primary={addOn.name} />
                <ListItemText primary={`${addOn.price} kr`} />
              </ListItem>
            )
          )}
        </List>
      </div>
    );

    const {
      addOns,
      numberOfMeals,
      selectedAddOns,
      totalPrice
    } = this.props;

    const showAddOns: boolean = addOns.length > 0;


    return (
      <ExpansionPanel expanded={true}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subheading">Burger</Typography>
        </ExpansionPanelSummary>
        {showAddOns && (
          <AddOnList
            addOns={addOns}
            selectedAddOns={selectedAddOns}
            handleAddOnToggle={this.props.handleAddOnToggle}
          />
        )}
        <div>
          <Typography variant="body2">SPECIAL INSTRUCTIONS</Typography>
          <TextField
            id="specialInstructions"
            label="Extra sauce, no onions, etc"
            margin="normal"
            value={this.props.specialInstructionsText}
            className={classes.textField}
          />
        </div>
        <NumberOfMealsSelector numberOfMeals={numberOfMeals} />
        <Button
          variant="raised"
          color="secondary"
          fullWidth={true}
          onClick={this.props.handleAddToCartClick}
        >
          ADD {numberOfMeals} TO CART {totalPrice} kr
          <Icon className={classes.leftIcon}>add_shopping_cart</Icon>
        </Button>
      </ExpansionPanel>
    );
  }
}

export default withStyles(styles)(Meal);
