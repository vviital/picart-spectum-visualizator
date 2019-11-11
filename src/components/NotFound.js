import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

class NotFound extends React.PureComponent {
  render() {
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '90vh' }}
      >
        <Container component="main" maxWidth="sm">
          <Typography
            variant="h4"
            align="center"
          >
            <img
              src="images/404.png"
              alt="Not found"
              align="top"
              width="80%"
              height="80%"
            />
                        Whoops! There is nothing to see here...
          </Typography>
        </Container>
      </Grid>
    );
  }
}
export default NotFound;
