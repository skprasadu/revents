import React from "react";
import { Grid } from "semantic-ui-react";
import { Switch, Route, Redirect } from "react-router-dom";
import SettingsNav from "./SettingsNav";
import AboutPage from './AboutPage'
import BasicPage from './BasicPage'
import AccountPage from './AccountPage'
import PhotoPage from './PhotoPage'

function SettingsDashboard() {
  return (
    <Grid>
      <Grid.Column width={12}>
        <Switch>
          <Redirect exact from='/settings' to='/settings/basics' />
          <Route path="/settings/basics" component={BasicPage} />
          <Route path="/settings/about" component={AboutPage} />
          <Route path="/settings/photos" component={PhotoPage} />
          <Route path="/settings/account" component={AccountPage} />
        </Switch>
      </Grid.Column>
      <Grid.Column width={4}>
        <SettingsNav />
      </Grid.Column>
    </Grid>
  );
}

export default SettingsDashboard;
